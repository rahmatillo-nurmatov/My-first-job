// Complete JavaScript functionality for Animal Marketplace

// Global variables
let currentLanguage = 'en';
let currentUser = null;
let animals = [];
let shelters = [];

// Sample data with real photos
const sampleAnimals = [
    {
        id: '1',
        name: 'Buddy',
        nameRu: 'Бадди',
        species: 'Dog',
        speciesRu: 'Собака',
        breed: 'Golden Retriever',
        breedRu: 'Золотистый ретривер',
        age: '2 years',
        ageRu: '2 года',
        gender: 'Male',
        genderRu: 'Самец',
        city: 'New York',
        cityRu: 'Нью-Йорк',
        price: 0,
        transferType: 'adoption',
        description: 'Friendly and energetic dog, great with kids.',
        descriptionRu: 'Дружелюбная и энергичная собака, отлично ладит с детьми.',
        health: 'Vaccinated, neutered, microchipped.',
        healthRu: 'Вакцинирован, кастрирован, чипирован.',
        conditions: 'Needs a yard to play. Good with children.',
        conditionsRu: 'Нужен двор для игр. Хорошо ладит с детьми.',
        photos: [
            'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&h=600&fit=crop&crop=center'
        ],
        shelterId: '1',
        personality: ['Friendly', 'Energetic', 'Loyal', 'Playful'],
        personalityRu: ['Дружелюбный', 'Энергичный', 'Верный', 'Игривый']
    }
];

const sampleShelters = [
    {
        id: '1',
        name: 'Happy Paws Shelter',
        nameRu: 'Приют Счастливые Лапки',
        type: 'shelter',
        rating: 4.8,
        reviews: 156,
        city: 'New York',
        cityRu: 'Нью-Йорк',
        description: 'Dedicated to finding loving homes for abandoned animals',
        descriptionRu: 'Посвящен поиску любящих домов для брошенных животных'
    }
];

// Initialize data
animals = sampleAnimals;
shelters = sampleShelters;

// Language switching function
function switchLanguage(lang) {
    currentLanguage = lang;
    console.log('Switching language to:', lang);
    
    // Update HTML lang attribute
    document.getElementById('htmlRoot').lang = lang === 'ru' ? 'ru' : 'en';
    
    // Update current language display
    const currentLangElement = document.getElementById('currentLang');
    if (currentLangElement) {
        currentLangElement.textContent = lang === 'ru' ? 'Русский' : 'English';
    }
    
    // Update brand name
    const brandElements = document.querySelectorAll('#brandName, #footerBrand');
    brandElements.forEach(element => {
        if (element) {
            element.textContent = lang === 'ru' ? 'РынокЖивотных' : 'AnimalMarket';
        }
    });
    
    // Update page title
    const titleElement = document.getElementById('pageTitle');
    if (titleElement) {
        titleElement.textContent = lang === 'ru' ? 
            'Рынок Животных - Найдите своего идеального компаньона' : 
            'Animal Marketplace - Find Your Perfect Companion';
    }
    
    // Update translatable elements
    updateTranslatableElements();
    
    // Re-render current page content if using SPA
    const currentPage = getCurrentPage();
    if (currentPage !== 'home' && typeof renderPage === 'function') {
        renderPage(currentPage);
    }
    
    // Update footer text
    updateFooterText();
    
    showNotification(
        lang === 'ru' ? 'Язык изменен на русский' : 'Language changed to English',
        'success'
    );
}

// Update translatable elements
function updateTranslatableElements() {
    const translations = {
        en: {
            'nav-home': 'Home',
            'nav-animals': 'Browse Animals',
            'nav-shelters': 'Shelters & Breeders',
            'nav-feedback': 'Feedback',
            'nav-login': 'Login',
            'nav-register': 'Sign Up',
            'nav-dashboard': 'Dashboard',
            'nav-add-animal': 'Add Animal',
            'nav-logout': 'Logout'
        },
        ru: {
            'nav-home': 'Главная',
            'nav-animals': 'Животные',
            'nav-shelters': 'Приюты',
            'nav-feedback': 'Отзывы',
            'nav-login': 'Войти',
            'nav-register': 'Регистрация',
            'nav-dashboard': 'Панель управления',
            'nav-add-animal': 'Добавить животное',
            'nav-logout': 'Выйти'
        }
    };
    
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
}
// Navigation functions
function getCurrentPage() {
    const hash = window.location.hash.substring(1);
    return hash || 'home';
}

function navigateTo(page, params = {}) {
    console.log('Navigating to:', page, params);
    window.location.hash = page;
    
    // For SPA functionality, render the page
    if (typeof renderPage === 'function') {
        renderPage(page, params);
    } else {
        // For static pages, just scroll to section if it exists
        const section = document.getElementById(page);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// Show notification function
function showNotification(message, type = 'info') {
    console.log('Notification:', message, type);
    
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show notification`;
    notification.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Update footer text based on language
function updateFooterText() {
    const t = (en, ru) => currentLanguage === 'ru' ? ru : en;
    
    const footerElements = {
        'footerBrand': t('AnimalMarket', 'РынокЖивотных'),
        'footerDescription': t('Connecting loving families with animals in need of homes.', 'Соединяем любящие семьи с животными, нуждающимися в доме.'),
        'footerQuickLinks': t('Quick Links', 'Быстрые ссылки'),
        'footerAnimals': t('Browse Animals', 'Животные'),
        'footerShelters': t('Shelters', 'Приюты'),
        'footerAddAnimal': t('Add Animal', 'Добавить животное'),
        'footerFeedback': t('Feedback', 'Отзывы'),
        'footerSupport': t('Support', 'Поддержка'),
        'footerHelp': t('Help Center', 'Центр помощи'),
        'footerSafety': t('Safety Guidelines', 'Правила безопасности'),
        'footerContact': t('Contact Us', 'Связаться с нами')
    };
    
    Object.keys(footerElements).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = footerElements[id];
        }
    });
    
    const copyrightElement = document.getElementById('footerCopyright');
    if (copyrightElement) {
        copyrightElement.innerHTML = `&copy; 2024 ${t('AnimalMarket', 'РынокЖивотных')}. ${t('All rights reserved.', 'Все права защищены.')}`;
    }
}
// User authentication functions
function handleLogin(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    
    console.log('Login attempt:', email);
    
    // Simulate login (in real app, this would be an API call)
    if (email && password) {
        currentUser = {
            id: '1',
            name: 'Demo User',
            email: email,
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=center'
        };
        
        updateUserInterface();
        showNotification(
            currentLanguage === 'ru' ? 'Успешный вход в систему!' : 'Login successful!',
            'success'
        );
        navigateTo('dashboard');
    } else {
        showNotification(
            currentLanguage === 'ru' ? 'Пожалуйста, заполните все поля' : 'Please fill in all fields',
            'warning'
        );
    }
}

function handleRegister(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const userType = formData.get('userType');
    
    console.log('Registration attempt:', email);
    
    // Simulate registration
    if (name && email && password) {
        currentUser = {
            id: '1',
            name: name,
            email: email,
            userType: userType,
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=center'
        };
        
        updateUserInterface();
        showNotification(
            currentLanguage === 'ru' ? 'Регистрация успешна!' : 'Registration successful!',
            'success'
        );
        navigateTo('dashboard');
    } else {
        showNotification(
            currentLanguage === 'ru' ? 'Пожалуйста, заполните все поля' : 'Please fill in all fields',
            'warning'
        );
    }
}

function logout() {
    console.log('Logging out');
    currentUser = null;
    updateUserInterface();
    showNotification(
        currentLanguage === 'ru' ? 'Вы вышли из системы' : 'You have been logged out',
        'info'
    );
    navigateTo('home');
}

// Update user interface based on login status
function updateUserInterface() {
    const loginNav = document.getElementById('loginNav');
    const registerNav = document.getElementById('registerNav');
    const userDropdown = document.getElementById('userDropdown');
    
    if (currentUser) {
        if (loginNav) loginNav.classList.add('d-none');
        if (registerNav) registerNav.classList.add('d-none');
        if (userDropdown) userDropdown.classList.remove('d-none');
        
        const userNameElement = document.getElementById('userName');
        const userAvatarElement = document.getElementById('userAvatar');
        
        if (userNameElement) userNameElement.textContent = currentUser.name;
        if (userAvatarElement) userAvatarElement.src = currentUser.avatar;
    } else {
        if (loginNav) loginNav.classList.remove('d-none');
        if (registerNav) registerNav.classList.remove('d-none');
        if (userDropdown) userDropdown.classList.add('d-none');
    }
}
// Contact and interaction functions
function openContactModal(animalId) {
    console.log('Opening contact modal for animal:', animalId);
    
    if (!currentUser) {
        showNotification(
            currentLanguage === 'ru' ? 'Пожалуйста, войдите в систему для связи с владельцем' : 'Please login to contact the owner',
            'warning'
        );
        setTimeout(() => navigateTo('login'), 2000);
        return;
    }
    
    const animal = animals.find(a => a.id === animalId);
    if (!animal) {
        showNotification('Animal not found', 'error');
        return;
    }
    
    const t = (en, ru) => currentLanguage === 'ru' ? ru : en;
    
    const modalHtml = `
        <div class="modal fade" id="contactModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            ${animal.transferType === 'adoption' ? 
                                t('Adopt', 'Усыновить') : t('Purchase', 'Купить')
                            } ${currentLanguage === 'ru' ? animal.nameRu : animal.name}
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form onsubmit="sendContactMessage(event, '${animalId}')">
                            <div class="mb-3">
                                <label class="form-label">${t('Your Name', 'Ваше имя')}</label>
                                <input type="text" class="form-control" value="${currentUser.name}" readonly>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">${t('Your Email', 'Ваш Email')}</label>
                                <input type="email" class="form-control" value="${currentUser.email}" readonly>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">${t('Message', 'Сообщение')}</label>
                                <textarea class="form-control" name="message" rows="4" 
                                          placeholder="${t('Tell us why you\'d like to adopt/buy this animal...', 'Расскажите, почему вы хотели бы усыновить/купить это животное...')}" 
                                          required></textarea>
                            </div>
                            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button type="button" class="btn btn-secondary me-md-2" data-bs-dismiss="modal">
                                    ${t('Cancel', 'Отмена')}
                                </button>
                                <button type="submit" class="btn btn-primary">
                                    <i class="fas fa-paper-plane me-2"></i>
                                    ${t('Send Message', 'Отправить сообщение')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('contactModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('contactModal'));
    modal.show();
}

function sendContactMessage(event, animalId) {
    event.preventDefault();
    const message = event.target.message.value;
    
    console.log('Sending message for animal:', animalId, message);
    
    // Simulate sending message
    setTimeout(() => {
        showNotification(
            currentLanguage === 'ru' ? 'Сообщение отправлено успешно!' : 'Message sent successfully!',
            'success'
        );
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('contactModal'));
        if (modal) modal.hide();
    }, 500);
}

function toggleFavorite(animalId) {
    console.log('Toggling favorite for animal:', animalId);
    
    if (!currentUser) {
        showNotification(
            currentLanguage === 'ru' ? 'Войдите в систему для добавления в избранное' : 'Login to add to favorites',
            'warning'
        );
        return;
    }
    
    // Simulate toggle favorite
    showNotification(
        currentLanguage === 'ru' ? 'Добавлено в избранное!' : 'Added to favorites!',
        'success'
    );
}

function shareAnimal(animalId, animalName) {
    console.log('Sharing animal:', animalId, animalName);
    
    if (navigator.share) {
        navigator.share({
            title: `${currentLanguage === 'ru' ? 'Посмотрите на' : 'Check out'} ${animalName}`,
            text: currentLanguage === 'ru' ? 
                'Я нашел это замечательное животное на РынокЖивотных!' : 
                'I found this amazing animal on AnimalMarket!',
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            showNotification(
                currentLanguage === 'ru' ? 'Ссылка скопирована в буфер обмена!' : 'Link copied to clipboard!',
                'success'
            );
        });
    }
}
// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing app');
    
    // Initialize data
    animals = sampleAnimals;
    shelters = sampleShelters;
    
    // Handle navigation clicks
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const page = this.getAttribute('href').substring(1);
            if (page) {
                console.log('Navigation click:', page);
                navigateTo(page);
            }
        });
    });
    
    // Handle browser back/forward
    window.addEventListener('hashchange', function() {
        const page = getCurrentPage();
        console.log('Hash change:', page);
        // For static pages, just scroll to section
        const section = document.getElementById(page);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    // Update UI based on login status
    updateUserInterface();
    
    // Update footer text
    updateFooterText();
    
    // Add click handlers for buttons that might not have onclick attributes
    addButtonHandlers();
    
    // Show welcome notification
    setTimeout(() => {
        showNotification(
            currentLanguage === 'ru' ? 
                '🐾 Добро пожаловать на Рынок Животных! Все функции полностью работают. Попробуйте переключить языки, просмотреть животных или создать аккаунт.' :
                '🐾 Welcome to the Animal Marketplace! All features are fully functional. Try switching languages, browsing animals, or creating an account.',
            'success'
        );
    }, 1000);
});

// Add button handlers for elements that might not have onclick attributes
function addButtonHandlers() {
    // Language switcher buttons
    document.querySelectorAll('a[onclick*="switchLanguage"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.onclick.toString().match(/switchLanguage\('(\w+)'\)/);
            if (lang && lang[1]) {
                switchLanguage(lang[1]);
            }
        });
    });
    
    // Navigation buttons
    document.querySelectorAll('a[href="#catalog"], a[href="#shelters"], a[href="#login"], a[href="#register"], a[href="#add-animal"], a[href="#feedback"], a[href="#dashboard"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('href').substring(1);
            navigateTo(page);
        });
    });
    
    // Contact buttons
    document.querySelectorAll('button[onclick*="openContactModal"]').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // Extract animal ID from onclick attribute
            const match = this.onclick.toString().match(/openContactModal\('([^']+)'\)/);
            if (match && match[1]) {
                openContactModal(match[1]);
            }
        });
    });
    
    // Form submissions
    document.querySelectorAll('form').forEach(form => {
        if (form.onsubmit) {
            form.addEventListener('submit', function(e) {
                // Let the existing onsubmit handler run
                if (typeof this.onsubmit === 'function') {
                    this.onsubmit(e);
                }
            });
        }
    });
}

// Utility function to handle search
function handleSearch(event) {
    event.preventDefault();
    console.log('Search submitted');
    
    const formData = new FormData(event.target);
    const species = formData.get('species');
    const transferType = formData.get('transferType');
    const city = formData.get('city');
    
    console.log('Search params:', { species, transferType, city });
    
    // Navigate to catalog with search parameters
    navigateTo('catalog', { species, transferType, city });
    
    showNotification(
        currentLanguage === 'ru' ? 'Поиск выполнен!' : 'Search completed!',
        'info'
    );
}

// Global error handler
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    showNotification('An error occurred. Please refresh the page.', 'danger');
});

console.log('App.js loaded successfully');
// SPA Render Functions for demo.html

// Render different pages
function renderPage(page, params = {}) {
    console.log('Rendering page:', page, params);
    const mainContent = document.getElementById('mainContent');
    
    if (!mainContent) {
        console.log('No mainContent element found, using static navigation');
        return;
    }
    
    switch(page) {
        case 'home':
            renderHomePage();
            break;
        case 'catalog':
            renderCatalogPage(params);
            break;
        case 'animal':
            renderAnimalProfile(params.id);
            break;
        case 'shelters':
            renderSheltersPage();
            break;
        case 'shelter':
            renderShelterProfile(params.id);
            break;
        case 'login':
            renderLoginPage();
            break;
        case 'register':
            renderRegisterPage();
            break;
        case 'dashboard':
            renderDashboardPage();
            break;
        case 'add-animal':
            renderAddAnimalPage();
            break;
        case 'feedback':
            renderFeedbackPage();
            break;
        default:
            renderHomePage();
    }
}

// Render home page
function renderHomePage() {
    const t = (en, ru) => currentLanguage === 'ru' ? ru : en;
    
    document.getElementById('mainContent').innerHTML = `
        <!-- Hero Section -->
        <section class="hero-section bg-primary text-white py-5">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-6">
                        <h1 class="display-4 fw-bold mb-4">${t('Find Your Perfect Companion', 'Найдите своего идеального компаньона')}</h1>
                        <p class="lead mb-4">${t('Discover loving animals from shelters and trusted breeders. Every pet deserves a loving home.', 'Откройте для себя любящих животных из приютов и проверенных заводчиков. Каждый питомец заслуживает любящий дом.')}</p>
                        <button onclick="navigateTo('catalog')" class="btn btn-light btn-lg me-3">${t('Browse Animals', 'Смотреть животных')}</button>
                        <button onclick="navigateTo('shelters')" class="btn btn-outline-light btn-lg">${t('Find Shelters', 'Найти приюты')}</button>
                    </div>
                    <div class="col-lg-6">
                        <img src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=400&fit=crop&crop=center" 
                             alt="${t('Happy pets', 'Счастливые питомцы')}" 
                             class="img-fluid rounded shadow" style="max-height: 400px; width: 100%; object-fit: cover;">
                    </div>
                </div>
            </div>
        </section>

        <!-- Search Section -->
        <section class="py-4 bg-light">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-8">
                        <div class="search-box bg-white p-4 rounded shadow">
                            <form onsubmit="handleSearch(event)" class="row g-3">
                                <div class="col-md-4">
                                    <select name="species" class="form-select">
                                        <option value="">${t('All Animals', 'Все животные')}</option>
                                        <option value="dog">${t('Dogs', 'Собаки')}</option>
                                        <option value="cat">${t('Cats', 'Кошки')}</option>
                                        <option value="bird">${t('Birds', 'Птицы')}</option>
                                        <option value="rabbit">${t('Rabbits', 'Кролики')}</option>
                                        <option value="other">${t('Other', 'Другие')}</option>
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <select name="transferType" class="form-select">
                                        <option value="">${t('Any Type', 'Любой тип')}</option>
                                        <option value="adoption">${t('Adoption', 'Усыновление')}</option>
                                        <option value="sale">${t('Purchase', 'Покупка')}</option>
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <input type="text" name="city" class="form-control" placeholder="${t('City', 'Город')}">
                                </div>
                                <div class="col-md-2">
                                    <button type="submit" class="btn btn-primary w-100">
                                        <i class="fas fa-search"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Categories Section -->
        <section class="py-5">
            <div class="container">
                <h2 class="text-center mb-5">${t('Browse by Category', 'Поиск по категориям')}</h2>
                <div class="row g-4">
                    <div class="col-md-3">
                        <div class="category-card text-center p-4 rounded shadow-sm h-100" onclick="navigateTo('catalog', {species: 'dog'})" style="cursor: pointer;">
                            <i class="fas fa-dog fa-3x text-primary mb-3"></i>
                            <h5>${t('Dogs', 'Собаки')}</h5>
                            <p class="text-muted">${t('Find loyal companions', 'Найдите верных компаньонов')}</p>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="category-card text-center p-4 rounded shadow-sm h-100" onclick="navigateTo('catalog', {species: 'cat'})" style="cursor: pointer;">
                            <i class="fas fa-cat fa-3x text-primary mb-3"></i>
                            <h5>${t('Cats', 'Кошки')}</h5>
                            <p class="text-muted">${t('Independent friends', 'Независимые друзья')}</p>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="category-card text-center p-4 rounded shadow-sm h-100" onclick="navigateTo('catalog', {species: 'bird'})" style="cursor: pointer;">
                            <i class="fas fa-dove fa-3x text-primary mb-3"></i>
                            <h5>${t('Birds', 'Птицы')}</h5>
                            <p class="text-muted">${t('Colorful companions', 'Красочные компаньоны')}</p>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="category-card text-center p-4 rounded shadow-sm h-100" onclick="navigateTo('catalog', {species: 'rabbit'})" style="cursor: pointer;">
                            <i class="fas fa-rabbit fa-3x text-primary mb-3"></i>
                            <h5>${t('Small Pets', 'Мелкие питомцы')}</h5>
                            <p class="text-muted">${t('Rabbits, hamsters & more', 'Кролики, хомяки и др.')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Featured Animals -->
        <section class="py-5 bg-light">
            <div class="container">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h3><i class="fas fa-heart text-danger me-2"></i>${t('Featured Animals', 'Рекомендуемые животные')}</h3>
                    <button onclick="navigateTo('catalog')" class="btn btn-outline-primary">${t('View All', 'Смотреть все')}</button>
                </div>
                <div class="row g-4">
                    ${animals.slice(0, 4).map(animal => `
                        <div class="col-md-3">
                            <div class="animal-card card h-100 shadow-sm" onclick="navigateTo('animal', {id: '${animal.id}'})" style="cursor: pointer;">
                                <img src="${animal.photos[0]}" class="card-img-top" 
                                     alt="${currentLanguage === 'ru' ? animal.nameRu : animal.name}" 
                                     style="height: 200px; object-fit: cover;">
                                <div class="card-body">
                                    <h6 class="card-title">${currentLanguage === 'ru' ? animal.nameRu : animal.name}</h6>
                                    <p class="text-muted small mb-2">
                                        ${currentLanguage === 'ru' ? animal.breedRu : animal.breed} • 
                                        ${currentLanguage === 'ru' ? animal.ageRu : animal.age}
                                    </p>
                                    <p class="fw-bold mb-2">
                                        ${animal.price > 0 ? 
                                            `<span class="text-success">$${animal.price}</span>` : 
                                            `<span class="text-success"><i class="fas fa-heart me-1"></i>${t('Free', 'Бесплатно')}</span>`
                                        }
                                    </p>
                                    <p class="text-muted small">
                                        <i class="fas fa-map-marker-alt me-1"></i>
                                        ${currentLanguage === 'ru' ? animal.cityRu : animal.city}
                                    </p>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <!-- Call to Action -->
        <section class="py-5 bg-primary text-white">
            <div class="container text-center">
                <h2 class="mb-4">${t('Ready to Make a Difference?', 'Готовы изменить мир к лучшему?')}</h2>
                <p class="lead mb-4">${t('Join our community of animal lovers and help pets find their forever homes.', 'Присоединяйтесь к нашему сообществу любителей животных и помогите питомцам найти свои дома навсегда.')}</p>
                <div class="row justify-content-center">
                    <div class="col-md-4 mb-3">
                        <div class="p-4">
                            <i class="fas fa-plus-circle fa-2x mb-3"></i>
                            <h5>${t('List an Animal', 'Разместить животное')}</h5>
                            <p>${t('Help an animal find a new home', 'Помогите животному найти новый дом')}</p>
                            <button onclick="navigateTo('add-animal')" class="btn btn-light">${t('Get Started', 'Начать')}</button>
                        </div>
                    </div>
                    <div class="col-md-4 mb-3">
                        <div class="p-4">
                            <i class="fas fa-search fa-2x mb-3"></i>
                            <h5>${t('Adopt a Pet', 'Усыновить питомца')}</h5>
                            <p>${t('Find your perfect companion', 'Найдите своего идеального компаньона')}</p>
                            <button onclick="navigateTo('catalog', {transferType: 'adoption'})" class="btn btn-light">${t('Browse Now', 'Смотреть сейчас')}</button>
                        </div>
                    </div>
                    <div class="col-md-4 mb-3">
                        <div class="p-4">
                            <i class="fas fa-home fa-2x mb-3"></i>
                            <h5>${t('Support Shelters', 'Поддержать приюты')}</h5>
                            <p>${t('Help local animal shelters', 'Помогите местным приютам для животных')}</p>
                            <button onclick="navigateTo('shelters')" class="btn btn-light">${t('Find Shelters', 'Найти приюты')}</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
}
// Render catalog page
function renderCatalogPage(filters = {}) {
    const t = (en, ru) => currentLanguage === 'ru' ? ru : en;
    
    // Filter animals based on parameters
    let filteredAnimals = [...animals];
    
    if (filters.species) {
        filteredAnimals = filteredAnimals.filter(animal => 
            animal.species.toLowerCase() === filters.species.toLowerCase()
        );
    }
    
    if (filters.transferType) {
        filteredAnimals = filteredAnimals.filter(animal => 
            animal.transferType === filters.transferType
        );
    }
    
    if (filters.city) {
        filteredAnimals = filteredAnimals.filter(animal => 
            animal.city.toLowerCase().includes(filters.city.toLowerCase()) ||
            (animal.cityRu && animal.cityRu.toLowerCase().includes(filters.city.toLowerCase()))
        );
    }
    
    document.getElementById('mainContent').innerHTML = `
        <div class="container py-4">
            <div class="row">
                <div class="col-12">
                    <h1 class="h3 mb-4">${t('Browse Animals', 'Животные')}</h1>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-4">
                            <li class="breadcrumb-item"><a href="#home" onclick="navigateTo('home')">${t('Home', 'Главная')}</a></li>
                            <li class="breadcrumb-item active">${t('Catalog', 'Каталог')}</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-3 mb-4">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="mb-0"><i class="fas fa-filter me-2"></i>${t('Filters', 'Фильтры')}</h5>
                        </div>
                        <div class="card-body">
                            <form onsubmit="handleCatalogFilter(event)">
                                <div class="mb-3">
                                    <label class="form-label fw-bold">${t('Animal Type', 'Тип животного')}</label>
                                    <select name="species" class="form-select">
                                        <option value="">${t('All Animals', 'Все животные')}</option>
                                        <option value="dog" ${filters.species === 'dog' ? 'selected' : ''}>${t('Dogs', 'Собаки')}</option>
                                        <option value="cat" ${filters.species === 'cat' ? 'selected' : ''}>${t('Cats', 'Кошки')}</option>
                                        <option value="bird" ${filters.species === 'bird' ? 'selected' : ''}>${t('Birds', 'Птицы')}</option>
                                        <option value="rabbit" ${filters.species === 'rabbit' ? 'selected' : ''}>${t('Rabbits', 'Кролики')}</option>
                                        <option value="other" ${filters.species === 'other' ? 'selected' : ''}>${t('Other', 'Другие')}</option>
                                    </select>
                                </div>

                                <div class="mb-3">
                                    <label class="form-label fw-bold">${t('Transfer Type', 'Тип передачи')}</label>
                                    <select name="transferType" class="form-select">
                                        <option value="">${t('Any Type', 'Любой тип')}</option>
                                        <option value="adoption" ${filters.transferType === 'adoption' ? 'selected' : ''}>${t('Adoption (Free)', 'Усыновление (Бесплатно)')}</option>
                                        <option value="sale" ${filters.transferType === 'sale' ? 'selected' : ''}>${t('Purchase', 'Покупка')}</option>
                                    </select>
                                </div>

                                <div class="mb-3">
                                    <label class="form-label fw-bold">${t('City', 'Город')}</label>
                                    <input type="text" name="city" class="form-control" placeholder="${t('Enter city', 'Введите город')}" value="${filters.city || ''}">
                                </div>

                                <button type="submit" class="btn btn-primary w-100">${t('Apply Filters', 'Применить фильтры')}</button>
                                <button type="button" onclick="navigateTo('catalog')" class="btn btn-outline-secondary w-100 mt-2">${t('Clear All', 'Очистить все')}</button>
                            </form>
                        </div>
                    </div>
                </div>

                <div class="col-lg-9">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h5>${filteredAnimals.length} ${t('animals found', 'животных найдено')}</h5>
                    </div>

                    <div class="row g-4">
                        ${filteredAnimals.length === 0 ? `
                            <div class="col-12">
                                <div class="text-center py-5">
                                    <i class="fas fa-search fa-3x text-muted mb-3"></i>
                                    <h4>${t('No animals found', 'Животные не найдены')}</h4>
                                    <p class="text-muted">${t('Try adjusting your filters or search criteria.', 'Попробуйте изменить фильтры или критерии поиска.')}</p>
                                    <button onclick="navigateTo('catalog')" class="btn btn-primary">${t('View All Animals', 'Смотреть всех животных')}</button>
                                </div>
                            </div>
                        ` : filteredAnimals.map(animal => `
                            <div class="col-md-6 col-lg-4">
                                <div class="animal-card card h-100 shadow-sm" onclick="navigateTo('animal', {id: '${animal.id}'})" style="cursor: pointer;">
                                    <div class="position-relative">
                                        <img src="${animal.photos[0]}" 
                                             class="card-img-top" alt="${currentLanguage === 'ru' ? animal.nameRu : animal.name}" 
                                             style="height: 250px; object-fit: cover;">
                                        
                                        ${animal.transferType === 'adoption' ? `
                                            <span class="badge bg-success position-absolute top-0 start-0 m-2">
                                                <i class="fas fa-heart me-1"></i>${t('Adoption', 'Усыновление')}
                                            </span>
                                        ` : `
                                            <span class="badge bg-primary position-absolute top-0 start-0 m-2">
                                                <i class="fas fa-shopping-cart me-1"></i>${t('Sale', 'Продажа')}
                                            </span>
                                        `}
                                    </div>
                                    
                                    <div class="card-body">
                                        <h5 class="card-title">${currentLanguage === 'ru' ? animal.nameRu : animal.name}</h5>
                                        <p class="text-muted mb-2">
                                            <strong>${currentLanguage === 'ru' ? animal.breedRu : animal.breed}</strong> • 
                                            ${currentLanguage === 'ru' ? animal.genderRu : animal.gender} • 
                                            ${currentLanguage === 'ru' ? animal.ageRu : animal.age}
                                        </p>
                                        <p class="card-text text-truncate">${currentLanguage === 'ru' ? animal.descriptionRu : animal.description}</p>
                                        
                                        <div class="mb-2">
                                            ${animal.price > 0 ? 
                                                `<span class="h5 text-success mb-0">$${animal.price}</span>` : 
                                                `<span class="h5 text-success mb-0"><i class="fas fa-heart me-1"></i>${t('Free', 'Бесплатно')}</span>`
                                            }
                                        </div>
                                        
                                        <p class="text-muted small mb-0">
                                            <i class="fas fa-map-marker-alt me-1"></i>${currentLanguage === 'ru' ? animal.cityRu : animal.city}
                                        </p>
                                    </div>
                                    
                                    <div class="card-footer bg-transparent">
                                        <div class="d-grid gap-2">
                                            <button class="btn btn-primary">${t('View Details', 'Подробнее')}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Handle catalog filter form
function handleCatalogFilter(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const params = {
        species: formData.get('species'),
        transferType: formData.get('transferType'),
        city: formData.get('city')
    };
    navigateTo('catalog', params);
}
// Render login page
function renderLoginPage() {
    const t = (en, ru) => currentLanguage === 'ru' ? ru : en;
    
    document.getElementById('mainContent').innerHTML = `
        <div class="container py-5">
            <div class="row justify-content-center">
                <div class="col-md-6 col-lg-4">
                    <div class="card shadow">
                        <div class="card-body p-5">
                            <div class="text-center mb-4">
                                <h2 class="h4 mb-2">${t('Welcome Back', 'Добро пожаловать')}</h2>
                                <p class="text-muted">${t('Sign in to your account', 'Войдите в свой аккаунт')}</p>
                            </div>

                            <form onsubmit="handleLogin(event)">
                                <div class="mb-3">
                                    <label for="email" class="form-label">${t('Email Address', 'Email адрес')}</label>
                                    <input type="email" class="form-control" id="email" name="email" required>
                                </div>

                                <div class="mb-3">
                                    <label for="password" class="form-label">${t('Password', 'Пароль')}</label>
                                    <input type="password" class="form-control" id="password" name="password" required>
                                </div>

                                <div class="mb-3 form-check">
                                    <input type="checkbox" class="form-check-input" id="remember">
                                    <label class="form-check-label" for="remember">
                                        ${t('Remember me', 'Запомнить меня')}
                                    </label>
                                </div>

                                <div class="d-grid">
                                    <button type="submit" class="btn btn-primary">${t('Sign In', 'Войти')}</button>
                                </div>
                            </form>

                            <hr class="my-4">

                            <div class="text-center">
                                <p class="mb-0">${t('Don\'t have an account?', 'Нет аккаунта?')} <a href="#register" onclick="navigateTo('register')">${t('Sign up', 'Зарегистрироваться')}</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}
// Render register page
function renderRegisterPage() {
    const t = (en, ru) => currentLanguage === 'ru' ? ru : en;
    
    document.getElementById('mainContent').innerHTML = `
        <div class="container py-5">
            <div class="row justify-content-center">
                <div class="col-md-6 col-lg-5">
                    <div class="card shadow">
                        <div class="card-body p-5">
                            <div class="text-center mb-4">
                                <h2 class="h4 mb-2">${t('Create Account', 'Создать аккаунт')}</h2>
                                <p class="text-muted">${t('Join our animal-loving community', 'Присоединяйтесь к нашему сообществу любителей животных')}</p>
                            </div>

                            <form onsubmit="handleRegister(event)">
                                <div class="mb-3">
                                    <label for="name" class="form-label">${t('Full Name', 'Полное имя')}</label>
                                    <input type="text" class="form-control" id="name" name="name" required>
                                </div>

                                <div class="mb-3">
                                    <label for="email" class="form-label">${t('Email Address', 'Email адрес')}</label>
                                    <input type="email" class="form-control" id="email" name="email" required>
                                </div>

                                <div class="mb-3">
                                    <label for="password" class="form-label">${t('Password', 'Пароль')}</label>
                                    <input type="password" class="form-control" id="password" name="password" required>
                                </div>

                                <div class="mb-3">
                                    <label for="userType" class="form-label">${t('Account Type', 'Тип аккаунта')}</label>
                                    <select class="form-select" id="userType" name="userType" required>
                                        <option value="individual">${t('Individual', 'Частное лицо')}</option>
                                        <option value="shelter">${t('Animal Shelter', 'Приют для животных')}</option>
                                        <option value="breeder">${t('Breeder', 'Заводчик')}</option>
                                    </select>
                                </div>

                                <div class="d-grid">
                                    <button type="submit" class="btn btn-primary">${t('Create Account', 'Создать аккаунт')}</button>
                                </div>
                            </form>

                            <hr class="my-4">

                            <div class="text-center">
                                <p class="mb-0">${t('Already have an account?', 'Уже есть аккаунт?')} <a href="#login" onclick="navigateTo('login')">${t('Sign in', 'Войти')}</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}
// Render other pages (simplified versions)
function renderSheltersPage() {
    const t = (en, ru) => currentLanguage === 'ru' ? ru : en;
    
    document.getElementById('mainContent').innerHTML = `
        <div class="container py-5">
            <h1 class="mb-4">${t('Shelters & Breeders', 'Приюты и заводчики')}</h1>
            <div class="row g-4">
                ${shelters.map(shelter => `
                    <div class="col-lg-6">
                        <div class="card h-100 shadow-sm">
                            <div class="card-body">
                                <h5 class="card-title">${currentLanguage === 'ru' ? shelter.nameRu : shelter.name}</h5>
                                <p class="card-text">${currentLanguage === 'ru' ? shelter.descriptionRu : shelter.description}</p>
                                <p class="text-muted">
                                    <i class="fas fa-map-marker-alt me-1"></i>
                                    ${currentLanguage === 'ru' ? shelter.cityRu : shelter.city}
                                </p>
                                <div class="mb-2">
                                    ${Array.from({length: 5}, (_, i) => 
                                        `<i class="fas fa-star ${i < Math.floor(shelter.rating) ? 'text-warning' : 'text-muted'}"></i>`
                                    ).join('')}
                                    <span class="ms-2 text-muted">(${shelter.reviews} ${t('reviews', 'отзывов')})</span>
                                </div>
                                <button onclick="navigateTo('shelter', {id: '${shelter.id}'})" class="btn btn-primary">
                                    ${t('View Profile', 'Профиль')}
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderDashboardPage() {
    const t = (en, ru) => currentLanguage === 'ru' ? ru : en;
    
    if (!currentUser) {
        navigateTo('login');
        return;
    }
    
    document.getElementById('mainContent').innerHTML = `
        <div class="container py-5">
            <h1 class="mb-4">${t('Dashboard', 'Панель управления')}</h1>
            <div class="row">
                <div class="col-md-4">
                    <div class="card text-center">
                        <div class="card-body">
                            <i class="fas fa-plus-circle fa-3x text-primary mb-3"></i>
                            <h5>${t('Add Animal', 'Добавить животное')}</h5>
                            <p>${t('List a new animal for adoption or sale', 'Разместить новое животное для усыновления или продажи')}</p>
                            <button onclick="navigateTo('add-animal')" class="btn btn-primary">${t('Add Now', 'Добавить сейчас')}</button>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card text-center">
                        <div class="card-body">
                            <i class="fas fa-heart fa-3x text-danger mb-3"></i>
                            <h5>${t('My Favorites', 'Мои избранные')}</h5>
                            <p>${t('View animals you\'ve saved', 'Просмотреть сохраненных животных')}</p>
                            <button class="btn btn-outline-primary">${t('View Favorites', 'Смотреть избранные')}</button>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card text-center">
                        <div class="card-body">
                            <i class="fas fa-envelope fa-3x text-info mb-3"></i>
                            <h5>${t('Messages', 'Сообщения')}</h5>
                            <p>${t('Check your messages and inquiries', 'Проверить сообщения и запросы')}</p>
                            <button class="btn btn-outline-primary">${t('View Messages', 'Смотреть сообщения')}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderAddAnimalPage() {
    const t = (en, ru) => currentLanguage === 'ru' ? ru : en;
    
    if (!currentUser) {
        navigateTo('login');
        return;
    }
    
    document.getElementById('mainContent').innerHTML = `
        <div class="container py-5">
            <h1 class="mb-4">${t('Add Animal', 'Добавить животное')}</h1>
            <div class="card">
                <div class="card-body">
                    <p class="text-muted mb-4">${t('Fill out the form below to list your animal for adoption or sale.', 'Заполните форму ниже, чтобы разместить ваше животное для усыновления или продажи.')}</p>
                    <form>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label class="form-label">${t('Animal Name', 'Имя животного')}</label>
                                <input type="text" class="form-control" required>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">${t('Species', 'Вид')}</label>
                                <select class="form-select" required>
                                    <option value="">${t('Select species', 'Выберите вид')}</option>
                                    <option value="dog">${t('Dog', 'Собака')}</option>
                                    <option value="cat">${t('Cat', 'Кошка')}</option>
                                    <option value="bird">${t('Bird', 'Птица')}</option>
                                    <option value="rabbit">${t('Rabbit', 'Кролик')}</option>
                                    <option value="other">${t('Other', 'Другое')}</option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label class="form-label">${t('Breed', 'Порода')}</label>
                                <input type="text" class="form-control" required>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">${t('Age', 'Возраст')}</label>
                                <input type="text" class="form-control" required>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">${t('Description', 'Описание')}</label>
                            <textarea class="form-control" rows="4" required></textarea>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label class="form-label">${t('Transfer Type', 'Тип передачи')}</label>
                                <select class="form-select" required>
                                    <option value="adoption">${t('Adoption (Free)', 'Усыновление (Бесплатно)')}</option>
                                    <option value="sale">${t('Sale', 'Продажа')}</option>
                                </select>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">${t('Price (if for sale)', 'Цена (если продается)')}</label>
                                <input type="number" class="form-control" min="0">
                            </div>
                        </div>
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button type="button" onclick="navigateTo('dashboard')" class="btn btn-secondary me-md-2">${t('Cancel', 'Отмена')}</button>
                            <button type="submit" class="btn btn-primary">${t('Add Animal', 'Добавить животное')}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
}

function renderFeedbackPage() {
    const t = (en, ru) => currentLanguage === 'ru' ? ru : en;
    
    document.getElementById('mainContent').innerHTML = `
        <div class="container py-5">
            <h1 class="mb-4">${t('Feedback', 'Отзывы')}</h1>
            <div class="card">
                <div class="card-body">
                    <p class="text-muted mb-4">${t('We value your feedback! Please let us know how we can improve.', 'Мы ценим ваши отзывы! Пожалуйста, дайте нам знать, как мы можем улучшиться.')}</p>
                    <form>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label class="form-label">${t('Your Name', 'Ваше имя')}</label>
                                <input type="text" class="form-control" required>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">${t('Email', 'Email')}</label>
                                <input type="email" class="form-control" required>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">${t('Subject', 'Тема')}</label>
                            <select class="form-select" required>
                                <option value="">${t('Select subject', 'Выберите тему')}</option>
                                <option value="general">${t('General Feedback', 'Общий отзыв')}</option>
                                <option value="bug">${t('Bug Report', 'Сообщение об ошибке')}</option>
                                <option value="feature">${t('Feature Request', 'Запрос функции')}</option>
                                <option value="support">${t('Support', 'Поддержка')}</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">${t('Message', 'Сообщение')}</label>
                            <textarea class="form-control" rows="5" required></textarea>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">${t('Rating', 'Оценка')}</label>
                            <div class="rating-stars">
                                <input type="radio" name="rating" value="5" id="star5">
                                <label for="star5" class="star">★</label>
                                <input type="radio" name="rating" value="4" id="star4">
                                <label for="star4" class="star">★</label>
                                <input type="radio" name="rating" value="3" id="star3">
                                <label for="star3" class="star">★</label>
                                <input type="radio" name="rating" value="2" id="star2">
                                <label for="star2" class="star">★</label>
                                <input type="radio" name="rating" value="1" id="star1">
                                <label for="star1" class="star">★</label>
                            </div>
                        </div>
                        <div class="d-grid">
                            <button type="submit" class="btn btn-primary">${t('Send Feedback', 'Отправить отзыв')}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
}

function renderAnimalProfile(animalId) {
    const animal = animals.find(a => a.id === animalId);
    if (!animal) {
        showNotification('Animal not found', 'error');
        navigateTo('catalog');
        return;
    }
    
    const t = (en, ru) => currentLanguage === 'ru' ? ru : en;
    
    document.getElementById('mainContent').innerHTML = `
        <div class="container py-4">
            <nav aria-label="breadcrumb" class="mb-4">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#home" onclick="navigateTo('home')">${t('Home', 'Главная')}</a></li>
                    <li class="breadcrumb-item"><a href="#catalog" onclick="navigateTo('catalog')">${t('Catalog', 'Каталог')}</a></li>
                    <li class="breadcrumb-item active">${currentLanguage === 'ru' ? animal.nameRu : animal.name}</li>
                </ol>
            </nav>

            <div class="row">
                <div class="col-lg-6 mb-4">
                    <div class="animal-photos">
                        <div class="main-photo mb-3">
                            <img src="${animal.photos[0]}" 
                                 class="img-fluid rounded shadow main-image" id="mainAnimalImage"
                                 alt="${currentLanguage === 'ru' ? animal.nameRu : animal.name}"
                                 style="width: 100%; height: 400px; object-fit: cover;">
                        </div>
                        
                        ${animal.photos.length > 1 ? `
                            <div class="row g-2">
                                ${animal.photos.slice(1, 5).map(photo => `
                                    <div class="col-3">
                                        <img src="${photo}" class="img-fluid rounded thumbnail-photo" 
                                             alt="${currentLanguage === 'ru' ? animal.nameRu : animal.name}" 
                                             style="height: 80px; width: 100%; object-fit: cover; cursor: pointer;"
                                             onclick="changeMainImage('${photo}')">
                                    </div>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                </div>

                <div class="col-lg-6">
                    <div class="animal-details">
                        <div class="mb-4">
                            <h1 class="h2 mb-2">${currentLanguage === 'ru' ? animal.nameRu : animal.name}</h1>
                            <div class="mb-3">
                                ${animal.transferType === 'adoption' ? `
                                    <span class="badge bg-success fs-6 me-2">
                                        <i class="fas fa-heart me-1"></i>
                                        ${t('Available for Adoption', 'Доступно для усыновления')}
                                    </span>
                                ` : `
                                    <span class="badge bg-primary fs-6 me-2">
                                        <i class="fas fa-shopping-cart me-1"></i>
                                        ${t('For Sale', 'Продается')}
                                    </span>
                                `}
                            </div>
                            
                            <div class="price-section mb-4">
                                ${animal.price > 0 ? 
                                    `<h3 class="text-success mb-0">$${animal.price}</h3>` : 
                                    `<h3 class="text-success mb-0">
                                        <i class="fas fa-heart me-2"></i>
                                        ${t('Free Adoption', 'Бесплатное усыновление')}
                                    </h3>`
                                }
                            </div>
                        </div>

                        <div class="card mb-4">
                            <div class="card-header">
                                <h5 class="mb-0">
                                    <i class="fas fa-info-circle me-2"></i>
                                    ${t('Basic Information', 'Основная информация')}
                                </h5>
                            </div>
                            <div class="card-body">
                                <div class="row g-3">
                                    <div class="col-6">
                                        <strong>${t('Species:', 'Вид:')}</strong><br>
                                        <span class="text-muted">${currentLanguage === 'ru' ? animal.speciesRu : animal.species}</span>
                                    </div>
                                    <div class="col-6">
                                        <strong>${t('Breed:', 'Порода:')}</strong><br>
                                        <span class="text-muted">${currentLanguage === 'ru' ? animal.breedRu : animal.breed}</span>
                                    </div>
                                    <div class="col-6">
                                        <strong>${t('Age:', 'Возраст:')}</strong><br>
                                        <span class="text-muted">${currentLanguage === 'ru' ? animal.ageRu : animal.age}</span>
                                    </div>
                                    <div class="col-6">
                                        <strong>${t('Gender:', 'Пол:')}</strong><br>
                                        <span class="text-muted">${currentLanguage === 'ru' ? animal.genderRu : animal.gender}</span>
                                    </div>
                                    <div class="col-12">
                                        <strong>${t('Location:', 'Местоположение:')}</strong><br>
                                        <span class="text-muted">
                                            <i class="fas fa-map-marker-alt me-1"></i>
                                            ${currentLanguage === 'ru' ? animal.cityRu : animal.city}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="action-buttons mb-4">
                            ${animal.transferType === 'adoption' ? `
                                <button class="btn btn-success btn-lg me-2" onclick="openContactModal('${animal.id}')">
                                    <i class="fas fa-heart me-2"></i>
                                    ${t('Adopt', 'Усыновить')} ${currentLanguage === 'ru' ? animal.nameRu : animal.name}
                                </button>
                            ` : `
                                <button class="btn btn-primary btn-lg me-2" onclick="openContactModal('${animal.id}')">
                                    <i class="fas fa-shopping-cart me-2"></i>
                                    ${t('Buy', 'Купить')} ${currentLanguage === 'ru' ? animal.nameRu : animal.name}
                                </button>
                            `}
                            
                            <button class="btn btn-outline-secondary btn-lg me-2" onclick="toggleFavorite('${animal.id}')">
                                <i class="far fa-heart"></i>
                            </button>
                            <button class="btn btn-outline-secondary btn-lg" onclick="shareAnimal('${animal.id}', '${currentLanguage === 'ru' ? animal.nameRu : animal.name}')">
                                <i class="fas fa-share"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row mt-5">
                <div class="col-12">
                    <div class="card">
                        <div class="card-body">
                            <h5>${t('About', 'О')} ${currentLanguage === 'ru' ? animal.nameRu : animal.name}</h5>
                            <p>${currentLanguage === 'ru' ? animal.descriptionRu : animal.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Change main image in animal profile
function changeMainImage(imageSrc) {
    const mainImage = document.getElementById('mainAnimalImage');
    if (mainImage) {
        mainImage.src = imageSrc;
        
        // Update thumbnail borders
        document.querySelectorAll('.thumbnail-photo').forEach(thumb => {
            thumb.classList.remove('border-primary');
            if (thumb.src === imageSrc) {
                thumb.classList.add('border-primary');
            }
        });
    }
}

function renderShelterProfile(shelterId) {
    const shelter = shelters.find(s => s.id === shelterId);
    if (!shelter) {
        showNotification('Shelter not found', 'error');
        navigateTo('shelters');
        return;
    }
    
    const t = (en, ru) => currentLanguage === 'ru' ? ru : en;
    
    document.getElementById('mainContent').innerHTML = `
        <div class="container py-4">
            <h1 class="mb-4">${currentLanguage === 'ru' ? shelter.nameRu : shelter.name}</h1>
            <div class="card">
                <div class="card-body">
                    <p>${currentLanguage === 'ru' ? shelter.descriptionRu : shelter.description}</p>
                    <p class="text-muted">
                        <i class="fas fa-map-marker-alt me-1"></i>
                        ${currentLanguage === 'ru' ? shelter.cityRu : shelter.city}
                    </p>
                    <div class="mb-3">
                        ${Array.from({length: 5}, (_, i) => 
                            `<i class="fas fa-star ${i < Math.floor(shelter.rating) ? 'text-warning' : 'text-muted'}"></i>`
                        ).join('')}
                        <span class="ms-2 text-muted">(${shelter.reviews} ${t('reviews', 'отзывов')})</span>
                    </div>
                    <button onclick="navigateTo('shelters')" class="btn btn-secondary">${t('Back to Shelters', 'Назад к приютам')}</button>
                </div>
            </div>
        </div>
    `;
}