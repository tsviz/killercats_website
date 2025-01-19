let gameActive = false;
let cat = null;
let catInterval = null;
let score = 0;
let scoreDisplay = null;

function initCatGame() {
    // Clear previous game if exists
    if (cat) {
        cat.remove();
        scoreDisplay.remove();
        clearInterval(catInterval);
        cat = null;
        scoreDisplay = null;
    }

    // Create new game elements
    cat = document.createElement('div');
    cat.className = 'floating-cat';
    cat.innerHTML = '🐱';
    cat.style.display = 'none';
    document.body.appendChild(cat);
    
    scoreDisplay = document.createElement('div');
    scoreDisplay.id = 'score';
    scoreDisplay.className = 'score-display';
    scoreDisplay.style.display = 'none';
    scoreDisplay.textContent = `Score: ${score}`;
    document.body.appendChild(scoreDisplay);

    cat.addEventListener('click', () => {
        if (gameActive) {
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
            cat.classList.add('caught');
            setTimeout(() => cat.classList.remove('caught'), 500);
            updateCatPosition();
        }
    });
    
    toggleGame();
}

function toggleGame() {
    gameActive = !gameActive;
    
    if (gameActive) {
        cat.style.display = 'block';
        scoreDisplay.style.display = 'block';
        updateCatPosition();
        catInterval = setInterval(updateCatPosition, 2000);
    } else {
        cat.style.display = 'none';
        scoreDisplay.style.display = 'none';
        clearInterval(catInterval);
    }
}

function updateCatPosition() {
    if (!cat) return;
    const maxX = window.innerWidth - 50;
    const maxY = window.innerHeight - 50;
    cat.style.left = `${Math.random() * maxX}px`;
    cat.style.top = `${Math.random() * maxY}px`;
}

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

    // Restore audio state after page reload
    const savedTime = localStorage.getItem('audioTime');
    const wasPlaying = localStorage.getItem('audioPlaying') === 'true';
    
    if (savedTime) {
        const audio = document.getElementById('audio-player');
        audio.currentTime = savedTime;
        if (wasPlaying) {
            audio.play();
            document.querySelector('.play-button').textContent = '⏸';
        }
        localStorage.removeItem('audioTime');
        localStorage.removeItem('audioPlaying');
    }
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