// Future Section Placeholder
document.addEventListener('DOMContentLoaded', function() {
    // Intercept and prevent 404 errors for missing future images
    const originalFetch = window.fetch;
    window.fetch = function(url, options) {
        if (typeof url === 'string' && url.includes('/images/future/')) {
            // Return a resolved promise with a mock response for future images
            return Promise.resolve({
                ok: true,
                status: 200,
                json: () => Promise.resolve({}),
                text: () => Promise.resolve('')
            });
        }
        // Otherwise, use the original fetch
        return originalFetch.apply(this, arguments);
    };
    // Check if future section exists
    const futureSection = document.querySelector('.future-section');
    if (!futureSection) return;
    
    // Create placeholders for missing future images
    const futureImages = [
        { id: 'celebrate', title: 'Celebrating Life Together' },
        { id: 'travel', title: 'Exploring the World' },
        { id: 'home', title: 'Building Our Home' },
        { id: 'old', title: 'Growing Old Together' },
        { id: 'family', title: 'Creating a Family' },
        { id: 'support', title: 'Supporting Each Other' }
    ];
    
    const futureContainer = document.querySelector('.future-container') || document.createElement('div');
    if (!futureContainer.classList.contains('future-container')) {
        futureContainer.classList.add('future-container');
        futureSection.appendChild(futureContainer);
    }
    
    // Clear existing content
    futureContainer.innerHTML = '';
    
    // Create placeholder cards
    futureImages.forEach(image => {
        const card = document.createElement('div');
        card.classList.add('future-card');
        card.id = image.id;
        
        // Create gradient background instead of missing image
        card.style.background = `linear-gradient(135deg, #ff3366, #9933ff)`;
        card.style.height = '200px';
        card.style.borderRadius = '10px';
        card.style.display = 'flex';
        card.style.alignItems = 'center';
        card.style.justifyContent = 'center';
        card.style.margin = '15px';
        card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        
        const title = document.createElement('h3');
        title.textContent = image.title;
        title.style.color = 'white';
        title.style.textShadow = '0 2px 4px rgba(0,0,0,0.3)';
        title.style.fontFamily = "'Montserrat', sans-serif";
        
        card.appendChild(title);
        futureContainer.appendChild(card);
        
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});
