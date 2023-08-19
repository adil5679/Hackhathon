
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";


  const firebaseConfig = {
    apiKey: "AIzaSyCYiXYKi_oXUCl7kqBiHR1fr2b3ifUD5dg",
    authDomain: "hackathon-c5a8e.firebaseapp.com",
    projectId: "hackathon-c5a8e",
    storageBucket: "hackathon-c5a8e.appspot.com",
    messagingSenderId: "387079577422",
    appId: "1:387079577422:web:44f768235408300317081f"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  var signin = document.getElementById('signin')

  signin.addEventListener('click', function(){

    var email = document.getElementById('email').value
    var password = document.getElementById('password').value

    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    

    // ...
    alert('Sign in Successful')
    location.href = '../dashboard/dashboard.html'
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    alert('Error: Please Sign up')
    location.href = '../dashboard/dashboard.html'

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
  