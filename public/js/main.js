/**
 * Created by anthonyluc on 1/9/17.
 * Has main.html function calls
 */

/** Reference to info from currentUser
displayName = user.displayName;
email = user.email;
emailVerified = user.emailVerified;
photoURL = user.photoURL;
isAnonymous = user.isAnonymous;
uid = user.uid;
providerData = user.providerData;
*/

// Get scripts
$.getScript("js/script.js"); // Loads script for Google login quickstart authentication.

// Get a reference to the database service.
var database = firebase.database();

// Listener for submit button.
document.getElementById('submitBtn').addEventListener('click', writeFirebase);

// Write data to firebase.
function writeFirebase() {
    // Listener for authentication state change.
    firebase.auth().onAuthStateChanged(function(user, currentUser) {
    if (user) {
        // User is signed in.
        // Get info from documents.
        var name = $("#name").val();
        var numStudents = $("#numStudents").val();
        var career1 = $("#career1").val();
        var career2 = $("#career2").val();
        var bio = $("#bio").val();

        // TODO: Check for validity of career choice.

        // Write to firebase.
        firebase.database().ref('alumni/' + user.uid).set({
            name: name,
            numStudents: numStudents,
            career1: career1,
            career2: career2,
            bio: bio,
        });
        } else {
        // User is signed out.
        }
    });
}


window.onload = function() {
    initGoogleQS(); // Run Google login quickstart from script.js
};
