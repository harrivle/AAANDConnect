/**
 * Created by anthonyluc on 1/9/17.
 * Adapted the Google Quickstart documentation
 */

// Function called when clicking the Login/Logout button.
// [START buttoncallback]
function toggleSignIn() {
    if (!firebase.auth().currentUser) {
        var provider = new firebase.auth.GoogleAuthProvider();
        // [START signin]
        firebase.auth().signInWithPopup(provider).then(function(result) {
            var token = result.credential.accessToken; // This gives you a Google Access Token. You can use it to access the Google API.
            var user = result.user; // The signed-in user info.

            document.getElementById('quickstart-oauthtoken').textContent = token;
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            var email = error.email; // The email of the user's account used.
            var credential = error.credential; // The firebase.auth.AuthCredential type that was used.

            if (errorCode === 'auth/account-exists-with-different-credential') {
            alert('You have already signed up with a different auth provider for that email.');

            // If you are using multiple auth providers on your app you should handle linking
            // the user's accounts here.
    } else {
        console.error(error);
    }
    });
    // [END signin]
    } else {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
    }
    document.getElementById('quickstart-sign-in').disabled = true;
}
// [END buttoncallback]

/**
 * initGoogleQS handles setting up UI event listeners and registering Firebase auth listeners:
 *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
 *    out, and that is where we update the UI.
 */
function initGoogleQS() {
    // Listening for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        // Update page login status.
        document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
        document.getElementById('quickstart-sign-in').textContent = 'LOGOUT';
    } else {
        // User is signed out.
        // Update page login status.
        document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
        document.getElementById('quickstart-sign-in').textContent = 'LOGIN';
    }
    document.getElementById('quickstart-sign-in').disabled = false;
    });
    // [END authstatelistener]
    
    // Listen for login button
    document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
}
