// ===== COUNTDOWN TIMER =====
ffunction updateCountdown() {
    const targetDate = new Date(Date.now() + (60 * 60 * 1000)); // 1 hour from now
    const now = new Date();
    const distance = targetDate - now;

    if (distance <= 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';

        document.querySelector('.countdown').innerHTML =
            '<h2 style="grid-column: 1/-1; color:#ff6b6b;">🎬 Time’s Up!</h2>';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}tContent = String(seconds).padStart(2, '0');
}

// ===== CONFETTI EFFECTS =====
function celebrateClick() {
    createConfetti();
    playSound();
}
updateCountdown();
setInterval(updateCountdown, 1000);

function createConfetti() {
    const confettiContainer = document.getElementById('confetti');
    const colors = ['#ff6b6b', '#ffd93d', '#6bcf7f', '#667eea', '#764ba2', '#ff9a56'];

    for (let i = 0; i < 50; i++) {
        const confettiPiece = document.createElement('div');
        confettiPiece.className = 'confetti-particle';

        const x = (Math.random() - 0.5) * 800;
        const y = -10 - Math.random() * 300;
        const delay = Math.random() * 0.5;

        confettiPiece.style.left = '50%';
        confettiPiece.style.top = '50%';
        confettiPiece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confettiPiece.style.setProperty('--tx', x + 'px');
        confettiPiece.style.setProperty('--ty', y + 'px');
        confettiPiece.style.animation = `confettiFall 3s ease-out ${delay}s forwards`;
        confettiPiece.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';

        confettiContainer.appendChild(confettiPiece);

        setTimeout(() => confettiPiece.remove(), 3500);
    }
}

function createSmallConfetti(element) {
    const rect = element.getBoundingClientRect();
    const confettiColors = ['#ff6b6b', '#ffd93d', '#6bcf7f', '#667eea', '#764ba2', '#ff9a56'];
    
    for (let i = 0; i < 8; i++) {
        const confettiPiece = document.createElement('div');
        confettiPiece.className = 'confetti-particle';
        
        const x = (Math.random() - 0.5) * 200;
        const y = -10 - Math.random() * 150;
        
        confettiPiece.style.left = rect.left + rect.width / 2 + 'px';
        confettiPiece.style.top = rect.top + 'px';
        confettiPiece.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        confettiPiece.style.setProperty('--tx', x + 'px');
        confettiPiece.style.setProperty('--ty', y + 'px');
        confettiPiece.style.animation = `confettiFall 2s ease-out forwards`;
        confettiPiece.style.animationDelay = (Math.random() * 0.2) + 's';
        
        document.body.appendChild(confettiPiece);
        
        setTimeout(() => confettiPiece.remove(), 2000);
    }
}

function playSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 800;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
        console.log('Audio not available');
    }
}

// ===== FLOATING HEARTS AND SPARKLES =====
function createFloatingHearts() {
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💝'];
    const container = document.getElementById('hearts-container');
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        
        const left = Math.random() * 100;
        const delay = Math.random() * 2;
        
        heart.style.left = left + '%';
        heart.style.animationDelay = delay + 's';
        
        container.appendChild(heart);
        
        setTimeout(() => heart.remove(), 9000);
    }, 800);
}

function createSparkles(x, y) {
    const sparkleEmojis = ['✨', '⭐', '🌟', '💫'];
    const container = document.getElementById('sparkles-container');
    
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
        
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        
        container.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 1500);
    }
}

// ===== VIDEO PLAYER TOGGLE =====
function playMusic() {
    const playerDisplay = document.getElementById('player-display');
    const videoPlayer = document.getElementById('video-player');
    
    if (videoPlayer.style.display === 'none') {
        // Show video player
        videoPlayer.style.display = 'block';
        playerDisplay.style.display = 'none';
        createSparkles(window.innerWidth / 2, window.innerHeight / 2);
    } else {
        // Hide video player
        videoPlayer.style.display = 'none';
        playerDisplay.style.display = 'flex';
    }
}

// ===== MUSIC PLAYER =====
document.addEventListener('DOMContentLoaded', function() {
    const bgm = document.getElementById('bgm');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressBar = document.getElementById('progress-bar');
    const volumeControl = document.getElementById('volume-control');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');

    let isPlaying = false;

    if (!bgm || !playPauseBtn) {
        console.log('Audio elements not found');
        return;
    }

    // Play/Pause button
    playPauseBtn.addEventListener('click', function() {
        if (isPlaying) {
            bgm.pause();
            playPauseBtn.textContent = '▶️';
            isPlaying = false;
        } else {
            bgm.play().catch(e => console.log('Audio play failed:', e));
            playPauseBtn.textContent = '⏸️';
            isPlaying = true;
        }
    });

    // Update progress bar as music plays
    bgm.addEventListener('timeupdate', function() {
        if (bgm.duration) {
            const percent = (bgm.currentTime / bgm.duration) * 100;
            progressBar.value = percent;
            currentTimeEl.textContent = formatTime(bgm.currentTime);
        }
    });

    // Update duration when metadata loads
    bgm.addEventListener('loadedmetadata', function() {
        durationEl.textContent = formatTime(bgm.duration);
    });

    // Seek through the song
    progressBar.addEventListener('input', function() {
        if (bgm.duration) {
            bgm.currentTime = (this.value / 100) * bgm.duration;
        }
    });

    // Volume control
    volumeControl.addEventListener('input', function() {
        bgm.volume = this.value / 100;
    });

    // Format time helper
    function formatTime(seconds) {
        if (!seconds || isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Next button (restart song)
    nextBtn.addEventListener('click', function() {
        bgm.currentTime = 0;
        bgm.play().catch(e => console.log('Audio play failed'));
        playPauseBtn.textContent = '⏸️';
        isPlaying = true;
    });

    // Previous button (restart from beginning)
    prevBtn.addEventListener('click', function() {
        bgm.currentTime = 0;
    });

    // Auto-play when page loads
    bgm.addEventListener('canplay', function() {
        bgm.play().catch(e => console.log('Auto-play failed - user interaction required'));
        playPauseBtn.textContent = '⏸️';
        isPlaying = true;
    });

    // Set initial volume
    bgm.volume = 0.7;
});

// ===== DARK MODE =====
const themeToggle = document.getElementById('theme-toggle');
let isDarkMode = false;

themeToggle.addEventListener('click', function() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode');
    themeToggle.textContent = isDarkMode ? '☀️' : '🌙';
    localStorage.setItem('darkMode', isDarkMode);
});

// Load dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    isDarkMode = true;
    document.body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
}

// ===== SURPRISE MESSAGES =====
function revealMessage(element) {
    if (element.classList.contains('revealed')) {
        element.classList.remove('revealed');
    } else {
        element.classList.add('revealed');
        createSmallConfetti(element);
    }
}

// ===== REASONS CAROUSEL =====
let currentReasonIndex = 0;

function showReason(index) {
    const reasonCards = document.querySelectorAll('.reason-card');
    reasonCards.forEach(card => card.style.display = 'none');
    
    if (reasonCards[index]) {
        reasonCards[index].style.display = 'flex';
    }
}

function nextReason() {
    const reasonCards = document.querySelectorAll('.reason-card');
    currentReasonIndex = (currentReasonIndex + 1) % reasonCards.length;
    showReason(currentReasonIndex);
    createSparkles(window.innerWidth / 2, window.innerHeight / 2);
}

function prevReason() {
    const reasonCards = document.querySelectorAll('.reason-card');
    currentReasonIndex = (currentReasonIndex - 1 + reasonCards.length) % reasonCards.length;
    showReason(currentReasonIndex);
    createSparkles(window.innerWidth / 2, window.innerHeight / 2);
}

// ===== GUEST BOOK / BIRTHDAY WISHES =====
// (Removed - Feature deleted)

// ===== TITLE INTERACTIVITY =====
document.addEventListener('DOMContentLoaded', function() {
    const title = document.getElementById('title');
    let isHappy = false;

    if (title) {
        title.addEventListener('click', function() {
            isHappy = !isHappy;
            if (isHappy) {
                this.textContent = '💕 I Love You! 💕';
                this.style.animation = 'pulse 0.6s ease-out';
                setTimeout(() => {
                    this.style.animation = '';
                }, 600);
            } else {
                this.textContent = 'Happy Birthday! 🎂';
            }
        });
    }
});

// Add animations on mouse move over page
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.98) {
        createSparkles(e.clientX, e.clientY);
    }
});

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Add pulse animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
    `;
    document.head.appendChild(style);

    // Initialize features
    updateCountdown();
    setInterval(updateCountdown, 1000);
    createFloatingHearts();
    showReason(0);

    // Smooth scroll
    document.documentElement.style.scrollBehavior = 'smooth';
});
