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
import Project from "./Project";

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
         case "project":
        return <Project  />;
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

