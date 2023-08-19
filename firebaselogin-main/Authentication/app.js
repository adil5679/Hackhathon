
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
  // import {  } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
 


  const firebaseConfig = {
    apiKey: "AIzaSyCYiXYKi_oXUCl7kqBiHR1fr2b3ifUD5dg",
    authDomain: "hackathon-c5a8e.firebaseapp.com",
    projectId: "hackathon-c5a8e",
    storageBucket: "hackathon-c5a8e.appspot.com",
    messagingSenderId: "387079577422",
    appId: "1:387079577422:web:44f768235408300317081f"
  };
  

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  var signup = document.getElementById('signup')

  signup.addEventListener('click', function(){

    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    var fname = document.getElementById('fname').value



    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
      localStorage.setItem('user', fname)
      alert('Sign Up Successful')
      location.href= './signin.html'

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      alert('Please Try Again')
    });


  })


  onAuthStateChanged(auth, handleAuthStateChange);


  const signOutUser = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
      window.location.href = `./signin.html`;
    } catch (error) {
      console.error("Error signing out user", error);
    }
  };
  
  
  document.getElementById('SignOut').addEventListener('click', signOutUser)
  