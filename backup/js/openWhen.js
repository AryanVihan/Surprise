// JavaScript for the Open When Letters section

document.addEventListener('DOMContentLoaded', function() {
    // Array of Open When letters
    const openWhenLetters = [
        {
            title: 'Open When You Miss Me',
            message: 'My dearest Vazeeda, if you\'re reading this, it means you\'re missing me. Know that I\'m missing you too, every second we\'re apart. Close your eyes and remember the feeling of my arms around you, the sound of my laughter, the warmth of my hand in yours. I\'m never truly far away because a piece of my heart is always with you. Until we\'re together again, hold this letter close and know that I\'m counting down the moments until I see your beautiful smile again.'
        },
        {
            title: 'Open When You\'re Sad',
            message: 'My love, I wish I could be there to wipe away your tears and hold you close. Whatever is making you sad right now, remember that it\'s temporary. Your smile is too beautiful to be hidden behind tears for long. You are stronger than you know, braver than you believe, and more loved than you can imagine. Take a deep breath, put on your favorite song, and remember that better days are coming. And when they do, I\'ll be there to celebrate them with you. Until then, let this letter be my arms around you, comforting you when you need it most.'
        },
        {
            title: 'Open When You Need Motivation',
            message: 'Vazeeda, you are capable of amazing things. I\'ve seen your determination, your passion, and your incredible ability to overcome obstacles. Whatever challenge you\'re facing right now, I believe in you completely. Remember all the times you thought you couldn\'t do something, but you did it anyway? This is just another mountain for you to climb, and the view from the top will be worth it. Take it one step at a time, and know that I\'m cheering you on every step of the way. You\'ve got this, my love!'
        },
        {
            title: 'Open When You Need a Laugh',
            message: 'Remember that time we tried to cook together and nearly burned down the kitchen? Or when we got lost on our hike and ended up walking in circles for an hour? How about when you tried to teach me to dance and I stepped on your toes at least twenty times? Our life together is filled with these perfectly imperfect moments that make me laugh until my sides hurt. I hope thinking about them brings a smile to your face now. Your laugh is my favorite sound in the world, and I can\'t wait to hear it again. Until then, here\'s a virtual tickle fight! *tickle tickle*'
        },
        {
            title: 'Open When You Can\'t Sleep',
            message: 'As you lie awake reading this, imagine I\'m there beside you, stroking your hair and whispering sweet nothings in your ear. The night may seem long, but it\'s just another passage of time bringing us closer to our next moment together. Close your eyes and listen to the rhythm of your breathing. Think of our favorite peaceful place - that beach at sunset, the stars above us, the sound of waves gently lapping at the shore. You are safe, you are loved, and tomorrow is a new day full of possibilities. Sweet dreams, my love. I\'ll meet you in our dreams.'
        },
        {
            title: 'Open When You Need to Know How Much I Love You',
            message: 'Vazeeda, my love for you is boundless. It\'s in every sunrise that reminds me of your smile, every star that can\'t compare to the sparkle in your eyes. It\'s in the songs that make me think of you, the places we\'ve been together, and the future we\'re building. I love you in ways I never knew were possible before I met you. I love your strength and your vulnerability, your kindness and your passion, your silly jokes and your profound thoughts. I love you on your brightest days and your darkest nights. I love you completely, unconditionally, and eternally. Never doubt, not even for a moment, how deeply you are loved.'
        },
        {
            title: 'Open When It\'s Your Birthday',
            message: 'Happy Birthday, my beautiful Vazeeda! Today the world celebrates the most incredible gift it has ever received - you. Your birthday is my favorite day of the year because it\'s the day that brought you into this world and eventually into my life. I wish I could give you the moon and stars, but for now, please accept this letter as a token of my endless love and admiration for you. May this year bring you all the joy, success, and love that you deserve. You make every day feel like a celebration just by being you. I love you more than words can express, birthday girl!'
        },
        {
            title: 'Open When You\'re Feeling Stressed',
            message: 'Take a deep breath, my love. In through your nose, out through your mouth. Again. And again. Feel your shoulders relax, your jaw unclench. Whatever is weighing on you right now, remember that you don\'t have to carry it alone. I\'m here to share your burdens, to listen without judgment, to support you however you need. You\'ve overcome so much already, and you\'ll overcome this too. For now, be gentle with yourself. Take a break, have a cup of tea, go for a walk, or just close your eyes for five minutes. The world can wait. Your wellbeing comes first. Always.'
        },
        {
            title: 'Open When You Need Courage',
            message: 'Vazeeda, you are the bravest person I know. Your courage isn\'t about not feeling fear - it\'s about feeling it and moving forward anyway. Remember all the times you\'ve faced your fears and emerged stronger on the other side? This situation is no different. Take a deep breath, stand tall, and face this challenge with the same determination that I\'ve seen in you so many times before. And know that no matter what happens, I\'m standing right beside you, holding your hand, believing in you completely. You\'ve got this, my brave, beautiful love.'
        },
        {
            title: 'Open When You Need to Smile',
            message: 'Did you know that your smile is my favorite sight in the whole world? It lights up your face and warms my heart like nothing else. So here are some things to make you smile right now: Remember how we dance like fools in the kitchen? Or how we have those silly nickname competitions? What about our inside jokes that make no sense to anyone but us? Think about our future plans - the travels we\'ll take, the home we\'ll build, the memories we\'ll create. Picture me making that ridiculous face that always makes you laugh. There it is - that beautiful smile I love so much. Keep it shining, my love.'
        }
    ];

    // Get the container for the envelopes
    const envelopesContainer = document.querySelector('.envelopes-container');

    // Create and append envelopes
    openWhenLetters.forEach((letter) => {
        const envelope = document.createElement('div');
        envelope.classList.add('envelope', 'fade-in');
        
        const envelopeTitle = document.createElement('div');
        envelopeTitle.classList.add('envelope-title');
        envelopeTitle.textContent = letter.title;
        
        const envelopeContent = document.createElement('div');
        envelopeContent.classList.add('envelope-content');
        
        const envelopeMessage = document.createElement('div');
        envelopeMessage.classList.add('envelope-message');
        envelopeMessage.textContent = letter.message;
        
        const envelopeClose = document.createElement('div');
        envelopeClose.classList.add('envelope-close');
        envelopeClose.innerHTML = '&times;';
        
        envelopeContent.appendChild(envelopeMessage);
        envelopeContent.appendChild(envelopeClose);
        
        envelope.appendChild(envelopeTitle);
        envelope.appendChild(envelopeContent);
        
        envelopesContainer.appendChild(envelope);
        
        // Add click event to open/close envelope
        envelope.addEventListener('click', function(e) {
            if (!this.classList.contains('open') && e.target !== envelopeClose) {
                this.classList.add('open');
                window.createConfetti(e.clientX, e.clientY);
            }
        });
        
        // Add click event to close button
        envelopeClose.addEventListener('click', function(e) {
            e.stopPropagation();
            envelope.classList.remove('open');
        });
    });
});
