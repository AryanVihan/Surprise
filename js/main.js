// Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    // Audio functionality has been moved to audio-controller.js
    // This section is intentionally disabled to prevent conflicts
    console.log('Main.js: Audio functionality has been moved to audio-controller.js');
    
    // Define a dummy backgroundMusic object to prevent errors
    const backgroundMusic = {
        play: function() { console.log('Audio control moved to audio-controller.js'); },
        pause: function() { console.log('Audio control moved to audio-controller.js'); }
    };
    
    // Create and animate floating hearts
    function createFloatingHearts() {
        const heartsContainer = document.querySelector('.hearts-container');
        const heartCount = 20; // Number of hearts to create
        
        // Clear any existing hearts
        heartsContainer.innerHTML = '';
        
        for (let i = 0; i < heartCount; i++) {
            createHeart(heartsContainer);
        }
    }
    
    function createHeart(container) {
        const heart = document.createElement('i');
        heart.classList.add('fas', 'fa-heart', 'floating-heart');
        
        // Randomize heart properties
        const size = Math.random() * 20 + 10; // 10-30px
        const startPosition = Math.random() * 100; // 0-100%
        const delay = Math.random() * 5; // 0-5s delay
        const duration = Math.random() * 10 + 10; // 10-20s duration
        const opacity = Math.random() * 0.5 + 0.3; // 0.3-0.8 opacity
        
        // Set heart styles
        heart.style.fontSize = `${size}px`;
        heart.style.left = `${startPosition}%`;
        heart.style.bottom = '-20px'; // Start below the screen
        heart.style.animationDuration = `${duration}s`;
        heart.style.animationDelay = `${delay}s`;
        heart.style.opacity = opacity;
        
        // Add heart to container
        container.appendChild(heart);
        
        // Remove heart after animation completes and create a new one
        setTimeout(() => {
            heart.remove();
            createHeart(container);
        }, (duration + delay) * 1000);
    }
    // Get DOM elements
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainContent = document.getElementById('main-content');
    const enterButton = document.getElementById('enter-button');
    const leftVideo = document.getElementById('left-video');
    const rightVideo = document.getElementById('right-video');
    
    // Ensure videos are loaded
    function loadVideos() {
        if (leftVideo.readyState === 0) {
            leftVideo.load();
        }
        
        if (rightVideo.readyState === 0) {
            rightVideo.load();
        }
    }
    
    // Load videos when page loads
    loadVideos();
    
    // Music toggle functionality has been moved to audio-controller.js
    // This section is intentionally left empty to prevent conflicts
    
    // Enter button functionality
    enterButton.addEventListener('click', function() {
        welcomeScreen.classList.add('hidden');
        mainContent.classList.remove('hidden');
        
        // Audio functionality is now handled by audio-controller.js
    });
    
    // Log when videos are ready
    leftVideo.addEventListener('canplay', function() {
        console.log('Left video is ready to play');
    });
    
    rightVideo.addEventListener('canplay', function() {
        console.log('Right video is ready to play');
    });
    
    // Initialize floating hearts
    createFloatingHearts();
    
    // Handle video errors
    leftVideo.addEventListener('error', function() {
        console.error('Error loading left video');
        leftVideo.closest('.welcome-video').style.backgroundColor = '#ff3366';
    });
    
    rightVideo.addEventListener('error', function() {
        console.error('Error loading right video');
        rightVideo.closest('.welcome-video').style.backgroundColor = '#9933ff';
    });
});
