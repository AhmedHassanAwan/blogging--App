// console.log("hellow world");


import { onAuthStateChanged , signOut  } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { collection, getDocs ,query, where }from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

import { auth , db} from "./config.js";

const blogs = [
    {
      title: "The Power of Storytelling in Blogging",
      description: "Discover how storytelling can engage readers, make content memorable, and boost your blog’s impact.",
      image: "https://contentwriters.com/blog/wp-content/uploads/2021/10/The-Power-of-Storytelling-in-Content-Marketing.png"
    },
    {
      title: "10 Tips for Writing Engaging Blog Posts",
      description: "Learn the secrets of crafting compelling blog posts that keep readers hooked and coming back for more.",
      image: "https://i.ytimg.com/vi/go4wo4WenQQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCKWqH5bhb-0EzSJymOE8BNWXbE-A"
    },
    {
      title: "Why Blogging is Essential for Your Business",
      description: "Blogging helps build brand authority, improve SEO, and connect with your audience in a meaningful way.",
      image: "https://digitalsolutions.com.pk/wp-content/uploads/2022/12/Blogging-for-Your-Business.jpg"
    },
    {
      title: "Mastering SEO: A Blogger’s Guide",
      description: "SEO can make or break a blog. Learn how to optimize your posts for search engines and attract more visitors.",
      image: "https://media.licdn.com/dms/image/v2/C4E12AQEL0_JQa2N2lg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1607599106278?e=2147483647&v=beta&t=iH0kj8lv4AROMB4T0PO0oll7pX4xzAHbscAZcWnojww"
    },
      {
        title: "Top 10 Programming Languages in 2023",
        description: "Discover the most popular programming languages this year and why they are dominating the tech world.",
        image: "https://motivitylabs.com/wp-content/uploads/2022/12/Top-10-Programming-Language-Trends-for-Developers-to-Follow-in-2023.jpeg"
      },
      {
        title: "Getting Started with Web Development",
        description: "A beginner's guide to web development, covering HTML, CSS, JavaScript,& more",
        image: "https://www.binpress.com/wp-content/uploads/2019/08/starting-web-development-business.jpg"
      },
  ];


const profilename = document.querySelector("#user-profile-name");
const profileimg = document.querySelector("#user-profile-img");
const loginBtn = document.querySelector('#login-btn')
const loginUser = document.querySelector('#login-user')
const logoutbtn = document.querySelector("#logout-btn")
const div = document.querySelector("#div");
const blogContainer = document.getElementById("blog-container");


function renderBlogs() {
    blogContainer.innerHTML = "";
    blogs.forEach((blog) => {
      blogContainer.innerHTML += `
        <div class="card shadow-lg border-0 rounded-4 overflow-hidden" style="width: 22rem;">
          <img src="${blog.image}" class="card-img-top" alt="${blog.title}">
          <div class="card-body">
            <h5 class="card-title fw-bold">${blog.title}</h5>
            <p class="card-text text-muted">${blog.description}</p>
          </div>
        </div>
      `;
    });
  }



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
           renderBlogs();
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






async function datarender() {
    const arr = [];
    const querySnapshot = await getDocs(collection(db, "blog"));
    querySnapshot.forEach((doc) => {
      arr.push(doc.data());
    });
  
    const div = document.getElementById("div");
    div.innerHTML = ""; 
  
    arr.map((items, index) => {
        
      

      div.innerHTML += `
      <div class="card shadow-lg border-0 rounded-4 overflow-hidden" style="width: 22rem;">
        <img src="${items.iamge}" class="card-img-top" alt="${items.text}">
        <div class="card-body">
           <h5 class="card-title fw-bold">${items.text}</h5>
    <p class="card-text text-muted">${items.description}</p>
        </div>
      </div>`
    });
  }
  

  datarender();