// Floating Hearts Animation for Welcome Screen

document.addEventListener('DOMContentLoaded', function() {
    const heartsContainer = document.querySelector('.hearts-container');
    
    // Create floating hearts - optimized for performance
    function createFloatingHearts() {
        // Check if device is likely low-powered
        const isLowPoweredDevice = window.matchMedia('(max-width: 768px)').matches || navigator.hardwareConcurrency <= 4;
        
        // Clear existing hearts
        heartsContainer.innerHTML = '';
        
        // Create new hearts
        for (let i = 0; i < (isLowPoweredDevice ? 15 : 30); i++) {
            createHeart();
        }
    }
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        
        // Random position, size, and animation duration - optimized for performance
        const size = Math.random() * 25 + 15; // 15px to 40px (smaller for better performance)
        const startPosition = Math.random() * 100; // 0% to 100%
        const delay = Math.random() * 10; // 0s to 10s (reduced for faster initial load)
        const duration = Math.random() * 5 + 15; // 15s to 20s (more consistent)
        const opacity = Math.random() * 0.3 + 0.4; // 0.4 to 0.7 opacity (reduced for better performance)
        const rotation = Math.random() * 360; // 0 to 360 degrees
        
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.left = `${startPosition}%`;
        heart.style.animationDelay = `${delay}s`;
        heart.style.animationDuration = `${duration}s`;
        heart.style.opacity = opacity;
        heart.style.transform = `rotate(${rotation}deg)`;
        // Simplified filter for better performance
        heart.style.filter = `drop-shadow(0 0 2px rgba(255, 51, 102, 0.5))`;
        heart.style.zIndex = 1;
        
        // Add to container
        heartsContainer.appendChild(heart);
        
        // Remove heart after animation completes - optimized approach
        // Only replace hearts occasionally to reduce CPU usage
        if (Math.random() > 0.5) { // 50% chance to replace
            setTimeout(() => {
                if (heart && heart.parentNode === heartsContainer) {
                    heartsContainer.removeChild(heart);
                    // Only create a new heart if we're under the limit
                    if (heartsContainer.children.length < (isLowPoweredDevice ? 10 : 20)) {
                        createHeart();
                    }
                }
            }, (delay + duration) * 1000);
        }
    }
    
    // Initialize hearts
    createFloatingHearts();
    
    // Add shimmer effect to welcome content
    const welcomeContent = document.querySelector('.welcome-content');
    if (welcomeContent) {
        welcomeContent.addEventListener('mousemove', (e) => {
            const x = e.clientX - welcomeContent.getBoundingClientRect().left;
            const y = e.clientY - welcomeContent.getBoundingClientRect().top;
            
            // Create a ripple effect
            const ripple = document.createElement('div');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            welcomeContent.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    }
});
