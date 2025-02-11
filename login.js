


import {signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

import { auth } from "./config.js";




const email = document.querySelector("#email");
const password = document.querySelector("#password");
const btn = document.querySelector(".btn");

btn.addEventListener("click",(e)=>{
    e.preventDefault()
    console.log(email.value);
    console.log(password.value);


    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {

        const user = userCredential.user;
        console.log(user);
      
            window.location = "index.html"
       


})
.catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    
    
});



}) // btn




