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
        speedFactor: 1 // Add speed factor
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
            clearInterval(this.state.interval);
            clearTimeout(this.state.gameTimer); // Clear game timer
            this.state.cat = null;
            this.state.scoreDisplay = null;
        }

        // Create new game elements
        this.state.cat = document.createElement('div');
        this.state.cat.className = 'floating-cat';
        this.state.cat.innerHTML = '🐱';
        this.state.cat.style.display = 'none';
        document.body.appendChild(this.state.cat);
        
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
                this.state.cat.classList.add('caught');
                setTimeout(() => this.state.cat.classList.remove('caught'), 500);
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
        this.state.cat.style.left = `${Math.random() * maxX}px`;
        this.state.cat.style.top = `${Math.random() * maxY}px`;
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

function openMap(location) {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Check if the user is on an iPhone or iPad
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        // Redirect to Apple Maps
        window.location.href = "https://maps.apple.com/?q=" + encodeURIComponent(location);
    } else {
        // Redirect to Google Maps
        var url = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(location);
        if (/Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
            // Open in the same tab for mobile devices
            window.location.href = url;
        } else {
            // Open in a new tab for desktop browsers
            window.open(url, '_blank');
        }
    }
}

// Define submitEventRequest immediately on window object
window.submitEventRequest = function() {
    const date = document.getElementById('eventDate').value;
    const details = document.getElementById('eventDetails').value;
    // Check if date and details are not empty
    if (date && details) {
        // Create a FormData object
        const formData = new FormData();
        formData.append('eventDate', date);
        formData.append('eventDetails', details);

        // Send the form data to the server
        fetch('/Home/SubmitEventRequest', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                // Handle successful submission
                alert('Event request submitted successfully!');
                // Optionally clear the form
                document.getElementById('eventDate').value = '';
                document.getElementById('eventDetails').value = '';
            } else {
                // Handle errors
                alert('Failed to submit event request.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while submitting the request.');
        });
    } else {
        alert('Please fill in both the date and details fields.');
    }
};

document.addEventListener('DOMContentLoaded', function () {
    var toggleButtons = document.querySelectorAll('.toggle-info');

    toggleButtons.forEach(function (button) {
        var targetId = button.getAttribute('data-target');
        var target = document.querySelector(targetId);
        var collapse = new bootstrap.Collapse(target, {
            toggle: false
        });

        function updateButtonState(isExpanded) {
            button.textContent = isExpanded ? button.getAttribute('data-toggle-text') : 'More Info';
            button.setAttribute('aria-expanded', isExpanded);
        }

        button.addEventListener('click', function () {
            var isCurrentlyExpanded = target.classList.contains('show');
            
            // Only reload when clicking "Less Info" (collapsing)
            if (isCurrentlyExpanded) {
                collapse.hide();
                window.location.reload();
            } else {
                collapse.show();
            }
            updateButtonState(!isCurrentlyExpanded);
        });

        // Initial state
        updateButtonState(false);
    });

    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('eventDate');
    if (dateInput) {
        dateInput.setAttribute('min', today);
    }

    // Add event listener for the submit button
    const submitButton = document.getElementById('submitEventBtn');
    let hasShownWarning = false;

    // Remove any existing event listeners
    submitButton.replaceWith(submitButton.cloneNode(true));
    const newSubmitButton = document.getElementById('submitEventBtn');

    newSubmitButton.addEventListener('click', function (e) {
        e.preventDefault();
        
        const eventDate = document.getElementById('eventDate').value;
        const eventDetails = document.getElementById('eventDetails').value;

        if (!eventDate) {
            alert('Please fill in the date field.');
            return;
        }

        if (!eventDetails) {
            alert('Please fill in the Additional Details field.');
            return;
        }

        // Reset warning flag when form is valid
        hasShownWarning = false;

        // Format date to mm-dd-yyyy
        const [year, month, day] = eventDate.split('-');
        const formattedDate = `${month}-${day}-${year}`;

        const subject = encodeURIComponent(`Event Schedule Request - ${formattedDate}`);
        const body = encodeURIComponent(`Event Date: ${formattedDate}\n\nEvent Details: ${eventDetails}`);
        const mailtoLink = `mailto:killercats@outerspace.com?subject=${subject}&body=${body}`;
        
        // Open mailto link
        window.location.href = mailtoLink;

        // Properly close modal and reset page state
        $('#scheduleModal').modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();

        // Clear form fields
        document.getElementById('eventDate').value = '';
        document.getElementById('eventDetails').value = '';

        // Reload the page to reset state
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    });

    // Reset warning flag when modal is closed
    $('#scheduleModal').on('hidden.bs.modal', function () {
        hasShownWarning = false;
    });

    if (!submitButton) {
        console.error('Submit button not found in DOM');
        return;
    }

    submitButton.addEventListener('click', function(e) {
        e.preventDefault();

        // Debug: Check form elements
        const eventDate = document.getElementById('eventDate');
        const eventDetails = document.getElementById('eventDetails');
        
        console.log('Form elements:', {
            dateElement: eventDate,
            detailsElement: eventDetails
        });

        if (!eventDate || !eventDetails) {
            console.error('Form elements not found');
            return;
        }

        const dateValue = eventDate.value;
        const detailsValue = eventDetails.value;

        console.log('Form values:', {
            date: dateValue,
            details: detailsValue
        });

        if (!dateValue || !detailsValue) {
            alert('Please fill in both the date and details fields.');
            return;
        }

        // Create and open mailto link
        const subject = encodeURIComponent('Event Schedule Request');
        const body = encodeURIComponent(`Event Date: ${dateValue}\n\nEvent Details: ${detailsValue}`);
        const mailtoLink = `mailto:killercats@outerspace.com?subject=${subject}&body=${body}`;

        window.location.href = mailtoLink;

        // Properly close modal and reset page state
        $('#scheduleModal').modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();

        // Clear form fields
        eventDate.value = '';
        eventDetails.value = '';

        // Reload the page to reset state
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    });

    // Audio Player Setup
    const initAudioPlayer = () => {
        const audio = document.getElementById('audio-player');
        const playButton = document.querySelector('.play-button');
        
        if (audio && playButton) {
            window.togglePlay = function() {
                if (audio.paused) {
                    audio.play();
                    playButton.textContent = '⏸';
                } else {
                    audio.pause();
                    playButton.textContent = '▶';
                }
            };
            
            window.setVolume = function(volume) {
                audio.volume = volume;
            };
        }
    };

    // Initialize audio player
    initAudioPlayer();
});

document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.getElementById('submitEventBtn');
    let hasShownWarning = false;

    if (submitButton) {
        submitButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            const eventDate = document.getElementById('eventDate');
            const eventDetails = document.getElementById('eventDetails');
            
            if (!eventDate || !eventDetails) return;

            const dateValue = eventDate.value;
            const detailsValue = eventDetails.value;

            if (!dateValue || !detailsValue) {
                if (!hasShownWarning) {
                    alert('Please fill in both the date and details fields.');
                    hasShownWarning = true;
                }
                return;
            }

            // If we get here, both fields are filled
            const subject = encodeURIComponent('Event Schedule Request');
            const body = encodeURIComponent(`Event Date: ${dateValue}\n\nEvent Details: ${detailsValue}`);
            const mailtoLink = `mailto:killercats@outerspace.com?subject=${subject}&body=${body}`;

            window.location.href = mailtoLink;
            
            $('#scheduleModal').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            
            // Clear form fields
            eventDate.value = '';
            eventDetails.value = '';
            
            // Reset warning flag
            hasShownWarning = false;
        });
    }

    // Reset warning flag when modal is closed
    $('#scheduleModal').on('hidden.bs.modal', function () {
        hasShownWarning = false;
    });
});