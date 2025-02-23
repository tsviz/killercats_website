(function() {
    function initializeNewsletter() {
        const form = document.getElementById('newsletterForm');
        if (!form) {
            console.error('Newsletter form not found!');
            return;
        }

        async function handleSubmit(e) {
            e.preventDefault();
            console.log('Form submission started');
            
            const email = document.getElementById('emailInput').value;
            const token = document.querySelector('input[name="__RequestVerificationToken"]').value;
            
            console.log('Prepared request with email:', email);
            console.log('Anti-forgery token present:', !!token);
            
            try {
                console.log('Sending fetch request to /?handler=Subscribe');
                const response = await fetch('/?handler=Subscribe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'RequestVerificationToken': token
                    },
                    body: JSON.stringify({ email })
                });

                console.log('Response status:', response.status);
                const result = await response.json();
                console.log('Response data:', result);

                if (response.ok) {
                    console.log('Subscription successful');
                    alert(result.message);
                    form.reset();
                } else {
                    console.error('Subscription failed:', result);
                    alert('Subscription failed. Please try again.');
                }
            } catch (error) {
                console.error('Error details:', error);
                alert('An error occurred. Please try again.');
            }
        }

        form.addEventListener('submit', handleSubmit);
    }

    // Try to initialize immediately
    initializeNewsletter();
    
    // Fallback: if DOM not ready, wait for it
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeNewsletter);
    }
})();
