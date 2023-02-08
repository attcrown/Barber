let deluserid;
let delname;
function deluser(a,b){
    deluserid = b;
    delname = a;
    document.getElementById('textpopup').innerText = `ยืนยันลบ ${a} ออกจากระบบ`;
}

function CancelQ(a,b){
    deluserid = b;
    delname = a;
    document.getElementById('textpopup').innerText = `ชื่อลูกค้า : ${a}`;
}
