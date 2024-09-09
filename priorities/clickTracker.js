// clickTracker.js

document.addEventListener('DOMContentLoaded', (event) => {
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonId = button.id || 'unknown';
            const pageUrl = window.location.href;
            const timestamp = new Date().toISOString();
            
            fetch('http://your-server-url/record-click', { // Replace with your server URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    buttonId: buttonId,
                    pageUrl: pageUrl,
                    timestamp: timestamp
                })
            }).catch(error => console.error('Error recording click:', error));
        });
    });
});
