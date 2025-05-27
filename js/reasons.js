// 100 Reasons Why I Love You Script
document.addEventListener('DOMContentLoaded', function() {
    // Arrays of reasons
    const reasons = [
        // 1-25
        "Your beautiful smile lights up my world every day.",
        "The way your eyes sparkle when you're excited about something.",
        "Your kindness and compassion towards everyone you meet.",
        "How you always know exactly what to say to make me feel better.",
        "Your incredible sense of humor that never fails to make me laugh.",
        "The way you support me in everything I do.",
        "Your intelligence and how you're always eager to learn new things.",
        "The sound of your laughter, which is my favorite melody.",
        "How passionate you are about the things you care about.",
        "Your strength in facing challenges head-on.",
        "The way you dance like nobody's watching.",
        "How you remember the little details about things I mention.",
        "Your creativity and the way you see beauty in everything.",
        "The way you make even ordinary moments feel special.",
        "How you always encourage me to be my best self.",
        "Your patience, especially when I'm being difficult.",
        "The way you care for others with such genuine concern.",
        "How you're not afraid to be silly and playful.",
        "Your determination to achieve your goals.",
        "The way you stand up for what you believe in.",
        "How you make our house feel like a home.",
        "Your thoughtfulness in the gifts you choose.",
        "The way you listen, truly listen, when I talk.",
        "How you're always up for an adventure.",
        "Your honesty, even when the truth is hard.",
        
        // 26-50
        "The way you look at me that makes me feel like the luckiest person alive.",
        "How you're not afraid to show your emotions.",
        "Your ability to find solutions to problems I thought were unsolvable.",
        "The way you care about the environment and our future.",
        "How you make me feel safe and loved.",
        "Your amazing cooking skills that nourish both body and soul.",
        "The way you sing in the shower, thinking no one can hear.",
        "How you always see the good in people.",
        "Your infectious enthusiasm for life.",
        "The way you hold my hand, like it's the most natural thing in the world.",
        "How you've helped me become a better person.",
        "Your resilience in the face of adversity.",
        "The way you embrace new experiences with an open mind.",
        "How you respect and value my opinions, even when we disagree.",
        "Your ability to find joy in the simplest things.",
        "The way you make everyone around you feel important.",
        "How you're always there for your friends and family.",
        "Your generosity with your time and love.",
        "The way you apologize when you're wrong.",
        "How you forgive so easily and completely.",
        "Your cute little habits that I find endearing.",
        "The way you look in the morning light.",
        "How you're not afraid to dream big.",
        "Your compassion for those less fortunate.",
        "The way you've embraced my family as your own.",
        
        // 51-75
        "How you challenge me to think differently.",
        "Your ability to stay calm in stressful situations.",
        "The way you celebrate my victories, big and small.",
        "How you comfort me during difficult times.",
        "Your unique perspective that helps me see things in a new light.",
        "The way you take care of yourself and your health.",
        "How you've grown and evolved since we first met.",
        "Your willingness to try new foods and experiences.",
        "The way you express your love in countless little ways.",
        "How you make me laugh until my sides hurt.",
        "Your dedication to your work and passions.",
        "The way you dance with me in the kitchen.",
        "How you remember important dates and anniversaries.",
        "Your ability to make friends wherever you go.",
        "The way you stand up for those who can't stand up for themselves.",
        "How you've taught me to appreciate the present moment.",
        "Your courage to face your fears.",
        "The way you take pride in your accomplishments without being boastful.",
        "How you've helped me overcome my insecurities.",
        "Your ability to see beauty in imperfection.",
        "The way you make me feel understood.",
        "How you inspire me to be more creative.",
        "Your wisdom that seems beyond your years.",
        "The way you handle disappointment with grace.",
        "How you've shown me what true love really means.",
        
        // 76-100
        "Your ability to make the best out of any situation.",
        "The way you care for plants and animals with such tenderness.",
        "How you've introduced me to new music, books, and ideas.",
        "Your sense of style and the way you express yourself through fashion.",
        "The way you defend me when I'm not around.",
        "How you've helped me reconnect with parts of myself I had forgotten.",
        "Your ability to make even the most mundane tasks fun.",
        "The way you look at the stars with wonder.",
        "How you've taught me to be more patient.",
        "Your ability to give thoughtful advice.",
        "The way you respect my need for space sometimes.",
        "How you've shown me new ways to see the world.",
        "Your ability to make me feel special every single day.",
        "The way you remember stories from our past together.",
        "How you've helped me become more confident.",
        "Your ability to make peace in difficult situations.",
        "The way you take care of me when I'm sick.",
        "How you've introduced me to your culture and traditions.",
        "Your ability to make difficult decisions with clarity.",
        "The way you always try to understand my perspective.",
        "How you've supported my dreams, even the wildest ones.",
        "Your ability to make me feel beautiful inside and out.",
        "The way you've grown with me through all of life's changes.",
        "How you make every day an adventure.",
        "Because loving you is the easiest thing I've ever done, and I'll keep doing it for the rest of my life."
    ];
    
    // Get the list containers
    const reasonsList1 = document.getElementById('reasons-list-1');
    const reasonsList2 = document.getElementById('reasons-list-2');
    const reasonsList3 = document.getElementById('reasons-list-3');
    const reasonsList4 = document.getElementById('reasons-list-4');
    
    // Populate the lists
    populateReasonsList(reasonsList1, reasons.slice(0, 25));
    populateReasonsList(reasonsList2, reasons.slice(25, 50));
    populateReasonsList(reasonsList3, reasons.slice(50, 75));
    populateReasonsList(reasonsList4, reasons.slice(75, 100));
    
    // Function to populate a reasons list
    function populateReasonsList(listElement, reasonsArray) {
        reasonsArray.forEach((reason, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = reason;
            
            // Add milestone class to special numbers (multiples of 10 and 100)
            const absoluteIndex = index + (listElement.id === 'reasons-list-1' ? 0 : 
                                         listElement.id === 'reasons-list-2' ? 25 : 
                                         listElement.id === 'reasons-list-3' ? 50 : 75);
            
            if ((absoluteIndex + 1) % 10 === 0 || absoluteIndex + 1 === 100) {
                listItem.classList.add('milestone');
            }
            
            listElement.appendChild(listItem);
        });
    }
    
    // Add animation to reasons when they come into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const reasonObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class with delay based on index
                const reasonItems = entry.target.querySelectorAll('li');
                reasonItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('reason-visible');
                    }, index * 100);
                });
                
                // Unobserve after animation is applied
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe each reasons list wrapper
    document.querySelectorAll('.reasons-list-wrapper').forEach(wrapper => {
        reasonObserver.observe(wrapper);
    });
});
