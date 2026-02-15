// Update countdown timer
function updateCountdown() {
    // Set her birthday date here (change YYYY-MM-DD to her actual birthday)
    // Example: const birthdayDate = new Date('2024-03-15').getTime();
    const birthdayDate = new Date('2026-02-20').getTime();
    
    const now = new Date().getTime();
    const distance = birthdayDate - now;

    if (distance < 0) {
        // Birthday has passed
        document.getElementById('days').textContent = '0';
        document.getElementById('hours').textContent = '0';
        document.getElementById('minutes').textContent = '0';
        document.getElementById('seconds').textContent = '0';
        document.querySelector('.countdown').innerHTML = '<h2 style="grid-column: 1/-1; color: #ff6b6b; font-size: 2rem;">🎉 Happy Birthday! 🎉</h2>';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// Confetti animation
function celebrateClick() {
    createConfetti();
    playSound();
}

function createConfetti() {
    const confettiContainer = document.getElementById('confetti');
    const colors = ['#ff6b6b', '#ffd93d', '#6bcf7f', '#667eea', '#764ba2', '#ff9a56'];
    
    for (let i = 0; i < 50; i++) {
        const confettiPiece = document.createElement('div');
        confettiPiece.className = 'confetti-particle';
        
        const x = (Math.random() - 0.5) * 800;
        const y = -10 - Math.random() * 300;
        const rotation = Math.random() * 360;
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

function playSound() {
    // Create a simple beep sound using Web Audio API
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
}

// Add some interactivity to title
const title = document.getElementById('title');
let isHappy = false;

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

// Add pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
`;
document.head.appendChild(style);

// Initialize countdown on page load
updateCountdown();

// Update countdown every second
setInterval(updateCountdown, 1000);

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';
