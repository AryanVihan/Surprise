// JavaScript for the Love Letter Generator section

document.addEventListener('DOMContentLoaded', function() {
    // Arrays of letter components
    const letterIntros = [
        "My dearest Vazeeda,",
        "To the love of my life,",
        "My beautiful Vazeeda,",
        "To my sunshine,",
        "My darling Vazeeda,",
        "To the one who holds my heart,"
    ];

    const letterBodies = [
        "Every day with you feels like a gift. Your smile brightens my darkest days, and your laugh is the sweetest melody I've ever heard. I find myself falling deeper in love with you with each passing moment.",
        "I never knew what love truly meant until I met you. You've shown me a world filled with joy, passion, and endless possibilities. My heart belongs to you, now and forever.",
        "When I look into your eyes, I see my future, my dreams, and everything I've ever wanted. You are my safe haven, my confidante, and my best friend. I cherish every moment we spend together.",
        "You are the missing piece I never knew I needed. With you, life is more vibrant, more meaningful, and more beautiful. I am endlessly grateful that our paths crossed and our hearts connected.",
        "In a world full of uncertainty, you are my constant. Your love gives me strength, your wisdom guides me, and your kindness inspires me to be a better person every day.",
        "Sometimes I catch myself watching you when you're not looking, amazed that someone so perfect could love me. You've taught me what it means to love unconditionally and to be loved in return."
    ];

    const letterMiddles = [
        "I love the way you scrunch your nose when you're concentrating, how your eyes light up when you're excited, and how you always know exactly what to say to make me smile. These little things make my heart overflow with love for you.",
        "Remember that time we stayed up all night talking about our dreams? Or when we got caught in the rain and danced instead of running for shelter? These memories are treasures I hold close to my heart.",
        "You accept me for who I am, flaws and all. You celebrate my successes as if they were your own and lift me up when I fall. With you, I've found a love I never thought possible.",
        "The way you care for others, your passion for life, your strength in the face of challenges - these are just a few of the countless reasons why I fall more in love with you each day.",
        "When I think about our future together, my heart swells with excitement. I can't wait to create more memories, face new adventures, and build our dreams side by side.",
        "You've shown me what it means to truly connect with someone - mind, body, and soul. The bond we share is something rare and precious, something I will never take for granted."
    ];

    const letterClosings = [
        "You are the love of my life, the keeper of my heart, and the person I want to share all my tomorrows with. I love you more than words can express.",
        "Thank you for loving me, for choosing me, and for making every day an adventure. My heart is yours, completely and eternally.",
        "I promise to stand by your side through all of life's joys and challenges, to love you fiercely and tenderly, and to cherish every moment we share together.",
        "You are my greatest blessing, my answered prayer, and my dream come true. I am the luckiest person in the world to call you mine.",
        "No matter what the future holds, know that my love for you will never waver. You are my forever, my always, my everything.",
        "In your arms, I've found my home. In your heart, I've found my peace. In your love, I've found my forever. I love you endlessly."
    ];

    const letterSignatures = [
        "Forever yours,",
        "With all my love,",
        "Yours always,",
        "Loving you always,",
        "Eternally yours,",
        "All my heart,"
    ];

    // Get the letter container and generate button
    const typedLetterContainer = document.getElementById('typed-letter-container');
    const generateLetterButton = document.getElementById('generate-letter');

    // Typed.js instance
    let typedInstance = null;

    // Generate a random love letter
    function generateLoveLetter() {
        // Destroy previous Typed instance if it exists
        if (typedInstance) {
            typedInstance.destroy();
        }
        
        // Clear the container
        typedLetterContainer.innerHTML = '';
        
        // Get random components
        const intro = letterIntros[Math.floor(Math.random() * letterIntros.length)];
        const body = letterBodies[Math.floor(Math.random() * letterBodies.length)];
        const middle = letterMiddles[Math.floor(Math.random() * letterMiddles.length)];
        const closing = letterClosings[Math.floor(Math.random() * letterClosings.length)];
        const signature = letterSignatures[Math.floor(Math.random() * letterSignatures.length)];
        
        // Combine components
        const letter = `${intro}<br><br>${body}<br><br>${middle}<br><br>${closing}<br><br>${signature}<br>Me`;
        
        // Create Typed.js instance
        typedInstance = new Typed('#typed-letter-container', {
            strings: [letter],
            typeSpeed: 30,
            showCursor: true,
            cursorChar: '|',
            onComplete: function() {
                // Add heart animation when typing is complete
                const heart = document.createElement('div');
                heart.innerHTML = '❤️';
                heart.style.display = 'inline-block';
                heart.style.marginLeft = '10px';
                heart.classList.add('heartbeat');
                typedLetterContainer.appendChild(heart);
            }
        });
    }

    // Generate letter button click event
    generateLetterButton.addEventListener('click', function() {
        generateLoveLetter();
        
        // Create confetti effect
        const rect = typedLetterContainer.getBoundingClientRect();
        window.createConfetti(rect.left + rect.width / 2, rect.top);
    });

    // Generate initial letter
    generateLoveLetter();
});
