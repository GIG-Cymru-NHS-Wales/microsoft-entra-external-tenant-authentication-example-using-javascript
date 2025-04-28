# Microsoft Entra external tenant authentication example using JavaScript

This repository demonstrates how to:

* Use Microsoft Entra, previously known as Azure Active Directory (AAD).

* Do external tenant authentication to an existing Azure tenant.

* Use the Microsoft Authentication Library (MSAL) JavaScript library.

* Create a single page application (SPA) using JavaScript, meaning no framework such as React, Vue, Svelte.

## Create an application

Create a simple Single Page Application (SPA) using vanilla JavaScript and MSAL.js.

Project structure:

```txt
microsoft-entra-external-tenant-authentication-example-using-javascript
└── src
    ├── index.html
    ├── style.css    
    |── favicon.ico
    |── app.js
    ├── config.js
    ├── authentication-service.js
```

* [index.html](src/index.html) is a typical hypertext markup language (HTML) web page that shows a sign in button, and has div areas that will be visible/invisible depending on whether a user is signed in or not.

* [style.css](src/style.css) is a typical cascading style sheet (CSS) that can set fonts, colors, etc.

* [favicon.ico](src/favicon.ico) is a typical favorites icon that displays in the browser URL bar.

* [app.js](src/app.js) is the application, and it handles the initialization, the registration of listeners, and the visible/invisible page sections.

* [config.js](src/config.js) is the configuration for your specific application, including your Microsoft Entra application id, tenant id, etc.

* [authentication-service.js](src/authentication-service.js) does the sign in, redirect handling, sign out, etc.

## Running the Application

### Update authentication-configuration.js with your actual values

* Replace `YOUR_CLIENT_ID` with the Application (client) ID from your app registration.

* Replace `YOUR_TENANT_ID` with the Directory (tenant) ID from your app registration.

### Set up a local web server

You can use any simple web server. If you have Node.js installed, you can use http-server:

```sh
npm install http-server
http-server -p 3000
```

### Run the demo

* Navigate to `http://localhost:3000`

* Test the sign-in and sign-out functionality

## Troubleshooting for "Sorry, but we’re having trouble signing you in."

Microsoft Entra can return various kinds of errors such as:

* Sorry, but we’re having trouble signing you in.

### AADSTS700016: Application with identifier * was not found …

If you get this error:

* AADSTS700016: Application with identifier 'YOUR_CLIENT_ID' was not found in
  the directory 'demo'. This can happen if the application has not been
  installed by the administrator of the tenant or consented to by any user in
  the tenant. You may have sent your authentication request to the wrong tenant.

Then edit the file `src/config.js`.

* Replace `YOUR_CLIENT_ID` with your own client id.

### AADSTS700016: AADSTS500113: No reply address is registered …

If you get this error:

* AADSTS500113: No reply address is registered for the application.

Then to fix this, you need to add a valid RedirectURI/ReplyURL in your
application registration.

* Go to your Microsoft Azure Enterprise Applications page.
  
* Edit the application.

* The RedirectURI/ReplyURL is required by Azure Active Directory (AAD), so that
AAD knows where to post the token back so that the app can pick that token up
and use it. You need to specify the correct Redirect URI for your application as
from where the app can pick the Access_token and use it further.

### AADSTS50011: The redirect URI * specified in the request does not match …

If you get this error:

* AADSTS50011: The redirect URI 'http://localhost:3000' specified in the request does not match the redirect URIs configured for the application 'f23ebd7c-0d58-48ee-9651-28a69e6cdf1d'. Make sure the redirect URI sent in the request matches one added to your application in the Azure portal. Navigate to https://aka.ms/redirectUriMismatchError to learn more about how to fix this.

Then to fix this, you need to edit the RedirectURI/ReplyURL in your application
registration, or in the file `config.js`, so the URLs match.

* In the file `config.js`, look for your msalConfig auth redirectUri. We prefer to use "http://localhost:3000" because that's how we launch the app locally.

* Go to your Microsoft Azure Enterprise Applications page.
  
* Edit the application.

* See the section that says: Redirect URIs: The URIs we will accept as
  destinations when returning authentication responses (tokens) after
  successfully authenticating or signing out users. The redirect URI you send in
  the request to the login server should match one listed here. Also referred to
  as reply URLs. Learn more about Redirect URIs and their restrictions

* Verify that it matches, or edit it so it matches then click "Save".

### Error during redirect handling

If you get this error:

* authentication-service.js:14:17 XHRPOST
  https://login.microsoftonline.com/…/oauth2/v2.0/token Error during redirect
  handling: ServerError: invalid_request: …: AADSTS9002326: Cross-origin token
  redemption is permitted only for the 'Single-Page Application' client-type.
  Request origin: 'http://localhost:3000'.

Then it means your application redirect URL is accidentally using a "Web"
platform, rather than a "Single Page Application (SPA)" platform.

* Go to your Microsoft Azure Enterprise Applications page.
  
* Edit the application. Demo → Manage → Authentication.

* In the section "Platforms", if there is a "Web" platform, then delete it.
  
* In the section "Platforms", create a "Single Page Application" platform, and set the redirect URI to "http://localhost:3000"

## Security Considerations

**Always use HTTPS in production**: This example uses HTTP for local development only.

**Secure storage of tokens**: This example uses sessionStorage, which is cleared when the browser is closed.

**Implement token renewal**: For production, implement a proper token renewal strategy.

**Validate ID tokens**: In a real application, validate tokens on the server side.

## Next steps you can try on your own

**Add a backend API**: Create a protected API that validates tokens

**Implement role-based access control**: Use groups or roles from Microsoft Entra ID

**Add multi-factor authentication**: Enable MFA in your Microsoft Entra tenant

**Implement Conditional Access policies**: Add additional security based on user context
