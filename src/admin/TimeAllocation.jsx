import React from "react";

const TimeAllocation = ({
  pendingTimeA,
  completedTimeA,
  nextCompletedTimeA,
  onAdd,
  onAllocatedHoursChange,
  onSubmitAllocation,
}) => {
  return (
    <>
     <h2 className="p-2 ms-4 mt-5">Time Allocations</h2>
      {/* Dashboard Cards */}
      <div className="row p-4 g-4">
        {/* Pending Allocations Card */}
        <div className="col-md-4">
          <div className="card p-3 shadow">
            <h6 className="card-title d-flex align-items-center">
              <i className="bi bi-people text-danger me-2 fs-4"></i>
              Pending Allocations
            </h6>
            <p className="card-text fs-2 fw-bold">{pendingTimeA.length}</p>
          </div>
        </div>

        {/* Completed Allocations Card */}
        <div className="col-md-4">
          <div className="card p-3 shadow">
            <h6 className="card-title d-flex align-items-center">
              <i className="bi bi-list-task text-success me-2 fs-4"></i>
              Completed Allocations
            </h6>
            <p className="card-text fs-2 fw-bold">{completedTimeA.length}</p>
          </div>
        </div>
      </div>

      {/* Pending Allocation Table */}
      <div className="d-flex justify-content-between align-items-center mb-3 p-3">
        <h5 className="ms-4">Pending Allocation</h5>
        <button className="btn btn-outline-primary w-90 shadow" onClick={onAdd}>
          <i className="bi bi-plus-circle p-2 "></i> Allocate Time
        </button>
      </div>
      {pendingTimeA.length > 0 ? (
        <table className="table table-bordered table-hover shadow ms-4">
          <thead className="table-light">
            <tr>
              <th className="d-none">S.no</th>
              <th>Employee Name</th>
              <th>Project Name</th>
              <th>Task</th>
              <th>Estimation Hours</th>
              <th>Allocated Hours</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingTimeA.map((time) => (
              <tr key={time.id}>
                <td className="d-none">{time.id}</td>
                <td>{time.empname}</td>
                <td>{time.projectname}</td>
                <td>{time.task}</td>
                <td>{time.estimatedhours}</td>
                <td>
                  <input
                    type="number"
                    value={time.allocatedhours}
                    onChange={(e) =>
                      onAllocatedHoursChange(time.id, e.target.value)
                    }
                    className="form-control"
                    min="0"
                  />
                </td>
                <td>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => onSubmitAllocation(time.id)}
                  >
                    Submit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-muted p-4 ms-4">No pending allocations.</p>
      )}

      {/* Completed Allocations Table */}
      {completedTimeA.length > 0 && (
        <>
          <h5 className="mt-4 px-3 p-4 ms-4">Completed Allocations</h5>
          <table className="table table-bordered table-hover shadow ms-4">
            <thead className="table-light">
              <tr>
                <th className="d-none">S.no</th>
                <th>Employee Name</th>
                <th>Project Name</th>
                <th>Task</th>
                <th>Estimation Hours</th>
                <th>Allocated Hours</th>
              </tr>
            
            </thead>
            <tbody>
              {completedTimeA.map((time) => (
                <tr key={time.id}>
                  <td className="d-none">{time.id}</td>
                  <td>{time.empname}</td>
                  <td>{time.projectname}</td>
                  <td>{time.task}</td>
                  <td>{time.estimatedhours}</td>
                  <td>{time.allocatedhours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default TimeAllocation;

// import React, { useState } from "react";

// const TimeAllocation = ({ timeA, onAdd, onAllocatedHoursChange }) => {

//   const [submittedRows, setSubmittedRows] = useState(new Set());

//   const handleSubmit = (id) => {
//     setSubmittedRows(new Set(submittedRows).add(id));
//     // Optionally, you could call a prop function here to inform parent of submission
//   }
//   return(
//   <>
//   <h3 className="ms-4 fw-bold">Time Allocations</h3>
//   <div className="row p-4 g-4">
//         {/* Card 1 */}
//         <div className="col-md-4">
//           <div className="card p-3 shadow">
//             <h6 className="card-title d-flex align-items-center">
//               <i className="bi bi-people text-danger me-2 fs-4"></i>
//               Pending Allocations
//             </h6>
//             <p className="card-text fs-2 fw-bold">5</p>
//             {/* <a href={timeA} class="btn btn-outline-danger stretched-link">Clear the pendings Actions</a> */}
//           </div>
//         </div>

//         {/* Card 2 */}
//         <div className="col-md-4">
//           <div className="card p-3 shadow">
//             <h6 className="card-title d-flex align-items-center">
//               <i className="bi bi-list-task text-danger me-2 fs-4"></i>
//               Completed Allocations
//             </h6>
//             <p className="card-text fs-2 fw-bold">10</p>
//             {/* <a href="" class="btn btn-outline-danger stretched-link">Review the completetd Actions</a> */}
//           </div>
//         </div>

        
//       </div>
//  <div className="d-flex justify-content-between align-items-center mb-3 p-3">
//         <h6>Pending Allocation</h6>
//         {/* <button className="btn btn-outline-danger w-90 shadow" onClick={onAdd}>
//           <i className="bi bi-plus-circle p-2 "></i> Allocate Time
//         </button> */}
//       </div>
//       <table className="table table-bordered table-hover shadow">
//         <thead className="table-light">
//           <tr>
//             <th>S.no</th>
//             <th>Employee Name</th>
//             <th>Project Name</th>
//             <th>Task</th>
//             <th>Estimation Hours</th>
//             <th>Allocated Hours</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {timeA.map((time) => {
//             const isSubmitted = submittedRows.has(time.id);
//             return (
//               <tr key={time.id}>
//                 <td>{time.id}</td>
//                 <td>{time.empname}</td>
//                 <td>{time.projectname}</td>
//                 <td>{time.task}</td>
//                 <td>{time.estimatedhours}</td>
//                 <td>
//                   <input
//                     type="number"
//                     value={time.allocatedhours}
//                     onChange={(e) =>
//                       onAllocatedHoursChange(time.id, e.target.value)
//                     }
//                     className="form-control"
//                     min="0"
//                     disabled={isSubmitted}
//                   />
//                 </td>
//                 <td>
//                   {!isSubmitted ? (
//                     <button
//                       className="btn btn-outline-danger shadow btn-sm"
//                       onClick={() => handleSubmit(time.id)}
//                     >
//                       Submit
//                     </button>
//                   ) : (
//                     <span className="text-danger"><i className="bi bi-check-circle ms-3 fs-5"></i></span>
//                   )}
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     {/* <div className="d-flex justify-content-between align-items-center mb-3 p-3">
      
//       <h3>Pending Allocation</h3>
//       <button className="btn btn-outline-danger w-90 shadow" onClick={onAdd}><i className="bi bi-plus-circle p-2 "></i> Allocate Time</button>
//     </div>
//     <table className="table table-bordered table-hover shadow">
//       <thead className="table-light">
//         <tr>
//             <th>S.no</th>
//             <th>Employee Name</th>
//           <th>Project Name</th>
//           <th>Task</th>
//           <th>Estimation Hours</th>
//           <th>Allocated Hours</th>
//         </tr>
//       </thead>
//       <tbody>
//         {timeA.map((time) => (
//           <tr key={time.id}>
//             <td>{time.id}</td>
//             <td>{time.empname}</td>
//              <td>{time.projectname}</td>
//               <td>{time.task}</td>
//                <td className="editable-cell">{time.estimatedhours}</td>
//                 <td>{time.allocatedhours}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table> */}

//     <div className="d-flex justify-content-between align-items-center mb-3 p-3">
//       <h6>Completed Allocations</h6>
//       {/* <button className="btn btn-outline-danger w-90 shadow" onClick={onAdd}>
//         <i className="bi bi-plus-circle p-2 "></i> Allocate Time
//       </button> */}
//     </div>
//     <table className="table table-bordered table-hover shadow">
//       <thead className="table-light">
//         <tr>
//           <th>S.no</th>
//           <th>Employee Name</th>
//           <th>Project Name</th>
//           <th>Task</th>
//           <th>Estimation Hours</th>
//           <th>Allocated Hours</th>
//         </tr>
//          <tr>
//           <td>1</td>
//           <td>Kavya</td>
//           <td>Time Tracker</td>
//           <td>UI</td>
//           <td>10</td>
//           <td>9</td>
//         </tr>
//         <tr>
//           <td>2</td>
//           <td>Vaishu</td>
//           <td>Time Tracker</td>
//           <td>Testing</td>
//           <td>5</td>
//           <td>4</td>
//         </tr>
//       </thead>
//       {/* <tbody>
//         {timeA.map((time) => (
//           <tr key={time.id}>
//             <td>{time.id}</td>
//             <td>{time.empname}</td>
//             <td>{time.projectname}</td>
//             <td>{time.task}</td>
//             <td>{time.estimatedhours}</td>
//             <td>{time.allocatedhours}
//             </td>
//           </tr>
//         ))}
//       </tbody> */}
//     </table>
//   </>
// );
// }

// export default TimeAllocation;
