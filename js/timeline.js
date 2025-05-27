// Timeline Carousel Script
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const timelineTrack = document.getElementById('timeline-track');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    
    // Set initial state
    let currentIndex = 0;
    let itemWidth = 0;
    let visibleItems = 1;
    
    // Initialize timeline - using requestAnimationFrame for better performance
    requestAnimationFrame(() => initTimeline());
    
    // Initialize timeline carousel
    function initTimeline() {
        // Determine how many items are visible based on screen width
        if (window.innerWidth >= 1200) {
            visibleItems = 3;
        } else if (window.innerWidth >= 768) {
            visibleItems = 2;
        } else {
            visibleItems = 1;
        }
        
        // Calculate item width
        itemWidth = timelineTrack.offsetWidth / visibleItems;
        
        // Set width for each item - using transform for better performance
        timelineItems.forEach(item => {
            item.style.width = `${itemWidth}px`;
            // Preload images for faster rendering
            const img = item.querySelector('img');
            if (img) {
                img.loading = 'eager';
            }
        });
        
        // Enable autoplay with a small delay to ensure everything is loaded
        setTimeout(() => {
            enableAutoplay();
            // Show initial slide
            goToSlide(currentIndex);
        }, 100);
        
        // Add hover effect to pause autoplay
        timelineTrack.addEventListener('mouseenter', () => {
            timelineTrack.classList.remove('autoplay');
        });
        
        timelineTrack.addEventListener('mouseleave', () => {
            enableAutoplay();
        });
    }
    
    // Enable autoplay
    function enableAutoplay() {
        timelineTrack.classList.add('autoplay');
        // Set up automatic sliding
        setInterval(() => {
            if (timelineTrack.classList.contains('autoplay')) {
                goToSlide(currentIndex + 1);
            }
        }, 3000);
    }
    
    // Go to specific slide
    function goToSlide(index) {
        // Ensure index is within bounds
        if (index < 0) {
            index = timelineItems.length - visibleItems;
        } else if (index > timelineItems.length - visibleItems) {
            index = 0;
        }
        
        // Update current index
        currentIndex = index;
        
        // Calculate translation distance
        const translateX = -currentIndex * itemWidth;
        
        // Apply translation
        timelineTrack.style.transform = `translateX(${translateX}px)`;
    }
    
    // Handle next button click
    nextButton.addEventListener('click', () => {
        // Temporarily disable autoplay
        timelineTrack.classList.remove('autoplay');
        
        // Go to next slide
        goToSlide(currentIndex + 1);
        
        // Re-enable autoplay after a delay
        setTimeout(enableAutoplay, 5000);
    });
    
    // Handle previous button click
    prevButton.addEventListener('click', () => {
        // Temporarily disable autoplay
        timelineTrack.classList.remove('autoplay');
        
        // Go to previous slide
        goToSlide(currentIndex - 1);
        
        // Re-enable autoplay after a delay
        setTimeout(enableAutoplay, 5000);
    });
    
    // Add glow effect on hover
    timelineItems.forEach(item => {
        const imageContainer = item.querySelector('.timeline-image-container');
        const glowElement = item.querySelector('.timeline-glow');
        
        // Reset all glows when not hovering
        imageContainer.addEventListener('mouseleave', () => {
            glowElement.style.background = 'radial-gradient(circle at center, rgba(255, 51, 102, 0), rgba(255, 51, 102, 0))';
            glowElement.style.opacity = '0';
        });
        
        imageContainer.addEventListener('mouseenter', () => {
            glowElement.style.opacity = '1';
        });
        
        imageContainer.addEventListener('mousemove', (e) => {
            // Calculate mouse position relative to the container
            const rect = imageContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Update glow position
            glowElement.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 51, 102, 0.4), rgba(255, 51, 102, 0) 50%)`;
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        // Reinitialize timeline on window resize
        initTimeline();
    });
});
