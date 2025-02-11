// console.log("hellow world");


import { onAuthStateChanged , signOut  } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { collection, getDocs ,query, where }from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

import { auth , db} from "./config.js";




const profilename = document.querySelector("#user-profile-name");
const profileimg = document.querySelector("#user-profile-img");
const loginBtn = document.querySelector('#login-btn')
const loginUser = document.querySelector('#login-user')
const logoutbtn = document.querySelector("#logout-btn")
const div = document.querySelector("#div");



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
           datarender()

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


//      async function datarender() {
//             const arr = []
//             const querySnapshot = await getDocs(collection(db, "blog"));
//             querySnapshot.forEach((doc) => {
//                 console.log(doc.data());
                
//             //   console.log(`${doc.id} => ${doc.data()}`);
//             arr.push(doc.data())
//             });
//             console.log(arr);
//              div.innerHTML = ""
//             arr.map((items)=>{
//                 console.log(items);
//                 div.innerHTML += `
//                 <div class="card" style="width: 18rem;">
//       <img src="${items.iamge}" class="card-img-top" alt="...">
//       <div class="card-body">
//         <h5 class="card-title">${items.text}</h5>
//         <p class="card-text">${items.uid}</p>
//         <a href="#" class="btn btn-primary">Go somewhere</a>
//       </div>
//     </div>`
// })
// };




async function datarender() {
    const arr = [];
    const querySnapshot = await getDocs(collection(db, "blog"));
    querySnapshot.forEach((doc) => {
      arr.push(doc.data());
    });
  
    const div = document.getElementById("div");
    div.innerHTML = ""; 
  
    arr.map((items, index) => {
//       div.innerHTML +=`
// //       <div class="card mb-3" style="max-width: 540px; class="card">
// //   <div class="row g-0">
// //     <div class="col-md-4">
// //       <img src="${items.iamge}" class="img-fluid rounded-start" alt="...">
// //     </div>
// //     <div class="col-md-8">
// //       <div class="card-body">
// //         <h5 class="card-title">${items.text}</h5>
// //         <p class="card-text">${items.description}</p>
// //         <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
// //       </div>
// //     </div>
// //   </div>
// // </div>`
      div.innerHTML += `
        <div class="card" style="animation-delay: ${index * 0.1}s;">
          <img src="${items.iamge}" class="card-img-top" alt="${items.text}">
          <div class="card-body">
            <h5 class="card-title">${items.text}</h5>
            <p class="card-text">${items.uid}</p>
            <a href="#" class="btn">Read More</a>
          </div>
        </div>`;
    });
  }
  
  // Call the function to render data
  datarender();