// Main JavaScript for Animal Marketplace

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeSearch();
    initializeImageGallery();
    initializeFormValidation();
    initializeTooltips();
    initializeAnimations();
    initializeContactForms();
    initializeLanguageSwitcher();
});

// Language switcher functionality
function initializeLanguageSwitcher() {
    const langLinks = document.querySelectorAll('a[href^="/lang/"]');
    langLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Let the default behavior happen (navigate to language route)
            // The server will handle the language switch and redirect back
        });
    });
}

// Contact form functionality
function initializeContactForms() {
    // Animal contact forms
    const animalContactForms = document.querySelectorAll('form[data-animal-id]');
    animalContactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const animalId = this.dataset.animalId;
            const message = this.querySelector('textarea[name="message"]').value;
            
            if (!message.trim()) {
                showNotification('Please enter a message', 'warning');
                return;
            }
            
            fetch(`/contact-animal/${animalId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showNotification(data.message, 'success');
                    this.reset();
                    // Close modal if it exists
                    const modal = bootstrap.Modal.getInstance(this.closest('.modal'));
                    if (modal) modal.hide();
                } else {
                    showNotification(data.error || 'Error sending message', 'danger');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showNotification('Error sending message', 'danger');
            });
        });
    });

    // Shelter contact forms
    const shelterContactForms = document.querySelectorAll('form[data-shelter-id]');
    shelterContactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const shelterId = this.dataset.shelterId;
            const subject = this.querySelector('select[name="subject"]').value;
            const message = this.querySelector('textarea[name="message"]').value;
            
            if (!message.trim()) {
                showNotification('Please enter a message', 'warning');
                return;
            }
            
            fetch(`/contact-shelter/${shelterId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ subject: subject, message: message })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showNotification(data.message, 'success');
                    this.reset();
                    // Close modal if it exists
                    const modal = bootstrap.Modal.getInstance(this.closest('.modal'));
                    if (modal) modal.hide();
                } else {
                    showNotification(data.error || 'Error sending message', 'danger');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showNotification('Error sending message', 'danger');
            });
        });
    });

    // Contact buttons that require login
    const contactButtons = document.querySelectorAll('.contact-btn');
    contactButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const isLoggedIn = document.querySelector('.navbar .dropdown-toggle[id="navbarDropdown"]');
            if (!isLoggedIn) {
                e.preventDefault();
                showNotification('Please login to contact owners', 'warning');
                setTimeout(() => {
                    window.location.href = '/login';
                }, 2000);
            }
        });
    });
}

// Search functionality
function initializeSearch() {
    const searchInput = document.querySelector('#searchInput');
    if (searchInput) {
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.trim();
            
            if (query.length >= 2) {
                searchTimeout = setTimeout(() => {
                    performSearch(query);
                }, 300);
            }
        });
    }
}

function performSearch(query) {
    fetch(`/api/animals/search?q=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            displaySearchResults(data);
        })
        .catch(error => {
            console.error('Search error:', error);
        });
}

function displaySearchResults(results) {
    const resultsContainer = document.querySelector('#searchResults');
    if (!resultsContainer) return;
    
    if (results.length === 0) {
        resultsContainer.innerHTML = '<div class="text-muted">No animals found</div>';
        return;
    }
    
    const html = results.map(animal => `
        <div class="search-result-item p-2 border-bottom">
            <div class="d-flex align-items-center">
                <img src="${animal.photos[0] || '/images/placeholder-pet.jpg'}" 
                     alt="${animal.name}" class="rounded me-3" 
                     style="width: 50px; height: 50px; object-fit: cover;">
                <div>
                    <h6 class="mb-0">${animal.name}</h6>
                    <small class="text-muted">${animal.breed} • ${animal.city}</small>
                </div>
            </div>
        </div>
    `).join('');
    
    resultsContainer.innerHTML = html;
}

// Image gallery functionality
function initializeImageGallery() {
    const thumbnails = document.querySelectorAll('.thumbnail-photo');
    const mainPhoto = document.querySelector('.main-photo img');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            if (mainPhoto) {
                mainPhoto.src = this.src;
                
                // Update active thumbnail
                thumbnails.forEach(t => t.classList.remove('border-primary'));
                this.classList.add('border-primary');
            }
        });
    });
}

// Form validation
function initializeFormValidation() {
    const forms = document.querySelectorAll('.needs-validation');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            
            form.classList.add('was-validated');
        });
    });
    
    // Custom validation for animal form
    const animalForm = document.querySelector('#animalForm');
    if (animalForm) {
        validateAnimalForm(animalForm);
    }
}

function validateAnimalForm(form) {
    const transferType = form.querySelector('#transferType');
    const priceField = form.querySelector('#price');
    
    if (transferType && priceField) {
        transferType.addEventListener('change', function() {
            if (this.value === 'adoption') {
                priceField.value = '0';
                priceField.disabled = true;
                priceField.removeAttribute('required');
            } else if (this.value === 'sale') {
                priceField.disabled = false;
                priceField.setAttribute('required', 'required');
            }
        });
    }
}

// Initialize tooltips
function initializeTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Animations
function initializeAnimations() {
    // Fade in elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements with animation class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
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

function formatPrice(price) {
    if (price === 0) {
        return '<span class="text-success"><i class="fas fa-heart me-1"></i>Free</span>';
    }
    return `$${price.toLocaleString()}`;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Contact form handling
function handleContactForm(animalId, animalName) {
    const modal = new bootstrap.Modal(document.getElementById('contactModal'));
    modal.show();
    
    // Update modal content
    const modalTitle = document.querySelector('#contactModal .modal-title');
    if (modalTitle) {
        modalTitle.textContent = `Contact about ${animalName}`;
    }
}

// Favorite functionality
function toggleFavorite(animalId) {
    // This would typically make an API call to save/remove favorite
    const button = document.querySelector(`[data-animal-id="${animalId}"] .favorite-btn`);
    if (button) {
        const icon = button.querySelector('i');
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            icon.style.color = '#dc3545';
            showNotification('Added to favorites!', 'success');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            icon.style.color = '';
            showNotification('Removed from favorites', 'info');
        }
    }
}

// Share functionality
function shareAnimal(animalId, animalName) {
    if (navigator.share) {
        navigator.share({
            title: `Check out ${animalName}`,
            text: `I found this amazing animal on AnimalMarket!`,
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            showNotification('Link copied to clipboard!', 'success');
        });
    }
}

// Filter functionality for catalog
function initializeFilters() {
    const filterForm = document.querySelector('#filterForm');
    if (filterForm) {
        const inputs = filterForm.querySelectorAll('input, select');
        
        inputs.forEach(input => {
            input.addEventListener('change', function() {
                // Auto-submit form when filters change
                setTimeout(() => {
                    filterForm.submit();
                }, 100);
            });
        });
    }
}

// View toggle for catalog (grid/list)
function toggleView(viewType) {
    const gridView = document.querySelector('#animalsGrid');
    const gridBtn = document.querySelector('#gridView');
    const listBtn = document.querySelector('#listView');
    
    if (viewType === 'list') {
        gridView.classList.remove('row');
        gridView.classList.add('list-view');
        gridBtn.classList.remove('active');
        listBtn.classList.add('active');
    } else {
        gridView.classList.add('row');
        gridView.classList.remove('list-view');
        listBtn.classList.remove('active');
        gridBtn.classList.add('active');
    }
}

// Initialize view toggle buttons
document.addEventListener('DOMContentLoaded', function() {
    const gridBtn = document.querySelector('#gridView');
    const listBtn = document.querySelector('#listView');
    
    if (gridBtn) {
        gridBtn.addEventListener('click', () => toggleView('grid'));
    }
    
    if (listBtn) {
        listBtn.addEventListener('click', () => toggleView('list'));
    }
});

// Loading state management
function showLoading(element) {
    const originalContent = element.innerHTML;
    element.innerHTML = '<span class="loading"></span> Loading...';
    element.disabled = true;
    
    return function hideLoading() {
        element.innerHTML = originalContent;
        element.disabled = false;
    };
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You could send this to a logging service
});

// Service worker registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}