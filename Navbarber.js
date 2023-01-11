let userlink = document.getElementById("userlink");
let signoutlink = document.getElementById('signoutlink');
var currentuser = null;

//-------windows loads--------
window.onload = function(){
    getUsername();
    if(currentuser == null){
        window.location = "login.html";
    }
    else{
        userlink.innerText = "User : "+currentuser.fullname;
        // header.innerText = "welcome " + currentuser.fullname;
        userlink.classList.replace("nav-link","btn");
        userlink.classList.remove("btn-primary");
        userlink.href = "#";
    }
}

signoutlink.addEventListener('click',Signouts);

function Signouts(){
    sessionStorage.removeItem("user");
    localStorage.removeItem("user");
    localStorage.removeItem("keepLoggedIn");
    window.location = "login.html";
}

//----function----
function getUsername(){
    let keepLoggedIn = localStorage.getItem("keepLoggedIn");
    if(keepLoggedIn == "yes"){
        currentuser = JSON.parse(localStorage.getItem("user"));
    }
    else{
        currentuser = JSON.parse(sessionStorage.getItem("user"));
    }
    // console.log(keepLoggedIn);
    // console.log(currentuser);
}

