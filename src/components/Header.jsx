function Header(){
    return(

      

 <div className='width-max bg-primary text-white p-3 shadow fixed-top mb-5 d-flex navbar'> <h3><i className="bi bi-clock-history text-white p-3"></i> Time Tracker</h3>
 
<div>
  <button className="btn w-90 shadow text-white"> Profile <i className="bi bi-person text-white p-2 fs-5"></i></button>
<button className="btn w-90 shadow text-white">logout<i className="bi bi-box-arrow-right p-2 text-white fs-5" ></i></button>
</div>

{/* <nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="#">WebSiteName</a>
    </div>
    
    <ul class="nav navbar-nav navbar-right">
      <li><a href="#"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
      <li><a href="#"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
    </ul>
  </div>
</nav> */}

</div>
    );
}
export default Header;