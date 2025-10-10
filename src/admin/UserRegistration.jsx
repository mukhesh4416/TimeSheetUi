import React from "react";

const UserRegistration = ({ onAdd, users }) => (
  <>
    <div className="d-flex justify-content-between align-items-center mb-3 p-3 mt-5">
      <h3>User Registration</h3>
      <button className="btn btn-outline-primary shadow" onClick={onAdd}>
        <i className="bi bi-plus-circle p-2"></i> Add New User
      </button>
    </div>

    <table className="table table-bordered shadow table-hover">
      <thead className="table-light">
        <tr>
          <th>S.No</th>
          <th>Emp Code</th>
          <th>Profile Name</th>
          <th>Email Id</th>
          <th>Designation</th>
          <th>Role</th>
          <th>Username</th>
          <th>Password</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(users) && users.length > 0 ? (
          users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.empcode}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.designation}</td>
              <td>{user.role}</td>
              <td>{user.username}</td>
              <td>{user.password}</td>
              <td>{user.status}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center text-muted">No users found</td>
          </tr>
        )}
      </tbody>
    </table>
  </>
);

export default UserRegistration;


// import React from "react";

// const UserRegistration = ({ onAdd,users }) => (
//   <>
//     <div className="d-flex justify-content-between align-items-center mb-3 p-3">
//       <h3>User Registration</h3>
//       <button className="btn btn-outline-danger shadow" onClick={onAdd}><i className="bi bi-plus-circle p-2 "></i> Add New User</button>
//     </div>
//     <table className="table table-bordered shadow table-hover">
//       <thead className="table-light">
//         <tr>
//           <th>S.No</th>
//           <th>Employee Name</th>
//           <th>Role</th>
//           <th>Status</th>
//         </tr>
//       </thead>
//       {/* <tbody>
//         <tr>
//           <td>Alice Johnson</td>
//           <td>Admin</td>
//           <td>Active</td>
//         </tr>
//         <tr>
//           <td>Bob Smith</td>
//           <td>User</td>
//           <td>Inactive</td>
//         </tr>
//       </tbody> */}
//       <tbody>
//         {users.map((user) => (
//           <tr key={user.id}>
//             <td>{user.id}</td>
//             <td>{user.name}</td>
//             <td>{user.role}</td>
//             <td>{user.status}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </>
// );

// export default UserRegistration;
