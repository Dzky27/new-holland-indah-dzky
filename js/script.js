// ===== NAVBAR FUNCTIONALITY =====

// Toggle Mobile Menu
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (window.innerWidth <= 968 && mobileToggle && navLinks) {
            mobileToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

if (navbar) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add shadow when scrolled
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        // Skip if href is just "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            const targetPosition = target.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== SET ACTIVE NAVIGATION =====
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage ||
            (currentPage === '' && linkHref === 'index.html') ||
            (linkHref === 'index.html' && currentPage === '')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    // Check if notification already exists
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--accent)' : 
                     type === 'danger' ? 'var(--danger)' : 
                     type === 'warning' ? 'var(--warning)' : 
                     'var(--info)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// ===== ANIMATION STYLES =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// ===== WHATSAPP FLOATING BUTTON =====
function createWhatsAppButton() {
    // Check if button already exists
    if (document.querySelector('.whatsapp-float')) return;

    const whatsappBtn = document.createElement('a');
    whatsappBtn.href = 'https://wa.me/6289657769065';
    whatsappBtn.target = '_blank';
    whatsappBtn.rel = 'noopener noreferrer';
    whatsappBtn.className = 'whatsapp-float';
    whatsappBtn.innerHTML = '💬';
    whatsappBtn.title = 'Chat via WhatsApp';
    whatsappBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 60px;
        height: 60px;
        background: #25D366;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
        z-index: 999;
        transition: all 0.3s ease;
        cursor: pointer;
        text-decoration: none;
    `;

    whatsappBtn.addEventListener('mouseenter', () => {
        whatsappBtn.style.transform = 'scale(1.1)';
        whatsappBtn.style.boxShadow = '0 6px 16px rgba(37, 211, 102, 0.6)';
    });

    whatsappBtn.addEventListener('mouseleave', () => {
        whatsappBtn.style.transform = 'scale(1)';
        whatsappBtn.style.boxShadow = '0 4px 12px rgba(37, 211, 102, 0.4)';
    });

    // Don't show on dashboard pages
    const currentPath = window.location.pathname;
    if (!currentPath.includes('dashboard') &&
        !currentPath.includes('admin') &&
        !currentPath.includes('tenant') &&
        !currentPath.includes('owner')) {
        document.body.appendChild(whatsappBtn);
    }
}

// ===== BACK TO TOP BUTTON =====
function createBackToTopButton() {
    if (document.querySelector('.back-to-top')) return;

    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.title = 'Kembali ke atas';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        display: none;
        z-index: 998;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(30, 90, 63, 0.3);
    `;

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'flex';
            backToTopBtn.style.alignItems = 'center';
            backToTopBtn.style.justifyContent = 'center';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    // Don't show on dashboard pages
    const currentPath = window.location.pathname;
    if (!currentPath.includes('dashboard') &&
        !currentPath.includes('admin') &&
        !currentPath.includes('tenant') &&
        !currentPath.includes('owner')) {
        document.body.appendChild(backToTopBtn);
    }
}

// ===== PRICE CALCULATOR UTILITIES =====
function calculatePrice(capacity, hasExtraBed) {
    const basePrice = 500000;
    const extraPersonPrice = 200000;

    if (capacity === 2 || hasExtraBed) {
        return basePrice + extraPersonPrice;
    }
    return basePrice;
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
}

// ===== LOCAL STORAGE HELPERS =====
const storage = {
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Storage error:', e);
            return false;
        }
    },

    get: (key) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('Storage error:', e);
            return null;
        }
    },

    remove: (key) => {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Storage error:', e);
            return false;
        }
    },

    clear: () => {
        try {
            localStorage.clear();
            return true;
        } catch (e) {
            console.error('Storage error:', e);
            return false;
        }
    }
};

// ===== DATE FORMATTER =====
function formatDate(date, format = 'long') {
    const d = new Date(date);

    if (format === 'short') {
        return d.toLocaleDateString('id-ID');
    } else {
        return d.toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}

// ===== DEBOUNCE UTILITY =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== IMAGE LAZY LOADING =====
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.add('loaded');
            img.removeAttribute('data-src');
        });
    }
}

// ===== BOOKING BUTTONS =====
function initializeBookingButtons() {
    const bookButtons = document.querySelectorAll('.book-btn, .btn-booking');

    bookButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            // Get room name
            const roomCard = this.closest('.room-card');
            const card = this.closest('.card');

            let roomName = 'Kamar';

            if (roomCard) {
                const nameElement = roomCard.querySelector('.room-name');
                if (nameElement) {
                    roomName = nameElement.textContent;
                }
            } else if (card) {
                const nameElement = card.querySelector('h3');
                if (nameElement) {
                    roomName = nameElement.textContent;
                }
            }

            showNotification(`Memulai proses booking untuk ${roomName}. Silakan hubungi kami via WhatsApp untuk melanjutkan.`, 'success');

            // Open WhatsApp
            setTimeout(() => {
                window.open('https://wa.me/6289657769065?text=Halo,%20saya%20tertarik%20untuk%20booking%20kamar', '_blank');
            }, 1500);
        });
    });
}

// ===== INITIALIZE ON DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', () => {
    // Set active navigation
    setActiveNav();

    // Initialize lazy loading
    initializeLazyLoading();

    // Create floating buttons
    createWhatsAppButton();
    createBackToTopButton();

    // Initialize booking buttons
    initializeBookingButtons();

    // Observe animated elements
    const animatedElements = document.querySelectorAll(
        '.facility-card, .room-card, .info-item'
    );

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
});