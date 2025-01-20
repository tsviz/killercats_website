window.CatGame = {
    state: {
        active: false,
        cat: null,
        interval: null,
        score: 0,
        scoreDisplay: null,
        inactivityTimeout: null,
        audioPlayer: null,
        gameTimer: null,
        speedFactor: 1, // Add speed factor
        clickableArea: null // Add clickable area
    },

    resetInactivityTimer() {
        if (this.state.inactivityTimeout) {
            clearTimeout(this.state.inactivityTimeout);
        }
        this.state.inactivityTimeout = setTimeout(() => {
            if (this.state.active) {
                this.toggleGame();
            }
        }, 10000);
    },

    initGame() {
        // Clear previous game if exists
        if (this.state.cat) {
            this.state.cat.remove();
            this.state.scoreDisplay.remove();
            this.state.clickableArea.remove();
            clearInterval(this.state.interval);
            clearTimeout(this.state.gameTimer); // Clear game timer
            this.state.cat = null;
            this.state.scoreDisplay = null;
            this.state.clickableArea = null;
        }

        // Create new game elements
        this.state.cat = document.createElement('div');
        this.state.cat.className = 'floating-cat';
        this.state.cat.innerHTML = '🐱';
        this.state.cat.style.display = 'none';
        document.body.appendChild(this.state.cat);

        this.state.clickableArea = document.createElement('div');
        this.state.clickableArea.className = 'clickable-area';
        this.state.clickableArea.style.display = 'none';
        document.body.appendChild(this.state.clickableArea);
        
        this.state.scoreDisplay = document.createElement('div');
        this.state.scoreDisplay.id = 'score';
        this.state.scoreDisplay.className = 'score-display';
        this.state.scoreDisplay.style.display = 'none';
        this.state.scoreDisplay.textContent = `Score: ${this.state.score}`;
        document.body.appendChild(this.state.scoreDisplay);
        
        this.state.cat.addEventListener('click', () => {
            if (this.state.active) {
                this.state.score++;
                this.state.scoreDisplay.textContent = `Score: ${this.state.score}`;
                this.state.cat.innerHTML = '😾'; // Change to angry cat
                setTimeout(() => {
                    this.state.cat.innerHTML = '🐱'; // Revert back to normal cat
                }, 1000); // Change back after 1 second
                this.updateCatPosition();
                this.resetInactivityTimer(); // Reset timer on click
            }
        });

        this.state.clickableArea.addEventListener('click', () => {
            if (this.state.active) {
                this.state.score++;
                this.state.scoreDisplay.textContent = `Score: ${this.state.score}`;
                this.state.cat.innerHTML = '😾'; // Change to angry cat
                setTimeout(() => {
                    this.state.cat.innerHTML = '🐱'; // Revert back to normal cat
                }, 1000); // Change back after 1 second
                this.updateCatPosition();
                this.resetInactivityTimer(); // Reset timer on click
            }
        });
        
        this.toggleGame();
    },

    toggleGame() {
        this.state.active = !this.state.active;
        const gameButton = document.querySelector('.game-toggle');
        
        if (this.state.active) {
            gameButton.classList.add('active');
            // Show game elements
            this.state.cat.style.display = 'block';
            this.state.clickableArea.style.display = 'block';
            this.state.scoreDisplay.style.display = 'block';
            this.updateCatPosition();
            this.state.speedFactor = 1; // Reset speed factor
            this.state.interval = setInterval(this.updateCatPosition.bind(this), 2000 / this.state.speedFactor);
            this.resetInactivityTimer(); // Start timer when game starts

            // Set game timer to end after 30 seconds
            this.state.gameTimer = setTimeout(() => {
                this.endGame();
            }, 30000);

            // Increase speed factor over time
            this.state.speedInterval = setInterval(() => {
                this.state.speedFactor += 0.1;
                clearInterval(this.state.interval);
                this.state.interval = setInterval(this.updateCatPosition.bind(this), 2000 / this.state.speedFactor);
            }, 5000); // Increase speed every 5 seconds
        } else {
            this.endGame();
        }
    },

    endGame() {
        const gameButton = document.querySelector('.game-toggle');
        gameButton.classList.remove('active');
        this.state.cat.style.display = 'none';
        this.state.clickableArea.style.display = 'none';
        this.state.scoreDisplay.style.display = 'none';
        clearInterval(this.state.interval);
        clearTimeout(this.state.inactivityTimeout);
        clearTimeout(this.state.gameTimer); // Clear game timer
        clearInterval(this.state.speedInterval); // Clear speed interval
        this.state.active = false;
        alert(`Game Over! Final Score: ${this.state.score}`); // Show final score before resetting
        this.state.score = 0; // Reset score
        this.state.scoreDisplay.textContent = `Score: ${this.state.score}`; // Update score display
    },

    updateCatPosition() {
        if (!this.state.cat) return;
        const maxX = window.innerWidth - 50;
        const maxY = window.innerHeight - 50;
        const newX = Math.random() * maxX;
        const newY = Math.random() * maxY;
        this.state.cat.style.left = `${newX}px`;
        this.state.cat.style.top = `${newY}px`;

        // Update clickable area position and size
        this.state.clickableArea.style.left = `${newX - 25}px`;
        this.state.clickableArea.style.top = `${newY - 25}px`;
        this.state.clickableArea.style.width = '100px';
        this.state.clickableArea.style.height = '100px';
        this.state.clickableArea.style.display = 'block';

        // Hide clickable area after 1 second
        setTimeout(() => {
            this.state.clickableArea.style.display = 'none';
        }, 1000);
    },

    initAudioPlayer() {
        const audio = document.getElementById('audio-player');
        const playButton = document.querySelector('.play-button');
        
        if (audio && playButton) {
            this.state.audioPlayer = audio;
            window.togglePlay = function() {
                if (audio.paused) {
                    audio.play();
                    playButton.textContent = '⏸';
                } else {
                    audio.pause();
                    playButton.textContent = '▶';
                }
            };
        }
    }
};

// Single initialization point
window.initCatGame = () => window.CatGame.initGame();