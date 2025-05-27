// JavaScript for animations throughout the website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Scroll animations for sections
    initSectionAnimations();
    
    // Initialize animations for specific elements
    initElementAnimations();
    
    // Initialize falling petals animation
    initFallingPetals();
});

// Initialize section animations
function initSectionAnimations() {
    // Animate section titles
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            y: 50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // Animate reason cards
    const reasonCards = document.querySelectorAll('.reason-card');
    reasonCards.forEach((card, index) => {
        gsap.from(card, {
            y: 50,
            opacity: 0,
            duration: 0.6,
            delay: index % 3 * 0.2, // Stagger effect based on position
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // Animate timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        const direction = index % 2 === 0 ? -50 : 50; // Alternate left/right
        gsap.from(item, {
            x: direction,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // Animate envelopes
    const envelopes = document.querySelectorAll('.envelope');
    envelopes.forEach((envelope, index) => {
        gsap.from(envelope, {
            scale: 0.8,
            opacity: 0,
            duration: 0.6,
            delay: index * 0.15, // Stagger effect
            scrollTrigger: {
                trigger: envelope,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // Animate gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        gsap.from(item, {
            y: 30,
            opacity: 0,
            duration: 0.6,
            delay: (index % 4) * 0.1, // Stagger effect based on position
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // Animate vision wall items
    const visionItems = document.querySelectorAll('.vision-item');
    visionItems.forEach((item, index) => {
        gsap.from(item, {
            y: 50,
            opacity: 0,
            duration: 0.7,
            delay: index * 0.1, // Stagger effect
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });
}

// Initialize element animations
function initElementAnimations() {
    // Animate heart button
    const heartButton = document.getElementById('enter-button');
    if (heartButton) {
        gsap.to(heartButton, {
            scale: 1.05,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut'
        });
    }
    
    // Animate surprise button
    const surpriseButton = document.getElementById('surprise-button');
    if (surpriseButton) {
        gsap.to(surpriseButton, {
            scale: 1.03,
            duration: 1.2,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut'
        });
    }
    
    // Animate constellation name
    const constellationName = document.querySelector('.constellation-name');
    if (constellationName) {
        gsap.to(constellationName, {
            opacity: 0.15,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }
    
    // Animate bottle
    const bottle = document.querySelector('.bottle');
    if (bottle) {
        gsap.to(bottle, {
            rotation: 5,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }
}

// Initialize falling petals animation
function initFallingPetals() {
    // Create petals on scroll
    window.addEventListener('scroll', function() {
        // Only create petals occasionally
        if (Math.random() > 0.9) {
            createPetal();
        }
    });
    
    // Create initial petals
    for (let i = 0; i < 5; i++) {
        setTimeout(createPetal, i * 300);
    }
}

// Create a single petal
function createPetal() {
    const petal = document.createElement('div');
    petal.classList.add('petal');
    
    // Random size
    const size = Math.random() * 15 + 10;
    petal.style.width = size + 'px';
    petal.style.height = size + 'px';
    
    // Random position
    petal.style.left = Math.random() * 100 + 'vw';
    
    // Random rotation
    petal.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    // Random fall duration
    const duration = Math.random() * 5 + 8;
    petal.style.animationDuration = duration + 's';
    
    // Add to body
    document.body.appendChild(petal);
    
    // Remove after animation completes
    setTimeout(() => {
        petal.remove();
    }, duration * 1000);
}
