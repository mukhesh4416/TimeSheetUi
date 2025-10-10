import React from "react";

const Sidebar = ({ onNavigate }) => {
  return (
    <div className="pt-3 col-2 bg-light text-black p-3 shadow rounded d-flex flex-column justify-content-between min-vh-100 sticky-top">
      <div>
        <div className="mb-4 justify-content-center">
          {/* <h5><i className="bi bi-clock-history text-primary p-3"></i> Time Tracker</h5> */}
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
            <button className="nav-link text-black btn btn-link ms-4" onClick={() => onNavigate("department")}>
              • Department Registration
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




// import React from "react";

// const Sidebar = ({ onNavigate }) => {
//   return (
//     <div className="col-md-2 bg-dark text-white sidebar p-3 min-vh-100 justify-content-between ">
//       <div className="mb-4">
//         <h5>👤 Kavya</h5>
//       </div>
//       <nav className="nav flex-column">
//         <button className="nav-link text-white text-start btn btn-link" onClick={() => onNavigate("dashboard")}>
//           🏠 Dashboard
//         </button>

//         <button className="nav-link text-white text-start btn btn-link" data-bs-toggle="collapse" data-bs-target="#registrationMenu">
//           🔐 Registration
//         </button>
//         <div className="collapse" id="registrationMenu">
//           <button className="nav-link text-white btn btn-link ms-5" onClick={() => onNavigate("userRegistration")}>
//             • User Registration
//           </button>
//           <button className="nav-link text-white btn btn-link ms-5" onClick={() => onNavigate("roleRegistration")}>
//             • Role Registration
//           </button>
//         </div>

//         <button className="nav-link text-white text-start btn btn-link" data-bs-toggle="collapse" data-bs-target="#allocationMenu">
//           📋 Allocation
//         </button>
//         <div className="collapse" id="allocationMenu">
//           <button className="nav-link text-white btn btn-link ms-5">• Project Allocation</button>
//           <button className="nav-link text-white btn btn-link ms-5">• Time Allocation</button>
//         </div>
    
//       </nav>

//       <div className="p-3">
//     <button className="btn btn-outline-danger w-100">Logout</button>
//   </div>
      
//     </div>
//   );
// };

// export default Sidebar;

