// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page
    initializePage();
    createParticles();
    addClickEffects();
    addKeyboardNavigation();
});

// Initialize page animations and effects
function initializePage() {
    document.body.classList.add('loaded');
    
    // Add typing effect to title if desired (optional)
    // typeWriter();
}

// Create floating particles background
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    // Create geodesic grid first
    createGeodesicGrid(particlesContainer);
    
    // Then add floating particles (fewer now)
    const particleCount = window.innerWidth < 768 ? 10 : 20;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

// Create geodesic square grid
function createGeodesicGrid(container) {
    const gridContainer = document.createElement('div');
    gridContainer.className = 'geodesic-grid';
    
    const gridSize = 20; // 20x20 grid
    const cellSize = 100 / gridSize; // Percentage based
    
    // Create horizontal lines
    for (let i = 0; i <= gridSize; i++) {
        const line = document.createElement('div');
        line.className = 'geo-line horizontal';
        line.style.top = (i * cellSize) + '%';
        line.style.left = '0%';
        gridContainer.appendChild(line);
    }
    
    // Create vertical lines
    for (let i = 0; i <= gridSize; i++) {
        const line = document.createElement('div');
        line.className = 'geo-line vertical';
        line.style.left = (i * cellSize) + '%';
        line.style.top = '0%';
        gridContainer.appendChild(line);
    }
    
    // Create diagonal lines (every 4th intersection)
    for (let i = 0; i <= gridSize; i += 4) {
        for (let j = 0; j <= gridSize; j += 4) {
            // Diagonal going down-right
            if (i < gridSize && j < gridSize) {
                const diagonal1 = document.createElement('div');
                diagonal1.className = 'geo-line diagonal';
                diagonal1.style.left = (j * cellSize) + '%';
                diagonal1.style.top = (i * cellSize) + '%';
                diagonal1.style.width = (cellSize * Math.sqrt(2) * 4) + '%';
                diagonal1.style.transform = 'rotate(45deg)';
                diagonal1.style.transformOrigin = 'left center';
                gridContainer.appendChild(diagonal1);
            }
            
            // Diagonal going down-left
            if (i < gridSize && j >= 4) {
                const diagonal2 = document.createElement('div');
                diagonal2.className = 'geo-line diagonal';
                diagonal2.style.left = (j * cellSize) + '%';
                diagonal2.style.top = (i * cellSize) + '%';
                diagonal2.style.width = (cellSize * Math.sqrt(2) * 4) + '%';
                diagonal2.style.transform = 'rotate(-45deg)';
                diagonal2.style.transformOrigin = 'left center';
                gridContainer.appendChild(diagonal2);
            }
        }
    }
    
    // Create nodes at major intersections
    for (let i = 0; i <= gridSize; i += 2) {
        for (let j = 0; j <= gridSize; j += 2) {
            const node = document.createElement('div');
            node.className = 'geo-node';
            node.style.left = (j * cellSize) + '%';
            node.style.top = (i * cellSize) + '%';
            node.style.animationDelay = (Math.random() * 4) + 's';
            gridContainer.appendChild(node);
        }
    }
    
    container.appendChild(gridContainer);
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size between 2-8px
    const size = Math.random() * 6 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Random animation delay and duration
    const delay = Math.random() * 6;
    const duration = Math.random() * 4 + 4;
    particle.style.animationDelay = delay + 's';
    particle.style.animationDuration = duration + 's';
    
    container.appendChild(particle);
}

// Add click effects to buttons
function addClickEffects() {
    const buttons = document.querySelectorAll('.link-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Add hover sound effect (optional)
        button.addEventListener('mouseenter', function() {
            // You could add a subtle sound here if desired
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Add keyboard navigation
function addKeyboardNavigation() {
    const buttons = document.querySelectorAll('.link-btn');
    let currentFocus = -1;
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            e.preventDefault();
            currentFocus++;
            if (currentFocus >= buttons.length) currentFocus = 0;
            buttons[currentFocus].focus();
        } else if (e.key === 'Enter' || e.key === ' ') {
            if (document.activeElement.classList.contains('link-btn')) {
                e.preventDefault();
                document.activeElement.click();
            }
        }
    });
}

// Optional: Typing effect for title
function typeWriter() {
    const title = document.querySelector('h1');
    const text = title.textContent;
    title.textContent = '';
    title.style.opacity = 1;
    
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, 100);
}

// Smooth scroll behavior for any internal links
function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add ripple effect CSS
const rippleStyles = `
.link-btn {
    position: relative;
    overflow: hidden;
}

.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

// Inject ripple styles
const styleSheet = document.createElement('style');
styleSheet.textContent = rippleStyles;
document.head.appendChild(styleSheet);

// Handle window resize for particles
window.addEventListener('resize', function() {
    const particlesContainer = document.querySelector('.particles');
    if (particlesContainer) {
        // Clear existing content
        particlesContainer.innerHTML = '';
        // Recreate everything
        createParticles();
    }
});

// Performance optimization: Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation triggers
document.querySelectorAll('.link-btn').forEach(btn => {
    observer.observe(btn);
});
