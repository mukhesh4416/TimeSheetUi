import React from "react";
import "./Sidebar.css"


const Sidebar = ({onNavigate}) => {
  return (
    <div className=" pt-3 col-2 bg-light text-black p-3 shadow rounded d-flex flex-column justify-content-between min-vh-100 sticky-top">
      <div>
        <div className="mb-4 justify-content-center">
          {/* <h5><i className="bi bi-clock-history text-danger p-3"></i> Time Tracker</h5> */}
        </div>
        <nav className="nav flex-column sticky-top rounded">
          <button className="nav-link text-primary text-start btn btn-link mt-4" onClick={() => onNavigate("dashboard")}>
           <i className="bi bi-grid-3x3 text-primary fw-bold p-2" ></i>  Dashboard
          </button>

          <button
            className="nav-link text-primary text-start btn btn-link "
          
             onClick={() => onNavigate("taskestimation")}
          >
            <i className="bi bi-r-square text-primary p-2"></i> Time Estimations
          </button>
          {/* <div className="collapse" id="registrationMenu">
            <button className="nav-link text-white btn btn-link ms-5">
              • 
            </button>
            <button className="nav-link text-white btn btn-link ms-5">
              • 
            </button>
          </div> */}

          <button
            className="nav-link text-primary text-start btn btn-link "
            onClick={() => onNavigate("allocations")}
          >
            <i className="bi bi-kanban text-primary p-2 "></i> Allocations
          </button>
          {/* <div className="collapse" id="allocationMenu">
            <button className="nav-link text-white btn btn-link ms-5">• </button>
            <button className="nav-link text-white btn btn-link ms-5">• </button>
          </div> */}
           <button
            className="nav-link text-primary text-start btn btn-link mb-5"
            onClick={() => onNavigate("finalsubmission")}
          >
            <i className="bi bi-kanban text-primary p-2 "></i> Timesheet
          </button>
          <button
            className="nav-link text-primary text-start btn btn-link mb-5"
            onClick={() => onNavigate("timesheet")}
          >
            <i className="bi bi-kanban text-primary p-2 "></i> Timesheet
          </button>
          {/* <div className="collapse" id="allocationMenu">
            <button className="nav-link text-white btn btn-link ms-5">• </button>
            <button className="nav-link text-white btn btn-link ms-5">• </button>
          </div> */}
        </nav>
      </div>

      {/* <div className="pt-3 p-3">
        <button className="btn btn-outline-primary w-90 shadow"><i className="bi bi-box-arrow-right p-2"></i>Logout</button>
      </div> */}
    </div>
  );
};

export default Sidebar;
