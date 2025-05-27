// JavaScript for the Love Journal section

document.addEventListener('DOMContentLoaded', function() {
    // Array of journal entries
    const journalEntries = [
        {
            date: 'June 15, 2024',
            title: 'The Day We Met',
            content: 'Dear Journal, Today I met the most incredible girl named Vazeeda. There was something special about her from the moment our eyes met. Her smile lit up the entire room, and when she laughed, I felt something stir inside me that I\'ve never felt before. We talked for hours, and it felt like minutes. I already can\'t wait to see her again. I think this could be the beginning of something beautiful.'
        },
        {
            date: 'July 4, 2024',
            title: 'Falling Fast',
            content: 'Dear Journal, I kissed Vazeeda tonight under the fireworks. It was perfect - like something out of a movie. The way she looked at me afterward, with those sparkling eyes, I knew I was falling for her. It\'s happening so quickly, but it feels so right. When I\'m with her, everything else fades away. Is this what they mean when they talk about finding "the one"? Because if it is, I think I\'ve found mine.'
        },
        {
            date: 'August 20, 2024',
            title: 'Three Words',
            content: 'Dear Journal, I told Vazeeda I love her today. I\'ve been feeling it for weeks, but I was so nervous to say it out loud. What if it was too soon? What if she didn\'t feel the same way? But when the moment came, the words just flowed out naturally. And the best part? She said it back. I\'ve never felt happiness like this before. Her love is the greatest gift I\'ve ever received.'
        },
        {
            date: 'September 10, 2024',
            title: 'Our First Trip',
            content: 'Dear Journal, Just got back from a weekend getaway with Vazeeda, and I\'m still floating on cloud nine. Watching her experience new places, with that sense of wonder and excitement in her eyes, made me see everything differently. We stayed up late talking about our dreams, our fears, our hopes for the future. I\'ve never felt so connected to another person. I\'m already planning our next adventure together.'
        },
        {
            date: 'October 31, 2024',
            title: 'Halloween Magic',
            content: 'Dear Journal, Vazeeda and I wore matching costumes for Halloween tonight. She looked so adorable, and we laughed all night. I love how she brings out the playful side in me. Before her, I was always so serious, so focused on work and responsibilities. She reminds me to enjoy life, to find magic in ordinary moments. Tonight, watching her dance around in our silly costumes, I thought to myself: this is what happiness feels like.'
        },
        {
            date: 'December 25, 2024',
            title: 'Christmas Morning',
            content: 'Dear Journal, Waking up next to Vazeeda on Christmas morning was the only gift I needed. The way her face lit up when she opened the present I got her - that moment is etched in my memory forever. We spent the day in our pajamas, eating too many cookies and watching holiday movies. It was perfect in its simplicity. I\'m starting to realize that home isn\'t a place; it\'s a person. And Vazeeda is my home.'
        },
        {
            date: 'January 1, 2025',
            title: 'New Year, Same Love',
            content: 'Dear Journal, Rang in the new year with Vazeeda in my arms. As the countdown ended and the fireworks began, I looked into her eyes and made a silent promise: to love her more deeply, to listen more intently, to cherish every moment we have together. This year is going to be our year. I can feel it. We have so many plans, so many dreams to chase together. With her by my side, I feel like anything is possible.'
        },
        {
            date: 'February 14, 2025',
            title: 'Valentine\'s Day',
            content: 'Dear Journal, Our first Valentine\'s Day together was everything I hoped it would be. I surprised Vazeeda with a candlelit dinner, and the way she looked at me across the table made my heart skip a beat. Later, we danced in the living room to our favorite songs. No fancy club, no crowds - just us, swaying together in the soft light. In that moment, I knew with absolute certainty that I want to spend every Valentine\'s Day for the rest of my life with her.'
        },
        {
            date: 'March 20, 2025',
            title: 'Spring Beginnings',
            content: 'Dear Journal, Took Vazeeda for a spontaneous picnic in the park today as the first flowers were blooming. She made flower crowns for both of us, and she looked like a goddess with hers on. We talked about our future together - where we might live, the adventures we want to have, even what we\'d name our children someday. It doesn\'t scare me anymore, thinking that far ahead. With her, the future looks bright and beautiful.'
        },
        {
            date: 'April 15, 2025',
            title: 'One Year Since We Met',
            content: 'Dear Journal, Today marks one year since Vazeeda came into my life, and what a year it\'s been. I\'ve grown so much, loved so deeply, and experienced joy I never knew was possible. We looked through photos from the past year, reminiscing about all our firsts and the countless memories we\'ve created. I\'m overwhelmed with gratitude for her presence in my life. Here\'s to many more years of loving her.'
        },
        {
            date: 'May 26, 2025',
            title: 'Birthday Eve',
            content: 'Dear Journal, Tomorrow is Vazeeda\'s birthday, and I\'ve been planning for weeks. I want to make it so special for her because she deserves the world. I\'ve created this website as a gift, pouring all my love into every detail. I hope she loves it. I hope she feels, even for a moment, the depth of my love for her. Because the truth is, words can never fully express how much she means to me. She is my heart, my soul, my everything.'
        },
        {
            date: 'May 27, 2025',
            title: 'Happy Birthday, My Love',
            content: 'Dear Journal, Today is Vazeeda\'s birthday, and as she reads this, I want her to know: You are the best thing that has ever happened to me. Your love has changed me, healed me, made me better in ways I never thought possible. I celebrate not just the day you were born, but every day I get to love you. Happy birthday, my beautiful Vazeeda. Here\'s to a lifetime of birthdays together. I love you more than words can say.'
        }
    ];

    // Get the journal pages container and controls
    const journalPagesContainer = document.querySelector('.journal-pages');
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');

    // Current page index
    let currentPageIndex = 0;

    // Create and append journal pages
    journalEntries.forEach((entry, index) => {
        const journalPage = document.createElement('div');
        journalPage.classList.add('journal-page');
        if (index === 0) {
            journalPage.classList.add('active');
        }
        
        const journalDate = document.createElement('div');
        journalDate.classList.add('journal-date');
        journalDate.textContent = entry.date;
        
        const journalTitle = document.createElement('h3');
        journalTitle.classList.add('journal-title');
        journalTitle.textContent = entry.title;
        
        const journalContent = document.createElement('div');
        journalContent.classList.add('journal-content');
        journalContent.textContent = entry.content;
        
        journalPage.appendChild(journalDate);
        journalPage.appendChild(journalTitle);
        journalPage.appendChild(journalContent);
        
        journalPagesContainer.appendChild(journalPage);
    });

    // Previous page button click event
    prevPageButton.addEventListener('click', function() {
        if (currentPageIndex > 0) {
            // Hide current page
            document.querySelectorAll('.journal-page')[currentPageIndex].classList.remove('active');
            
            // Show previous page
            currentPageIndex--;
            document.querySelectorAll('.journal-page')[currentPageIndex].classList.add('active');
            
            // Play page flip sound (if available)
            const pageFlipSound = new Audio('audio/page-flip.mp3');
            pageFlipSound.volume = 0.5;
            pageFlipSound.play().catch(error => console.log('Audio play failed:', error));
        }
    });

    // Next page button click event
    nextPageButton.addEventListener('click', function() {
        const totalPages = journalEntries.length;
        
        if (currentPageIndex < totalPages - 1) {
            // Hide current page
            document.querySelectorAll('.journal-page')[currentPageIndex].classList.remove('active');
            
            // Show next page
            currentPageIndex++;
            document.querySelectorAll('.journal-page')[currentPageIndex].classList.add('active');
            
            // Play page flip sound (if available)
            const pageFlipSound = new Audio('audio/page-flip.mp3');
            pageFlipSound.volume = 0.5;
            pageFlipSound.play().catch(error => console.log('Audio play failed:', error));
        }
    });

    // Message in a Bottle functionality
    const bottle = document.querySelector('.bottle');
    const bottleMessageContent = document.getElementById('bottle-message-content');
    
    if (bottle && bottleMessageContent) {
        bottle.addEventListener('click', function() {
            // Create bottle message content
            bottleMessageContent.innerHTML = '';
            
            const bottleMessageTitle = document.createElement('h3');
            bottleMessageTitle.textContent = 'A Message Just For You';
            
            const bottleMessageText = document.createElement('div');
            bottleMessageText.classList.add('bottle-message-text');
            bottleMessageText.innerHTML = 'My dearest Vazeeda,<br><br>If you\'re reading this, you\'ve found my message in a bottle. Consider this a little secret between us - a reminder of my love that you can come back to whenever you need it.<br><br>I want you to know that you are the most precious person in my life. Your smile is my sunrise, your laugh is my favorite melody, and your love is the greatest blessing I\'ve ever known.<br><br>No matter where life takes us, my heart will always find its way back to you. You are my anchor, my safe harbor, my home.<br><br>I love you today, tomorrow, and for all of our tomorrows to come.<br><br>Forever yours.';
            
            bottleMessageContent.appendChild(bottleMessageTitle);
            bottleMessageContent.appendChild(bottleMessageText);
            
            // Show bottle message
            bottleMessageContent.classList.remove('hidden');
            setTimeout(() => {
                bottleMessageContent.classList.add('show');
                
                // Create water ripple effect
                const oceanContainer = document.querySelector('.ocean-container');
                const ripple = document.createElement('div');
                ripple.style.position = 'absolute';
                ripple.style.width = '50px';
                ripple.style.height = '50px';
                ripple.style.border = '2px solid rgba(255, 255, 255, 0.7)';
                ripple.style.borderRadius = '50%';
                ripple.style.top = '50%';
                ripple.style.left = '50%';
                ripple.style.transform = 'translate(-50%, -50%)';
                ripple.style.animation = 'ripple 2s linear';
                
                oceanContainer.appendChild(ripple);
                
                // Remove ripple after animation
                setTimeout(() => {
                    ripple.remove();
                }, 2000);
            }, 100);
        });
    }
});

// Add ripple animation to CSS
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            0% { width: 0; height: 0; opacity: 1; }
            100% { width: 200px; height: 200px; opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});
