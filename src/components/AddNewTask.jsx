export const AddNewTask = ({ onCancel, onSubmit, show }) => {
  if (!show) return null; // Only render if `show` is true

  return (
    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content shadow">

          {/* Modal Header */}
          <div className="modal-header">
            <h5 className="modal-title text-center">Add New Task</h5>
            <button type="button" className="btn-close" onClick={onCancel}></button>
          </div>

          {/* Modal Body */}
          <div className="modal-body">
            <form onSubmit={onSubmit}>
                <div className="mb-3 ms-5 me-5">
                <label className="form-label">Empname</label>
                <input type="text" className="form-control shadow" name="userName" id="empName" required />
              </div>
             
              <div className="mb-3 ms-5 me-5">
                <label className="form-label">Project Name</label>
                <select className="form-select shadow" name="roleName" id="projectName" required>
                  <option value="">Select Project</option>
                  <option>E-biz</option>
                  <option>Eagle-Yard</option>
                  <option>Haasu</option>
                </select>
              </div>
               <div className="mb-3 ms-5 me-5">
                <label className="form-label">Task</label>
                <input type="text" className="form-control shadow" name="userName" id="task" required />
              </div>
              <div className="mb-3 ms-5 me-5">
                <label className="form-label">Estimated Hours</label>
      <input type="text" className="form-control shadow" name="estimatedHours" id="estimatedHours" required />
              </div>

           

              {/* Modal Footer Buttons */}
              <div className="modal-footer">
                <button type="submit" className="btn btn-outline-success shadow">Submit</button>
                <button type="button" className="btn btn-outline-danger shadow" onClick={onCancel}>Cancel</button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};
