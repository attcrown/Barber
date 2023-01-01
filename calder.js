//-----onclick-----
let montha;
let dayb;
let importyear;
var textpopup = document.getElementById('Dataday');
function showdaycal(a,b){
    montha = a;
    dayb = b;
    console.log(a,b);
    textpopup.innerHTML ="<p id='Dataday'>"+montha+" "+dayb+" "+importyear+"</p>";
}
function importyears(a){
    importyear = a;
}
//"+years+"
