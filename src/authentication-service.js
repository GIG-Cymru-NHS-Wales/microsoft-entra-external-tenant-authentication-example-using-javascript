class AuthenticationService {

    // Create an authentication service instance
    constructor() {
        this.msalInstance = new msal.PublicClientApplication(msalConfig);
        this.account = null;
        this.loginRedirect = this.loginRedirect.bind(this);
        this.logout = this.logout.bind(this);
        this.getAccount = this.getAccount.bind(this);
    }

    // Initialize and check if the user is signed in
    init() {
        console.log("AuthenticationService init()");
        this.msalInstance.handleRedirectPromise()
            .then(response => {
                if (response !== null) {
                    this.account = response.account;
                    updateUI();
                } else {                    
                    // No redirect response, check if user account exists
                    const currentAccounts = this.msalInstance.getAllAccounts();
                    let length = currentAccounts.length;
                    if (length === 0) {
                        // No user signed in
                        console.log("No users signed in");
                    } else if (length === 1) {
                        // One user signed in, so use it
                        this.account = currentAccounts[0];
                        updateUI();
                    } else if (length > 1) {
                        // Multiple users, so choose one
                        console.log("Multiple accounts detected, please select one");
                        this.account = currentAccounts[0];
                        updateUI();
                    } else {
                        throw new RangeError(length);
                    }
                }
            })
            .catch(error => {
                console.error("Error during redirect handling:", error);
            });
    }

    // Redirect login
    loginRedirect() {
        console.log("AuthenticationService loginRedirect()");
        try {
            this.msalInstance.loginRedirect(loginRequest);
        } catch (err) {
            console.error("Error during login:", err);
        }
    }

    // Get the signed-in account
    getAccount() {
        console.log("AuthenticationService getAccount()");
        return this.account;
    }

    // Get token silently or redirect if needed
    getTokenSilent() {
        console.log("AuthenticationService getTokenSilent()");
        const request = {
            ...tokenRequest,
            account: this.account
        };
        
        return this.msalInstance.acquireTokenSilent(request)
            .catch(error => {
                console.warn("Silent token acquisition failed, falling back to redirect");
                if (error instanceof msal.InteractionRequiredAuthError) {
                    return this.msalInstance.acquireTokenRedirect(request);
                }
                throw error;
            });
    }

    // Log out
    logout() {
        console.log("AuthenticationService logout()");
        const logoutRequest = {
            account: this.account
        };
        
        this.msalInstance.logoutRedirect(logoutRequest);
    }
}
