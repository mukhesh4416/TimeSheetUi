import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Dashboard } from "./Dashboard";
import UserRegistration from "./UserRegistration";
import { AddUserForm } from "./AddUserForm";
import RoleRegistration from "./RoleRegistration";
import {AddRoleForm} from "./AddRoleForm";
import ProjectAllocation from "./ProjectAllocation";
import { ProjectAllocationForm } from "./ProjectAllocationForm";
import TimeAllocation from "./TimeAllocation";
import { TimeAllocationForm } from "./TimeAllocationForm";
import { TimeAllocationDashboard } from "./TimeAllocationsDashboard";
import DesignationRegistration from "./DesignationRegistration";
import {AddDesignationForm} from "./AddDesignationForm";
import DepartmentRegistration from "./DepartmentRegistration";
import { AddDepartmentForm } from "./AddDepartmentForm";
import { UpdateDepartmentForm } from "./updateDepartment";
import Department from "./Department";

function Adminpage() {
  const [mainContent, setMainContent] = useState("dashboard");

  const [roles, setRoles] = useState([
    { id: 1, name: "Admin" },
    { id: 2, name: "User" },
  ]);

  const [designations,setDesignations]=useState([
    {id:1,designation:"TeamLead"},
    {id:2,designation:"Tester"},
  ]);

  const [nextDesignationId,setNextDesignationId]=useState(3);
  console.log(roles);

  const [nextRoleId, setNextRoleId] = useState(3);


  const [users, setUsers] = useState([
    { id: 1, empcode:"LWT123",name: "Meehika",email:"meehika@lotuswireless.in",designation:"Trainee Software Engineer",role:"User",username:"mikki",password:"58964",status:"Active" },
    { id: 2, empcode:"LWT893",name: "Bashvika" ,email:"meehika@lotuswireless.in",designation:"Senior Developer",role:"user ",username:"bashu",password:"1236",status:"Active"  },
  ]);

  const [nextUserId,setNextUserId]=useState(3);

    const [projects, setProjects] = useState([
    { id: 1, name: "Admin",empname:"kavya",start:"2/5/25",end:"-",status:"Active" },
    { id: 2, name: "User" ,empname:"kavya",start:"2/5/25",end:"-",status:"Active"},
  ]);

  const [nextProjectId, setNextProjectId] = useState(3);

   const [timeA, setTimeA] = useState([
    { id: 1, empname: "kavya",projectname:"Timetracker",task:"UI design",estimatedhours:"10",allocatedhours:"" },
    { id: 2, empname: "Priyesh" ,projectname:"Timetracker",task:"Backend",estimatedhours:"15",allocatedhours:""},
  ]);

  const [nextTimeId, setNextTimeId] = useState(3);


  const [pendingTimeA, setPendingTimeA] = useState([
  { id: 3, empname: "kavya", projectname: "Timetracker", task: "UI design", estimatedhours: "10", allocatedhours: "" },
  { id: 4, empname: "Jhanu", projectname: "Timetracker", task: "Backend", estimatedhours: "15", allocatedhours: "" },
]);

const [completedTimeA, setCompletedTimeA] = useState([
   { id: 1, empname: "kavya",projectname:"Timetracker",task:"UI design",estimatedhours:"10",allocatedhours:"5" },
    { id: 2, empname: "naveen" ,projectname:"Timetracker",task:"Backend",estimatedhours:"15",allocatedhours:"8"},
]);



const [showUserModal, setShowUserModal] = useState(false);
const [showRoleModal, setShowRoleModal] = useState(false);



//   const submitUserForm = (e) => {
//     e.preventDefault();
//     const userName = e.target.userName.value;
//    if(userName){

//    setUsers([...users,{id:nextUserId,name:userName,role:roleName,status:status}])
// setNextUserId(nextUserId + 1);
//     alert("User submitted successfully!");
//     // setShowUserModal(false);
//     setMainContent("userRegistration");
//    }
//   };

const submitUserForm = (e) => {
  e.preventDefault();

  const form = e.target;
const empcode = form.empcode.value;
  const userName = form.userName.value;
  const email = form.email.value;
  const designation = form.designation.value;
  const roleName = form.roleName.value;
  const username = form.username.value;
  const password = form.password.value;
  const status = form.status.value;

//   const permissions = Array.from(form.permissions)
//     .filter((checkbox) => checkbox.checked)
//     .map((checkbox) => checkbox.value);

  if (userName && roleName && status&&empcode && email && designation && username && password) {
    setUsers((prevUsers) => [
      ...prevUsers,
      {
        id: nextUserId,
        empcode:empcode,
        name: userName,
        email:email,
        designation:designation,
        role: roleName,
        username:username,
        password:password,
        status: status,
        // permissions: permissions, 
      },
    ]);

    setNextUserId((prevId) => prevId + 1);
    alert("User submitted successfully!");

    // Close modal or navigate
    setMainContent("userRegistration");
  }
};




  const submitRoleForm = (e) => {
    e.preventDefault();
    const roleName = e.target.roleName.value;
    if (roleName) {
      setRoles([...roles, { id: nextRoleId, name: roleName }]);
      setNextRoleId(nextRoleId + 1);
      alert("Role added successfully!");
      setMainContent("roleRegistration");
    }
  };

  const [errors,setErrors]=useState("");
 const submitDesignationForm = async (e) => {

  const designationId=e.target.id.value;
  const designationName=e.target.designation.value;
    
 
        const res = await axios.post( baseUrl + `/user/saveDesignation?designationId=${designationId}&designationName=${designationName}&createdBy=string&createdDate=string&modifiedBy=string&modifiedDate=2025-10-09&actionMode=string
`,{})
                if(res.data){

            alert("data added successfully")

        }else{

            alert("Unable to add designation");

        }
  

    // const designationName = e.target.designation.value;
    // if (designationName) {
    //   setDesignations([...designations, { id: nextDesignationId, designation: designationName }]);
    //   setNextDesignationId(nextDesignationId + 1);
    //   alert("Designation added successfully!");
    //   setMainContent("designationRegistration");
    // }
  };

const submitProjectForm = (e) => {
    e.preventDefault();
    const projectName = e.target.projectName.value;
    const empName = e.target.empName.value;
    const projectStart = e.target.projectStart.value;
    const projectEnd = e.target.projectEnd.value;
    const projectStatus = e.target.projectStatus.value;

    if (projectName) {
      setProjects([...projects, { id: nextProjectId, name: projectName, empname:empName,start:projectStart,end:projectEnd,status:projectStatus }]);
      setNextProjectId(nextProjectId + 1);
      alert("Project added successfully!");
      setMainContent("projectRegistration");
    }
  };


  const submitAllocationForm = (e) => {
    e.preventDefault();
    const empName = e.target.empName.value;
    const projectName = e.target.projectName.value;
    const task = e.target.task.value;
    const estimatedHours = e.target.estimatedHours.value;
    const allocatedHours = e.target.allocatedHours.value;

    if (projectName) {
      setTimeA([...timeA, { id: nextTimeId, empname: empName, projectname:projectName,task:task,estimatedhours:estimatedHours,allocatedhours:allocatedHours }]);
      setNextTimeId(nextTimeId + 1);
      alert("Estimated Hours added successfully!");
      setMainContent("timeAllocation");
    }
  };

  const submitDepartmentForm = (e) =>{
    e.preventDefault();
  }

//   const handleAllocatedHoursChange = (id, newAllocatedHours) => {
//   setTimeA((prevTimeA) =>
//     prevTimeA.map((time) =>
//       time.id === id ? { ...time, allocatedhours: newAllocatedHours } : time
//     )
//   );
// };

const handleAllocatedHoursChange = (id, newHours) => {
  setPendingTimeA((prev) =>
    prev.map((time) =>
      time.id === id ? { ...time, allocatedhours: newHours } : time
    )
  );
};

const handleSubmitAllocation = (id) => {
  const submittedRow = pendingTimeA.find((row) => row.id === id);
  if (submittedRow) {
    setPendingTimeA((prev) => prev.filter((row) => row.id !== id));
    setCompletedTimeA((prev) => [...prev, submittedRow]);
  }
};


  const renderContent = () => {
    switch (mainContent) {
      case "dashboard":
        return <Dashboard />;
      case "userRegistration":
        return <UserRegistration users={users} onAdd={() => setMainContent("addUser")} />;
     case "addUser":
      return <AddUserForm show={true} roles={roles} designations={designations} onCancel={() => {setShowUserModal(false); setMainContent("userRegistration")}} onSubmit={submitUserForm} />;

// case "addUser":
//   return (
//     <AddUserForm
//       show={true}
//       onCancel={() => {
//         setShowUserModal(false);
//         setMainContent("userRegistration");
//       }}
//       onSubmit={(e) => {
//         e.preventDefault();
//         alert("User submitted successfully!");
//         setShowUserModal(false);
//         setMainContent("userRegistration");
//       }}
//     />
//   );

      case "roleRegistration":
        return <RoleRegistration roles={roles} onAdd={() => setMainContent("addRole")} />;
      case "addRole":
        return <AddRoleForm show = {true} onCancel={() => {setShowRoleModal(false); setMainContent("roleRegistration")}} onSubmit={submitRoleForm} />;
       case "designationRegistration":
        return <DesignationRegistration designations={designations} onAdd={() => setMainContent("addDesignation")} />;
      case "addDesignation":
        return <AddDesignationForm show = {true} onCancel={() => {setShowRoleModal(false); setMainContent("designationRegistration")}} onSubmit={submitDesignationForm} />;
         case "department":
        return <Department  />;
      case "addDepartment":
        return <AddDepartmentForm show = {true} onCancel={() => {setShowRoleModal(false); setMainContent("departmentRegistration")}} onSubmit={submitDepartmentForm} />;
     
      case "updateDepartment":
        return <UpdateDepartmentForm show = {true} onCancel={() => {setShowRoleModal(false); setMainContent("departmentRegistration")}} onSubmit={submitDepartmentForm} />;

         case "projectRegistration":
        return <ProjectAllocation projects={projects} onAdd={() => setMainContent("addProject")} />;
      case "addProject":
        return <ProjectAllocationForm onCancel={() => setMainContent("projectRegistration")} onSubmit={submitProjectForm} />;
         case "timeAllocation":
       return <TimeAllocation pendingTimeA={pendingTimeA}
      completedTimeA={completedTimeA}
      onAdd={() => setMainContent("addTime")}
      onAllocatedHoursChange={handleAllocatedHoursChange}
      onSubmitAllocation={handleSubmitAllocation}/>;
        //  return <TimeAllocationDashboard timeA={timeA} onAdd={() => setMainContent("timeAllocation")}/>;
         case "addTime":
        return <TimeAllocationForm onCancel={() => setMainContent("timeAllocation")} onSubmit={submitAllocationForm} />
        
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="container-fluid bg-light pt-5">
      <div className="row">
        <Sidebar onNavigate={setMainContent} />
        <div className="col-md-10 p-4 bg-light">{renderContent()}</div>
      </div>
    </div>
  );
}

export default Adminpage;



// // import React from 'react';
// // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import Sidebar from './components/Sidebar';
// // import Dashboard from './pages/Dashboard';
// // import { RoleRegistration } from './pages/RoleRegistration';
// // import { UserRegistration } from './pages/UserRegistration';
// // import { ProjectAllocation } from './pages/ProjectAllocation';
// // import { TimeAllocation } from './pages/TimeAllocation';

// // function App() {
// //   return (
// //     <Router>
// //       <div className="d-flex">
// //         <Sidebar />
// //         <div className="flex-grow-1 p-4" style={{ background: '#f8f9fa', minHeight: '100vh' }}>
// //           <Routes>
// //             <Route path="/" element={<Dashboard />} />
// //             <Route path="/allocation" element={<TimeAllocation />} />
// //             <Route path="/projects" element={<ProjectAllocation />} />
// //             <Route path="/users" element={<UserRegistration />} />
// //             <Route path="/roles" element={<RoleRegistration />} />
// //           </Routes>
// //         </div>
// //       </div>
// //     </Router>
// //   );
// // }

// // export default App;


// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";

// function App() {
//   const [mainContent, setMainContent] = useState("dashboard");
//   const [roles, setRoles] = useState([
//     { id: 1, name: "Admin" },
//     { id: 2, name: "User" },
//   ]);
//   const [nextRoleId, setNextRoleId] = useState(3);

//   const showDashboard = () => setMainContent("dashboard");
//   const showUserRegistration = () => setMainContent("userRegistration");
//   const showAddUserForm = () => setMainContent("addUser");
//   const showRoleRegistration = () => setMainContent("roleRegistration");
//   const showAddRoleForm = () => setMainContent("addRole");

//   const submitUserForm = (e) => {
//     e.preventDefault();
//     alert("User submitted successfully!");
//     showUserRegistration();
//   };

//   const submitRoleForm = (e) => {
//     e.preventDefault();
//     const roleName = e.target.roleName.value;
//     if (roleName) {
//       setRoles([...roles, { id: nextRoleId, name: roleName }]);
//       setNextRoleId(nextRoleId + 1);
//       alert("Role added successfully!");
//       showRoleRegistration();
//     }
//   };

//   return (
//     <div className="container-fluid">
//       <div className="row">
//         {/* Sidebar */}
//         <div className="col-md-3 bg-dark text-white sidebar p-3 min-vh-100">
//           <div className="mb-4">
//             <h5>👤 John Doe</h5>
//           </div>
//           <nav className="nav flex-column">
//             <button
//               className="nav-link text-white btn btn-link"
//               onClick={showDashboard}
//             >
//               🏠 Dashboard
//             </button>
//             {/* Registration */}
//             <button
//               className="nav-link text-white btn btn-link"
//               data-bs-toggle="collapse"
//               data-bs-target="#registrationMenu"
//             >
//               🔐 Registration
//             </button>
//             <div className="collapse" id="registrationMenu">
//               <button
//                 className="nav-link text-white btn btn-link ms-3"
//                 onClick={showUserRegistration}
//               >
//                 • User Registration
//               </button>
//               <button
//                 className="nav-link text-white btn btn-link ms-3"
//                 onClick={showRoleRegistration}
//               >
//                 • Role Registration
//               </button>
//             </div>

//             {/* Allocation */}
//             <button
//               className="nav-link text-white btn btn-link"
//               data-bs-toggle="collapse"
//               data-bs-target="#allocationMenu"
//             >
//               📋 Allocation
//             </button>
//             <div className="collapse" id="allocationMenu">
//               <button className="nav-link text-white btn btn-link ms-3">
//                 • Project Allocation
//               </button>
//               <button className="nav-link text-white btn btn-link ms-3">
//                 • Time Allocation
//               </button>
//             </div>
//           </nav>
//         </div>

//         {/* Main Content */}
//         <div className="col-md-9 p-4">
//           {mainContent === "dashboard" && (
//             <>
//               <h3>Dashboard</h3>
//               <p>Welcome to the Dashboard...</p>
//             </>
//           )}

//           {mainContent === "userRegistration" && (
//             <>
//               <div className="d-flex justify-content-between align-items-center mb-3">
//                 <h3>User Registration</h3>
//                 <button
//                   className="btn btn-primary"
//                   onClick={showAddUserForm}
//                 >
//                   ➕ Add New User
//                 </button>
//               </div>
//               <table className="table table-bordered">
//                 <thead className="table-dark">
//                   <tr>
//                     <th>Employee Name</th>
//                     <th>Role</th>
//                     <th>Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td>Alice Johnson</td>
//                     <td>Admin</td>
//                     <td>Active</td>
//                   </tr>
//                   <tr>
//                     <td>Bob Smith</td>
//                     <td>User</td>
//                     <td>Inactive</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </>
//           )}

//           {mainContent === "addUser" && (
//             <>
//               <h3>Add New User</h3>
//               <form onSubmit={submitUserForm}>
//                 <div className="mb-3">
//                   <label className="form-label">Employee Name</label>
//                   <input type="text" className="form-control" required />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Role</label>
//                   <select className="form-select" required>
//                     <option value="">Select Role</option>
//                     <option>Admin</option>
//                     <option>User</option>
//                     <option>Manager</option>
//                   </select>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Status</label>
//                   <select className="form-select" required>
//                     <option value="">Select Status</option>
//                     <option>Active</option>
//                     <option>Inactive</option>
//                   </select>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Permissions</label><br />
//                   <div className="form-check">
//                     <input className="form-check-input" type="checkbox" id="permSave" />
//                     <label className="form-check-label" htmlFor="permSave">Save</label>
//                   </div>
//                   <div className="form-check">
//                     <input className="form-check-input" type="checkbox" id="permUpdate" />
//                     <label className="form-check-label" htmlFor="permUpdate">Update</label>
//                   </div>
//                   <div className="form-check">
//                     <input className="form-check-input" type="checkbox" id="permReject" />
//                     <label className="form-check-label" htmlFor="permReject">Reject</label>
//                   </div>
//                 </div>
//                 <button type="submit" className="btn btn-success">Submit</button>
//                 <button type="button" className="btn btn-secondary ms-2" onClick={showUserRegistration}>Cancel</button>
//               </form>
//             </>
//           )}

//           {mainContent === "roleRegistration" && (
//             <>
//               <div className="d-flex justify-content-between align-items-center mb-3">
//                 <h3>Role Registration</h3>
//                 <button
//                   className="btn btn-primary"
//                   onClick={showAddRoleForm}
//                 >
//                   ➕ Add New Role
//                 </button>
//               </div>
//               <table className="table table-bordered">
//                 <thead className="table-dark">
//                   <tr>
//                     <th>Role ID</th>
//                     <th>Role Name</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {roles.map((role) => (
//                     <tr key={role.id}>
//                       <td>{role.id}</td>
//                       <td>{role.name}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </>
//           )}

//           {mainContent === "addRole" && (
//             <>
//               <h3>Add New Role</h3>
//               <form onSubmit={submitRoleForm}>
//                 <div className="mb-3">
//                   <label className="form-label">Role Name</label>
//                   <input type="text" id="roleName" name="roleName" className="form-control" required />
//                 </div>
//                 <button type="submit" className="btn btn-success">Submit</button>
//                 <button type="button" className="btn btn-secondary ms-2" onClick={showRoleRegistration}>Cancel</button>
//               </form>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

