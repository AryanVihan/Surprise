// JavaScript for the Chat Simulation section

document.addEventListener('DOMContentLoaded', function() {
    // Array of chat messages
    const chatMessages = [
        {
            type: 'sent',
            message: 'Good morning, beautiful! u2728',
            time: '8:03 AM'
        },
        {
            type: 'received',
            message: 'Morning! You\'re up early today ud83dude0a',
            time: '8:05 AM'
        },
        {
            type: 'sent',
            message: 'Couldn\'t sleep. Too busy thinking about you u2764ufe0f',
            time: '8:06 AM'
        },
        {
            type: 'received',
            message: 'Aww, that\'s so sweet! You\'re making me blush u2639ufe0f',
            time: '8:07 AM'
        },
        {
            type: 'sent',
            message: 'It\'s true though. Hey, remember that cafe we went to last week?',
            time: '8:09 AM'
        },
        {
            type: 'received',
            message: 'The one with the amazing chocolate cake? How could I forget!',
            time: '8:10 AM'
        },
        {
            type: 'sent',
            message: 'Want to go there again this weekend? I miss spending time with you ud83dude14',
            time: '8:11 AM'
        },
        {
            type: 'received',
            message: 'I\'d love that! I miss you too. It\'s only been two days but feels like forever ud83dude02',
            time: '8:12 AM'
        },
        {
            type: 'sent',
            message: 'That\'s what happens when you\'re in love u2764ufe0f Time apart feels like eternity',
            time: '8:14 AM'
        },
        {
            type: 'received',
            message: 'You\'re such a romantic! That\'s one of the million reasons why I love you ud83dude0d',
            time: '8:15 AM'
        },
        {
            type: 'sent',
            message: 'Only a million? I was hoping for at least a billion ud83dude1c',
            time: '8:16 AM'
        },
        {
            type: 'received',
            message: 'Haha! Fine, a billion reasons ud83dude02 I have to get ready for work now. Talk later?',
            time: '8:18 AM'
        },
        {
            type: 'sent',
            message: 'Of course! Have a wonderful day, Vazeeda. You\'re going to be amazing today u2728',
            time: '8:19 AM'
        },
        {
            type: 'received',
            message: 'Thank you u2764ufe0f You always know how to make me smile. Have a great day too!',
            time: '8:20 AM'
        },
        {
            type: 'sent',
            message: 'PS: I love you more than words can say u2764ufe0f',
            time: '8:21 AM'
        },
        {
            type: 'received',
            message: 'I love you more u2764ufe0fu2764ufe0fu2764ufe0f',
            time: '8:22 AM'
        }
    ];

    // Get the chat messages container
    const chatMessagesContainer = document.querySelector('.chat-messages');

    // Create and append chat messages
    function createChatMessages() {
        // Clear previous messages
        chatMessagesContainer.innerHTML = '';
        
        // Add a delay between messages for a more realistic effect
        let delay = 0;
        const delayIncrement = 500; // milliseconds
        
        chatMessages.forEach((message) => {
            setTimeout(() => {
                const messageElement = document.createElement('div');
                messageElement.classList.add('chat-message', message.type);
                
                const avatarElement = document.createElement('div');
                avatarElement.classList.add('message-avatar');
                
                const avatarImage = document.createElement('img');
                // Use Font Awesome icons instead of missing avatar images
                avatarImage.style.display = 'none';
                const avatarIcon = document.createElement('i');
                avatarIcon.className = message.type === 'sent' ? 'fas fa-user' : 'fas fa-heart';
                avatarIcon.style.fontSize = '24px';
                avatarIcon.style.color = message.type === 'sent' ? '#3498db' : '#e74c3c';
                messageElement.insertBefore(avatarIcon, messageElement.firstChild); // Fixed: using messageElement instead of messageDiv
                avatarImage.alt = message.type === 'sent' ? 'Me' : 'Vazeeda';
                // Add a placeholder image in case the actual image is not available
                avatarImage.onerror = function() {
                    this.src = 'images/placeholder.jpg';
                };
                
                avatarElement.appendChild(avatarImage);
                
                const bubbleElement = document.createElement('div');
                bubbleElement.classList.add('message-bubble');
                bubbleElement.textContent = message.message;
                
                const timeElement = document.createElement('div');
                timeElement.classList.add('message-time');
                timeElement.textContent = message.time;
                
                bubbleElement.appendChild(timeElement);
                
                messageElement.appendChild(avatarElement);
                messageElement.appendChild(bubbleElement);
                
                chatMessagesContainer.appendChild(messageElement);
                
                // Scroll to the bottom of the chat
                chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
                
                // Add typing animation for the next received message
                if (message.type === 'sent' && delay < (chatMessages.length - 1) * delayIncrement && chatMessages[delay / delayIncrement + 1].type === 'received') {
                    setTimeout(() => {
                        const typingElement = document.createElement('div');
                        typingElement.classList.add('chat-message', 'received', 'typing');
                        
                        const typingAvatarElement = document.createElement('div');
                        typingAvatarElement.classList.add('message-avatar');
                        
                        const typingAvatarImage = document.createElement('img');
                        typingAvatarImage.src = 'images/avatar-vazeeda.jpg';
                        typingAvatarImage.alt = 'Vazeeda';
                        // Add a placeholder image in case the actual image is not available
                        typingAvatarImage.onerror = function() {
                            this.src = 'images/placeholder.jpg';
                        };
                        
                        typingAvatarElement.appendChild(typingAvatarImage);
                        
                        const typingBubbleElement = document.createElement('div');
                        typingBubbleElement.classList.add('message-bubble', 'typing-bubble');
                        typingBubbleElement.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
                        
                        typingElement.appendChild(typingAvatarElement);
                        typingElement.appendChild(typingBubbleElement);
                        
                        chatMessagesContainer.appendChild(typingElement);
                        
                        // Scroll to the bottom of the chat
                        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
                        
                        // Remove typing indicator after a short delay
                        setTimeout(() => {
                            typingElement.remove();
                        }, delayIncrement - 100);
                    }, delayIncrement / 2);
                }
            }, delay);
            
            delay += delayIncrement;
        });
    }

    // Add typing animation styles
    const style = document.createElement('style');
    style.textContent = `
        .typing-bubble {
            padding: 8px 15px;
            min-height: 20px;
        }
        
        .typing-dot {
            display: inline-block;
            width: 8px;
            height: 8px;
            background-color: #aaa;
            border-radius: 50%;
            margin-right: 4px;
            animation: typingAnimation 1.5s infinite;
        }
        
        .typing-dot:nth-child(2) {
            animation-delay: 0.5s;
        }
        
        .typing-dot:nth-child(3) {
            animation-delay: 1s;
        }
        
        @keyframes typingAnimation {
            0%, 60%, 100% { transform: translateY(0); }
            30% { transform: translateY(-5px); }
        }
    `;
    document.head.appendChild(style);

    // Initialize chat messages
    createChatMessages();
});
