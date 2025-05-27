// Main JavaScript file for Vazeeda's Birthday Website

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize background music
    const bgMusic = new Howl({
        src: ['audio/background-music.mp3'],
        loop: true,
        volume: 0.5,
        autoplay: false
    });

    // Music toggle functionality
    const musicToggle = document.getElementById('music-toggle');
    let isMusicPlaying = false;

    musicToggle.addEventListener('click', function() {
        if (isMusicPlaying) {
            bgMusic.pause();
            musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
            bgMusic.play();
            musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
        isMusicPlaying = !isMusicPlaying;
    });

    // Enter button functionality
    const enterButton = document.getElementById('enter-button');
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainContent = document.getElementById('main-content');

    enterButton.addEventListener('click', function() {
        // Start music if not already playing
        if (!isMusicPlaying) {
            bgMusic.play();
            isMusicPlaying = true;
            musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
        }

        // Hide welcome screen and show main content
        welcomeScreen.style.display = 'none';
        mainContent.classList.remove('hidden');

        // Initialize scroll animations
        initScrollAnimations();

        // Start floating hearts animation
        createFloatingHearts();

        // Initialize cursor trail
        initCursorTrail();
    });

    // Initialize floating hearts on welcome screen
    function createFloatingHeartsWelcome() {
        const heartsContainer = document.querySelector('.hearts-container');
        const numHearts = 20;

        for (let i = 0; i < numHearts; i++) {
            const heart = document.createElement('div');
            heart.classList.add('floating-heart');
            heart.style.width = Math.random() * 30 + 10 + 'px';
            heart.style.height = heart.style.width;
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = Math.random() * 10 + 5 + 's';
            heart.style.animationDelay = Math.random() * 5 + 's';
            heartsContainer.appendChild(heart);
        }
    }

    // Create floating hearts throughout the page
    function createFloatingHearts() {
        const sections = document.querySelectorAll('.section');
        
        sections.forEach(section => {
            section.style.position = 'relative';
            section.style.overflow = 'hidden';
            
            const numHearts = 10;
            
            for (let i = 0; i < numHearts; i++) {
                const heart = document.createElement('div');
                heart.classList.add('floating-heart');
                heart.style.width = Math.random() * 20 + 10 + 'px';
                heart.style.height = heart.style.width;
                heart.style.left = Math.random() * 100 + '%';
                heart.style.bottom = -50 + 'px';
                heart.style.animationDuration = Math.random() * 10 + 5 + 's';
                heart.style.animationDelay = Math.random() * 5 + 's';
                section.appendChild(heart);
            }
        });
    }

    // Initialize cursor trail effect
    function initCursorTrail() {
        document.addEventListener('mousemove', function(e) {
            if (Math.random() > 0.9) { // Only create hearts occasionally
                const heart = document.createElement('div');
                heart.classList.add('cursor-trail');
                heart.style.left = e.pageX + 'px';
                heart.style.top = e.pageY + 'px';
                document.body.appendChild(heart);
                
                // Remove heart after animation completes
                setTimeout(() => {
                    heart.remove();
                }, 1000);
            }
        });
    }

    // Initialize scroll animations
    function initScrollAnimations() {
        // Add animation classes to elements
        const fadeElements = document.querySelectorAll('.section-title, .reason-card, .timeline-item, .envelope, .gallery-item, .vision-item');
        fadeElements.forEach(element => {
            element.classList.add('fade-in');
        });

        // Create an Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // For timeline items, add active class
                    if (entry.target.classList.contains('timeline-item')) {
                        entry.target.classList.add('active');
                    }
                    
                    // For reason cards, add active class with delay
                    if (entry.target.classList.contains('reason-card')) {
                        setTimeout(() => {
                            entry.target.classList.add('active');
                        }, Math.random() * 500);
                    }
                }
            });
        }, { threshold: 0.1 });

        // Observe each element
        fadeElements.forEach(element => {
            observer.observe(element);
        });

        // Create falling petals on scroll
        window.addEventListener('scroll', createFallingPetals);
    }

    // Create falling petals effect
    function createFallingPetals() {
        // Only create petals occasionally
        if (Math.random() > 0.7) {
            const petal = document.createElement('div');
            petal.classList.add('petal');
            petal.style.width = Math.random() * 20 + 10 + 'px';
            petal.style.height = petal.style.width;
            petal.style.left = Math.random() * 100 + '%';
            petal.style.top = '0';
            petal.style.animationDuration = Math.random() * 5 + 5 + 's';
            document.body.appendChild(petal);
            
            // Remove petal after animation completes
            setTimeout(() => {
                petal.remove();
            }, 10000);
        }
    }

    // Create confetti effect
    function createConfetti(x, y) {
        const colors = ['#ff6b6b', '#ff9999', '#ffb6b6', '#ffd1d1', '#ffe6e6', '#ffffff'];
        const numConfetti = 50;
        
        for (let i = 0; i < numConfetti; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = (x + (Math.random() * 200 - 100)) + 'px';
            confetti.style.top = (y + (Math.random() * 50 - 25)) + 'px';
            confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
            document.body.appendChild(confetti);
            
            // Remove confetti after animation completes
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }

    // Create fireworks effect
    function createFireworks(x, y) {
        const colors = ['#ff6b6b', '#ff9999', '#ffb6b6', '#ffd1d1', '#ffe6e6', '#ffffff'];
        const numParticles = 30;
        
        for (let i = 0; i < numParticles; i++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 100 + 50;
            const firework = document.createElement('div');
            firework.classList.add('firework');
            firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            firework.style.left = x + 'px';
            firework.style.top = y + 'px';
            firework.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
            document.body.appendChild(firework);
            
            // Remove firework after animation completes
            setTimeout(() => {
                firework.remove();
            }, 1000);
        }
    }

    // Initialize welcome screen hearts
    createFloatingHeartsWelcome();

    // Export functions for use in other scripts
    window.createConfetti = createConfetti;
    window.createFireworks = createFireworks;
});
