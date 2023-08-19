import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth,onAuthStateChanged,signInWithEmailAndPassword,createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { getFirestore, collection, addDoc, orderBy, onSnapshot, serverTimestamp, query, doc,deleteDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCYiXYKi_oXUCl7kqBiHR1fr2b3ifUD5dg",
    authDomain: "hackathon-c5a8e.firebaseapp.com",
    projectId: "hackathon-c5a8e",
    storageBucket: "hackathon-c5a8e.appspot.com",
    messagingSenderId: "387079577422",
    appId: "1:387079577422:web:44f768235408300317081f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


let userAddFunction = document.querySelector('#blogbtn')

userAddFunction.addEventListener('click', async (event) => {
    event.preventDefault();

    let blogtitle = document.querySelector('.blogtitle').value
    let blogtext = document.querySelector('.blogtext').value



    try {

        const docRef = await addDoc(collection(db, "data"), {
            blogtext: blogtext,
            blogtitle: blogtitle,
            createdAt: serverTimestamp()
        });
        console.log("Document written with ID: ", docRef.id);

    }
    catch (e) {
        console.log('error is located', e)
    }
    blogtext.innerHTML = '';
    blogtitle.innerHTML = '';
});


document.addEventListener('readystatechange', async (fun) => {

    if (fun.target.readyState === 'complete') {
        console.log('page is loaded')
    }


    const q = query(collection(db, 'data'), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let main_div = document.querySelector('.main-div')
        main_div.innerHTML = '';
        querySnapshot.forEach((doc) => {
            let data = doc.data();
            let time = data.createdAt.seconds  
            main_div.innerHTML += 
            `
            <div id=" doc.id " class="card-blogs" >
             
              <div class="card-body">'

              <div class="img">  
                <span onclick="go()"> <img src="https://avatars.githubusercontent.com/u/121330386?v=4" width="50px" alt=" "> </span> 
                <h5 class="titlediv"  id=${doc.id}"> ${data.blogtitle} </h5>
                <a href="./allpost.html">view this user all post</a>

                </div>
                <div class="text-muted">${time} </div>
                <p class="card-text"> ${data.blogtext}</p>
              </div>

              <div class="card-footer">
               <button class="ebtn" onclick="edit('${doc.id}')">Edit</button>   
               <button class="del"  onclick="dlt('${doc.id}')">Delete</button>
              </div> 

            </div>
                    `
 




            });
            
        })
        
        
        
        window.dlt = async (docId) => {
            console.log('button is working',docId)
            await deleteDoc(doc(db, "data",docId));
           alert('delete doc')
    }
    window.edit =  (docId) => {
        console.log('button is working',docId)
     let a  =  document.querySelector(`#${docId}`);
        a.innerHTML = `
        
         <div class="form-group">
         <label for="exampleFormControlInput1">Title</label>
         <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter title">
          </div>
           <div class="form-group">
           <label for="exampleFormControlTextarea1">Text</label>
           <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
           </div>  
        
        `
}
})

window.go = ()=>{
    location.href = './profile.html'
}


let signOut = document.querySelector('.out')

signOut.addEventListener('click', () => {
  
   window.location.href ='../Authentication/index.html'
    console.log('signOut')

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

