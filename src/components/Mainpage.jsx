import { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import TaskEstimation from './TaskEstimation';
import { AddNewTask } from './AddNewTask';
import Allocations from './Allocations';
import FinalSubmission from './FinalSubmission';
import Header from './Header';
import Timesheet from './Timesheet';
function Mainpage() {
const [mainContent, setMainContent] = useState("dashboard");

const [tasks, setTasks] = useState([
    { id: 1, empname: "kavya",projectname:"E-biz",task:"UI",estimatedhours:10,status:"Pending" },
  ]);

  const [nextTaskId, setNextTaskId] = useState(2);

  const [showUserModal, setShowUserModal] = useState(false);


  const submitTask = (e) => {
    e.preventDefault();
    const empName = e.target.empName.value;
    const projectName = e.target.projectName.value;
    const task = e.target.task.value;
    const estimatedHours = e.target.estimatedHours.value;
   const status = "pending";

    if (tasks) {
      setTasks([...tasks, { id: nextTaskId, empname: empName, projectname:projectName,task:task,estimatedhours:estimatedHours,status:status}]);
      setNextTaskId(nextTaskId + 1);
      alert("Task added successfully!");
      setMainContent("taskestimation");
    }
  };


const renderContent = () => {
    switch (mainContent) {
      case "dashboard":
        return <Dashboard />;
      case "taskestimation":
        return <TaskEstimation tasks={tasks} onAdd={() => setMainContent("addTask")}/>;
        case "addTask":
      return <AddNewTask show={true} onCancel={() => {setShowUserModal(false); setMainContent("taskestimation")}} onSubmit={submitTask} />;
      case "allocations":
        return <Allocations />;
         case "finalsubmission":
        return <FinalSubmission />
        case "timesheet":
          return <Timesheet/>

         default:
        return <Dashboard />;
    }
  };


  return (   
    <> 
    
<div className="container-fluid bg-light pt-5">
      <div className="row">
        <Sidebar onNavigate={setMainContent}/>
         <div className="col-md-10 p-4 bg-white ">{renderContent()}</div>
      </div>
    </div>
    </> 
  );
}

export default Mainpage
