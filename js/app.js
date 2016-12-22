(function() {
	// Initialize Firebase
	var config = {
	apiKey: "AIzaSyBtcKnxKqA41fHtEsXaCgODNsocaBXhsA4",
	authDomain: "aaandconnect.firebaseapp.com",
	databaseURL: "https://aaandconnect.firebaseio.com",
	storageBucket: "aaandconnect.appspot.com",
	messagingSenderId: "692726186519"
	};
	firebase.initializeApp(config);


	var provider = new firebase.auth.GoogleAuthProvider();
	provider.addScope('https://www.googleapis.com/auth/plus.login');
	provider.setCustomParameters({
	  'login_hint': 'user@example.com'
	});


	firebase.auth().signInWithPopup(provider).then(function(result) {
	  // This gives you a Google Access Token. You can use it to access the Google API.
	  var token = result.credential.accessToken;
	  // The signed-in user info.
	  var user = result.user;
	  // ...
	}).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // The email of the user's account used.
	  var email = error.email;
	  // The firebase.auth.AuthCredential type that was used.
	  var credential = error.credential;
	  // ...
	});


	// preferred for mobile devices
	firebase.auth().signInWithRedirect(provider)
	firebase.auth().getRedirectResult().then(function(result) {
	  if (result.credential) {
	    // This gives you a Google Access Token. You can use it to access the Google API.
	    var token = result.credential.accessToken;
	    // ...
	  }
	  // The signed-in user info.
	  var user = result.user;
	}).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // The email of the user's account used.
	  var email = error.email;
	  // The firebase.auth.AuthCredential type that was used.
	  var credential = error.credential;
	  // ...
	});

	// sign-out
	firebase.auth().signOut().then(function() {
	  // Sign-out successful.
	}, function(error) {
	  // An error happened.
	});


}());
