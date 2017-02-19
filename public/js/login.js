/**
 * Created by anthonyluc on 1/9/17.
 * Sources: alli/whit/jo, the Google Quickstart documentation
 */

// Run functions on window load.

$(function() {
  // Listening for auth state changes.
  // [START authstatelistener]
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log("User is signed in");
      $("#quickstart-sign-in").text("Logout");
    } else {
      // User is signed out.
      console.log("User is signed out");
      $("#quickstart-sign-in").text("Loginwha");
    }
  });

  // [END authstatelistener]
});

// Function called when clicking the Login/Logout button.
// [START buttoncallback]
function toggleSignIn() {
    if (!firebase.auth().currentUser) {
        var provider = new firebase.auth.GoogleAuthProvider();
        // [START signin]
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // User is authenticated.
            var user = result.user; // The signed-in user info

            // Store user uid, displayName, and email
            sessionStorage.setItem("uid", user.uid);
            sessionStorage.setItem("displayName", user.displayName);
            sessionStorage.setItem("email", user.email);

            // Store in session the graduation status of the user; if not a student/alumni, show error message.
            gradStatus = returnGradStatus(user.email, user.emailVerified)

            // Determine if account can enter app.
            if (gradStatus !== 'error') {
                sessionStorage.setItem("gradStatus", gradStatus);
                // Go to app main page.
                window.location.href = "main.html";
            } else {
                // Signout user.
                firebase.auth().signOut();
                // Re-enable button.
                document.getElementById('quickstart-sign-in').disabled = false;
                // Error message (user is not verified, or not a student or alumni)
                sweetAlert("Oops!", "Please use a Notre Dame e-mail account.", "error");
            }
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            var email = error.email; // The email of the user's account used.
            var credential = error.credential;  // The firebase.auth.AuthCredential type that was used.

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
        // Confirm logout sweetAlert.
        swal({
          title: "Are you sure?",
          text: "Do you want to logout?",
          type: "warning",
          showCancelButton: true,
          closeOnConfirm: false,
          confirmButtonText: "Yes, logout!",
          confirmButtonColor: "#ec6c62"
        },
        function(isConfirm){
            if (isConfirm) {
                // Logout confirmed.
                firebase.auth().signOut();
                console.log("logging out");
                window.location.href = "index.html";
            } else {
                // Logout canceled.
            }
        });
        // [END signout]
    }
    document.getElementById('quickstart-sign-in').disabled = true;
}
// [END buttoncallback]

// Function used to return current user graduation status based on their user.email.
function returnGradStatus (email, emailVerified) {
    if (emailVerified) {
        // Email is verified.

        // Get domain of email (note: if email is 'abc@abc'@example.com, then this next line won't work properly)
        var domain = email.replace(/.*@/, "");  // Replaces everything up to and including the @ symbol
        if (domain === 'alumni.nd.edu') {
            // true if the address ends with alumni.nd.edu
            return 'alumni';
        } else if (domain === 'nd.edu') {
            // true if the address ends with nd.edu
            return 'student';
        } else {
            // address is not of student or alumni
            return 'error';
        }

    } else {
        // Email is not verified.
        return 'error';
    }
}
