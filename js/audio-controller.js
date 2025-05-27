/**
 * Persistent Audio Controller
 * Ensures music continues across pages without restarting
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Persistent audio controller loaded');
    
    // Check if audio is already playing in another page
    var isPlaying = sessionStorage.getItem('audioPlaying') === 'true';
    var currentTime = parseFloat(sessionStorage.getItem('audioCurrentTime') || '0');
    
    console.log('Audio state from session storage:', { isPlaying, currentTime });
    
    // Create a simple audio element
    var audio = new Audio('audio/background-music.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    
    // Set the current time if we have one saved
    if (currentTime > 0) {
        audio.currentTime = currentTime;
    }
    
    // Only auto-play if it was already playing in another page
    if (isPlaying) {
        var playAttempt = setInterval(function() {
            audio.play()
                .then(function() {
                    console.log('Audio resumed from previous page');
                    clearInterval(playAttempt);
                    updateMusicToggle(true);
                })
                .catch(function(error) {
                    console.log('Auto-play prevented. Will try again.');
                });
        }, 1000);
    } else {
        // Update toggle to show correct state
        updateMusicToggle(false);
    }
    
    // Set up music toggle
    var musicToggle = document.getElementById('music-toggle');
    if (musicToggle) {
        musicToggle.addEventListener('click', function() {
            if (audio.paused) {
                audio.play()
                    .then(function() {
                        // Save state to session storage
                        sessionStorage.setItem('audioPlaying', 'true');
                        updateMusicToggle(true);
                        
                        // Hide the audio message after clicking
                        var audioMessage = document.querySelector('.audio-message');
                        if (audioMessage) {
                            audioMessage.style.display = 'none';
                        }
                    })
                    .catch(function(error) {
                        console.error('Failed to play audio:', error);
                    });
            } else {
                audio.pause();
                // Save state to session storage
                sessionStorage.setItem('audioPlaying', 'false');
                updateMusicToggle(false);
            }
        });
    }
    
    // Set up enter button
    var enterButton = document.getElementById('enter-button');
    if (enterButton) {
        enterButton.addEventListener('click', function() {
            audio.play()
                .then(function() {
                    // Save state to session storage
                    sessionStorage.setItem('audioPlaying', 'true');
                    updateMusicToggle(true);
                    
                    // Hide the audio message after clicking enter
                    var audioMessage = document.querySelector('.audio-message');
                    if (audioMessage) {
                        audioMessage.style.display = 'none';
                    }
                })
                .catch(function(error) {
                    console.error('Failed to play audio:', error);
                });
        });
    }
    
    // Update music toggle icon
    function updateMusicToggle(isPlaying) {
        if (musicToggle) {
            musicToggle.innerHTML = isPlaying ? 
                '<i class="fas fa-volume-up"></i>' : 
                '<i class="fas fa-volume-mute"></i>';
        }
        // Save state to session storage
        sessionStorage.setItem('audioPlaying', isPlaying ? 'true' : 'false');
    }
    
    // Save current time periodically
    setInterval(function() {
        if (!audio.paused) {
            sessionStorage.setItem('audioCurrentTime', audio.currentTime.toString());
        }
    }, 1000);
    
    // Save state before unloading the page
    window.addEventListener('beforeunload', function() {
        sessionStorage.setItem('audioPlaying', audio.paused ? 'false' : 'true');
        sessionStorage.setItem('audioCurrentTime', audio.currentTime.toString());
    });
    
    // Handle page visibility changes
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'hidden') {
            // Save state when page is hidden
            sessionStorage.setItem('audioPlaying', audio.paused ? 'false' : 'true');
            sessionStorage.setItem('audioCurrentTime', audio.currentTime.toString());
        }
    });
});
