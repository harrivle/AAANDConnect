/**
 * Created by anthonyluc on 1/9/17.
 * Has main.html function calls
 *
 * General functions:
 *      goMainHome() - restores main page as to initial alumni or student view
 *      isNumber(arg) - returns if argumet is a number
 *      cleanForm() - clears forms of both success and error class
 */

// Run functions on window load.
$(window).on("load", loadMain);

// Get a reference to the database service.
var database = firebase.database();
// Get stored user info.
var uid = sessionStorage.getItem("uid");
var displayName = sessionStorage.getItem("displayName");
var email = sessionStorage.getItem("email");
var gradStatus = sessionStorage.getItem("gradStatus"); // is either 'alumni' or 'student'
// Return today's date and time
var currentTime = new Date();   // Use: currentTime.getMonth() + 1; getDate(); getFullYear();

// Load current user info and alter visible forms based on their gradStatus.
function loadMain() {
    // Listener for authentication state change.
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            // Update main.html text.
            $("#current-login-email").text("Currently logged in as: " + email + ".");
            var gradStatusString = gradStatus === 'student' ? "Student" : "Alumni";
            $("#grad-status-form").text(gradStatusString + " Profile");
            var bioString = gradStatus === 'student' ? "alumni" : "students";
            $("#bio-text").text("Please write a short bio for " + bioString + " to read.*");

            // Make forms visible based on gradStatus.
            goMainHome();

            // Determine which listeners to activate.
            activateListeners();      // Activate based on student or alumni

            // Load user profile
            loadProfile();

        } else {
            // User is signed out.
            window.location.href = "index.html";    // perhaps there is a better way to implement this?
        }
    });
}

// Update main.html to be as it was initially.
function goMainHome() {
    // Make button blocks visible based on gradStatus.
    block = '.' + gradStatus + '-btn-block';   // String variable: is either .student-btn-block or .alumni-btn-block
    $(block).removeClass('hidden');

    // Remove success and error classes from form groups.
    cleanForm();

    // Hide form.
    $("#update-profile-form").addClass('hidden');
    // Clear the "error alert" by the send button.
    $('.alert').text("");

    // Show main button block.
    $("#main-home").removeClass('hidden');
}

// Activates listeners for main.html buttons.
function activateListeners() {
    // Activate specific listeners.
    if (gradStatus === 'student') {
        document.getElementById('view-mentors-btn').addEventListener("click", viewMentors);
    } else if (gradStatus === 'alumni') {
        document.getElementById('view-mentees-btn').addEventListener("click", viewStudents);
        document.getElementById('view-requests-btn').addEventListener("click", viewRequests);
    }

    // Activate buttons used by both alumni and students
    document.getElementById('update-' + gradStatus + '-btn').addEventListener("click", updateProfile);
    document.getElementById('submitBtn').addEventListener("click", submitUpdateForm);
    document.getElementById('returnBtn').addEventListener("click", goMainHome);
}

function loadProfile() {
    //TODO fix this
    // Load information into profile
    if (gradStatus === 'student') {
        // Read from database.
        // Attach an asynchronous callback to read the data at our posts reference
        firebase.database().ref('/students/' + uid).on("value", function(snapshot) {
            $("#bio").val(snapshot.val().bio);
            $("#gradYear").val(snapshot.val().gradYear);
            $("#locationInterest").val(snapshot.val().locationInterest);
            $("#major1").val(snapshot.val().major1);
            $("#major2").val(snapshot.val().major2);
            $("#name").val(snapshot.val().name);
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    } else if (gradStatus === 'alumni'){
        // Read from database.
        // Attach an asynchronous callback to read the data at our posts reference
        firebase.database().ref('/students/' + uid).on("value", function(snapshot) {
            $("#bio").val(snapshot.val().bio);
            $("#career1").val(snapshot.val().career1);
            $("#career2").val(snapshot.val().career2);
            $("#gradYear").val(snapshot.val().gradYear);
            $("#city").val(snapshot.val().location.city);
            $("#state").val(snapshot.val().location.state);
            $("#country").val(snapshot.val().location.country);
            $("#name").val(snapshot.val().name);
            $("#numStudents").val(snapshot.val().numStudents);
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    }
}

// Form is submitted.
function submitUpdateForm() {
    // Get user confirmation.
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
    function(isConfirm) {
        if (isConfirm) {
            // Write to firebase.
            // (Listener for authentication state change) Need to do this to get user variable.
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    // User is signed in.
                    if (gradStatus === 'student') {
                        studentWrite();
                    } else if (gradStatus === 'alumni'){
                        alumniWrite();
                    }
                } else {
                    // User is signed out.
                    window.location.href = "index.html";    // perhaps there is a better way to implement this?
                }
            });

            // Indicate to user submission succeeded by highlighting all form elements green.
            $('.form-group').addClass('has-success');
        }
    });
}

function studentWrite() {
    // Student write to firebase.
    var bio = $("#bio").val();
    var gradYear = $("#gradYear").val();
    var locationInterest = $("#locationInterest").val();
    var major1 = $("#major1").val();
    var major2 = $("#major2").val();
    var name = $("#name").val();

    // Assume all input are valid until proven otherwise.
    $('.form-group').removeClass('has-error');
    $('.form-group').addClass('has-success');

    // Check for validity of choices
    var isValid = true;
    // Name
    if (name == "") {
        $('.alert').text("Please input a name.");
        $('.name').addClass('has-error');
        isValid = false;
    }
    // Graduation Year
    if (isNumber(gradYear)) {
        if ((gradYear > currentTime.getFullYear() + 5) || (gradYear < currentTime.getFullYear() - 1)) {
            $('.alert').text("Please input a valid graduation year.");
            $('.gradYear').addClass('has-error');
            isValid = false;
        }
    } else if (!isNumber(gradYear)) {
        $('.alert').text("Please input a valid graduation year.");
        $('.gradYear').addClass('has-error');
        isValid = false;
    }
    // Majors
    if (major1 === major2) {
        // Duplicate error
        if (major1 === "Not Selected" && major2 === "Not Selected") {
            $('.alert').text("Please select a major.");
            $('.major1').addClass('has-error');
        } else {
            $('.alert').text("Duplicate majors.");
            $('.major1').addClass('has-error');
            $('.major2').addClass('has-error');
        }
        isValid = false;
    } else if (major1 === "Not Selected") {
        $('.alert').text("Please select a first major.");
        $('.major1').addClass('has-error');
        isValid = false;
    }
    // Short bio
    if (bio == "") {
        $('.alert').text("Please write a short bio.");
        $('.bio').addClass('has-error');
        isValid = false;
    }

    // Prepare to write to firebase.
    if (!isValid) {
        // User has an invalid form.
        swal("Oops...", "Error in updating profile. Please try again.", "error");
        return;
    } else {
        // User has a valid form.
        // Write to firebase.
        firebase.database().ref("/students/" + uid).set({
            bio: bio,
            email: email,
            gradYear: gradYear,
            locationInterest: locationInterest,
            major1: major1,
            major2: major2,
            name: name,
        }, function(error) {
            if (error) {
                sweetAlert("Oops...", "Data could not be saved. Please try again.", "error");
                return;
            } else {
                swal("Success!", "Data saved. Profile was successfully updated!", "success");
            }
        });
    }
}

function alumniWrite() {
    // Alumni write to firebase.
    var bio = $("#bio").val();
    var career1 = $("#career1").val();
    var career2 = $("#career2").val();
    var gradYear = $("#gradYear").val();
    var city = $("#city").val();
    var state = $("#state").val();
    var country = $("#country").val();
    var name = $("#name").val();
    var numStudents = $("#numStudents").val();

    // Assume all input are valid until proven otherwise.
    $('.form-group').removeClass('has-error');
    $('.form-group').addClass('has-success');

    // Check for validity of choices
    var isValid = true;
    // Name
    if (name == "") {
        $('.alert').text("Please input a name.");
        $('.name').addClass('has-error');
        isValid = false;
    }
    // Graduation Year
    if (isNumber(gradYear)) {
        if ((gradYear >= currentTime.getFullYear) || (gradYear <= currentTime.getFullYear - 87)) {
            $('.alert').text("Please input a valid graduation year.");
            $('.gradYear').addClass('has-error');
            isValid = false;
        }
    } else if (!isNumber(gradYear)) {
        $('.alert').text("Please input a valid graduation year.");
        $('.gradYear').addClass('has-error');
        isValid = false;
    }
    // Careers
    if (career1 === career2) {
        // Duplicate error
        if (career1 === "Not Selected" && career2 === "Not Selected") {
            $('.alert').text("Please select a career.");
            $('.career1').addClass('has-error');
        } else {
            $('.alert').text("Duplicate careers.");
            $('.career1').addClass('has-error');
            $('.career2').addClass('has-error');
        }
        isValid = false;
    } else if (career1 === "Not Selected") {
        $('.alert').text("Please select a primary career.");
        $('.career1').addClass('has-error');
        isValid = false;
    }
    // TODO: Location

    // Short bio
    if (bio == "") {
        $('.alert').text("Please write a short bio.");
        $('.bio').addClass('has-error');
        isValid = false;
    }

    // Prepare to write to firebase.
    if (!isValid) {
        // User has an invalid form.
        swal("Oops...", "Error in updating profile. Please try again.", "error");
        return;
    } else {
        // User has a valid form.
        // Write to firebase.
        firebase.database().ref('/alumni/' + uid).set({
            bio: bio,
            career1: career1,
            career2: career2,
            email: email,
            gradYear: gradYear,
            name: name,
            numStudents: numStudents,
        }, function(error) {
            if (error) {
                sweetAlert("Oops...", "Data could not be saved. Please try again.", "error");
                return;
            } else {
                swal("Success!", "Data saved successfully.", "success");
            }
        });
        // Write location
        firebase.database().ref('/alumni/' + uid + '/location/').set({
            city: city,
            state: state,
            country: country,
        }, function(error) {
            if (error) {
                sweetAlert("Oops...", "Data could not be saved. Please try again.", "error");
                return;
            } else {
                swal("Success!", "Data saved. Profile was successfully updated!", "success");
            }
        });
    }
}

// TODO:
function viewMentors() {}
function viewStudents() {}
function viewRequests() {}

// Update profile button is pressed.
function updateProfile() {
    $("#main-home").addClass('hidden');
    $("#update-profile-form").removeClass('hidden');
    $(".update-" + gradStatus + "-form").removeClass('hidden');
}

// Function that returns true if argument is a number.
function isNumber(arg) { return !isNaN(arg); }

function cleanForm() {
    // Clear submit form by removing has-error or has-success for each form-group element.
    $('.form-group').removeClass('has-error');
    $('.form-group').removeClass('has-success');
}
