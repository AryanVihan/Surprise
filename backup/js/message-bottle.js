// Message in a Bottle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const bottleContainer = document.querySelector('.bottle-container');
    const messageContent = document.querySelector('.message-content');
    
    if (!bottleContainer || !messageContent) return;
    
    // Add click event to bottle
    bottleContainer.addEventListener('click', function() {
        // Animate bottle opening
        bottleContainer.classList.add('open');
        
        // Show message with fade-in effect
        setTimeout(function() {
            messageContent.style.opacity = '1';
            messageContent.style.transform = 'translateY(0) scale(1)';
            
            // Add glowing effect to message
            messageContent.classList.add('glow-effect');
            
            // Add starry background to message
            const starryBackground = document.createElement('div');
            starryBackground.className = 'starry-background';
            messageContent.appendChild(starryBackground);
            
            // Create stars
            for (let i = 0; i < 50; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 100 + '%';
                star.style.animationDelay = Math.random() * 5 + 's';
                star.style.animationDuration = Math.random() * 3 + 2 + 's';
                starryBackground.appendChild(star);
            }
        }, 1000);
    });
    
    // Add 3D tilt effect to bottle
    if (bottleContainer) {
        bottleContainer.addEventListener('mousemove', function(e) {
            const boundingRect = bottleContainer.getBoundingClientRect();
            const centerX = boundingRect.left + boundingRect.width / 2;
            const centerY = boundingRect.top + boundingRect.height / 2;
            
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;
            
            const rotateX = mouseY / -10;
            const rotateY = mouseX / 10;
            
            bottleContainer.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        bottleContainer.addEventListener('mouseleave', function() {
            bottleContainer.style.transform = 'rotateX(0) rotateY(0)';
        });
    }
    
    // Add wave animation to ocean
    const oceanWaves = document.querySelector('.ocean-waves');
    if (oceanWaves) {
        // Create multiple wave layers for parallax effect
        for (let i = 0; i < 3; i++) {
            const waveLayer = document.createElement('div');
            waveLayer.className = `wave-layer wave-layer-${i + 1}`;
            oceanWaves.appendChild(waveLayer);
        }
    }
});
