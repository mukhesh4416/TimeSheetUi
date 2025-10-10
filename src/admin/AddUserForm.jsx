import React from "react";
import './AddUserForm.css';

export const AddUserForm = ({ onCancel, onSubmit, show,roles,designations }) => {
  if (!show) return null; // Only render if `show` is true

  return (
    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content shadow">

          {/* Modal Header */}
          <div className="modal-header">
            <h5 className="modal-title text-center">Add New User</h5>
            {/* <button type="button" className="btn-close" onClick={onCancel}></button> */}
          </div>

          {/* Modal Body */}
          <div className="modal-body">
            <form onSubmit={onSubmit}>
              <div className="mb-3 ms-5 me-5">
                <label className="form-label">Employee Code</label>
                <input type="text" className="form-control shadow" name="empcode" id="empcode" required />
              </div>
              <div className="mb-3 ms-5 me-5">
                <label className="form-label">Employee Name</label>
                <input type="text" className="form-control shadow" name="userName" id="userName" required />
              </div>
               <div className="mb-3 ms-5 me-5">
                <label className="form-label">Email Id</label>
                <input type="text" className="form-control shadow" name="email" id="email" required />
              </div>
              <div className="mb-3 ms-5 me-5">
                <label className="form-label">Designation</label>
                <select className="form-select shadow" name="designation" id="designation" required>
                  <option value="">Select Designation</option>

                  {
                    designations.map((designation)=>(
                      <option key={designation.id}>{designation.designation}</option>
                    ))
                  }
                  {/* <option>Admin</option>
                  <option>User</option>
                  <option>Manager</option> */}
                </select>
              </div>
              <div className="mb-3 ms-5 me-5">
                <label className="form-label">Role</label>
                <select className="form-select shadow" name="roleName" id="roleName" required>
                  <option value="">Select Role</option>

                  {
                    roles.map((role)=>(
                      <option key={role.id}>{role.name}</option>
                    ))
                  }
                  {/* <option>Admin</option>
                  <option>User</option>
                  <option>Manager</option> */}
                </select>
              </div>
               <div className="mb-3 ms-5 me-5">
                <label className="form-label">User Name</label>
                <input type="text" className="form-control shadow" name="username" id="username" required />
              </div>
               <div className="mb-3 ms-5 me-5">
                <label className="form-label">Password</label>
                <input type="text" className="form-control shadow" name="password" id="password" required />
              </div>
              <div className="mb-3 ms-5 me-5">
                <label className="form-label">Status</label>
                <select className="form-select shadow" name="status" required>
                  <option value="">Select Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>

              {/* <div className="mb-5 me-3 ms-5 me-5">
                <label className="form-label d-flex mb-3">Permissions</label>

                <div className="form-check d-flex align-items-center mb-3">
                  <input className="form-check-input me-2 shadow" type="checkbox" id="permSave" name="permissions" value="Save" />
                  <label className="form-check-label" htmlFor="permSave">Save</label>
                </div>

                <div className="form-check d-flex align-items-center mb-3">
                  <input className="form-check-input me-2 shadow" type="checkbox" id="permUpdate" name="permissions" value="Update" />
                  <label className="form-check-label" htmlFor="permUpdate">Update</label>
                </div>

                <div className="form-check custom-checkbox">
                  <input className="form-check-input shadow" type="checkbox" id="permReject" name="permissions" value="Reject" />
                  <label className="form-check-label" htmlFor="permReject">Reject</label>
                </div>
              </div> */}

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




// import React from "react";
// import './AddUserForm.css';

// export const AddUserForm = ({ onCancel, onSubmit }) => {
//   return (
//     <>
//     <h3 className="p-1">Add New User</h3>
//     <div className=" align-items-center">
      
//       <form onSubmit={onSubmit}>
//         <div className="mb-3 ">
//           <label className="form-label">Employee Name</label>
//           <input type="text" className="form-control shadow " required />
//         </div>
//         <div className="mb-3 ">
//           <label className="form-label">Role</label>
//           <select className="form-select shadow " required>
//             <option value="">Select Role</option>
//             <option>Admin</option>
//             <option>User</option>
//             <option>Manager</option>
//           </select>
//         </div>
//         <div className="mb-3 ">
//           <label className="form-label">Status</label>
//           <select className="form-select shadow " required>
//             <option value="">Select Status</option>
//             <option>Active</option>
//             <option>Inactive</option>
//           </select>
//         </div>
//         {/* <div className="d-flex mb-5 me-3">
//           <label className="form-label d-block mb-2">Permissions</label><br />
//           <div className="form-check mb-3">
//             <input className="form-check-input me-2 " type="checkbox" id="permSave" />
//             <label className="form-check-label " htmlFor="permSave">Save</label>
//           </div>
//           <div className="form-check mb-3">
//             <input className="form-check-input me-2" type="checkbox" id="permUpdate" />
//             <label className="form-check-label" htmlFor="permUpdate">Update</label>
//           </div>
//           <div className="form-check">
//             <input className="form-check-input" type="checkbox" id="permReject" />
//             <label className="form-check-label" htmlFor="permReject">Reject</label>
//           </div>
//         </div> */}
//         <div className="mb-5 me-3">
//   <label className="form-label d-flex mb-3">Permissions</label>

//   <div className="form-check d-flex align-items-center mb-3">
//     <input className="form-check-input me-2 shadow " type="checkbox" id="permSave" />
//     <label className="form-check-label" htmlFor="permSave">
//       Save
//     </label>
//   </div>

//   <div className="form-check d-flex align-items-center mb-3">
//     <input className="form-check-input me-2 shadow shadow " type="checkbox" id="permUpdate" />
//     <label className="form-check-label" htmlFor="permUpdate">
//       Update
//     </label>
//   </div>

//   <div className="form-check custom-checkbox">
//     <input className="form-check-input shadow " type="checkbox" id="permReject" />
//     <label className="form-check-label" htmlFor="permReject">
//       Reject
//     </label>
//   </div>
// </div>
//         <button type="submit" className="btn btn-outline-success shadow">Submit</button>
//         <button type="button" className="btn btn-outline-danger ms-2 shadow" onClick={onCancel}>Cancel</button>
//       </form>
//     </div>
//     </>
//   );
// };

