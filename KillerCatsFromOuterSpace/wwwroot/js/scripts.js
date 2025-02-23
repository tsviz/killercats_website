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
        
        const eventDate = document.getElementById('eventDate').value.trim();
        const eventDetails = document.getElementById('eventDetails').value.trim();

        // Debugging statements
        console.log('Event Date:', eventDate);
        console.log('Event Details:', eventDetails);

        if (!eventDate || !eventDetails) {
            alert('Please fill in both fields.');
            return;
        }

        // Reset warning flag when form is valid
        hasShownWarning = false;

        // Format date to mm-dd-yyyy
        const [year, month, day] = eventDate.split('-');
        const formattedDate = `${month}-${day}-${year}`;

        const subject = encodeURIComponent(`Event Schedule Request - ${formattedDate}`);
        const body = encodeURIComponent(`Event Date: ${formattedDate}\n\nEvent Details: ${eventDetails}`);
        const mailtoLink = `mailto:kk1llercatsfromouterspace@gmail.com?subject=${subject}&body=${body}`;
        
        // Open mailto link
        window.location.href = mailtoLink;

        // Properly close modal and reset page state
        const scheduleModal = new bootstrap.Modal(document.getElementById('scheduleModal'));
        scheduleModal.hide();

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

    // Single consolidated form handler
    function initializeEventForm() {
        const eventForm = document.getElementById('scheduleForm');
        const submitButton = document.getElementById('submitEventBtn');
        const scheduleModal = document.getElementById('scheduleModal');

        if (eventForm && submitButton) {
            const modal = new bootstrap.Modal(scheduleModal);

            function handleSubmission(e) {
                e.preventDefault();
                e.stopPropagation();

                const eventDate = document.getElementById('eventDate').value.trim();
                const eventDetails = document.getElementById('eventDetails').value.trim();

                if (!eventDate || !eventDetails) {
                    alert('Please fill in both fields.');
                    return;
                }

                const [year, month, day] = eventDate.split('-');
                const formattedDate = `${month}-${day}-${year}`;
                
                const subject = encodeURIComponent(`Event Schedule Request - ${formattedDate}`);
                const body = encodeURIComponent(`Event Date: ${formattedDate}\n\nEvent Details: ${eventDetails}`);
                const mailtoLink = `mailto:kk1llercatsfromouterspace@gmail.com?subject=${subject}&body=${body}`;
                
                // Clean up and redirect
                modal.hide();
                eventForm.reset();
                
                // Short delay for mobile
                setTimeout(() => {
                    window.location.href = mailtoLink;
                }, 100);
            }

            // Attach single event listener to form
            eventForm.addEventListener('submit', handleSubmission);
            // Remove direct click handler from submit button since form submission will handle it
        }
    }

    // Initialize form handling
    initializeEventForm();
});

document.addEventListener('DOMContentLoaded', function() {
    const subscribeBtn = document.getElementById('subscribeBtn');
    const newsletterModal = document.getElementById('newsletterModal');
    
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const email = document.getElementById('emailInput').value.trim();
            
            if (!email) {
                alert('Please enter your email address');
                return;
            }
            
            const subject = encodeURIComponent('Newsletter Subscription Request');
            const body = encodeURIComponent(`New subscriber email: ${email}`);
            // const mailtoLink = `mailto:kk1llercatsfromouterspace@gmail.com?subject=${subject}&body=${body}`;
            const mailtoLink = `mailto:zandanys@gmail.com?subject=${subject}&body=${body}`;
            
            // Properly close modal using Bootstrap
            const bsModal = bootstrap.Modal.getInstance(newsletterModal);
            if (bsModal) {
                bsModal.hide();
            }
            
            // Small delay before opening email client
            setTimeout(() => {
                window.location.href = mailtoLink;
                document.getElementById('newsletterForm').reset();
            }, 100);
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterModal = document.getElementById('newsletterModal');
    const modal = new bootstrap.Modal(newsletterModal);

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('emailInput').value.trim();
            
            if (!email) {
                alert('Please enter your email address');
                return;
            }
            
            const subject = encodeURIComponent('Newsletter Subscription Request');
            const body = encodeURIComponent(`New subscriber email: ${email}`);
            const mailtoLink = `mailto:zandanys@gmail.com?subject=${subject}&body=${body}`;

            // Hide modal first
            modal.hide();
            
            // Remove modal backdrop and cleanup
            newsletterModal.addEventListener('hidden.bs.modal', function () {
                document.body.classList.remove('modal-open');
                const backdrop = document.querySelector('.modal-backdrop');
                if (backdrop) {
                    backdrop.remove();
                }
                
                // Reset form and open mailto
                newsletterForm.reset();
                window.location.href = mailtoLink;
            }, { once: true });
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    // Ensure there are no scripts causing the blue screen
    // ...existing code...
    
    // Example: Remove any script that sets the background color to blue
    // document.body.style.backgroundColor = "blue";
    
    // ...existing code...
});

document.addEventListener('DOMContentLoaded', function() {
    const bandDropdown = document.getElementById('bandDropdown');
    
    if (bandDropdown) {
        // Check if the event listener has already been added
        if (!bandDropdown.dataset.listenerAdded) {
            bandDropdown.addEventListener('click', function() {
                // console.log('Dropdown clicked');
            });
            // Mark the listener as added
            bandDropdown.dataset.listenerAdded = true;
        }
    }

    // Initialize all dropdowns
    const dropdownElements = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
    dropdownElements.forEach(function (dropdownToggleEl) {
        new bootstrap.Dropdown(dropdownToggleEl);
    });
});