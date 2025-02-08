// console.log("hellow world");


import { onAuthStateChanged , signOut  } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { collection, getDocs ,query, where }from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

import { auth , db} from "./config.js";




const profilename = document.querySelector("#user-profile-name");
const profileimg = document.querySelector("#user-profile-img");
const loginBtn = document.querySelector('#login-btn')
const loginUser = document.querySelector('#login-user')
const logoutbtn = document.querySelector("#logout-btn")

logoutbtn.addEventListener("click",()=>{

    
    signOut(auth).then(() => {
        alert("Sign-out successful.")
     window.location = "login.html"
  }).catch((error) => {
    console.log(error);
    
    // An error happened.
});
})


    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const uid = user.uid; 
            console.log(uid);
            
           let users = await data()

            profileimg.src = users.profilePic
            profilename.innerHTML = users.text


            loginBtn.classList.add('d-none')
            loginUser.classList.remove('d-none')  
            
        } else {
        
            window.location = "login.html";
        }
    });

      async function data() {
        let user;
        const q = query(collection(db, "users"), where("uid", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.data());

         user = doc.data()
        });

        return user
        
    }




