// All Around Sneakers - Professional E-commerce JavaScript

// Product Database
const products = [
  { id: 1, name: "Air Jordan 1", brand: "Nike", price: 1000, originalPrice: 1200, image: "Air Jordan 1.jpg", category: "basketball", sizes: [7, 8, 9, 10, 11], rating: 4.8, reviews: 124 },
  { id: 2, name: "Yeezy Boost 350", brand: "Adidas", price: 800, originalPrice: 950, image: "Yeezy Boost 350.jpg", category: "lifestyle", sizes: [6, 7, 8, 9, 10], rating: 4.7, reviews: 89 },
  { id: 3, name: "Air Force 1", brand: "Nike", price: 900, originalPrice: null, image: "airfoce.jpg", category: "lifestyle", sizes: [6, 7, 8, 9, 10, 11, 12], rating: 4.9, reviews: 256 },
  { id: 4, name: "Superstar", brand: "Adidas", price: 500, originalPrice: 650, image: "Adidas Superstar.jpg", category: "lifestyle", sizes: [6, 7, 8, 9, 10], rating: 4.6, reviews: 78 },
  { id: 5, name: "Suede Classic", brand: "Puma", price: 650, originalPrice: null, image: "Puma Suede Classic.jpg", category: "lifestyle", sizes: [7, 8, 9, 10, 11], rating: 4.5, reviews: 45 },
  { id: 6, name: "Chuck Taylor All Star", brand: "Converse", price: 850, originalPrice: 950, image: "Converse Chuck Taylor All Star.jpg", category: "casual", sizes: [6, 7, 8, 9, 10, 11], rating: 4.7, reviews: 167 },
  { id: 7, name: "New Balance 550", brand: "New Balance", price: 900, originalPrice: null, image: "New Balance 550.jpg", category: "lifestyle", sizes: [7, 8, 9, 10, 11], rating: 4.8, reviews: 92 },
  { id: 8, name: "Old Skool", brand: "Vans", price: 700, originalPrice: 800, image: "Vans Old Skool.jpg", category: "skate", sizes: [6, 7, 8, 9, 10], rating: 4.6, reviews: 134 },
  { id: 9, name: "Club C 85", brand: "Reebok", price: 650, originalPrice: null, image: "Reebok Club C 85.jpg", category: "lifestyle", sizes: [7, 8, 9, 10, 11], rating: 4.5, reviews: 67 },
  { id: 10, name: "Air Jordan 4", brand: "Nike", price: 1000, originalPrice: 1300, image: "Air Jordan 4.jpg", category: "basketball", sizes: [7, 8, 9, 10, 11, 12], rating: 4.9, reviews: 203 }
];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  updateCartBadge();
  updateWishlistBadge();
});

// Cart Functions
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(productId, size = null) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const cart = getCart();
  const existingItem = cart.find(item => item.id === productId && item.size === size);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
      size: size,
      quantity: 1
    });
  }

  saveCart(cart);
  showToast(`${product.name} added to cart!`, 'success');
}

function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  if (typeof displayCart === 'function') displayCart();
}

function updateQuantity(index, quantity) {
  const cart = getCart();
  if (quantity < 1) {
    removeFromCart(index);
    return;
  }
  cart[index].quantity = parseInt(quantity);
  saveCart(cart);
  if (typeof displayCart === 'function') displayCart();
}

function updateCartBadge() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badges = document.querySelectorAll('.cart-badge');
  badges.forEach(badge => {
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? 'block' : 'none';
  });
}

function clearCart() {
  localStorage.removeItem('cart');
  updateCartBadge();
}

// Wishlist Functions
function getWishlist() {
  return JSON.parse(localStorage.getItem('wishlist')) || [];
}

function saveWishlist(wishlist) {
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  updateWishlistBadge();
}

function toggleWishlist(productId) {
  let wishlist = getWishlist();
  const index = wishlist.indexOf(productId);

  if (index > -1) {
    wishlist.splice(index, 1);
    showToast('Removed from wishlist');
  } else {
    wishlist.push(productId);
    showToast('Added to wishlist!', 'success');
  }

  saveWishlist(wishlist);
  updateWishlistButtons();
}

function isInWishlist(productId) {
  return getWishlist().includes(productId);
}

function updateWishlistBadge() {
  const wishlist = getWishlist();
  const badges = document.querySelectorAll('.wishlist-badge');
  badges.forEach(badge => {
    badge.textContent = wishlist.length;
    badge.style.display = wishlist.length > 0 ? 'block' : 'none';
  });
}

function updateWishlistButtons() {
  document.querySelectorAll('.wishlist-btn').forEach(btn => {
    const productId = parseInt(btn.dataset.productId);
    if (isInWishlist(productId)) {
      btn.classList.add('active');
      btn.innerHTML = '<i class="fas fa-heart"></i>';
    } else {
      btn.classList.remove('active');
      btn.innerHTML = '<i class="far fa-heart"></i>';
    }
  });
}

// Search Function
function searchProducts(query) {
  query = query.toLowerCase().trim();
  if (!query) return products;

  return products.filter(product =>
    product.name.toLowerCase().includes(query) ||
    product.brand.toLowerCase().includes(query)
  );
}

function renderProducts() {
  const productsContainer = document.getElementById('products');
  if (!productsContainer) return;

  productsContainer.innerHTML = products.map(product => `
    <div class="product">
      <img src="${product.image}" alt="${product.name}">
      <div class="product-details">
        <p class="brand" style="color: #ff6b00; font-size: 0.85rem; margin-bottom: 5px;">${product.brand}</p>
        <h4>${product.name}</h4>
        <p class="price">R${product.price}</p>
        <button class="wishlist-btn" data-product-id="${product.id}" onclick="toggleWishlist(${product.id})">
          <i class="far fa-heart"></i>
        </button>
        <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
          Add to Cart
        </button>
      </div>
    </div>
  `).join('');
}

function displayCart() {
  const cart = getCart();
  const cartItems = document.getElementById('cartItems');
  if (!cartItems) return;

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-details">
        <p class="brand" style="color: #ff6b00; font-size: 0.85rem; margin-bottom: 5px;">${item.brand}</p>
        <h4>${item.name}</h4>
        <p class="price">R${item.price} x ${item.quantity}</p>
        <button onclick="removeFromCart(${cart.indexOf(item)})" style="background: none; border: none; color: #dc3545; cursor: pointer; margin-top: 10px;">
          <i class="fas fa-trash"></i> Remove
        </button>
      </div>
    </div>
  `).join('');

  updateCartBadge();
}

// Filter Functions
function filterByCategory(category) {
  if (category === 'all') return products;
  return products.filter(p => p.category === category);
}

function filterByPrice(maxPrice) {
  return products.filter(p => p.price <= maxPrice);
}

function sortProducts(productsToSort, sortBy) {
  const sorted = [...productsToSort];
  switch(sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    default:
      return sorted;
  }
}

// Toast Notification
function showToast(message, type = 'info') {
  // Remove existing toast
  const existingToast = document.querySelector('.toast');
  if (existingToast) existingToast.remove();

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
    <span style="margin-left: 10px;">${message}</span>
  `;
  document.body.appendChild(toast);

  // Add FontAwesome if not present
  if (!document.querySelector('link[href*="fontawesome"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(link);
  }

  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Format Price
function formatPrice(price) {
  return 'R' + price.toFixed(2);
}

// Generate Star Rating HTML
function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  let html = '';

  for (let i = 0; i < fullStars; i++) {
    html += '<i class="fas fa-star" style="color: #ffc107;"></i>';
  }
  if (hasHalfStar) {
    html += '<i class="fas fa-star-half-alt" style="color: #ffc107;"></i>';
  }
  for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
    html += '<i class="far fa-star" style="color: #ffc107;"></i>';
  }

  return html;
}

// Product Modal
function openProductModal(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  let modal = document.getElementById('productModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'productModal';
    modal.className = 'modal-overlay';
    document.body.appendChild(modal);
  }

  const inWishlist = isInWishlist(productId);

  modal.innerHTML = `
    <div class="modal-content">
      <button class="modal-close" onclick="closeProductModal()">&times;</button>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
        <div style="background: #f5f5f5; border-radius: 15px; padding: 30px; display: flex; align-items: center; justify-content: center;">
          <img src="${product.image}" alt="${product.name}" style="max-width: 100%; max-height: 350px; object-fit: contain;">
        </div>
        <div style="padding: 30px; color: #1a1a1a;">
          <p style="color: #ff6b00; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">${product.brand}</p>
          <h2 style="font-size: 1.8rem; margin-bottom: 10px;">${product.name}</h2>
          <div style="margin-bottom: 15px;">${generateStars(product.rating)} <span style="color: #666; margin-left: 10px;">(${product.reviews} reviews)</span></div>
          <p style="font-size: 1.5rem; font-weight: 700; margin-bottom: 20px;">
            ${formatPrice(product.price)}
            ${product.originalPrice ? `<span style="text-decoration: line-through; color: #666; font-size: 1rem; margin-left: 10px;">${formatPrice(product.originalPrice)}</span>` : ''}
          </p>
          <p style="color: #666; margin-bottom: 20px; line-height: 1.6;">Premium quality sneakers designed for comfort and style. Perfect for everyday wear with durable construction and iconic design.</p>

          <div style="margin-bottom: 20px;">
            <p style="font-weight: 600; margin-bottom: 10px;">Select Size:</p>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
              ${product.sizes.map(size => `
                <button class="size-btn" data-size="${size}" onclick="selectSize(this)" style="width: 50px; height: 50px; border: 2px solid #ddd; background: white; border-radius: 8px; cursor: pointer; font-weight: 600;">${size}</button>
              `).join('')}
            </div>
          </div>

          <div style="display: flex; gap: 15px; margin-top: 30px;">
            <button onclick="addToCartFromModal(${productId})" style="flex: 1; background: #ff6b00; color: white; border: none; padding: 15px 30px; border-radius: 30px; font-weight: 600; cursor: pointer; font-size: 1rem;">Add to Cart</button>
            <button onclick="toggleWishlist(${productId}); updateModalWishlistBtn(this, ${productId});" style="width: 55px; height: 55px; border: 2px solid #ddd; background: ${inWishlist ? '#dc3545' : 'white'}; color: ${inWishlist ? 'white' : '#1a1a1a'}; border-radius: 50%; cursor: pointer; font-size: 1.2rem;">
              <i class="${inWishlist ? 'fas' : 'far'} fa-heart"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Add FontAwesome if not present
  if (!document.querySelector('link[href*="fontawesome"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(link);
  }
}

let selectedSize = null;

function selectSize(btn) {
  document.querySelectorAll('.size-btn').forEach(b => {
    b.style.background = 'white';
    b.style.borderColor = '#ddd';
    b.style.color = '#1a1a1a';
  });
  btn.style.background = '#ff6b00';
  btn.style.borderColor = '#ff6b00';
  btn.style.color = 'white';
  selectedSize = parseInt(btn.dataset.size);
}

function addToCartFromModal(productId) {
  if (!selectedSize) {
    showToast('Please select a size first');
    return;
  }
  addToCart(productId, selectedSize);
  closeProductModal();
}

function updateModalWishlistBtn(btn, productId) {
  const inWishlist = isInWishlist(productId);
  btn.style.background = inWishlist ? '#dc3545' : 'white';
  btn.style.color = inWishlist ? 'white' : '#1a1a1a';
  btn.innerHTML = `<i class="${inWishlist ? 'fas' : 'far'} fa-heart"></i>`;
}

function closeProductModal() {
  const modal = document.getElementById('productModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    selectedSize = null;
  }
}

// Close modal on overlay click
document.addEventListener('click', function(e) {
  const modal = document.getElementById('productModal');
  if (modal && e.target === modal) {
    closeProductModal();
  }
});

// Close modal on escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeProductModal();
  }
});
