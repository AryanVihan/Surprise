// JavaScript for the Virtual Bouquet Builder section

document.addEventListener('DOMContentLoaded', function() {
    // Check if bouquet section exists
    const bouquetSection = document.getElementById('bouquet');
    if (!bouquetSection) {
        console.log('Bouquet section not found, skipping bouquet.js initialization');
        return; // Exit early if the bouquet section doesn't exist
    }
    // Arrays of flower, color, and wrapping options
    const flowerOptions = [
        { name: 'Rose', image: 'images/flowers/rose.png' },
        { name: 'Tulip', image: 'images/flowers/tulip.png' },
        { name: 'Lily', image: 'images/flowers/lily.png' },
        { name: 'Daisy', image: 'images/flowers/daisy.png' },
        { name: 'Sunflower', image: 'images/flowers/sunflower.png' },
        { name: 'Orchid', image: 'images/flowers/orchid.png' }
    ];

    const colorOptions = [
        { name: 'Red', color: '#ff6b6b' },
        { name: 'Pink', color: '#ff9999' },
        { name: 'White', color: '#ffffff' },
        { name: 'Yellow', color: '#ffeb3b' },
        { name: 'Purple', color: '#9c27b0' },
        { name: 'Blue', color: '#2196f3' }
    ];

    const wrappingOptions = [
        { name: 'Classic', image: 'images/wrapping/classic.png' },
        { name: 'Rustic', image: 'images/wrapping/rustic.png' },
        { name: 'Elegant', image: 'images/wrapping/elegant.png' },
        { name: 'Modern', image: 'images/wrapping/modern.png' }
    ];

    // Get the container elements
    const flowerOptionsContainer = document.querySelector('.flower-options');
    const colorOptionsContainer = document.querySelector('.color-options');
    const wrappingOptionsContainer = document.querySelector('.wrapping-options');
    const bouquetPreview = document.querySelector('.bouquet-preview');
    const bouquetNoteText = document.getElementById('bouquet-note-text');
    const saveBouquetButton = document.getElementById('save-bouquet');

    // Selected options
    let selectedFlower = null;
    let selectedColor = null;
    let selectedWrapping = null;

    // Create and append flower options
    flowerOptions.forEach((flower) => {
        const flowerOption = document.createElement('div');
        flowerOption.classList.add('flower-option');
        flowerOption.title = flower.name;
        
        const flowerImage = document.createElement('img');
        flowerImage.src = flower.image;
        flowerImage.alt = flower.name;
        // Add a placeholder image in case the actual image is not available
        flowerImage.onerror = function() {
            this.src = 'images/placeholder.jpg';
        };
        
        flowerOption.appendChild(flowerImage);
        flowerOptionsContainer.appendChild(flowerOption);
        
        // Add click event
        flowerOption.addEventListener('click', function() {
            // Remove selected class from all flower options
            document.querySelectorAll('.flower-option').forEach(option => {
                option.classList.remove('selected');
            });
            
            // Add selected class to clicked option
            this.classList.add('selected');
            
            // Update selected flower
            selectedFlower = flower;
            
            // Update bouquet preview
            updateBouquetPreview();
        });
    });

    // Create and append color options
    colorOptions.forEach((color) => {
        const colorOption = document.createElement('div');
        colorOption.classList.add('color-option');
        colorOption.title = color.name;
        colorOption.style.backgroundColor = color.color;
        
        colorOptionsContainer.appendChild(colorOption);
        
        // Add click event
        colorOption.addEventListener('click', function() {
            // Remove selected class from all color options
            document.querySelectorAll('.color-option').forEach(option => {
                option.classList.remove('selected');
            });
            
            // Add selected class to clicked option
            this.classList.add('selected');
            
            // Update selected color
            selectedColor = color;
            
            // Update bouquet preview
            updateBouquetPreview();
        });
    });

    // Create and append wrapping options
    wrappingOptions.forEach((wrapping) => {
        const wrappingOption = document.createElement('div');
        wrappingOption.classList.add('wrapping-option');
        wrappingOption.title = wrapping.name;
        
        const wrappingImage = document.createElement('img');
        wrappingImage.src = wrapping.image;
        wrappingImage.alt = wrapping.name;
        // Add a placeholder image in case the actual image is not available
        wrappingImage.onerror = function() {
            this.src = 'images/placeholder.jpg';
        };
        
        wrappingOption.appendChild(wrappingImage);
        wrappingOptionsContainer.appendChild(wrappingOption);
        
        // Add click event
        wrappingOption.addEventListener('click', function() {
            // Remove selected class from all wrapping options
            document.querySelectorAll('.wrapping-option').forEach(option => {
                option.classList.remove('selected');
            });
            
            // Add selected class to clicked option
            this.classList.add('selected');
            
            // Update selected wrapping
            selectedWrapping = wrapping;
            
            // Update bouquet preview
            updateBouquetPreview();
        });
    });

    // Update bouquet preview
    function updateBouquetPreview() {
        // Clear previous preview
        bouquetPreview.innerHTML = '';
        
        // Create bouquet image container
        const bouquetImage = document.createElement('div');
        bouquetImage.classList.add('bouquet-image');
        
        // Add wrapping if selected
        if (selectedWrapping) {
            const bouquetWrapping = document.createElement('div');
            bouquetWrapping.classList.add('bouquet-wrapping');
            
            const wrappingImage = document.createElement('img');
            wrappingImage.src = selectedWrapping.image;
            wrappingImage.alt = selectedWrapping.name;
            // Add a placeholder image in case the actual image is not available
            wrappingImage.onerror = function() {
                this.src = 'images/placeholder.jpg';
            };
            
            bouquetWrapping.appendChild(wrappingImage);
            bouquetImage.appendChild(bouquetWrapping);
        }
        
        // Add flowers if selected
        if (selectedFlower && selectedColor) {
            const bouquetFlowers = document.createElement('div');
            bouquetFlowers.classList.add('bouquet-flowers');
            
            const flowerImage = document.createElement('img');
            flowerImage.src = selectedFlower.image;
            flowerImage.alt = selectedFlower.name;
            // Apply selected color as a filter
            flowerImage.style.filter = `hue-rotate(${getHueRotation(selectedColor.color)})deg`;
            // Add a placeholder image in case the actual image is not available
            flowerImage.onerror = function() {
                this.src = 'images/placeholder.jpg';
            };
            
            bouquetFlowers.appendChild(flowerImage);
            bouquetImage.appendChild(bouquetFlowers);
        }
        
        bouquetPreview.appendChild(bouquetImage);
    }

    // Calculate hue rotation based on color
    function getHueRotation(color) {
        // This is a simplified approach - in a real implementation,
        // you would need a more sophisticated color conversion
        const hueMap = {
            '#ff6b6b': 0,    // Red (base color)
            '#ff9999': 10,   // Pink
            '#ffffff': 0,    // White (no rotation, but would need additional brightness adjustment)
            '#ffeb3b': 60,   // Yellow
            '#9c27b0': 280,  // Purple
            '#2196f3': 210   // Blue
        };
        
        return hueMap[color] || 0;
    }

    // Save bouquet button click event
    saveBouquetButton.addEventListener('click', function() {
        if (!selectedFlower || !selectedColor || !selectedWrapping) {
            alert('Please select a flower, color, and wrapping to complete your bouquet.');
            return;
        }
        
        // Get note text
        const noteText = bouquetNoteText.value.trim();
        
        // Create a saved bouquet object
        const savedBouquet = {
            flower: selectedFlower.name,
            color: selectedColor.name,
            wrapping: selectedWrapping.name,
            note: noteText
        };
        
        // Save to localStorage (in a real implementation)
        localStorage.setItem('savedBouquet', JSON.stringify(savedBouquet));
        
        // Show confirmation message
        const confirmationMessage = document.createElement('div');
        confirmationMessage.classList.add('confirmation-message');
        confirmationMessage.textContent = 'Your beautiful bouquet has been saved! 💐';
        confirmationMessage.style.position = 'absolute';
        confirmationMessage.style.top = '10px';
        confirmationMessage.style.left = '50%';
        confirmationMessage.style.transform = 'translateX(-50%)';
        confirmationMessage.style.backgroundColor = 'rgba(255, 107, 107, 0.9)';
        confirmationMessage.style.color = 'white';
        confirmationMessage.style.padding = '10px 20px';
        confirmationMessage.style.borderRadius = '5px';
        confirmationMessage.style.zIndex = '100';
        
        document.body.appendChild(confirmationMessage);
        
        // Create confetti effect
        const rect = bouquetPreview.getBoundingClientRect();
        window.createConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
        
        // Remove confirmation message after a few seconds
        setTimeout(() => {
            confirmationMessage.style.opacity = '0';
            confirmationMessage.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                confirmationMessage.remove();
            }, 500);
        }, 3000);
    });

    // Check if there's a saved bouquet in localStorage
    const loadSavedBouquet = function() {
        const savedBouquet = localStorage.getItem('savedBouquet');
        
        if (savedBouquet) {
            try {
                const bouquet = JSON.parse(savedBouquet);
                
                // Select the saved options
                if (bouquet.flower) {
                    const flowerOption = Array.from(document.querySelectorAll('.flower-option'))
                        .find(option => option.title === bouquet.flower);
                    
                    if (flowerOption) {
                        flowerOption.click();
                    }
                }
                
                if (bouquet.color) {
                    const colorOption = Array.from(document.querySelectorAll('.color-option'))
                        .find(option => option.title === bouquet.color);
                    
                    if (colorOption) {
                        colorOption.click();
                    }
                }
                
                if (bouquet.wrapping) {
                    const wrappingOption = Array.from(document.querySelectorAll('.wrapping-option'))
                        .find(option => option.title === bouquet.wrapping);
                    
                    if (wrappingOption) {
                        wrappingOption.click();
                    }
                }
                
                if (bouquet.note) {
                    bouquetNoteText.value = bouquet.note;
                }
            } catch (error) {
                console.error('Error loading saved bouquet:', error);
            }
        }
    };

    // Load saved bouquet on page load
    loadSavedBouquet();
});
