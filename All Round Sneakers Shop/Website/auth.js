// Authentication System - Pure JavaScript
class AuthSystem {
    constructor() {
        this.users = this.loadUsers();
        this.currentUser = this.getCurrentUser();
    }

    // Load users from localStorage
    loadUsers() {
        const stored = localStorage.getItem('allaround_users');
        if (stored) {
            return JSON.parse(stored);
        }
        
        // Default admin user
        const defaultUsers = [
            {
                id: 1,
                username: 'admin',
                email: 'admin@allaroundsneakers.com',
                password: 'admin123', // In production, this should be hashed
                fullName: 'Administrator',
                role: 'admin',
                createdAt: new Date().toISOString()
            }
        ];
        
        this.saveUsers(defaultUsers);
        return defaultUsers;
    }

    // Save users to localStorage
    saveUsers(users) {
        localStorage.setItem('allaround_users', JSON.stringify(users));
        this.users = users;
    }

    // Get current logged in user
    getCurrentUser() {
        const session = localStorage.getItem('allaround_session');
        if (session) {
            const sessionData = JSON.parse(session);
            if (sessionData.expires > Date.now()) {
                return sessionData.user;
            } else {
                this.logout();
            }
        }
        return null;
    }

    // Login user
    login(username, password, remember = false) {
        const user = this.users.find(u => 
            (u.username === username || u.email === username) && 
            u.password === password
        );

        if (user) {
            const sessionData = {
                user: user,
                expires: remember ? Date.now() + (30 * 24 * 60 * 60 * 1000) : Date.now() + (24 * 60 * 60 * 1000)
            };
            
            localStorage.setItem('allaround_session', JSON.stringify(sessionData));
            this.currentUser = user;
            
            return { success: true, user: user };
        }
        
        return { success: false, error: 'Invalid username or password' };
    }

    // Register new user
    register(userData) {
        // Check if username already exists
        if (this.users.find(u => u.username === userData.username)) {
            return { success: false, error: 'Username already exists' };
        }

        // Check if email already exists
        if (this.users.find(u => u.email === userData.email)) {
            return { success: false, error: 'Email already registered' };
        }

        // Create new user
        const newUser = {
            id: this.users.length + 1,
            username: userData.username,
            email: userData.email,
            password: userData.password, // In production, this should be hashed
            fullName: userData.fullName,
            role: userData.role || 'customer',
            createdAt: new Date().toISOString()
        };

        this.users.push(newUser);
        this.saveUsers(this.users);

        return { success: true, user: newUser };
    }

    // Logout user
    logout() {
        localStorage.removeItem('allaround_session');
        this.currentUser = null;
        window.location.href = 'index.html';
    }

    // Check if user is logged in
    isLoggedIn() {
        return this.currentUser !== null;
    }

    // Check user role
    hasRole(role) {
        return this.currentUser && this.currentUser.role === role;
    }

    // Redirect based on role
    redirectBasedOnRole() {
        if (!this.currentUser) return;

        switch (this.currentUser.role) {
            case 'admin':
                window.location.href = 'admin.html';
                break;
            case 'seller':
                window.location.href = 'sellers page.html';
                break;
            default:
                window.location.href = 'home.html';
                break;
        }
    }

    // Show error message
    showError(message) {
        // Create or update error display
        let errorDiv = document.getElementById('auth-error');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.id = 'auth-error';
            errorDiv.className = 'alert alert-danger';
            errorDiv.style.marginBottom = '20px';
            
            // Insert at top of form
            const form = document.querySelector('form');
            if (form) {
                form.insertBefore(errorDiv, form.firstChild);
            }
        }
        
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        
        // Hide after 5 seconds
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000);
    }

    // Show success message
    showSuccess(message) {
        let successDiv = document.getElementById('auth-success');
        if (!successDiv) {
            successDiv = document.createElement('div');
            successDiv.id = 'auth-success';
            successDiv.className = 'alert alert-success';
            successDiv.style.marginBottom = '20px';
            
            const form = document.querySelector('form');
            if (form) {
                form.insertBefore(successDiv, form.firstChild);
            }
        }
        
        successDiv.textContent = message;
        successDiv.style.display = 'block';
        
        setTimeout(() => {
            successDiv.style.display = 'none';
        }, 5000);
    }
}

// Initialize auth system
const auth = new AuthSystem();

// Auto-redirect if already logged in
document.addEventListener('DOMContentLoaded', function() {
    if (auth.isLoggedIn()) {
        const currentPage = window.location.pathname.split('/').pop();
        
        // Don't redirect from logout or if already on correct page
        if (currentPage !== 'logout.html' && currentPage !== 'index.html') {
            return; // Stay on current page
        }
        
        if (currentPage === 'index.html') {
            auth.redirectBasedOnRole();
        }
    }
});
