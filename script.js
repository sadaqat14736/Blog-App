
function showForm(form) {
    document.querySelector('.login').classList.remove('active');
    document.querySelector('.signup').classList.remove('active');

     document.querySelectorAll('.switch button').forEach(btn => {
    btn.classList.remove('active');
  });

    if (form === 'login') {
      document.querySelector('.login').classList.add('active');
       document.querySelector('.login .switch button:nth-child(1)').classList.add('active');
    } else {
      document.querySelector('.signup').classList.add('active');
       document.querySelector('.signup .switch button:nth-child(2)').classList.add('active'); 
    }
  }


var signUP = () => {
  var email = document.getElementById("signup-email").value;
  var password = document.getElementById("signup-password").value;
 
  

  var userData = {
    email,
    password,
  };

  localStorage.setItem("users", JSON.stringify(userData)); 

  alert("✅ Signup successful! Please login now.");
 
  showForm("login");
}

var login = () => {
    const userCredit = JSON.parse(localStorage.getItem("users"));

    var email = document.getElementById("login-email").value;
    var password = document.getElementById("login-password").value;

    if(userCredit.email===email && userCredit.password===password){
        alert("✅ you are successfuly loged in ")

        localStorage.setItem("islogin", true);

        localStorage.setItem("islogin", JSON.stringify(userCredit));

        window.location.href = "./blog.html"
    }else{
        alert("❌ Credentials invalid please enter correct.")
    };

};



 


 
var logout = () => {
  localStorage.removeItem("islogin");
  alert("✅ User has been logged out successfully!");
  window.location.href = "./index.html";
}

var savePost = () => {
  var user = JSON.parse(localStorage.getItem("islogin"));

  if(!user){
    alert("❌ Please login first ");
    return;    
  };

  let title = document.getElementById("title").value;
  let content = document.getElementById("contnt").value;

  if(!title || !content){
    alert("❌ Please enter both title and content;")
    return;
  };
  
 

  let post = {
  id: Date.now(),
  email: user.email,
  title,
  content,
  timestamp: new Date().toLocaleString()
};

    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    posts.push(post);

    localStorage.setItem( "posts", JSON.stringify(posts));
  
   alert("✅ Post saved successfully!");

   // Form clear karna
  document.getElementById("title").value = "";
  document.getElementById("contnt").value = "";


    renderPosts();

}

function renderPosts() {
    let postsContainer = document.getElementById("posts-container");
    postsContainer.innerHTML = ""; // purane clear karo

    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    posts.forEach((post, index) => {
        let postBox = document.createElement("div");
        postBox.classList.add("post-box");

        postBox.innerHTML = `
            <div class="post-header">
                <strong>${post.email}</strong>
            </div>
            <div class="post-body">
                <h3>${post.title}</h3>
                 
                <p>${post.content}</p>
            </div>
            <div class="post-footer">
                <small>${new Date(post.timestamp).toLocaleString()}</small>
                <button onclick="removePost(${index})">Remove</button>
            </div>
        `;

        postsContainer.appendChild(postBox);
    });
};


function removePost(index) {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts.splice(index, 1); // index wala post remove karo
  localStorage.setItem("posts", JSON.stringify(posts));
  renderPosts(); // dobara posts dikhado updated
}


window.onload = function () {
    renderPosts();
};
 

  