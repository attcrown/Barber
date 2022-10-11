<?php
    $user = $_POST["userinput"];
    $pass = $_POST["passinput"];
    if($user == "admin" && $pass == "admin"){
        header("location:PageAdmin.html");
        die;
    }
    if($user == "barber" && $pass == "barber"){
        header("location:PageBarber.html");
        die;
    }

?>