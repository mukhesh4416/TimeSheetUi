import React from "react";

export const AddRoleForm = ({ onSubmit, onCancel,show }) =>{
if (!show) return null;
return(
  <>
   <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content shadow">
          <div className="modal-header">
             <h3 className="p-3">Add New Role</h3>
          </div>
   <div className="modal-body">
    <form onSubmit={onSubmit}>
      <div className="mb-3 p-3">
        <label className="form-label ">Role Name</label>
        <input type="text" id="roleName" name="roleName" className="form-control shadow " required />
      </div>
      
      <div className="modal-footer">
      <button type="submit" className="btn btn-outline-success ms-3 shadow ">Submit</button>
      <button type="button" className="btn btn-outline-danger ms-2 shadow "  onClick={onCancel}>Cancel</button>
      </div>
    </form>
    </div>

    </div>
    </div>
    </div>
  </>
);
}


