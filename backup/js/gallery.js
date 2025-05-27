// JavaScript for the Gallery section

document.addEventListener('DOMContentLoaded', function() {
    // Array of gallery items (replace with actual images)
    const galleryItems = [
        {
            image: 'images/gallery/photo1.jpg',
            caption: 'Our first selfie together'
        },
        {
            image: 'images/gallery/photo2.jpg',
            caption: 'That sunset walk on the beach'
        },
        {
            image: 'images/gallery/photo3.jpg',
            caption: 'Coffee date at our favorite café'
        },
        {
            image: 'images/gallery/photo4.jpg',
            caption: 'Hiking adventure in the mountains'
        },
        {
            image: 'images/gallery/photo5.jpg',
            caption: 'Dancing in the rain'
        },
        {
            image: 'images/gallery/photo6.jpg',
            caption: 'Movie night at home'
        },
        {
            image: 'images/gallery/photo7.jpg',
            caption: 'That time we tried cooking together'
        },
        {
            image: 'images/gallery/photo8.jpg',
            caption: 'Stargazing on the rooftop'
        },
        {
            image: 'images/gallery/photo9.jpg',
            caption: 'Your beautiful smile that I love'
        },
        {
            image: 'images/gallery/photo10.jpg',
            caption: 'Our matching Halloween costumes'
        },
        {
            image: 'images/gallery/photo11.jpg',
            caption: 'Christmas morning together'
        },
        {
            image: 'images/gallery/photo12.jpg',
            caption: 'New Year's Eve kiss'
        }
    ];

    // Get the container for the gallery
    const galleryContainer = document.querySelector('.gallery-container');

    // Create and append gallery items
    galleryItems.forEach((item) => {
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('gallery-item', 'fade-in');
        
        const galleryImage = document.createElement('img');
        galleryImage.classList.add('gallery-image');
        galleryImage.src = item.image;
        galleryImage.alt = item.caption;
        // Add a placeholder image in case the actual image is not available
        galleryImage.onerror = function() {
            this.src = 'images/placeholder.jpg';
        };
        
        const galleryCaption = document.createElement('div');
        galleryCaption.classList.add('gallery-caption');
        galleryCaption.textContent = item.caption;
        
        galleryItem.appendChild(galleryImage);
        galleryItem.appendChild(galleryCaption);
        
        galleryContainer.appendChild(galleryItem);
        
        // Add click event to show image in lightbox
        galleryItem.addEventListener('click', function() {
            createLightbox(item.image, item.caption);
        });
    });

    // Video message functionality
    const videoPlaceholder = document.querySelector('.video-placeholder');
    const videoContainer = document.querySelector('.video-container');
    
    videoPlaceholder.addEventListener('click', function() {
        // Create video element
        const video = document.createElement('video');
        video.classList.add('video-message');
        video.controls = true;
        video.autoplay = true;
        video.src = 'videos/special-message.mp4';
        // Add a fallback message if video is not available
        video.onerror = function() {
            videoContainer.innerHTML = '<p>Video message coming soon...</p>';
        };
        
        // Replace placeholder with video
        videoContainer.innerHTML = '';
        videoContainer.appendChild(video);
    });

    // Create lightbox for images
    function createLightbox(imageSrc, caption) {
        // Check if lightbox already exists
        let lightbox = document.querySelector('.lightbox');
        
        if (!lightbox) {
            // Create lightbox elements
            lightbox = document.createElement('div');
            lightbox.classList.add('lightbox');
            
            const lightboxContent = document.createElement('div');
            lightboxContent.classList.add('lightbox-content');
            
            const lightboxImage = document.createElement('img');
            lightboxImage.classList.add('lightbox-image');
            
            const lightboxCaption = document.createElement('div');
            lightboxCaption.classList.add('lightbox-caption');
            
            const lightboxClose = document.createElement('div');
            lightboxClose.classList.add('lightbox-close');
            lightboxClose.innerHTML = '&times;';
            
            const lightboxNav = document.createElement('div');
            lightboxNav.classList.add('lightbox-nav');
            
            const lightboxPrev = document.createElement('div');
            lightboxPrev.classList.add('lightbox-prev');
            lightboxPrev.innerHTML = '&#10094;';
            
            const lightboxNext = document.createElement('div');
            lightboxNext.classList.add('lightbox-next');
            lightboxNext.innerHTML = '&#10095;';
            
            lightboxNav.appendChild(lightboxPrev);
            lightboxNav.appendChild(lightboxNext);
            
            lightboxContent.appendChild(lightboxImage);
            lightboxContent.appendChild(lightboxCaption);
            lightboxContent.appendChild(lightboxClose);
            lightboxContent.appendChild(lightboxNav);
            
            lightbox.appendChild(lightboxContent);
            document.body.appendChild(lightbox);
            
            // Close lightbox when clicking on it
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox || e.target === lightboxClose) {
                    lightbox.classList.remove('active');
                    setTimeout(() => {
                        lightbox.remove();
                    }, 300);
                }
            });
            
            // Navigation functionality
            let currentIndex = galleryItems.findIndex(item => item.image === imageSrc);
            
            lightboxPrev.addEventListener('click', function(e) {
                e.stopPropagation();
                currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
                updateLightboxContent();
            });
            
            lightboxNext.addEventListener('click', function(e) {
                e.stopPropagation();
                currentIndex = (currentIndex + 1) % galleryItems.length;
                updateLightboxContent();
            });
            
            function updateLightboxContent() {
                lightboxImage.src = galleryItems[currentIndex].image;
                lightboxCaption.textContent = galleryItems[currentIndex].caption;
                
                // Handle image error
                lightboxImage.onerror = function() {
                    this.src = 'images/placeholder.jpg';
                };
            }
        }
        
        // Set lightbox content
        const lightboxImage = lightbox.querySelector('.lightbox-image');
        const lightboxCaption = lightbox.querySelector('.lightbox-caption');
        
        lightboxImage.src = imageSrc;
        lightboxCaption.textContent = caption;
        
        // Handle image error
        lightboxImage.onerror = function() {
            this.src = 'images/placeholder.jpg';
        };
        
        // Show lightbox
        setTimeout(() => {
            lightbox.classList.add('active');
        }, 10);
    }
});
