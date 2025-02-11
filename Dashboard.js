
console.log("hellow js");
import { collection, addDoc , getDocs , query, where  } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { onAuthStateChanged   } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { auth ,  db } from "./config.js";

const btn = document.querySelector("#btn");
const text = document.querySelector("#text");
// const div = document.querySelector("#div");



 onAuthStateChanged(auth, async (user) => {
        if (user) {
            const uid = user.uid; 
            console.log(uid);
            
    //    data()
    datarender()


            
        } 
        
    });



    // cloudinary
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





btn.addEventListener("click",async(e)=>{
    e.preventDefault()
    console.log("hellow js");

    console.log(text.value);


    try {
        const docRef = await addDoc(collection(db, "blog"), {
            text : text.value,
            uid : auth.currentUser.uid,
            iamge : Picurl
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }

    //   data()
    datarender()
      
    
    
})






async function datarender() {
  const arr = [];
  const q = query(collection(db, "blog"),  where("uid", "==", auth.currentUser.uid));
  console.log(auth.currentUser.uid);
  
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      arr.push(doc.data());
    });
  
    const div = document.getElementById("div");

    div.innerHTML = "";
    arr.map((items, index) => {
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
  
  // datarender();



