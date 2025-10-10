import React from "react";
import "./Sidebar.css"
import { Link } from "react-router-dom";


const Sidebar = () => {
  return (
      <div className="pt-3 col-2 bg-light text-black p-3 shadow rounded d-flex flex-column justify-content-between min-vh-100 sticky-top">
      <div>
        <div className="mb-4 justify-content-center">
        </div> 
        <nav className="nav flex-column rounded">
          <button className="nav-link text-black text-start btn btn-link" onClick={() => onNavigate("dashboard")}>
           <i className="bi bi-grid-3x3 text-primary p-2" ></i>  Dashboard
          </button>

          <button
            className="nav-link text-black text-start btn btn-link"
            data-bs-toggle="collapse"
            data-bs-target="#registrationMenu"
          >
            <i className="bi bi-r-square text-primary p-2"></i> Registration
          </button>
          <div className="collapse" id="registrationMenu">
            <button className="nav-link text-black btn btn-link ms-4" onClick={() => onNavigate("userRegistration")}>
              • User Registration
            </button>
            <button className="nav-link text-black btn btn-link ms-4" onClick={() => onNavigate("roleRegistration")}>
              • Role Registration
            </button>
             <button className="nav-link text-black btn btn-link ms-4" onClick={() => onNavigate("designationRegistration")}>
              • Designation Registration
            </button>
            <button className="nav-link text-black btn btn-link ms-4">
               <Link className='mx-2 nav-link' to={'/timesheet/department'}> Department </Link>
            </button>
           
          </div>

          <button
            className="nav-link text-black text-start btn btn-link"
            data-bs-toggle="collapse"
            data-bs-target="#allocationMenu"
          >
            <i className="bi bi-kanban text-primary p-2 "></i> Allocation
          </button>
          <div className="collapse" id="allocationMenu">
            <button className="nav-link text-black btn btn-link ms-5" onClick={() => onNavigate("projectRegistration")}>• Project Allocation</button>
            <button className="nav-link text-black btn btn-link ms-5" onClick={() => onNavigate("timeAllocation")}>• Time Allocation</button>
          </div>
        </nav>
        </div>
      </div>
  );
};

export default Sidebar;
