import React from "react";

export const ProjectAllocationForm = ({ onSubmit, onCancel }) =>{

return(
  <>
  <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content shadow">
          <div className="modal-header">
    <h3 className="modal-title p-3">Allocate Project</h3>
    </div>
    <div className="modal-body">
    <form onSubmit={onSubmit}>
        <div className="mb-3">
        <label className="form-label" hidden>S.no</label>
        <input type="text" id="id" name="id" className="form-control" hidden/>
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
      <div className="mb-3 ">
        <label className="form-label">Start</label>
        <input type="date" id="projectStart" name="projectStart" className="form-control shadow " required />
      </div>
      <div className="mb-3">
        <label className="form-label">End</label>
        <input type="date" id="projectEnd" name="projectEnd" className="form-control shadow " />
      </div>
      <div className="mb-5 ">
        <label className="form-label">Status</label>
        {/* <input type="text" id="projectStatus" name="projectStatus" className="form-control" required /> */}
        <select className="form-select shadow  " id="projectStatus" name="projectStatus" required>
            <option value="" id="projectStatus">Select Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
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


