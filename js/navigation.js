// Navigation Script
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const navbar = document.getElementById('romantic-navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const mainContent = document.getElementById('main-content');
    
    // Create scroll to top button if we're on a page with sections
    if (mainContent) {
        const scrollTopButton = document.createElement('div');
        scrollTopButton.className = 'scroll-top';
        scrollTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
        mainContent.appendChild(scrollTopButton);
        
        // Show/hide scroll to top button
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                scrollTopButton.classList.add('show');
            } else {
                scrollTopButton.classList.remove('show');
            }
        });
        
        // Scroll to top when clicking the button
        scrollTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Toggle mobile navigation
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            const navLinksContainer = document.querySelector('.nav-links');
            if (navLinksContainer) {
                navLinksContainer.classList.toggle('active');
                
                // Change icon based on menu state
                const isOpen = navLinksContainer.classList.contains('active');
                navToggle.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
            }
        });
    }
    
    // Handle nav links for same-page sections (like on index.html)
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only prevent default for same-page links (those starting with #)
            if (href.startsWith('#')) {
                e.preventDefault();
                
                // Get the target section
                const targetSection = document.querySelector(href);
                
                if (targetSection) {
                    // Close mobile menu if open
                    const navLinksContainer = document.querySelector('.nav-links');
                    if (navLinksContainer) {
                        navLinksContainer.classList.remove('active');
                    }
                    if (navToggle) {
                        navToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                    
                    // Smooth scroll to target
                    window.scrollTo({
                        top: targetSection.offsetTop - 70, // Adjust for navbar height
                        behavior: 'smooth'
                    });
                }
            } else {
                // For links to other pages, just let the browser handle it normally
                // But still close the mobile menu
                const navLinksContainer = document.querySelector('.nav-links');
                if (navLinksContainer) {
                    navLinksContainer.classList.remove('active');
                }
            }
        });
    });
    
    // Sticky navbar on scroll
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('navbar-sticky');
            } else {
                navbar.classList.remove('navbar-sticky');
            }
        });
    }
    
    // Set active class on current page's nav link
    function setActiveNavLink() {
        const currentPath = window.location.pathname;
        const filename = currentPath.split('/').pop() || 'index.html';
        
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref === filename || (filename === 'index.html' && linkHref === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    // Call setActiveNavLink when the page loads
    setActiveNavLink();
});
