// Initialize the auth service
const authenticationService = new AuthenticationService();

// UI update function
function updateUI() {
    const account = authenticationService.getAccount();
    
    if (account) {
        // User is signed in
        document.getElementById('sign-in-container').style.display = 'none';
        document.getElementById('signed-in-container').style.display = 'block';
        
        // Update user info
        document.getElementById('user-name').textContent = account.name || account.username || 'User';
        document.getElementById('user-email').textContent = account.username || '';
    } else {
        // User is not signed in
        document.getElementById('sign-in-container').style.display = 'block';
        document.getElementById('signed-in-container').style.display = 'none';
    }
}

// Get user profile from Microsoft Graph
function getUserProfile() {
    authenticationService.getTokenSilent()
        .then(response => {
            const token = response.accessToken;
            return fetch('https://graph.microsoft.com/v1.0/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        })
        .then(response => response.json())
        .then(data => {
            const responseElement = document.getElementById('api-response-data');
            responseElement.textContent = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            console.error('Error getting user profile:', error);
            const responseElement = document.getElementById('api-response-data');
            responseElement.textContent = `Error: ${error.message}`;
        });
}

// Initialize the app when the window loads
window.addEventListener('load', () => {
    // Initialize auth service
    authenticationService.init();
    
    // Set up event listeners
    document.getElementById('sign-in-button').addEventListener('click', authenticationService.loginRedirect);
    document.getElementById('sign-out-button').addEventListener('click', authenticationService.logout);
    document.getElementById('get-profile-button').addEventListener('click', getUserProfile);
});
