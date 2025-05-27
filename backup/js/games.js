// JavaScript for the Games section

document.addEventListener('DOMContentLoaded', function() {
    // Jigsaw Puzzle Game
    initPuzzleGame();
    
    // Heart Catching Game
    initHeartGame();
});

// Jigsaw Puzzle Game
function initPuzzleGame() {
    const puzzleContainer = document.getElementById('puzzle-container');
    const puzzleComplete = document.getElementById('puzzle-complete');
    
    if (!puzzleContainer) return;
    
    const puzzleImage = 'images/puzzle/couple-photo.jpg'; // Replace with actual image path
    const rows = 3;
    const columns = 3;
    const pieces = rows * columns;
    let placedPieces = 0;
    
    // Create puzzle pieces
    function createPuzzlePieces() {
        // Clear container
        puzzleContainer.innerHTML = '';
        
        // Create a temporary image to get dimensions
        const img = new Image();
        img.onload = function() {
            const pieceWidth = img.width / columns;
            const pieceHeight = img.height / rows;
            
            // Create pieces
            for (let i = 0; i < pieces; i++) {
                const row = Math.floor(i / columns);
                const col = i % columns;
                
                const piece = document.createElement('div');
                piece.classList.add('puzzle-piece');
                piece.dataset.row = row;
                piece.dataset.col = col;
                piece.dataset.index = i;
                
                // Set piece dimensions
                piece.style.width = (100 / columns) + '%';
                piece.style.height = (100 / rows) + '%';
                
                // Set background image position
                piece.style.backgroundImage = `url(${puzzleImage})`;
                piece.style.backgroundSize = (columns * 100) + '% ' + (rows * 100) + '%';
                piece.style.backgroundPosition = `${col * 100 / (columns - 1)}% ${row * 100 / (rows - 1)}%`;
                
                // Set random position (except the last piece which will be empty)
                if (i < pieces - 1) {
                    const randomX = Math.random() * (puzzleContainer.clientWidth - pieceWidth);
                    const randomY = Math.random() * (puzzleContainer.clientHeight - pieceHeight);
                    piece.style.left = randomX + 'px';
                    piece.style.top = randomY + 'px';
                    
                    // Make draggable
                    piece.draggable = true;
                    piece.addEventListener('dragstart', dragStart);
                    piece.addEventListener('dragend', dragEnd);
                } else {
                    // Last piece is hidden initially
                    piece.style.opacity = '0';
                    piece.classList.add('placed');
                    placedPieces++;
                }
                
                puzzleContainer.appendChild(piece);
            }
            
            // Make container a drop target
            puzzleContainer.addEventListener('dragover', dragOver);
            puzzleContainer.addEventListener('drop', drop);
        };
        
        img.onerror = function() {
            // Handle image loading error
            puzzleContainer.innerHTML = '<p>Puzzle image could not be loaded. Please try again later.</p>';
        };
        
        img.src = puzzleImage;
    }
    
    // Drag and drop functions
    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.dataset.index);
        setTimeout(() => {
            e.target.classList.add('dragging');
        }, 0);
    }
    
    function dragEnd(e) {
        e.target.classList.remove('dragging');
    }
    
    function dragOver(e) {
        e.preventDefault();
    }
    
    function drop(e) {
        e.preventDefault();
        const pieceIndex = e.dataTransfer.getData('text/plain');
        const piece = document.querySelector(`.puzzle-piece[data-index="${pieceIndex}"]`);
        
        if (!piece) return;
        
        const row = parseInt(piece.dataset.row);
        const col = parseInt(piece.dataset.col);
        
        // Calculate the correct position
        const containerRect = puzzleContainer.getBoundingClientRect();
        const pieceWidth = containerRect.width / columns;
        const pieceHeight = containerRect.height / rows;
        const correctX = col * pieceWidth;
        const correctY = row * pieceHeight;
        
        // Check if piece is dropped near its correct position
        const dropX = e.clientX - containerRect.left;
        const dropY = e.clientY - containerRect.top;
        
        if (Math.abs(dropX - correctX - pieceWidth / 2) < pieceWidth / 3 &&
            Math.abs(dropY - correctY - pieceHeight / 2) < pieceHeight / 3) {
            // Snap to correct position
            piece.style.left = correctX + 'px';
            piece.style.top = correctY + 'px';
            piece.classList.add('placed');
            piece.draggable = false;
            
            // Play sound effect
            const snapSound = new Audio('audio/snap.mp3');
            snapSound.volume = 0.5;
            snapSound.play().catch(error => console.log('Audio play failed:', error));
            
            // Check if puzzle is complete
            placedPieces++;
            if (placedPieces === pieces) {
                setTimeout(showPuzzleComplete, 500);
            }
        }
    }
    
    // Show puzzle complete message
    function showPuzzleComplete() {
        // Create completion message
        puzzleComplete.innerHTML = '';
        
        const puzzleMessage = document.createElement('div');
        puzzleMessage.classList.add('puzzle-message');
        puzzleMessage.textContent = 'You completed our puzzle! Just like how you complete me.';
        
        const loveMessage = document.createElement('p');
        loveMessage.textContent = 'Every piece of my heart belongs to you, Vazeeda. I love you more than words can express.';
        
        puzzleComplete.appendChild(puzzleMessage);
        puzzleComplete.appendChild(loveMessage);
        
        // Show completion message
        puzzleComplete.classList.remove('hidden');
        setTimeout(() => {
            puzzleComplete.classList.add('show');
            
            // Create confetti effect
            const rect = puzzleContainer.getBoundingClientRect();
            window.createConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
        }, 100);
    }
    
    // Initialize puzzle
    createPuzzlePieces();
}

// Heart Catching Game
function initHeartGame() {
    const gameContainer = document.getElementById('heart-game-container');
    const catcher = document.getElementById('heart-catcher');
    const fallingHeartsContainer = document.getElementById('falling-hearts-container');
    const startButton = document.getElementById('start-heart-game');
    const scoreDisplay = document.getElementById('heart-game-score');
    const gameMessage = document.getElementById('heart-game-message');
    
    if (!gameContainer || !catcher || !startButton) return;
    
    let score = 0;
    let gameActive = false;
    let heartMessages = [
        "I love your smile",
        "You make me so happy",
        "You're my everything",
        "Forever yours",
        "You're beautiful",
        "My heart is yours",
        "You're my dream come true",
        "I adore you",
        "You're my sunshine",
        "You're amazing",
        "You're perfect",
        "I cherish you",
        "You're my world",
        "I'm yours",
        "You're magical"
    ];
    
    // Set up catcher movement
    gameContainer.addEventListener('mousemove', function(e) {
        if (!gameActive) return;
        
        const containerRect = gameContainer.getBoundingClientRect();
        const catcherRect = catcher.getBoundingClientRect();
        const catcherWidth = catcherRect.width;
        
        // Calculate new position
        let newX = e.clientX - containerRect.left - catcherWidth / 2;
        
        // Keep catcher within container bounds
        if (newX < 0) newX = 0;
        if (newX > containerRect.width - catcherWidth) newX = containerRect.width - catcherWidth;
        
        // Update catcher position
        catcher.style.left = newX + 'px';
    });
    
    // Touch support for mobile devices
    gameContainer.addEventListener('touchmove', function(e) {
        if (!gameActive) return;
        e.preventDefault();
        
        const containerRect = gameContainer.getBoundingClientRect();
        const catcherRect = catcher.getBoundingClientRect();
        const catcherWidth = catcherRect.width;
        
        // Calculate new position
        let newX = e.touches[0].clientX - containerRect.left - catcherWidth / 2;
        
        // Keep catcher within container bounds
        if (newX < 0) newX = 0;
        if (newX > containerRect.width - catcherWidth) newX = containerRect.width - catcherWidth;
        
        // Update catcher position
        catcher.style.left = newX + 'px';
    }, { passive: false });
    
    // Start game button
    startButton.addEventListener('click', function() {
        if (gameActive) return;
        
        // Reset game
        score = 0;
        scoreDisplay.textContent = 'Score: 0';
        fallingHeartsContainer.innerHTML = '';
        gameMessage.classList.add('hidden');
        gameMessage.classList.remove('show');
        
        // Start game
        gameActive = true;
        startButton.disabled = true;
        startButton.textContent = 'Game in Progress';
        
        // Start creating falling hearts
        const heartInterval = setInterval(createFallingHeart, 1000);
        
        // End game after 30 seconds
        setTimeout(() => {
            gameActive = false;
            clearInterval(heartInterval);
            startButton.disabled = false;
            startButton.textContent = 'Play Again';
            showGameResult();
        }, 30000);
    });
    
    // Create a falling heart
    function createFallingHeart() {
        if (!gameActive) return;
        
        const heart = document.createElement('div');
        heart.classList.add('falling-heart');
        
        // Random position
        const containerWidth = gameContainer.clientWidth;
        const heartWidth = 40; // Same as in CSS
        const randomX = Math.random() * (containerWidth - heartWidth);
        heart.style.left = randomX + 'px';
        
        // Random speed
        const fallDuration = Math.random() * 2 + 3; // 3-5 seconds
        heart.style.animationDuration = fallDuration + 's';
        
        // Add message to heart
        heart.dataset.message = heartMessages[Math.floor(Math.random() * heartMessages.length)];
        
        // Append heart to container
        fallingHeartsContainer.appendChild(heart);
        
        // Check for collision with catcher
        const collisionCheck = setInterval(() => {
            if (!gameActive || !heart.isConnected) {
                clearInterval(collisionCheck);
                return;
            }
            
            const heartRect = heart.getBoundingClientRect();
            const catcherRect = catcher.getBoundingClientRect();
            
            // Check if heart is caught
            if (heartRect.bottom >= catcherRect.top &&
                heartRect.top <= catcherRect.bottom &&
                heartRect.right >= catcherRect.left &&
                heartRect.left <= catcherRect.right) {
                // Heart is caught
                heart.remove();
                clearInterval(collisionCheck);
                
                // Update score
                score++;
                scoreDisplay.textContent = 'Score: ' + score;
                
                // Show caught message
                showCaughtMessage(heart.dataset.message);
                
                // Play catch sound
                const catchSound = new Audio('audio/catch.mp3');
                catchSound.volume = 0.5;
                catchSound.play().catch(error => console.log('Audio play failed:', error));
            }
        }, 100);
        
        // Remove heart after animation ends
        setTimeout(() => {
            if (heart.isConnected) {
                heart.remove();
                clearInterval(collisionCheck);
            }
        }, fallDuration * 1000);
    }
    
    // Show message when heart is caught
    function showCaughtMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('caught-message');
        messageElement.textContent = message;
        messageElement.style.position = 'absolute';
        messageElement.style.top = '50%';
        messageElement.style.left = '50%';
        messageElement.style.transform = 'translate(-50%, -50%)';
        messageElement.style.color = '#ff6b6b';
        messageElement.style.fontSize = '1.5rem';
        messageElement.style.fontWeight = 'bold';
        messageElement.style.textShadow = '0 0 5px white';
        messageElement.style.zIndex = '10';
        messageElement.style.opacity = '0';
        messageElement.style.transition = 'opacity 0.3s ease, transform 0.5s ease';
        
        gameContainer.appendChild(messageElement);
        
        // Show message with animation
        setTimeout(() => {
            messageElement.style.opacity = '1';
            messageElement.style.transform = 'translate(-50%, -100%)';
        }, 10);
        
        // Remove message after a short time
        setTimeout(() => {
            messageElement.style.opacity = '0';
            setTimeout(() => {
                messageElement.remove();
            }, 300);
        }, 1500);
    }
    
    // Show game result
    function showGameResult() {
        // Create result message
        gameMessage.innerHTML = '';
        
        const heartMessage = document.createElement('div');
        heartMessage.classList.add('heart-message');
        
        if (score >= 10) {
            heartMessage.textContent = 'Amazing! You caught ' + score + ' hearts!';
        } else if (score >= 5) {
            heartMessage.textContent = 'Great job! You caught ' + score + ' hearts!';
        } else {
            heartMessage.textContent = 'You caught ' + score + ' hearts. Try again!';
        }
        
        const loveMessage = document.createElement('p');
        loveMessage.textContent = 'Just like you\'ve caught all the love messages, you\'ve caught my heart completely. I love you, Vazeeda!';
        
        gameMessage.appendChild(heartMessage);
        gameMessage.appendChild(loveMessage);
        
        // Show message
        gameMessage.classList.remove('hidden');
        setTimeout(() => {
            gameMessage.classList.add('show');
            
            // Create confetti effect
            const rect = gameContainer.getBoundingClientRect();
            window.createConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
        }, 100);
    }
}
