document.getElementById("menudetailmodel").innerHTML  = 
`<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog">
  <div class="modal-content">
    <div class="modal-header">
      <h1 class="modal-title fs-5" id="exampleModalLabel">Detail</h1>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="btnclosepopup"></button>
    </div>
    <div class="modal-body">
      <p id="textpopup"></p>
      <p id="textbarberpopup"></p>
      <p id="popupdateq"></p>
      <p id="popupdate"></p>
      <p id="phonenumber"></p>
      <a href="#" class="link-primary" id="popuplink">รายละเอียด</a>
      <img src="" alt="" id="slipmoney" style="width: 30vw; min-width: 330px;">
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="closepopup">Close</button>
      <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal3">ต้องการยกเลิก</button>
    </div>
  </div>
</div>
</div>`;

document.getElementById("menudetailadd").innerHTML  = 
`<div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog">
  <div class="modal-content">
    <div class="modal-header">
      <h1 class="modal-title fs-5" id="exampleModalLabel">จองคิว</h1>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      <p>กรุณาระบุข้อมูลการจอง</p> 
      <div class="container text-center">
        <select class="form-select" aria-label="Default select example" id="namebarber">
          <option selected>เลือกช่าง</option>
        </select>
        <input type="text" class="form-control mt-3" id="nameuser" placeholder="ชื่อลูกค้า">
        <div class="row align-items-start">
          <div class="col float-start">
            <select class="form-select mt-3" aria-label="Default select example" id="yearqbarber" disabled>
              <option selected>ปี</option>
            </select>
          </div>
          <div class="col">
            <select class="form-select mt-3" aria-label="Default select example" id="monthqbarber" disabled>
              <option selected>เดือน</option>
            </select>
          </div>
          <div class="col">
            <select class="form-select mt-3" aria-label="Default select example" id="dayqbarber" disabled>
              <option selected>วัน</option>
            </select>
          </div>
        </div>
        <select class="form-select mt-3 " aria-label="Default select example" id="timeqbarber" disabled>
          <option selected>เลือกเวลา</option>
        </select>
      </div>                
    </div>              
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      <button type="button" class="btn btn-success" id="submit">Save changes</button>
    </div>
  </div>
</div>
</div>

<!-- Modaldelete -->
<div class="modal fade" id="exampleModal3" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">ยืนยัน</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="btnclosepopup2"></button>
      </div>
      <div class="modal-body">
        ยืนยันยกเลิกการจองคิวลูกค้า
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="closepopup2">Close</button>
        <button type="button" class="btn btn-danger" id="ConfirmDel">Delete</button>
      </div>
    </div>
  </div>
</div>`;
