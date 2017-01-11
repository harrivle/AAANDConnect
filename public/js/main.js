/**
 * Created by anthonyluc on 1/9/17.
 * Has main.html function calls
 */

/* Reference to use currentUser
displayName = user.displayName;
email = user.email;
emailVerified = user.emailVerified;
photoURL = user.photoURL;
isAnonymous = user.isAnonymous;
uid = user.uid;
providerData = user.providerData;
*/

// Get scripts
$.getScript("js/script.js");
$.getScript("js/write.js");

// Get a reference to the database service
var database = firebase.database();

// Note for later
// $("*")  selects all html documents...perhaps use when login/out can show/hide certain tabs


//getUserInput(name, callback) {}


// Listen for submit button.
document.getElementById('submitBtn').addEventListener('click', writeFirebase);


// Write data to firebase.
function writeFirebase() {
    // Listen for auth state changes.
    firebase.auth().onAuthStateChanged(function(user, currentUser) {
    if (user) {
        // User is signed in.

        // Get info from documents.
        var name = $("#name").val();
        var numStudents = $("#numStudents").val();
        var career1 = $("#career1").val();
        var career2 = $("#career2").val();
        var alumniBio = $("#alumniBio").val();

        // Check for validity of career choice.
        // if ()

        // Write to firebase
        firebase.database().ref('alumni/' + user.uid).set({
            name: name,
            numStudents: numStudents,
            career1: career1,
            career2: career2,
            alumniBio: alumniBio,
        });
        } else {
        // User is signed out.
        }
    });
}

window.onload = function() {
    initGoogleQS();
};
