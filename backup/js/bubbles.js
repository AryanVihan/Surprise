// Bubble Animation for Message in a Bottle
document.addEventListener('DOMContentLoaded', function() {
    const oceanContainer = document.querySelector('.ocean-container');
    
    if (!oceanContainer) return;
    
    // Create bubbles
    const createBubbles = () => {
        // Clear existing bubbles
        const existingBubbles = document.querySelectorAll('.bubble');
        existingBubbles.forEach(bubble => bubble.remove());
        
        // Create new bubbles
        for (let i = 0; i < 30; i++) {
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            
            // Random size
            const size = 5 + Math.random() * 20;
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            
            // Random position
            bubble.style.left = `${Math.random() * 100}%`;
            bubble.style.bottom = `${Math.random() * 20}%`;
            
            // Random animation duration and delay
            bubble.style.setProperty('--duration', `${3 + Math.random() * 4}s`);
            bubble.style.setProperty('--delay', `${Math.random() * 5}s`);
            
            oceanContainer.appendChild(bubble);
        }
    };
    
    // Initial creation
    createBubbles();
    
    // Recreate bubbles periodically
    setInterval(createBubbles, 10000);
    
    // Add bubble sound effect when clicked
    oceanContainer.addEventListener('click', function(e) {
        // Create a bubble at click position
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        
        const size = 10 + Math.random() * 30;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        
        const rect = oceanContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        bubble.style.left = `${x}px`;
        bubble.style.bottom = `${oceanContainer.clientHeight - y}px`;
        bubble.style.setProperty('--duration', '2s');
        bubble.style.setProperty('--delay', '0s');
        
        oceanContainer.appendChild(bubble);
        
        // Play bubble sound if available
        if (typeof Howl !== 'undefined') {
            const bubbleSound = new Howl({
                src: ['audio/bubble-pop.mp3'],
                volume: 0.3
            });
            bubbleSound.play();
        }
    });
});
