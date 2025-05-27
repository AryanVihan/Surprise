// Open When Letters Script
document.addEventListener('DOMContentLoaded', function() {
    // Get all letter wrappers
    const letterWrappers = document.querySelectorAll('.letter-wrapper');
    
    // Add click event to each letter
    letterWrappers.forEach(wrapper => {
        wrapper.addEventListener('click', function() {
            // Toggle open class
            this.classList.toggle('open');
            
            // If letter is being closed, remove animation classes to reset for next open
            if (!this.classList.contains('open')) {
                const letterContent = this.querySelector('.letter-content');
                const paragraphs = letterContent.querySelectorAll('p');
                
                // Reset animations
                paragraphs.forEach(p => {
                    p.style.animation = 'none';
                    p.offsetHeight; // Trigger reflow
                    p.style.animation = null;
                });
            } else {
                // Apply sequential animation to paragraphs when opening
                const paragraphs = this.querySelectorAll('.letter-content p');
                paragraphs.forEach((p, index) => {
                    // Remove the default animation
                    p.style.animation = 'none';
                    p.style.whiteSpace = 'normal';
                    p.style.overflow = 'visible';
                    p.style.borderRight = 'none';
                    
                    // Apply fade-in animation with delay based on index
                    p.style.opacity = '0';
                    p.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        p.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        p.style.opacity = '1';
                        p.style.transform = 'translateY(0)';
                    }, 500 + (index * 300)); // Stagger the animations
                });
                
                // Apply special animation to signature
                const signature = this.querySelector('.letter-signature');
                if (signature) {
                    signature.style.opacity = '0';
                    signature.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        signature.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                        signature.style.opacity = '1';
                        signature.style.transform = 'translateY(0)';
                    }, 500 + (paragraphs.length * 300)); // After all paragraphs
                }
            }
        });
        
        // Add hover effects for envelope flap
        const envelope = wrapper.querySelector('.envelope');
        const flap = wrapper.querySelector('.envelope-flap');
        
        envelope.addEventListener('mouseenter', () => {
            flap.style.transform = 'rotateX(20deg)';
        });
        
        envelope.addEventListener('mouseleave', () => {
            if (!wrapper.classList.contains('open')) {
                flap.style.transform = 'rotateX(0)';
            }
        });
    });
});
