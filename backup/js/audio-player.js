// Audio Player Functionality
document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = document.getElementById('audio-player');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const volumeBtn = document.getElementById('volume-btn');
    const progressBar = document.querySelector('.progress');
    const currentTimeDisplay = document.querySelector('.current-time');
    const durationDisplay = document.querySelector('.duration');
    
    if (!audioPlayer || !playPauseBtn || !volumeBtn || !progressBar) return;
    
    // Initialize Howler.js audio if available
    let sound;
    if (typeof Howl !== 'undefined') {
        sound = new Howl({
            src: [audioPlayer.getAttribute('data-src') || 'audio/background-music.mp3'],
            html5: true,
            loop: true,
            volume: 0.7
        });
    }
    
    // Play/Pause functionality
    let isPlaying = false;
    
    playPauseBtn.addEventListener('click', function() {
        if (sound) {
            if (isPlaying) {
                sound.pause();
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            } else {
                sound.play();
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            }
            isPlaying = !isPlaying;
        } else if (audioPlayer) {
            if (audioPlayer.paused) {
                audioPlayer.play();
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                audioPlayer.pause();
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        }
    });
    
    // Volume control
    let isMuted = false;
    
    volumeBtn.addEventListener('click', function() {
        if (sound) {
            if (isMuted) {
                sound.volume(0.7);
                volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            } else {
                sound.volume(0);
                volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            }
            isMuted = !isMuted;
        } else if (audioPlayer) {
            if (audioPlayer.muted) {
                audioPlayer.muted = false;
                volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            } else {
                audioPlayer.muted = true;
                volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            }
        }
    });
    
    // Update progress bar
    const updateProgress = () => {
        if (sound) {
            const seek = sound.seek() || 0;
            const duration = sound.duration() || 0;
            progressBar.style.width = (seek / duration * 100) + '%';
            
            if (currentTimeDisplay) {
                currentTimeDisplay.textContent = formatTime(seek);
            }
            if (durationDisplay) {
                durationDisplay.textContent = formatTime(duration);
            }
        } else if (audioPlayer) {
            const currentTime = audioPlayer.currentTime;
            const duration = audioPlayer.duration;
            progressBar.style.width = (currentTime / duration * 100) + '%';
            
            if (currentTimeDisplay) {
                currentTimeDisplay.textContent = formatTime(currentTime);
            }
            if (durationDisplay) {
                durationDisplay.textContent = formatTime(duration);
            }
        }
        
        requestAnimationFrame(updateProgress);
    };
    
    // Format time in MM:SS
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };
    
    // Start progress update
    updateProgress();
    
    // Add glass morphism effect to audio controls
    const audioControls = document.querySelector('.audio-controls');
    if (audioControls) {
        audioControls.classList.add('glass-effect');
    }
});
