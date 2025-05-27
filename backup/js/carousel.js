// Optimized Carousel Functionality for Journey Together Images
document.addEventListener('DOMContentLoaded', function() {
    // Check if device is likely low-powered
    const isLowPoweredDevice = window.matchMedia('(max-width: 768px)').matches || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const nextButton = document.querySelector('.carousel-button.next');
    const prevButton = document.querySelector('.carousel-button.prev');
    
    if (!track || !slides.length || !nextButton || !prevButton) return;
    
    const slideWidth = slides[0].getBoundingClientRect().width;
    let currentIndex = 0;
    
    // Set up initial position
    slides.forEach((slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    });
    
    // Move to a specific slide
    const moveToSlide = (index) => {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        track.style.transform = `translateX(-${slideWidth * index}px)`;
        currentIndex = index;
    };
    
    // Next button click handler
    nextButton.addEventListener('click', () => {
        moveToSlide(currentIndex + 1);
    });
    
    // Previous button click handler
    prevButton.addEventListener('click', () => {
        moveToSlide(currentIndex - 1);
    });
    
    // Optimized auto-play functionality
    let autoplayInterval;
    
    const startAutoplay = () => {
        if (autoplayInterval) clearInterval(autoplayInterval);
        
        // For low-powered devices, use a simpler animation approach
        if (isLowPoweredDevice) {
            // Use JavaScript for simpler animation instead of CSS
            autoplayInterval = setInterval(() => {
                moveToSlide(currentIndex + 1);
            }, 5000); // Slower interval for better performance
        } else {
            // Add autoplay class for CSS animation on more powerful devices
            track.classList.add('autoplay');
        }
        
        // Disable buttons during autoplay
        nextButton.style.display = 'none';
        prevButton.style.display = 'none';
    };
    
    const stopAutoplay = () => {
        if (autoplayInterval) clearInterval(autoplayInterval);
        
        // Remove autoplay class
        track.classList.remove('autoplay');
        
        // Re-enable buttons
        nextButton.style.display = 'flex';
        prevButton.style.display = 'flex';
    };
    
    // Toggle autoplay on track click
    track.addEventListener('click', () => {
        if (track.classList.contains('autoplay')) {
            stopAutoplay();
        } else {
            startAutoplay();
        }
    });
    
    // Start autoplay by default
    startAutoplay();
    
    // Pause autoplay on hover
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', stopAutoplay);
    carouselContainer.addEventListener('mouseleave', startAutoplay);
});
