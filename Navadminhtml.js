document.getElementById('navadmin').innerHTML=`<nav id="navadmin" class="navbar navbar-expand-lg bg-success">
<div class="container-fluid">
  <a class="navbar-brand text-light" href="#">ADMIN PAGE</a>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarScroll">
    <ul id="menu" class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
    </ul>
    <form class="d-flex" role="search">
        <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
            <li class="nav-item">
              <a class="nav-link mx-3 text-light" href="index.html" id="">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link mx-3 text-light" href="" id="userlink">Username</a>
            </li>
            <li class="nav-item">
                <button type="button" class="btn nav-link text-dark mx-3" id="signoutlink">Sign Out</button>
                <!-- <a class="nav-link mx-3 text-danger btn" href="javascript:Signout()" id="signoutlink">Sign Out</a> -->
              </li>
          </ul>
    </form>
  </div>
</div>
</nav>`