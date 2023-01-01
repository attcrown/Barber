//-----onclick-----
let montha;
let dayb;

function showdaycal(a,b){
    document.getElementById('Dataday').innerHTML="<p id='Dataday'>ท่านต้องการลบ "+a+" "+b+" ออกจากปฏิทินไหม</p>"
    montha = a;
    dayb = b;
    // document.getElementById('Subday').innerHTML="<button type='button' class='btn btn-danger' id='Subday' data-bs-dismiss='modal' value="+b+">Delete</button>"
}

