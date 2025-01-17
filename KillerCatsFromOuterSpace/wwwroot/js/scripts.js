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
});