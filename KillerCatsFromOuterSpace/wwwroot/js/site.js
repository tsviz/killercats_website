document.addEventListener('DOMContentLoaded', function() {
    try {
        // Verify storage access
        if (typeof localStorage === 'undefined') {
            console.warn('Local storage not available');
            return;
        }

        // Initialize app
        initializeApp();
    } catch (error) {
        console.error('Storage access error:', error);
    }
});

function initializeApp() {
    // App initialization code here
    console.log('App initialized successfully');
}