//-----onclick-----
let pullnames;
let montha;
let dayb;
let importyear;
var textpopup = document.getElementById('Dataday');
function showdaycal(a,b){
    montha = a;
    dayb = b;
    textpopup.innerText = montha+" "+dayb+" "+importyear;
}
function importyears(a){
    importyear = a;
}
function pullname(a){
    pullnames = a;
}
