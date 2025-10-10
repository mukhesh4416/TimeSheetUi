
import React from "react";
function  Dashboard(){

const data = [{sno:1,name:'kavya',project:"eagle yard", task:"employee dashboard",estimatedhours:5,allocatedhours:4,status:'Completed'},
  {sno:2, name:'kavya', project:"eagle yard", task:"UI",estimatedhours:8,allocatedhours:7,status:'Completed'},
  {sno:3, name:'kavya',project:"eagle yard", task:"Reports",estimatedhours:9,allocatedhours:8,status:'Completed'}
];


const pendingdata = [{sno:1,name:'kavya',project:"eagle yard", task:"Unit Testing",estimatedhours:10,allocatedhours:7,status:'Pending'},
  {sno:2, name:'kavya', project:"eagle yard", task:"Bug fixing",estimatedhours:9,allocatedhours:6,status:'Pending'},
  {sno:3, name:'kavya',project:"eagle yard", task:"Admin dashboard",estimatedhours:12,allocatedhours:10,status:'Pending'}
];

const pendingrowcount = pendingdata.length;
const rowcount= data.length;
const totalcount = pendingrowcount + rowcount;
console.log(totalcount);
    return(
  <div className="dashboard">
    <center>
       {/* <div className="pt-3 p-3 flex justify-content-between">
      <h1 className="lead text-start fw-bold ps-5 fs-3">Dashboard</h1>
     
        <button className="btn btn-outline-danger w-90 p-2 position-absolute top-0 end-1 m-4 float-end"><i class="bi bi-box-arrow-right p-2"></i>New Project</button>
      </div> */}
      <div className="d-flex justify-content-between align-items-center mb-3 ms-4">
      <h4 className="  ms-4 fw-bold mt-5">Dashboard</h4>
      {/* <button className="btn btn-outline-danger me-4 shadow"><i className="bi bi-plus-circle p-2 "></i>Add New Project</button> */}
    </div>

      {/* Apply gap to the row only */}
      <div className="row p-4 g-4">
        {/* Card 1 */}
        <div className="col-md-4">
          <div className="card p-3 shadow ms-2">
            <h6 className="card-title d-flex align-items-center">
              <i className="bi bi-people text-primary me-2 fs-4"></i>
              Total Tasks
            </h6>
            <p className="card-text fs-2 fw-bold">{totalcount}</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="col-md-4">
          <div className="card p-3 shadow">
            <h6 className="card-title d-flex align-items-center">
              <i className="bi bi-list-task text-success me-2 fs-4"></i>
              Completed Tasks
            </h6>
            <p className="card-text fs-2 fw-bold">{rowcount}</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="col-md-4">
          <div className="card p-3 shadow">
            <h6 className="card-title d-flex align-items-center">
              <i className="bi bi-clock text-warning me-2 fs-4"></i>
              Pending Tasks
            </h6>
            <p className="card-text fs-2 fw-bold">{pendingrowcount}</p>
          </div>
        </div>
      </div>
      {/*Table display*/}
      <div className="ms-4 me-4 mt-1 ">
  <h5 className="mt-4 px-3 p-4 text-start">Pending Tasks</h5>

  <table className="table table-hover table-bordered shadow me-2">
    <thead>
      <tr>
        <th>S.no</th>
        
        <th>Project</th>
        <th>Task</th>
        <th>Estimated Hours</th>
         <th>Allocated Hours</th>
         <th>Status</th>
      </tr>
    </thead>
    <tbody>
     {pendingdata.map((item)=>(
    <tr key={item.sno}>
     <td>{item.sno}</td>
          <td>{item.project}</td>
          <td>{item.task}</td>
          <td>{item.estimatedhours}</td>
          <td>{item.allocatedhours}</td>
          <td className="text-danger">{item.status}</td> 
    </tr>))}
    </tbody>
  </table>
  </div>

  <div className="ms-4 me-4 mt-1 rounded-3 ">
  <h5 className="mt-4 px-3 p-4 text-start">Completed Tasks</h5>

   <table className="table table-hover table-bordered shadow rounded-3 ">
    <thead>
      <tr>
        <th>S.no</th>
        
        <th>Project</th>
        <th>Task</th>
        <th>Estimated Hours</th>
         <th>Allocated Hours</th>
         <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {data.map((item)=>(
        <tr key={item.sno}>
          <td>{item.sno}</td>
          <td>{item.project}</td>
          <td>{item.task}</td>
          <td>{item.estimatedhours}</td>
          <td>{item.allocatedhours}</td>
          <td className="text-success">{item.status}</td>
        </tr>
    )  )}
    </tbody>

  </table>

  
  </div>

  
    </center>
  </div>
);
}
export default Dashboard;