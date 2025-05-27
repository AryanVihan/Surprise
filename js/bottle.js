// Message in a Bottle Script
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const bottleContainer = document.getElementById('bottle-container');
    const messageModal = document.getElementById('message-modal');
    const closeBtn = document.querySelector('.close-btn');
    
    // Add click event to bottle
    bottleContainer.addEventListener('click', function() {
        // Animate bottle opening
        openBottle();
        
        // Show message modal with delay
        setTimeout(function() {
            messageModal.classList.add('show');
            
            // Create confetti effect
            if (typeof window.createConfetti === 'function') {
                window.createConfetti();
            }
        }, 500);
    });
    
    // Close modal when clicking the close button
    closeBtn.addEventListener('click', function() {
        messageModal.classList.remove('show');
        resetBottle();
    });
    
    // Close modal when clicking outside the content
    messageModal.addEventListener('click', function(e) {
        if (e.target === messageModal) {
            messageModal.classList.remove('show');
            resetBottle();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && messageModal.classList.contains('show')) {
            messageModal.classList.remove('show');
            resetBottle();
        }
    });
    
    // Function to animate bottle opening
    function openBottle() {
        // Add opening class to bottle
        bottleContainer.classList.add('opening');
        
        // Create bubbles effect
        createBubbles();
        
        // Add shake animation
        bottleContainer.style.animation = 'shake 0.5s ease-in-out';
        
        // Play sound effect if Howler.js is available
        if (typeof Howl !== 'undefined') {
            const openSound = new Howl({
                src: ['sounds/bottle-open.mp3'],
                volume: 0.5
            });
            openSound.play();
        }
    }
    
    // Function to reset bottle to initial state
    function resetBottle() {
        // Remove opening class after animation completes
        setTimeout(function() {
            bottleContainer.classList.remove('opening');
            bottleContainer.style.animation = 'float 6s ease-in-out infinite';
            
            // Remove any bubbles
            const bubbles = document.querySelectorAll('.bubble');
            bubbles.forEach(bubble => bubble.remove());
        }, 500);
    }
    
    // Function to create bubbles effect
    function createBubbles() {
        const oceanContainer = document.querySelector('.ocean-container');
        
        // Create 15-20 bubbles
        const bubbleCount = 15 + Math.floor(Math.random() * 5);
        
        for (let i = 0; i < bubbleCount; i++) {
            // Create bubble element
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            
            // Random size between 5-15px
            const size = 5 + Math.random() * 10;
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            
            // Random position near the bottle
            const bottleRect = bottleContainer.getBoundingClientRect();
            const oceanRect = oceanContainer.getBoundingClientRect();
            
            const left = bottleRect.left - oceanRect.left + (Math.random() * 100 - 50) + bottleRect.width / 2;
            const top = bottleRect.top - oceanRect.top + (Math.random() * 20) + bottleRect.height / 2;
            
            bubble.style.left = `${left}px`;
            bubble.style.top = `${top}px`;
            
            // Random animation duration
            const duration = 1 + Math.random() * 2;
            bubble.style.animation = `bubble ${duration}s ease-in forwards`;
            
            // Add to ocean container
            oceanContainer.appendChild(bubble);
            
            // Remove bubble after animation completes
            setTimeout(() => {
                bubble.remove();
            }, duration * 1000);
        }
    }
    
    // Add bubble animation to CSS
    addBubbleStyles();
    
    // Function to add bubble styles to the document
    function addBubbleStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .bubble {
                position: absolute;
                background: rgba(255, 255, 255, 0.7);
                border-radius: 50%;
                z-index: 6;
                pointer-events: none;
            }
            
            @keyframes bubble {
                0% {
                    transform: scale(0) translateY(0);
                    opacity: 0.7;
                }
                50% {
                    opacity: 0.9;
                }
                100% {
                    transform: scale(1.5) translateY(-100px);
                    opacity: 0;
                }
            }
            
            @keyframes shake {
                0%, 100% { transform: translate(-50%, -50%) rotate(5deg); }
                25% { transform: translate(-52%, -48%) rotate(0deg); }
                50% { transform: translate(-50%, -52%) rotate(-5deg); }
                75% { transform: translate(-48%, -50%) rotate(0deg); }
            }
            
            .bottle-container.opening .bottle {
                transform: rotate(-10deg) scale(1.1);
                transition: transform 0.5s ease;
            }
            
            .bottle-container.opening .message-scroll {
                transform: translateX(-50%) translateY(-20px);
                transition: transform 0.5s ease;
            }
        `;
        document.head.appendChild(style);
    }
});
