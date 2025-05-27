// Confetti Triggers Script
document.addEventListener('DOMContentLoaded', function() {
    // Add confetti effects to buttons and interactive elements
    setupConfettiTriggers();
    
    // Function to set up confetti triggers
    function setupConfettiTriggers() {
        // Add confetti to all buttons with class 'heart-button'
        document.querySelectorAll('.heart-button').forEach(button => {
            button.addEventListener('click', function(e) {
                // Create confetti at the button's position
                const rect = button.getBoundingClientRect();
                const x = rect.left + rect.width / 2;
                const y = rect.top + rect.height / 2;
                window.createConfetti(x, y);
            });
        });
        
        // Add confetti to quiz submit button
        const quizSubmitBtn = document.getElementById('submit-answer');
        if (quizSubmitBtn) {
            quizSubmitBtn.addEventListener('click', function() {
                // Smaller confetti burst on each question
                const rect = quizSubmitBtn.getBoundingClientRect();
                const x = rect.left + rect.width / 2;
                const y = rect.top + rect.height / 2;
                window.createConfetti(x, y);
            });
        }
        
        // Add confetti to quiz completion
        const showResultsBtn = document.getElementById('show-results');
        if (showResultsBtn) {
            showResultsBtn.addEventListener('click', function() {
                // Big confetti burst on quiz completion
                setTimeout(() => {
                    window.createConfetti();
                }, 500);
            });
        }
        
        // Add confetti to envelope opening in letters section
        document.querySelectorAll('.envelope').forEach(envelope => {
            envelope.addEventListener('click', function() {
                // Check if this is the first click (envelope opening)
                if (!envelope.classList.contains('opened')) {
                    const rect = envelope.getBoundingClientRect();
                    const x = rect.left + rect.width / 2;
                    const y = rect.top + rect.height / 2;
                    
                    // Delay confetti to match envelope opening animation
                    setTimeout(() => {
                        window.createConfetti(x, y);
                    }, 300);
                }
            });
        });
        
        // Add confetti to section cards in navigation
        document.querySelectorAll('.section-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                // Small sparkle effect on hover
                const rect = card.getBoundingClientRect();
                const x = rect.left + rect.width / 2;
                const y = rect.top + rect.height / 2;
                
                // Create a mini confetti effect
                createMiniConfetti(x, y);
            });
        });
    }
    
    // Function to create a smaller confetti effect for hover states
    function createMiniConfetti(x, y) {
        // Create 5-10 particles
        const particleCount = 5 + Math.floor(Math.random() * 5);
        
        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'firework-particle';
                
                // Random pastel color
                const hue = Math.floor(Math.random() * 360);
                particle.style.backgroundColor = `hsl(${hue}, 100%, 80%)`;
                
                // Set position
                particle.style.left = `${x}px`;
                particle.style.top = `${y}px`;
                
                // Random size (smaller than regular fireworks)
                const size = 3 + Math.random() * 3;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                
                // Add to container
                document.querySelector('.cursor-effects-container').appendChild(particle);
                
                // Animate and remove
                const angle = Math.random() * Math.PI * 2;
                const speed = 1 + Math.random() * 2;
                const duration = 300 + Math.random() * 500;
                
                let startTime = null;
                
                function animate(timestamp) {
                    if (!startTime) startTime = timestamp;
                    const elapsed = timestamp - startTime;
                    const progress = elapsed / duration;
                    
                    if (progress < 1) {
                        const distance = speed * elapsed / 20;
                        const currentX = x + Math.cos(angle) * distance;
                        const currentY = y + Math.sin(angle) * distance;
                        
                        particle.style.left = `${currentX}px`;
                        particle.style.top = `${currentY}px`;
                        
                        if (progress > 0.7) {
                            particle.style.opacity = 1 - ((progress - 0.7) / 0.3);
                        }
                        
                        requestAnimationFrame(animate);
                    } else {
                        particle.remove();
                    }
                }
                
                requestAnimationFrame(animate);
            }, i * 50);
        }
    }
});
