// Relationship Quiz Script
document.addEventListener('DOMContentLoaded', function() {
    // Quiz questions and answers
    const quizQuestions = [
        {
            question: "How did we first start talking?",
            options: [
                "COA end sem",
                "Cameraman OP",
                "Mall Outing",
                "Java's Butter Chicken Roll"
            ],
            correctAnswer: 1 // Index of the correct answer (0-based)
        },
        {
            question: "Where was our first official date?",
            options: [
                "TP Canteen",
                "Aerohub",
                "Java",
                "Slice Of Life"
            ],
            correctAnswer: 3
        },
        {
            question: "What's my favorite food?",
            options: [
                "Pizza",
                "Momo",
                "Pasta",
                "Tacos"
            ],
            correctAnswer: 1
        },
        {
            question: "What's my favorite song about you?",
            options: [
                "Perfect by Ed Sheeran",
                "All of Me by John Legend",
                "Can't Help Falling in Love by Elvis Presley",
                "A Thousand Years by Christina Perri"
            ],
            correctAnswer: 0
        },
        {
            question: "What's my biggest fear (after 'losing you')?",
            options: [
                "Heights",
                "Drowning",
                "Insects",
                "Serial Killers"
            ],
            correctAnswer: 0
        },
        {
            question: "What's my favorite restaurant?",
            options: [
                "Domino's",
                "Pizza Hut",
                "Mc Donald's",
                "Burger King"
            ],
            correctAnswer: 2
        },
        {
            question: "What's my favorite way to spend a weekend?",
            options: [
                "Netflix and chill",
                "Hiking and outdoor activities",
                "Shopping and lunch with friends",
                "Chatting"
            ],
            correctAnswer: 3
        },
        {
            question: "What's the pet name I call you most often?",
            options: [
                "bbg",
                "Sofi",
                "Chellom",
                "Meri Jaan"
            ],
            correctAnswer: 0
        },
        {
            question: "What's my favorite color combo for a dress?",
            options: [
                "White and Blue",
                "All Black",
                "Beige and Green",
                "Red and Blue"
            ],
            correctAnswer: 1
        },
        {
            question: "What do I love the most about you?",
            options: [
                "Your Physical Features",
                "Your Soul and Inner Personality",
                "Your feelings for me",
                "All of the above"
            ],
            correctAnswer: 3
        }
    ];

    // Reward messages based on score
    const rewardMessages = {
        perfect: "<p>WOW! A perfect score! You truly know me inside and out, Vazeeda. It's incredible how deeply you understand me, my quirks, my dreams, and my heart.</p><p>Your ability to remember even the smallest details about us proves what I've always known - that we share a connection that's rare and precious. You pay attention not just to what I say, but to who I am.</p><p>I fall more in love with you every day, and knowing that you see me so completely makes me the luckiest person in the world. You're my soulmate, my best friend, and the love of my life.</p><p>I can't wait to create even more memories with you that we'll both cherish forever.</p><p class='reward-signature'>Forever yours,<br>Aryan</p>",
        great: "<p>Amazing job! You know me so well, Vazeeda. Your score shows just how attentive and caring you are.</p><p>The way you remember the important moments and details of our relationship makes me feel so loved and valued. It's one of the countless reasons why I adore you.</p><p>Every day with you is a blessing, and I'm looking forward to all the new memories we'll create together.</p><p>Thank you for being the wonderful, loving person that you are.</p><p class='reward-signature'>With all my love,<br>Aryan</p>",
        good: "<p>Well done, my love! You know quite a bit about us, and that makes my heart happy.</p><p>It's the little things you remember that show me how much you care. Our journey together has been beautiful so far, and I'm excited for all that's still to come.</p><p>I love discovering new things about you every day, and I hope you feel the same way about me.</p><p>Here's to growing together and learning even more about each other.</p><p class='reward-signature'>Yours always,<br>Aryan</p>",
        average: "<p>Not bad, Vazeeda! You got some answers right, which shows you've been paying attention.</p><p>Relationships are all about learning and growing together, and we still have so much to discover about each other. That's what makes this journey exciting!</p><p>I love that we can still surprise each other, and I look forward to all the new memories we'll create.</p><p>Thank you for being on this adventure with me.</p><p class='reward-signature'>With love,<br>Aryan</p>",
        needsWork: "<p>Well, it looks like we still have some learning to do about each other, and that's perfectly okay!</p><p>The beauty of our relationship is that we're constantly growing and evolving together. There's always something new to discover, which keeps things exciting.</p><p>I cherish every moment with you and look forward to all the future experiences that will help us understand each other even better.</p><p>This quiz is just a small part of our story, and the most important thing is the love we share.</p><p class='reward-signature'>Lovingly yours,<br>Aryan</p>"
    };

    // DOM elements
    const startQuizBtn = document.getElementById('start-quiz');
    const retakeQuizBtn = document.getElementById('retake-quiz');
    const prevQuestionBtn = document.getElementById('prev-question');
    const nextQuestionBtn = document.getElementById('next-question');
    const quizStartCard = document.getElementById('quiz-start');
    const quizQuestionsCard = document.getElementById('quiz-questions');
    const quizResultsCard = document.getElementById('quiz-results');
    const questionContainer = document.querySelector('.question-container');
    const progressFill = document.querySelector('.progress-fill');
    const currentQuestionSpan = document.getElementById('current-question');
    const totalQuestionsSpan = document.getElementById('total-questions');
    const scoreValue = document.getElementById('score-value');
    const correctAnswers = document.getElementById('correct-answers');
    const rewardMessage = document.getElementById('reward-message');
    const confettiContainer = document.getElementById('confetti-container');

    // Quiz state
    let currentQuestion = 0;
    const userAnswers = [];
    let quizStarted = false;

    // Initialize quiz
    function initQuiz() {
        // Set total questions
        totalQuestionsSpan.textContent = quizQuestions.length;
        
        // Create all question elements
        quizQuestions.forEach((q, index) => {
            createQuestionElement(q, index);
        });
        
        // Show first question
        showQuestion(0);
        
        // Try to load saved answers from localStorage
        loadQuizProgress();
    }

    // Create a question element
    function createQuestionElement(questionData, index) {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.dataset.questionIndex = index;
        
        const questionTitle = document.createElement('h4');
        questionTitle.textContent = `${index + 1}. ${questionData.question}`;
        questionDiv.appendChild(questionTitle);
        
        const optionsContainer = document.createElement('div');
        optionsContainer.classList.add('options-container');
        
        questionData.options.forEach((option, optionIndex) => {
            const optionId = `q${index}-option${optionIndex}`;
            
            const optionInput = document.createElement('input');
            optionInput.type = 'radio';
            optionInput.name = `question-${index}`;
            optionInput.id = optionId;
            optionInput.classList.add('option-radio');
            optionInput.value = optionIndex;
            optionInput.addEventListener('change', () => {
                userAnswers[index] = optionIndex;
                saveQuizProgress();
                updateNextButton();
            });
            
            const optionLabel = document.createElement('label');
            optionLabel.setAttribute('for', optionId);
            optionLabel.classList.add('option-label');
            
            const customRadio = document.createElement('span');
            customRadio.classList.add('option-custom-radio');
            
            const optionText = document.createElement('span');
            optionText.classList.add('option-text');
            optionText.textContent = option;
            
            optionLabel.appendChild(customRadio);
            optionLabel.appendChild(optionText);
            
            optionsContainer.appendChild(optionInput);
            optionsContainer.appendChild(optionLabel);
        });
        
        questionDiv.appendChild(optionsContainer);
        questionContainer.appendChild(questionDiv);
    }

    // Show a specific question
    function showQuestion(index) {
        // Hide all questions
        document.querySelectorAll('.question').forEach(q => {
            q.classList.remove('active');
        });
        
        // Show the current question
        const currentQuestionElement = document.querySelector(`.question[data-question-index="${index}"]`);
        if (currentQuestionElement) {
            currentQuestionElement.classList.add('active');
        }
        
        // Update progress
        currentQuestionSpan.textContent = index + 1;
        progressFill.style.width = `${((index + 1) / quizQuestions.length) * 100}%`;
        
        // Update buttons
        prevQuestionBtn.disabled = index === 0;
        updateNextButton();
        
        // Check if the question has been answered
        if (userAnswers[index] !== undefined) {
            const radioInput = document.querySelector(`#q${index}-option${userAnswers[index]}`);
            if (radioInput) {
                radioInput.checked = true;
            }
        }
        
        // Update current question index
        currentQuestion = index;
    }

    // Update the next button text based on current question
    function updateNextButton() {
        if (currentQuestion === quizQuestions.length - 1) {
            nextQuestionBtn.textContent = 'Finish Quiz';
            // Only enable if the last question is answered
            nextQuestionBtn.disabled = userAnswers[currentQuestion] === undefined;
        } else {
            nextQuestionBtn.textContent = 'Next';
            nextQuestionBtn.disabled = false;
        }
    }

    // Calculate score and show results
    function showResults() {
        let score = 0;
        userAnswers.forEach((answer, index) => {
            if (answer === quizQuestions[index].correctAnswer) {
                score++;
            }
        });
        
        // Update score display
        scoreValue.textContent = score;
        correctAnswers.textContent = score;
        
        // Show appropriate reward message
        let messageType;
        if (score === quizQuestions.length) {
            messageType = 'perfect';
            createConfetti(100); // More confetti for perfect score
        } else if (score >= quizQuestions.length * 0.8) {
            messageType = 'great';
            createConfetti(50);
        } else if (score >= quizQuestions.length * 0.6) {
            messageType = 'good';
            createConfetti(30);
        } else if (score >= quizQuestions.length * 0.4) {
            messageType = 'average';
            createConfetti(10);
        } else {
            messageType = 'needsWork';
        }
        
        rewardMessage.innerHTML = rewardMessages[messageType];
        
        // Animate reward message
        setTimeout(() => {
            rewardMessage.classList.add('visible');
        }, 500);
        
        // Show results card
        quizQuestionsCard.classList.remove('active');
        quizResultsCard.classList.add('active');
    }

    // Create confetti animation
    function createConfetti(count) {
        confettiContainer.innerHTML = '';
        
        const colors = ['#ff3366', '#9933ff', '#33ccff', '#66cc99', '#ffcc33', '#ff6b6b'];
        
        for (let i = 0; i < count; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            
            // Random properties
            const size = Math.random() * 10 + 5;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const left = Math.random() * 100;
            const delay = Math.random() * 3;
            const duration = Math.random() * 3 + 3;
            
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.background = color;
            confetti.style.left = `${left}%`;
            confetti.style.animationDuration = `${duration}s`;
            confetti.style.animationDelay = `${delay}s`;
            
            // Random shape
            const shapes = ['circle', 'square', 'triangle'];
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            
            if (shape === 'circle') {
                confetti.style.borderRadius = '50%';
            } else if (shape === 'triangle') {
                confetti.style.width = '0';
                confetti.style.height = '0';
                confetti.style.background = 'transparent';
                confetti.style.borderLeft = `${size/2}px solid transparent`;
                confetti.style.borderRight = `${size/2}px solid transparent`;
                confetti.style.borderBottom = `${size}px solid ${color}`;
            }
            
            confettiContainer.appendChild(confetti);
            
            // Remove confetti after animation completes
            confetti.addEventListener('animationend', () => {
                confetti.remove();
            });
        }
    }

    // Save quiz progress to localStorage
    function saveQuizProgress() {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('quizAnswers', JSON.stringify(userAnswers));
            localStorage.setItem('quizStarted', JSON.stringify(quizStarted));
        }
    }

    // Load quiz progress from localStorage
    function loadQuizProgress() {
        if (typeof localStorage !== 'undefined') {
            const savedAnswers = localStorage.getItem('quizAnswers');
            const savedQuizStarted = localStorage.getItem('quizStarted');
            
            if (savedAnswers) {
                const parsedAnswers = JSON.parse(savedAnswers);
                userAnswers.length = 0; // Clear existing answers
                parsedAnswers.forEach((answer, index) => {
                    userAnswers[index] = answer;
                });
            }
            
            if (savedQuizStarted && JSON.parse(savedQuizStarted)) {
                quizStarted = true;
                quizStartCard.classList.remove('active');
                quizQuestionsCard.classList.add('active');
            }
        }
    }

    // Event listeners
    startQuizBtn.addEventListener('click', () => {
        quizStartCard.classList.remove('active');
        quizQuestionsCard.classList.add('active');
        quizStarted = true;
        saveQuizProgress();
    });

    prevQuestionBtn.addEventListener('click', () => {
        if (currentQuestion > 0) {
            showQuestion(currentQuestion - 1);
        }
    });

    nextQuestionBtn.addEventListener('click', () => {
        if (currentQuestion < quizQuestions.length - 1) {
            showQuestion(currentQuestion + 1);
        } else {
            showResults();
        }
    });

    retakeQuizBtn.addEventListener('click', () => {
        // Reset quiz state
        userAnswers.length = 0;
        currentQuestion = 0;
        
        // Clear all selected options
        document.querySelectorAll('.option-radio').forEach(radio => {
            radio.checked = false;
        });
        
        // Reset localStorage
        if (typeof localStorage !== 'undefined') {
            localStorage.removeItem('quizAnswers');
        }
        
        // Show first question
        showQuestion(0);
        
        // Switch cards
        quizResultsCard.classList.remove('active');
        quizQuestionsCard.classList.add('active');
        
        // Reset reward message animation
        rewardMessage.classList.remove('visible');
    });

    // Initialize the quiz
    initQuiz();
});
