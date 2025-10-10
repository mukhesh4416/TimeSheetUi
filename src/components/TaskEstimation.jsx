
import React from "react";
function  TaskEstimation({tasks,onAdd}){
    return(
        <>
  {/* <div className="d-flex justify-content-between align-items-center ms-4">
      <h4 className=" ms-4 fw-bold mt-5">Task Estimations</h4>
      
      
    </div> */}

      <div className="row p-4 g-4">
      
    
    <div className="d-flex justify-content-between align-items-center mb-1 p-2">
 <h4 className="ms-3 fw-bold"> Task Estimations</h4>
 <button className="btn btn-outline-primary w-90 shadow " data-bs-toggle="modal" data-bs-target="#myModal" onClick={onAdd}><i className="bi bi-plus-circle p-2 "></i> Add New Task</button>
    </div>
         
          <table className="table table-bordered table-hover shadow ms-4">
            <thead className="table-light">
              <tr>
                <th className="d-none">S.no</th>
                <th>ID</th>
                <th>Emp Name</th>
                <th>Project Name</th>
                <th>Task</th>
                <th>Estimation Hours</th>
                <th>Status</th>
              </tr>
            
            </thead>
           <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.id}</td>
            <td>{task.empname}</td>
             <td>{task.projectname}</td>
              <td>{task.task}</td>
               <td>{task.estimatedhours}</td>
                <td className="text-danger">{task.status}</td>
          </tr>
        ))}
      </tbody>
          </table>

           {/* <h5 className="mt-4 px-3 p-4 ms-4"> Approved Tasks</h5>
          <table className="table table-bordered table-hover shadow ms-4">
            <thead className="table-light">
              <tr>
                <th className="d-none">S.no</th>
                <th>Employee Name</th>
                <th>Project Name</th>
                <th>Task</th>
                <th>Estimation Hours</th>
                <th>Allocated Hours</th>
                <th>Status</th>
                
              </tr>
            
            </thead>
            <tbody>
                <tr>
                <td className="d-none">1</td>
                <td>kavya</td>
                <td>E-biz</td>
                <td>Buggs fix</td>
                <td>5</td>
                <td>3</td>
                <td className="text-success">Approved</td>
                
              </tr>
          
            </tbody>
          </table> */}
        </div>
</>
);
}
export default TaskEstimation;