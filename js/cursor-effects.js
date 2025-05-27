// Cursor Effects Script
document.addEventListener('DOMContentLoaded', function() {
    // Create container for cursor effects
    const cursorEffectsContainer = document.createElement('div');
    cursorEffectsContainer.className = 'cursor-effects-container';
    document.body.appendChild(cursorEffectsContainer);
    
    // Track mouse position
    let mouseX = 0;
    let mouseY = 0;
    let lastMoveTime = 0;
    const moveThreshold = 50; // ms between effects
    
    // Update mouse position
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Create cursor effect on mouse move with throttling
        const now = Date.now();
        if (now - lastMoveTime > moveThreshold) {
            createCursorEffect();
            lastMoveTime = now;
        }
    });
    
    // Create cursor effect (hearts, sparkles, or text)
    function createCursorEffect() {
        // Randomly choose effect type with weighted distribution
        // More hearts and sparkles, less text
        const effectRandom = Math.random();
        let effectType;
        
        if (effectRandom < 0.4) {
            effectType = 'heart';
        } else if (effectRandom < 0.8) {
            effectType = 'sparkle';
        } else {
            effectType = 'text';
        }
        
        // Create effect element
        const effect = document.createElement('div');
        effect.className = `cursor-effect ${effectType}`;
        
        // Add random offset for more natural appearance
        const offsetX = (Math.random() - 0.5) * 20;
        const offsetY = (Math.random() - 0.5) * 20;
        
        // Set initial position with offset
        effect.style.left = `${mouseX + offsetX}px`;
        effect.style.top = `${mouseY + offsetY}px`;
        
        // Add content based on effect type
        if (effectType === 'heart') {
            // Randomly choose between different heart sizes
            const size = Math.floor(Math.random() * 3) + 1; // 1, 2, or 3
            effect.innerHTML = '<i class="fas fa-heart"></i>';
            effect.style.fontSize = `${10 + (size * 5)}px`;
            effect.style.color = getRandomColor();
            // Random rotation for hearts
            effect.style.transform = `rotate(${Math.random() * 60 - 30}deg)`;
        } else if (effectType === 'sparkle') {
            // Use stars as sparkles since fa-sparkles might not be available
            effect.innerHTML = '<i class="fas fa-star"></i>';
            effect.style.color = getRandomColor();
            // Random size for sparkles
            const sparkleSize = 10 + (Math.random() * 10);
            effect.style.fontSize = `${sparkleSize}px`;
        } else if (effectType === 'text') {
            // Use full name or individual letters from 'Vazeeda'
            const nameOptions = ['V', 'a', 'z', 'e', 'e', 'd', 'a', '❤️', 'Vazeeda'];
            const textChoice = nameOptions[Math.floor(Math.random() * nameOptions.length)];
            effect.textContent = textChoice;
            effect.style.color = getRandomColor();
            // Adjust size based on whether it's full name or letter
            effect.style.fontSize = textChoice === 'Vazeeda' ? '16px' : '20px';
        }
        
        // Add to container
        cursorEffectsContainer.appendChild(effect);
        
        // Animate and remove after animation completes
        setTimeout(() => {
            effect.remove();
        }, 1500);
    }
    
    // Get random pastel color
    function getRandomColor() {
        const pastelColors = [
            '#ff9999', // Light Pink
            '#ffcccc', // Very Light Pink
            '#ff99cc', // Light Rose
            '#cc99ff', // Light Purple
            '#99ccff', // Light Blue
            '#99ffcc', // Light Mint
            '#ffff99', // Light Yellow
            '#ffcc99', // Light Peach
            '#ff6666', // Brighter Pink
            '#ff66b2', // Bright Rose
            '#b266ff'  // Bright Purple
        ];
        
        return pastelColors[Math.floor(Math.random() * pastelColors.length)];
    }
    
    // Add click event for fireworks/confetti effect
    document.addEventListener('click', function(e) {
        // Don't trigger on form elements to avoid interfering with interactions
        if (e.target.tagName.toLowerCase() === 'input' || 
            e.target.tagName.toLowerCase() === 'button' || 
            e.target.tagName.toLowerCase() === 'a' || 
            e.target.tagName.toLowerCase() === 'textarea') {
            return;
        }
        
        createFireworks(e.clientX, e.clientY);
    });
    
    // Create fireworks effect
    function createFireworks(x, y) {
        // Create 15-20 particles for the firework
        const particleCount = 15 + Math.floor(Math.random() * 5);
        
        for (let i = 0; i < particleCount; i++) {
            createFireworkParticle(x, y);
        }
    }
    
    // Create individual firework particle
    function createFireworkParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'firework-particle';
        
        // Random color for the particle
        particle.style.backgroundColor = getRandomColor();
        
        // Set initial position
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        // Random size between 5-10px
        const size = 5 + Math.random() * 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random direction and speed
        const angle = Math.random() * Math.PI * 2; // Random angle in radians
        const speed = 2 + Math.random() * 4; // Random speed
        const duration = 500 + Math.random() * 1000; // Random duration between 0.5-1.5s
        
        // Calculate velocity
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        
        // Add to container
        cursorEffectsContainer.appendChild(particle);
        
        // Animate the particle
        let startTime = null;
        
        function animateParticle(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = elapsed / duration;
            
            if (progress < 1) {
                // Update position with gravity effect
                const currentX = x + (vx * elapsed);
                const currentY = y + (vy * elapsed) + (0.5 * 0.98 * elapsed * elapsed / 1000); // Add gravity
                
                particle.style.left = `${currentX}px`;
                particle.style.top = `${currentY}px`;
                
                // Fade out towards the end
                if (progress > 0.7) {
                    particle.style.opacity = 1 - ((progress - 0.7) / 0.3);
                }
                
                requestAnimationFrame(animateParticle);
            } else {
                // Remove particle when animation is complete
                particle.remove();
            }
        }
        
        requestAnimationFrame(animateParticle);
    }
    
    // Function to create confetti effect (used for button clicks and completions)
    window.createConfetti = function(x, y) {
        // If no coordinates provided, use center of screen
        if (!x || !y) {
            x = window.innerWidth / 2;
            y = window.innerHeight / 3;
        }
        
        // Create 50-80 confetti pieces
        const confettiCount = 50 + Math.floor(Math.random() * 30);
        
        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                createConfettiPiece(x, y);
            }, i * 10); // Stagger creation for better effect
        }
    };
    
    // Create individual confetti piece
    function createConfettiPiece(x, y) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        
        // Random shape: square, rectangle, or circle
        const shapes = ['square', 'rectangle', 'circle'];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        confetti.classList.add(shape);
        
        // Random color
        confetti.style.backgroundColor = getRandomColor();
        
        // Set initial position with some randomness
        const startX = x + (Math.random() - 0.5) * 100;
        const startY = y - Math.random() * 50; // Start slightly above the target point
        confetti.style.left = `${startX}px`;
        confetti.style.top = `${startY}px`;
        
        // Random size between 5-12px
        const size = 5 + Math.random() * 7;
        confetti.style.width = `${size}px`;
        confetti.style.height = shape === 'rectangle' ? `${size * 2}px` : `${size}px`;
        
        // Random rotation
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        // Add to container
        cursorEffectsContainer.appendChild(confetti);
        
        // Random horizontal direction and speed
        const horizontalDirection = Math.random() - 0.5;
        const horizontalSpeed = 1 + Math.random() * 3;
        
        // Vertical speed (falling)
        const verticalSpeed = 1 + Math.random() * 2;
        
        // Random rotation speed
        const rotationSpeed = (Math.random() - 0.5) * 10;
        
        // Animation duration between 1.5-3.5s
        const duration = 1500 + Math.random() * 2000;
        
        // Animate the confetti
        let startTime = null;
        let currentRotation = Math.random() * 360;
        
        function animateConfetti(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = elapsed / duration;
            
            if (progress < 1) {
                // Update position with swaying effect
                const swayAmount = 50 * Math.sin(elapsed / 200);
                const currentX = startX + (horizontalDirection * horizontalSpeed * elapsed / 20) + swayAmount;
                const currentY = startY + (verticalSpeed * elapsed / 20);
                
                confetti.style.left = `${currentX}px`;
                confetti.style.top = `${currentY}px`;
                
                // Update rotation
                currentRotation += rotationSpeed;
                confetti.style.transform = `rotate(${currentRotation}deg)`;
                
                // Fade out towards the end
                if (progress > 0.7) {
                    confetti.style.opacity = 1 - ((progress - 0.7) / 0.3);
                }
                
                requestAnimationFrame(animateConfetti);
            } else {
                // Remove confetti when animation is complete
                confetti.remove();
            }
        }
        
        requestAnimationFrame(animateConfetti);
    }
});
