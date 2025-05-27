// Side Navigation Functionality
document.addEventListener('DOMContentLoaded', function() {
    const sideNav = document.getElementById('side-nav');
    const mainContent = document.getElementById('main-content');
    
    // Add navigation toggle button
    const navToggle = document.createElement('button');
    navToggle.className = 'nav-toggle';
    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.appendChild(navToggle);
    
    // Add close button to side nav
    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-btn';
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    
    // Add close button to side nav header
    const sideNavHeader = document.querySelector('.side-nav-header');
    if (sideNavHeader) {
        sideNavHeader.appendChild(closeBtn);
    }
    
    // Toggle side navigation
    navToggle.addEventListener('click', function() {
        sideNav.classList.add('open');
    });
    
    // Close side navigation
    closeBtn.addEventListener('click', function() {
        sideNav.classList.remove('open');
    });
    
    // Close side nav when clicking outside
    document.addEventListener('click', function(event) {
        if (!sideNav.contains(event.target) && event.target !== navToggle && sideNav.classList.contains('open')) {
            sideNav.classList.remove('open');
        }
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close the side nav
            sideNav.classList.remove('open');
            
            // Get the target section id
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Smooth scroll to the section
                window.scrollTo({
                    top: targetSection.offsetTop - 80, // Account for any fixed headers
                    behavior: 'smooth'
                });
                
                // Highlight the section with a subtle animation
                targetSection.classList.add('highlight-section');
                setTimeout(() => {
                    targetSection.classList.remove('highlight-section');
                }, 1500);
            }
        });
    });
    
    // Add highlight section animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes highlight-pulse {
            0% { box-shadow: 0 0 0 0 rgba(142, 45, 226, 0.4); }
            70% { box-shadow: 0 0 0 20px rgba(142, 45, 226, 0); }
            100% { box-shadow: 0 0 0 0 rgba(142, 45, 226, 0); }
        }
        
        .highlight-section {
            animation: highlight-pulse 1.5s ease-out;
        }
    `;
    document.head.appendChild(style);
});
