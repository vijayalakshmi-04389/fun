const birthday = new Date("2026-01-07T23:40:00");
const timerDisplay = document.getElementById("timer");
const countdownContent = document.getElementById("countdownContent");
const birthdayMessage = document.getElementById("birthdayMessage");
const countdownSection = document.getElementById("countdown");

let birthdayHasArrived = false;

// Create floating hearts background
function createFloatingHearts() {
    const container = document.createElement('div');
    container.className = 'floating-hearts';
    
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤️';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDelay = `${Math.random() * 15}s`;
        heart.style.fontSize = `${Math.random() * 20 + 15}px`;
        container.appendChild(heart);
    }
    
    document.body.appendChild(container);
}

function updateCountdown() {
    const now = new Date();
    const diff = birthday - now;

    if (diff <= 0 && !birthdayHasArrived) {
        birthdayHasArrived = true;
        showBirthdayWish();
        return;
    }

    if (birthdayHasArrived) return;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    timerDisplay.innerHTML = `
        <div class="time-unit">
            <span class="time-number">${days.toString().padStart(2, '0')}</span>
            <span class="time-label">Days</span>
        </div>
        <div class="time-unit">
            <span class="time-number">${hours.toString().padStart(2, '0')}</span>
            <span class="time-label">Hours</span>
        </div>
        <div class="time-unit">
            <span class="time-number">${minutes.toString().padStart(2, '0')}</span>
            <span class="time-label">Minutes</span>
        </div>
        <div class="time-unit">
            <span class="time-number">${seconds.toString().padStart(2, '0')}</span>
            <span class="time-label">Seconds</span>
        </div>
    `;
    
    // Add pulse animation to timer
    const timeUnits = document.querySelectorAll('.time-unit');
    timeUnits.forEach((unit, index) => {
        unit.style.animationDelay = `${index * 0.1}s`;
        unit.classList.add('pulse');
        setTimeout(() => unit.classList.remove('pulse'), 500);
    });
}

function showBirthdayWish() {
    // Hide the countdown timer
    if (countdownContent) {
        countdownContent.style.display = "none";
    }
    
    // Hide the countdown header
    const countdownHeader = countdownSection.querySelector('h2');
    if (countdownHeader) {
        countdownHeader.style.display = "none";
    }
    
    // Show birthday message with balloons
    birthdayMessage.classList.remove("hidden");
    birthdayMessage.style.display = "block";
    
    // Animate balloons
    animateBalloons();
    
    // Start celebration
    startConfetti();
    playBirthdayMusic();
    createSparkles();
}

function animateBalloons() {
    const balloons = document.querySelectorAll('.balloon');
    balloons.forEach((balloon, index) => {
        balloon.style.animation = `floatBalloon 4s ease-in-out infinite ${index * 0.2}s`;
        
        // Add floating effect
        setInterval(() => {
            balloon.style.transform = `translateY(${Math.sin(Date.now() / 1000 + index) * 10}px) rotate(${Math.sin(Date.now() / 1000 + index) * 5}deg)`;
        }, 50);
    });
}

function playBirthdayMusic() {
    const music = document.getElementById("bgMusic");
    music.volume = 0.7;
    
    // Try to play with user interaction fallback
    const playPromise = music.play();
    
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log("Autoplay blocked, waiting for user interaction");
            // Show play button instead
            document.querySelector('button[onclick="playMusic()"]').style.display = 'block';
        });
    }
}

function playMusic() {
    const music = document.getElementById("bgMusic");
    music.volume = 0.7;
    music.play();
    
    // Hide the play button after clicking
    event.target.style.display = 'none';
}

function nextStep(sectionId) {
    // First, instantly scroll to the VERY TOP of the page
    window.scrollTo({
        top: 0,
        behavior: 'instant'
    });
    
    // Add exit animation to current section
    const currentSection = document.querySelector('.active-step');
    if (currentSection) {
        currentSection.style.animation = 'slideOut 0.5s ease';
        setTimeout(() => {
            currentSection.classList.remove('active-step');
            currentSection.classList.add('hidden-step');
            currentSection.style.animation = '';
        }, 500);
    }
    
    // Show the requested section AT THE TOP
    const nextSection = document.getElementById(sectionId);
    nextSection.classList.remove('hidden-step');
    nextSection.classList.add('active-step');
    
    // Add entrance animation
    nextSection.style.animation = 'slideIn 0.8s ease';
    
    // NO scrolling to the section - it's already at top because we scrolled to top first
    
    if (sectionId === 'our-photos') {
        setTimeout(() => {
            const galleryAudio = new Audio('assets/WhatsApp Audio 2026-01-06 at 10.42.16 PM (online-audio-converter.com).mp3');
            galleryAudio.volume = 0.4;
            galleryAudio.loop = true;
            
            // Try to play automatically
            galleryAudio.play().catch(error => {
                console.log("Auto-play prevented, will play on user interaction");
                
                // Create a play button
                const playBtn = document.createElement('button');
                playBtn.innerHTML = '🎵 Play Memories Music';
                playBtn.style.cssText = `
                    position: fixed;
                    top: 80px;
                    right: 20px;
                    background: linear-gradient(45deg, var(--primary-pink), var(--primary-orange));
                    color: white;
                    border: none;
                    padding: 10px 15px;
                    border-radius: 25px;
                    font-size: 14px;
                    cursor: pointer;
                    z-index: 1000;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                    animation: pulse 2s infinite;
                `;
                playBtn.onclick = () => {
                    galleryAudio.play();
                    playBtn.remove();
                };
                document.body.appendChild(playBtn);
                
                // Auto-remove after 8 seconds
                setTimeout(() => {
                    if (playBtn.parentNode) {
                        playBtn.remove();
                    }
                }, 8000);
            });
            
            // Store reference to stop it later
            window.galleryAudio = galleryAudio;
        }, 300);
    }
    
    // Stop gallery music when leaving photos section
    if (currentSection && currentSection.id === 'our-photos' && window.galleryAudio) {
        window.galleryAudio.pause();
        window.galleryAudio.currentTime = 0;
    }
    
    // Add animation effects for gallery sections
    if (sectionId.includes('photos') || sectionId === 'timeline') {
        animateGalleryItems(sectionId);
    }
    
    // Create sparkles on button click
    createButtonSparkles(event.target);
}

function createButtonSparkles(button) {
    const rect = button.getBoundingClientRect();
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = `${rect.left + Math.random() * rect.width}px`;
            sparkle.style.top = `${rect.top + Math.random() * rect.height}px`;
            document.body.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 1500);
        }, i * 100);
    }
}

function createSparkles() {
    setInterval(() => {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = `${Math.random() * 100}vw`;
        sparkle.style.top = `${Math.random() * 100}vh`;
        document.body.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 1500);
    }, 300);
}

function animateGalleryItems(sectionId) {
    setTimeout(() => {
        const items = document.querySelectorAll(`#${sectionId} .photo-frame, #${sectionId} .collage-item, #${sectionId} .timeline-item`);
        items.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('animated');
            }, index * 200);
        });
    }, 500);
}

function openEnvelope() {
    const envelope = document.querySelector('.envelope');
    const letterContent = document.getElementById('letterContent');
    const envelopeFlap = document.querySelector('.envelope-flap');
    
    // If already open, close it
    if (envelope.classList.contains('open')) {
        envelope.classList.remove('open');
        envelopeFlap.style.transform = 'translateY(0) rotate(0deg)';
        letterContent.style.opacity = '0';
        letterContent.style.transform = 'translateY(20px)';
        letterContent.style.pointerEvents = 'none';
    } else {
        // Open the envelope
        envelope.classList.add('open');
        
        // Lift the flap
        envelopeFlap.style.transform = 'translateY(-30px) rotateX(180deg)';
        envelopeFlap.style.transition = 'transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        
        // Show letter content after a delay
        setTimeout(() => {
            letterContent.style.opacity = '1';
            letterContent.style.transform = 'translateY(0)';
            letterContent.style.transition = 'all 0.6s ease 0.3s';
            letterContent.style.pointerEvents = 'all';
        }, 300);
        
        // Play envelope sound
        playEnvelopeSound();
    }
}



function playEnvelopeSound() {
    // Optional: Add envelope opening sound
    try {
        const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-open-envelope-1754.mp3');
        audio.volume = 0.5;
        audio.play();
    } catch (e) {
        console.log('Could not play envelope sound');
    }
}
/* 🎈 Enhanced Confetti Effect */
function startConfetti() {
    const confettiContainer = document.getElementById("confetti");
    confettiContainer.innerHTML = "";
    confettiContainer.style.display = "block";
    
    // Multiple types of confetti
    const types = ['circle', 'star', 'rectangle', 'triangle'];
    const colors = ["#ff6b8b", "#6b5bff", "#5bff6b", "#ffb84d", "#4dc9ff", "#ff4d8d", "#8d4dff", "#ffeb3b"];
    
    for (let i = 0; i < 200; i++) {
        setTimeout(() => {
            const confetti = document.createElement("div");
            confetti.classList.add("confetti-piece");
            
            // Random properties
            const type = types[Math.floor(Math.random() * types.length)];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            confetti.style.left = Math.random() * 100 + "vw";
            confetti.style.width = Math.random() * 15 + 8 + "px";
            confetti.style.height = Math.random() * 15 + 8 + "px";
            confetti.style.backgroundColor = color;
            confetti.style.animationDuration = Math.random() * 3 + 2 + "s";
            confetti.style.animationDelay = Math.random() * 2 + "s";
            
            // Different shapes
            if (type === 'rectangle') {
                confetti.style.borderRadius = '2px';
            } else if (type === 'triangle') {
                confetti.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
            }
            
            confettiContainer.appendChild(confetti);
        }, i * 10);
    }
    
    // Add sound effect
    const confettiSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-happy-crowd-laugh-464.mp3');
    confettiSound.volume = 0.3;
    confettiSound.play();
    
    setTimeout(() => {
        confettiContainer.style.display = "none";
    }, 5000);
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
      createFloatingHearts();
    createBalloonHearts(); // Add this line
    addPartyHatCursor();   // Add this line
    updateCountdown();
    setInterval(updateCountdown, 1000);
    setInterval(updateCountdown, 1000);
    const letterContent = document.getElementById('letterContent');
    if (letterContent) {
        letterContent.style.opacity = '0';
        letterContent.style.transform = 'translateY(20px)';
        letterContent.style.pointerEvents = 'none';
    }
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            const currentId = document.querySelector('.active-step').id;
            const sections = ['countdown', 'her-childhood-photos', 'her-grownup-photos', 'our-photos', 'timeline', 'letter', 'surprise'];
            const currentIndex = sections.indexOf(currentId);
            if (currentIndex < sections.length - 1) {
                nextStep(sections[currentIndex + 1]);
            }
        }
        if (e.key === 'ArrowLeft') {
            const currentId = document.querySelector('.active-step').id;
            const sections = ['countdown', 'her-childhood-photos', 'her-grownup-photos', 'our-photos', 'timeline', 'letter', 'surprise'];
            const currentIndex = sections.indexOf(currentId);
            if (currentIndex > 0) {
                nextStep(sections[currentIndex - 1]);
            }
        }
    });
    
    // Add hover effects to all buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('mouseenter', () => {
            createButtonSparkles(button);
        });
    });
});

// Add CSS for slideOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        to {
            opacity: 0;
            transform: translateY(-50px) scale(0.95);
        }
    }
    
    .pulse {
        animation: pulse 0.5s ease;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);
// Add to your existing script.js

// Create floating balloon hearts
function createBalloonHearts() {
    const container = document.createElement('div');
    container.className = 'floating-balloon-hearts';
    
    const colors = ['#ff6b8b', '#ff8e53', '#4d94ff', '#b84dff', '#4dff88', '#ff4d8d'];
    
    for (let i = 0; i < 8; i++) {
        const balloonHeart = document.createElement('div');
        balloonHeart.className = 'balloon-heart';
        
        // Random properties
        const color = colors[Math.floor(Math.random() * colors.length)];
        const delay = Math.random() * 15;
        const duration = 15 + Math.random() * 10;
        const left = Math.random() * 100;
        const sway = (Math.random() - 0.5) * 2;
        const rotation = Math.random() * 0.5;
        
        balloonHeart.style.setProperty('--color', color);
        balloonHeart.style.animationDuration = `${duration}s`;
        balloonHeart.style.animationDelay = `${delay}s`;
        balloonHeart.style.left = `${left}%`;
        balloonHeart.style.setProperty('--sway', sway);
        balloonHeart.style.setProperty('--rotation', rotation);
        
        // Add string
        const string = document.createElement('div');
        string.className = 'balloon-string';
        string.style.animationDelay = `${delay}s`;
        balloonHeart.appendChild(string);
        
        container.appendChild(balloonHeart);
    }
    
    document.body.appendChild(container);
}

// Create glitter effect
function createGlitter(x, y) {
    const glitter = document.createElement('div');
    glitter.className = 'glitter';
    glitter.style.left = `${x}px`;
    glitter.style.top = `${y}px`;
    
    // Random color
    const colors = ['#ffeb3b', '#ff6b8b', '#4dff88', '#4d94ff', '#ff8e53'];
    glitter.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Random size
    const size = Math.random() * 8 + 4;
    glitter.style.width = `${size}px`;
    glitter.style.height = `${size}px`;
    
    document.body.appendChild(glitter);
    
    // Remove after animation
    setTimeout(() => {
        glitter.remove();
    }, 2000);
}

// Add party hat cursor
function addPartyHatCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'party-hat-cursor';
    cursor.style.display = 'none';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.display = 'block';
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        
        // Create glitter trail
        if (Math.random() > 0.7) {
            createGlitter(e.clientX, e.clientY);
        }
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.display = 'none';
    });
}

// Enhanced startConfetti with hearts
function startEnhancedConfetti() {
    const confettiContainer = document.getElementById("confetti");
    confettiContainer.innerHTML = "";
    confettiContainer.style.display = "block";
    
    const colors = ["#ff6b8b", "#6b5bff", "#5bff6b", "#ffb84d", "#4dc9ff", "#ff4d8d", "#8d4dff"];
    const types = ['circle', 'heart', 'star', 'rectangle'];
    
    for (let i = 0; i < 250; i++) {
        setTimeout(() => {
            const confetti = document.createElement("div");
            confetti.classList.add("confetti-piece");
            
            const type = types[Math.floor(Math.random() * types.length)];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            if (type === 'heart') {
                confetti.classList.add('heart');
                confetti.innerHTML = '❤️';
                confetti.style.color = color;
                confetti.style.fontSize = `${Math.random() * 15 + 15}px`;
            } else {
                confetti.style.backgroundColor = color;
                confetti.style.width = `${Math.random() * 12 + 6}px`;
                confetti.style.height = `${Math.random() * 12 + 6}px`;
                confetti.style.borderRadius = type === 'circle' ? '50%' : '2px';
            }
            
            confetti.style.left = Math.random() * 100 + "vw";
            confetti.style.animationDuration = Math.random() * 3 + 2 + "s";
            confetti.style.animationDelay = Math.random() * 2 + "s";
            
            confettiContainer.appendChild(confetti);
        }, i * 8);
    }
}

