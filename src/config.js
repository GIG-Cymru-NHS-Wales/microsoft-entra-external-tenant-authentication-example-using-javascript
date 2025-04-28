const msalConfig = {
    auth: {
        clientId: "YOUR_CLIENT_ID", // Replace with your Microsoft Entra enterprise application id a.k.a. client id.
        authority: "https://login.microsoftonline.com/YOUR_APPLICATION_ID", // Replace with your Microsoft Entra tenant ID.
        redirectUri: "http://localhost:3000", // This port must match however you are running this app locally.
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    }
};

const loginRequest = {
    scopes: ["User.Read"]
};

const tokenRequest = {
    scopes: ["User.Read"],
};
