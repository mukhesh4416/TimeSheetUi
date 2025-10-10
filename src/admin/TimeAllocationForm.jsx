import React from "react";

export const TimeAllocationForm = ({ onSubmit, onCancel }) =>{

return(
  <>
   <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content shadow">
  <div className="modal-header">
    <h3 className="p-3">Allocate Time</h3>
    </div>
    <div className="modal-body">
    <form onSubmit={onSubmit}>
        <div className="mb-3">
        <label className="form-label" hidden>S.no</label>
        <input type="text" id="id" name="id" className="form-control" hidden/>
      </div>
      <div className="mb-3">
        <label className="form-label">Employee Name</label>
        {/* <input type="text" id="empName" name="empName" className="form-control" required /> */}
         <select className="form-select shadow " id="empName" name="empName" required>
            <option value="" id="empName">Select Employee</option>
            <option>Kavya</option>
            <option>vaishnavi</option>
            <option>Meghana</option>
            <option>Sandhya</option>
            <option>Pavani</option>
            <option>Indhu</option>
          </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Project Name</label>
        {/* <input type="text" id="projectName" name="projectName" className="form-control" required /> */}
          <select className="form-select shadow  " id="projectName" name="projectName" required>
            <option value="" id="projectName">Select Project</option>
            <option>Timetracker</option>
            <option>kulaa</option>
            <option>e-biz</option>
            <option>Eagle-Yard</option>
            <option>Haasu</option>
            <option>Kitaab</option>
          </select>
      </div>
      
      <div className="mb-3 ">
        <label className="form-label">Task</label>
        <input type="text" id="task" name="task" className="form-control shadow " required />
      </div>
      <div className="mb-3">
        <label className="form-label">Estimated hours</label>
        <input type="text" id="estimatedHours" name="estimatedHours" className="form-control shadow " />
      </div>
      <div className="mb-5 ">
        <label className="form-label">Allocated Hours</label>
         <input type="text" id="allocatedHours" name="allocatedHours" className="form-control" required />
        {/* <select className="form-select shadow  " id="allocatedHours" name="allocatedHours" required>
            <option value="" id="allocatedHours">Select Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select> */}
      </div>
      <div className="modal-footer">
      <button type="submit" className="btn btn-outline-success ms-3  shadow ">Submit</button>
      <button type="button" className="btn btn-outline-danger ms-2 shadow " onClick={onCancel}>Cancel</button>
      </div>
    </form>
    </div>
    </div>
    </div>
    </div>
  </>
);
}


