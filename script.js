// Cart functionality
let cart = [];
let cartTotal = 0;

function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    
    updateCartDisplay();
    showCartNotification(name);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartDisplay();
}

function updateQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            updateCartDisplay();
        }
    }
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const floatingCartCount = document.getElementById('floating-cart-count');
    const cartTotalElement = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    cartCount.textContent = totalItems;
    cartTotalElement.textContent = cartTotal.toFixed(2);
    
    if (totalItems > 0) {
        floatingCartCount.textContent = totalItems;
        floatingCartCount.classList.remove('hidden');
        checkoutBtn.disabled = false;
    } else {
        floatingCartCount.classList.add('hidden');
        checkoutBtn.disabled = true;
    }
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-gray-500 dark:text-gray-400 text-center py-8">Your cart is empty</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <div class="flex-1">
                    <h4 class="font-medium text-sm dark:text-white">${item.name}</h4>
                    <p class="text-green-600 font-semibold">$${item.price.toFixed(2)}</p>
                </div>
                <div class="flex items-center space-x-2">
                    <button onclick="updateQuantity('${item.id}', -1)" class="bg-gray-200 dark:bg-gray-600 w-6 h-6 rounded-full text-sm hover:bg-gray-300 dark:hover:bg-gray-500 dark:text-white">-</button>
                    <span class="text-sm font-medium dark:text-white">${item.quantity}</span>
                    <button onclick="updateQuantity('${item.id}', 1)" class="bg-gray-200 dark:bg-gray-600 w-6 h-6 rounded-full text-sm hover:bg-gray-300 dark:hover:bg-gray-500 dark:text-white">+</button>
                    <button onclick="removeFromCart('${item.id}')" class="text-red-500 hover:text-red-700 ml-2">🗑️</button>
                </div>
            </div>
        `).join('');
    }
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.classList.toggle('show');
}

function checkout() {
    if (cart.length === 0) return;
    
    alert(`Thank you for your order! Total: $${cartTotal.toFixed(2)}\n\nThis is a demo checkout. In a real store, you would be redirected to a secure payment processor.`);
    cart = [];
    updateCartDisplay();
    toggleCart();
}

function showCartNotification(itemName) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    notification.textContent = `${itemName} added to cart!`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Theme toggle functionality
function toggleTheme() {
    const html = document.documentElement;
    const themeIcon = document.getElementById('theme-icon');
    const themeIconMobile = document.getElementById('theme-icon-mobile');
    
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        themeIcon.textContent = '🌙';
        if (themeIconMobile) themeIconMobile.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    } else {
        html.classList.add('dark');
        themeIcon.textContent = '☀️';
        if (themeIconMobile) themeIconMobile.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    }
}

// Initialize theme on page load
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const themeIcon = document.getElementById('theme-icon');
    const themeIconMobile = document.getElementById('theme-icon-mobile');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add('dark');
        themeIcon.textContent = '☀️';
        if (themeIconMobile) themeIconMobile.textContent = '☀️';
    } else {
        document.documentElement.classList.remove('dark');
        themeIcon.textContent = '🌙';
        if (themeIconMobile) themeIconMobile.textContent = '🌙';
    }
}

// Initialize theme immediately
initializeTheme();

// Smooth scrolling
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

// Mobile menu
document.getElementById('mobile-menu-btn').addEventListener('click', function() {
    alert('Mobile menu would open here in a full implementation');
});

// Fade in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Contact form
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! We\'ll get back to you within 24 hours.');
    this.reset();
});

// Sidebar functionality
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    
    if (sidebar.classList.contains('-translate-x-full')) {
        sidebar.classList.remove('-translate-x-full');
        overlay.classList.remove('hidden');
    } else {
        sidebar.classList.add('-translate-x-full');
        overlay.classList.add('hidden');
    }
}

function showProfileSection(section) {
    const sections = {
        'account': 'Account Settings - Manage your personal information, email, and password.',
        'orders': 'Order History - View your past purchases and track current orders.',
        'courses': 'My Courses - Access your enrolled yoga courses and track progress.',
        'wishlist': 'Wishlist - Items you\'ve saved for later purchase.',
        'preferences': 'Preferences - Customize your experience and notification settings.',
        'notifications': 'Notifications - Manage how and when you receive updates.',
        'support': 'Help & Support - Get assistance with your account or products.'
    };
    
    alert(`${sections[section]}\n\nThis would open the ${section} section in a full implementation.`);
}

function logout() {
    if (confirm('Are you sure you want to sign out?')) {
        alert('You have been signed out successfully!');
        toggleSidebar();
    }
}

// Close cart when clicking outside
document.getElementById('cart-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        toggleCart();
    }
});

// Page navigation functionality
let currentPage = 'home';

function showPage(pageId) {
    // Hide all sections
    const sections = ['home', 'herbs', 'courses', 'contact', 'about'];
    sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
            element.style.display = 'none';
        }
    });
    
    // Show the requested page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.style.display = 'block';
        currentPage = pageId;
    }
}

function openAboutPage() {
    showPage('about');
}

function goHome() {
    showPage('home');
    document.getElementById('herbs').style.display = 'block';
    document.getElementById('courses').style.display = 'block';
    document.getElementById('contact').style.display = 'block';
}

// Search functionality
const searchData = [
    // Herbs
    { name: 'Turmeric', type: 'herb', price: 24.99, description: 'Anti-inflammatory golden spice' },
    { name: 'Ashwagandha', type: 'herb', price: 32.99, description: 'Stress relief & energy boost' },
    { name: 'Holy Basil', type: 'herb', price: 28.99, description: 'Sacred herb for balance' },
    { name: 'Ginkgo Biloba', type: 'herb', price: 26.99, description: 'Memory & focus support' },
    { name: 'Rhodiola Rosea', type: 'herb', price: 34.99, description: 'Adaptogen for resilience' },
    { name: 'Chamomile', type: 'herb', price: 19.99, description: 'Calming bedtime tea' },
    { name: 'Echinacea', type: 'herb', price: 22.99, description: 'Immune system support' },
    { name: 'Milk Thistle', type: 'herb', price: 25.99, description: 'Liver detox support' },
    { name: 'Valerian Root', type: 'herb', price: 29.99, description: 'Natural sleep aid' },
    { name: 'Wellness Tea Blend', type: 'herb', price: 18.99, description: 'Calming herbal tea blend' },
    
    // Courses
    { name: 'Yoga Foundations', type: 'course', price: 49.99, description: 'Master the basics with 30 guided sessions' },
    { name: 'Vinyasa Flow Mastery', type: 'course', price: 69.99, description: 'Dynamic sequences for strength & flexibility' },
    { name: 'Meditation & Mindfulness', type: 'course', price: 39.99, description: 'Find inner peace through guided meditation' },
    { name: 'Power Yoga Intensive', type: 'course', price: 89.99, description: 'High-intensity yoga for strength building' },
    { name: 'Prenatal Yoga', type: 'course', price: 59.99, description: 'Safe yoga practice for expecting mothers' },
    { name: 'Yin Yoga & Restoration', type: 'course', price: 44.99, description: 'Deep relaxation and passive stretching' },
    { name: 'Beginner Yoga Flow', type: 'course', price: 49.99, description: '30-day program for yoga beginners' },
    
    // Popular searches
    { name: 'stress relief', type: 'search', description: 'Find herbs and courses for stress management' },
    { name: 'sleep support', type: 'search', description: 'Natural solutions for better sleep' },
    { name: 'immune boost', type: 'search', description: 'Strengthen your immune system naturally' },
    { name: 'beginner yoga', type: 'search', description: 'Start your yoga journey with beginner-friendly courses' },
    { name: 'meditation', type: 'search', description: 'Mindfulness and meditation practices' },
    { name: 'detox', type: 'search', description: 'Natural detox and cleansing support' }
];

function handleSearch(query) {
    const searchInput = document.getElementById('search-input');
    const clearBtn = document.getElementById('clear-search');
    
    // Show/hide clear button
    if (query.length > 0) {
        if (clearBtn) clearBtn.classList.remove('hidden');
    } else {
        if (clearBtn) clearBtn.classList.add('hidden');
    }
    
    if (query.length > 0) {
        performSearch(query);
    } else {
        hideSearchResults();
    }
}

function performSearch(query) {
    const results = searchData.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
    );
    
    displaySearchResults(results, query);
}

function displaySearchResults(results, query) {
    const searchResults = document.getElementById('search-results');
    const searchSuggestions = document.getElementById('search-suggestions');
    
    if (!searchResults || !searchSuggestions) return;
    
    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="p-3 text-gray-500 dark:text-gray-400 text-center">
                No results found for "${query}"
            </div>
        `;
    } else {
        searchResults.innerHTML = results.slice(0, 8).map(item => {
            const icon = item.type === 'herb' ? '🌿' : item.type === 'course' ? '🧘‍♀️' : '🔍';
            const typeLabel = item.type === 'herb' ? 'Herb' : item.type === 'course' ? 'Course' : 'Search';
            
            return `
                <div class="p-3 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg cursor-pointer transition-colors" onclick="selectSearchResult('${item.name}', '${item.type}')">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <span class="text-lg mr-3">${icon}</span>
                            <div>
                                <div class="font-medium text-black dark:text-white">${item.name}</div>
                                <div class="text-sm text-gray-500 dark:text-gray-400">${item.description}</div>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="text-xs text-gray-400 dark:text-gray-500 uppercase">${typeLabel}</div>
                            ${item.price ? `<div class="text-sm font-semibold text-green-600">$${item.price}</div>` : ''}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    searchSuggestions.classList.remove('hidden');
}

function showSearchSuggestions() {
    const searchInput = document.getElementById('search-input');
    const query = searchInput ? searchInput.value : '';
    
    if (query.length === 0) {
        // Show popular searches
        const popularSearches = searchData.filter(item => item.type === 'search').slice(0, 6);
        displaySearchResults(popularSearches, '');
    }
}

function hideSearchSuggestions() {
    setTimeout(() => {
        const searchSuggestions = document.getElementById('search-suggestions');
        if (searchSuggestions) {
            searchSuggestions.classList.add('hidden');
        }
    }, 150);
}

function hideSearchResults() {
    const searchSuggestions = document.getElementById('search-suggestions');
    if (searchSuggestions) {
        searchSuggestions.classList.add('hidden');
    }
}

function selectSearchResult(name, type) {
    if (type === 'search') {
        // Handle search terms
        const searchInput = document.getElementById('search-input');
        if (searchInput) searchInput.value = name;
        performSearch(name);
    } else if (type === 'herb') {
        // Navigate to herbs section and highlight the item
        goHome();
        setTimeout(() => scrollToSection('herbs'), 100);
        hideSearchResults();
        clearSearch();
    } else if (type === 'course') {
        // Navigate to courses section and highlight the item
        goHome();
        setTimeout(() => scrollToSection('courses'), 100);
        hideSearchResults();
        clearSearch();
    }
}

function clearSearch() {
    const searchInput = document.getElementById('search-input');
    const clearBtn = document.getElementById('clear-search');
    
    if (searchInput) searchInput.value = '';
    if (clearBtn) clearBtn.classList.add('hidden');
    hideSearchResults();
}

// Close search suggestions when clicking outside
document.addEventListener('click', function(e) {
    const searchSuggestions = document.getElementById('search-suggestions');
    const searchInput = document.getElementById('search-input');
    
    if (searchSuggestions && searchInput && 
        !searchSuggestions.contains(e.target) && 
        !searchInput.contains(e.target)) {
        hideSearchResults();
    }
});

// Initialize animations
setTimeout(() => {
    document.querySelectorAll('.fade-in').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add('visible');
        }
    });
}, 100);
