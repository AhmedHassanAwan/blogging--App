

import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { auth, db } from "./config.js";

const email = document.querySelector("#email");
const text = document.querySelector("#text");
const password = document.querySelector("#password");
const btn = document.querySelector("#btn");

let Picurl = "";  



var myWidget = cloudinary.createUploadWidget({
    cloudName: 'dwfxr62c6', 
    uploadPreset: 'blogging app'},
     (error, result) => { 
      if (!error && result && result.event === "success") { 
        console.log('Done! Here is the image info: ', result.info); 
        Picurl = result.info.secure_url;  
        
      }
    }
  )
  
  document.getElementById("upload_widget").addEventListener("click", function(){
      myWidget.open();
    }, false);

btn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Email:", email.value);
    console.log("Password:", password.value);
    console.log("Fullname:" , text.value);
    

   
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then(async (userCredential) => {
            const user = userCredential.user;
            console.log("User created:", user);
            console.log("User UID:", user.uid);

            // window.location = "login.html"
            try {
             
                const docRef = await addDoc(collection(db, "users"), {
                    email: email.value,
                    password: password.value,
                    text : text.value,
                    uid: user.uid,
                    profilePic: Picurl  
                });
                console.log("Document written with ID: ", docRef.id);
                window.location = "login.html"

                
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.error("Error: ", errorMessage);
        });
});




















































































