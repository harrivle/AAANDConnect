/**
 * Created by anthonyluc on 1/9/17.
 * Has main.html function calls
 */

// Run functions on window load.
$(window).on("load", loadMain);

// Get a reference to the database service.
var database = firebase.database();

// Get stored user info.
var uid = sessionStorage.getItem("uid");
var displayName = sessionStorage.getItem("displayName");
var email = sessionStorage.getItem("email");
var gradStatus = sessionStorage.getItem("gradStatus");

// Return today's date and time
var currentTime = new Date();   // Use: currentTime.getMonth() + 1; getDate(); getFullYear();

// Listeners for main.html buttons.
document.getElementById('update-profile-btn').addEventListener('click', updateProfile);
document.getElementById('submitBtn').addEventListener('click', submitUpdateForm);
document.getElementById('returnBtn').addEventListener('click', goMainHome);

// Load current user info and alter visible forms based on their gradStatus.
function loadMain() {
    // Listener for authentication state change.
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            // Update main.html text.
            $("#current-login-email").text("Currently logged in as: " + email + ".");
            var gradStatusString = gradStatus === 'student' ? "Student" : "Alumni";
            $("#grad-status-form").text(gradStatusString + " Form");
            var bioString = gradStatus === 'student' ? "alumni" : "students";
            $("#bio-text").text("Please write a short bio for " + bioString + " to read.");

            // Make form visible based on gradStatus.
            form = '.' + gradStatus + '-form'   // String variable for form class
            $(form).removeClass('hidden');

        } else {
            // User is signed out.
            window.location.href = "index.html";    // perhaps there is a better way to implement this?
        }
    });
}

// Update profile button is pressed.
function updateProfile() {
    $("#update-profile-form").removeClass('hidden');
    $("#main-home").addClass('hidden');
}

// Update main.html to be as it was initially.
function goMainHome() {
    // Remove has-error or has-success for each form-group element.
    $('.form-group').removeClass('has-error');
    $('.form-group').removeClass('has-success');

    // Hide form and show button block.
    $("#update-profile-form").addClass('hidden');
    $("#main-home").removeClass('hidden');
}

// Form is submitted.
function submitUpdateForm() {
    // Listener for authentication state change (need to do this to get user variable).
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            if (gradStatus === 'student') {
                studentWrite();
            } else {
                alumniWrite();
            }
        } else {
        // User is signed out.
        window.location.href = "index.html";    // perhaps there is a better way to implement this?
        }
    });
    // Remove has-error for each form-group element.
    $('.form-group').removeClass('has-error');
    // Confirm submit sweetAlert.
    swal({
        title: "Confirm Submission?",
        text: "Submit info to the database.",
        type: "info",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, submit!",
        closeOnConfirm: false
    },
    function(isConfirm){
        if (isConfirm) {
            swal("Success!", "You have updated your profile!", "success");
            $('.form-group').addClass('has-success');
        }
    });
}

function studentWrite() {
    // Student write to firebase.
    var bio = $("#bio").val();
    var gradYear = $("#gradYear").val();
    var major1 = $("#major1").val();
    var major2 = $("#major2").val();
    var name = $("#name").val();
    var locationPreference = $("#locationPreference").val();

    // Check for validity of choices
    if (isNumber(gradYear)) {
        if ((gradYear > currentTime.getFullYear() + 5) || (gradYear < currentTime.getFullYear() - 1)) {
            $('.alert').text("Please input a valid graduation year.");
            $('.gradYear').addClass('has-error');
            return;
        }
    } else if (!isNumber(gradYear)) {
        $('.alert').text("Please input a valid graduation year.");
        $('.gradYear').addClass('has-error');
        return;
    } else if (major1 === major2) {
        // Duplicate error
        if (major1 === "Not Selected" && major2 === "Not Selected") {
            $('.alert').text("Please select a major.");
        } else {
            $('.alert').text("Duplicate majors.");
        }
        $('.major1').addClass('has-error');
        $('.major2').addClass('has-error');
        return;
    }

    // Write to firebase.
    firebase.database().ref("/students/" + uid).set({
        bio: bio,
        email: email,
        gradYear: gradYear,
        locationPreference: locationPreference,
        major1: major1,
        major2: major2,
        name: name,
    });
}

function alumniWrite() {
    // Alumni write to firebase.
    var bio = $("#bio").val();
    var career1 = $("#career1").val();
    var career2 = $("#career2").val();
    var gradYear = $("#gradYear").val();
    var location = $("#location").val();
    var name = $("#name").val();
    var numStudents = $("#numStudents").val();

    if (isNumber(gradYear)) {
        if ((gradYear >= currentTime.getFullYear) || (gradYear <= currentTime.getFullYear - 87)) {
            $('.alert').text("Please input a valid graduation year.");
            $('.gradYear').addClass('has-error');
            return;
        }
    } else if (!isNumber(gradYear)) {
        $('.alert').text("Please input a valid graduation year.");
        $('.gradYear').addClass('has-error');
        return;
    } else if (career1 === career2) {
        // Duplicate error
        if (career1 === "Not Selected" && career2 === "Not Selected") {
            $('.alert').text("Please select a career.");
        } else {
            $('.alert').text("Duplicate careers.");
        }
        $('.career1').addClass('has-error');
        $('.career2').addClass('has-error');
        return;
    }

    // Write to firebase.
    firebase.database().ref('/alumni/' + uid).set({
        bio: bio,
        career1: career1,
        career2: career2,
        email: email,
        gradYear: gradYear,
        location: location,
        name: name,
        numStudents: numStudents,
    });
}

// Function that returns true if argument is a number.
function isNumber(arg) { return !isNaN(arg); }

/*
// Read from database.
return firebase.database().ref('/alumni/' + uid).once('value').then(function(snapshot) {
var gradStatus = snapshot.val().name;
console.log(name);
*/
