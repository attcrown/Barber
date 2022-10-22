      import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
      import {getAuth,createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
      const firebaseConfig = {
          apiKey: "AIzaSyC9Wj5xc54F8z4NcK-7RBJBuVfMh6zh-xc",
          authDomain: "projectbarber64-9435e.firebaseapp.com",
          databaseURL: "https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app",
          projectId: "projectbarber64-9435e",
          storageBucket: "projectbarber64-9435e.appspot.com",
          messagingSenderId: "31761681328",
          appId: "1:31761681328:web:9cacd2e8ed95f3b7a4a475",
          measurementId: "G-E9B3F9EB0E"
        };

      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);
      const form = document.getElementById("addform");

      form.addEventListener("submit",(e)=>{
          e.preventDefault()
          const email = form.Emailadmin.value
          const password = form.Passadmin.value
          createUserWithEmailAndPassword(auth,email,password)
          .then((result)=>{
              alert("สร้างบัญชีผู้ใช้เรียบร้อย")
          }).catch((error)=>{
              alert(error.message)
          })
      });