document.addEventListener('DOMContentLoaded', function() {
    try {
        // Verify storage access
        if (typeof localStorage === 'undefined') {
            console.warn('Local storage not available');
            return;
        }

        // Initialize app
        initializeApp();
        
        // Bio button functionality
        const bioButtons = document.querySelectorAll('.bio-toggle');
        
        bioButtons.forEach(button => {
            button.addEventListener('click', function() {
                const icon = this.querySelector('i');
                const buttonText = this.querySelector('.button-text');
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                
                // Toggle icon and text
                if (!isExpanded) {
                    icon.classList.replace('fa-book-open', 'fa-book');
                    buttonText.textContent = 'Close Bio';
                } else {
                    icon.classList.replace('fa-book', 'fa-book-open');
                    buttonText.textContent = 'View Bio';
                }
                
                // Update aria state
                this.setAttribute('aria-expanded', !isExpanded);
            });
        });

        // Handle collapse events for bio sections
        document.querySelectorAll('.collapse').forEach(collapseElement => {
            collapseElement.addEventListener('show.bs.collapse', function() {
                const button = document.querySelector(`button[data-target="#${this.id}"]`);
                if (button) {
                    const icon = button.querySelector('i');
                    const buttonText = button.querySelector('.button-text');
                    
                    if (icon) icon.classList.replace('fa-book-open', 'fa-book');
                    if (buttonText) buttonText.textContent = 'Close Bio';
                }
            });

            collapseElement.addEventListener('hide.bs.collapse', function() {
                const button = document.querySelector(`button[data-target="#${this.id}"]`);
                if (button) {
                    const icon = button.querySelector('i');
                    const buttonText = button.querySelector('.button-text');
                    
                    if (icon) icon.classList.replace('fa-book', 'fa-book-open');
                    if (buttonText) buttonText.textContent = 'View Bio';
                }
            });
        });

    } catch (error) {
        console.error('Error initializing bio buttons:', error);
    }
});

function initializeApp() {
    // App initialization code here
    // console.log('App initialized successfully');
}