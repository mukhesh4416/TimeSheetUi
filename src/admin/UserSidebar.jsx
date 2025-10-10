
const UserSidebar = ({ onNavigate }) => {
  return (
    <div className="col-2 bg-dark text-white p-3 d-flex flex-column justify-content-between min-vh-100">
      <div>
        <div className="mb-4 justify-content-center">
          <h5><i className="bi bi-clock-history text-danger p-3"></i> Time Tracker</h5>
        </div>
        <nav className="nav flex-column">
          <button className="nav-link text-white text-start btn btn-link" onClick={() => onNavigate("dashboard")}>
           <i className="bi bi-grid-3x3 text-danger p-2" ></i>  Dashboard
          </button>

          <button
            className="nav-link text-white text-start btn btn-link"
            data-bs-toggle="collapse"
            data-bs-target="#registrationMenu"
          >
            <i className="bi bi-r-square text-danger p-2"></i> Registration
          </button>
          <div className="collapse" id="registrationMenu">
            <button className="nav-link text-white btn btn-link ms-5" onClick={() => onNavigate("userRegistration")}>
              • User Registration
            </button>
            <button className="nav-link text-white btn btn-link ms-5" onClick={() => onNavigate("roleRegistration")}>
              • Role Registration
            </button>
          </div>

          <button
            className="nav-link text-white text-start btn btn-link"
            data-bs-toggle="collapse"
            data-bs-target="#allocationMenu"
          >
            <i className="bi bi-kanban text-danger p-2 "></i> Allocation
          </button>
          <div className="collapse" id="allocationMenu">
            <button className="nav-link text-white btn btn-link ms-5" onClick={() => onNavigate("projectRegistration")}>• Project Allocation</button>
            <button className="nav-link text-white btn btn-link ms-5" onClick={() => onNavigate("timeAllocation")}>• Time Allocation</button>
          </div>
        </nav>
      </div>

      <div className="pt-3 p-3">
        <button className="btn btn-outline-danger w-90 shadow"><i className="bi bi-box-arrow-right p-2"></i>Logout</button>
      </div>
    </div>
  );
};

export default UserSidebar;