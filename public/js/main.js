/**
 * Created by anthonyluc on 1/9/17.
 * Has main.html function calls
 */

// Run quickstart script
$.getScript("js/script.js");

// Get a reference to the database service
var database = firebase.database();

// Note for later
// $("*")  selects all html documents... perhaps use when login/out can show/hide certain tabs

function myFunc() {
    document.getElementById('submitBtn').addEventListener('click', writeFirebase);

    // Declare currentUser
    var currentUser = {};

    // Listening for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function(user, currentUser) {
    if (user) {
        // User is signed in.
        currentUser = user;
        console.log(currentUser.uid);
        } else {
        // User is signed out.
        }
    });

    // Store user info
    var displayName = currentUser.displayName;
    var email = currentUser.email;
    var emailVerified = currentUser.emailVerified;
    var photoURL = currentUser.photoURL;
    var isAnonymous = currentUser.isAnonymous;
    var uid = currentUser.uid;
    var providerData = currentUser.providerData;

    console.log(currentUser.uid);
}

function writeFirebase(uid) {
    var numStudents = $("#numStudents").val();

    console.log(uid);
    // Write to firebase
    firebase.database().ref('alumni/').set({
        numStudents: numStudents,
    });
}

window.onload = function() {
    initGoogleQS();
    myFunc();
};
