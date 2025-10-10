import React from "react";

const RoleRegistration = ({ roles, onAdd }) => (
  <>
    <div className="d-flex justify-content-between align-items-center mb-3 p-3 mt-5">
      <h3>Role Registration</h3>
      <button className="btn btn-outline-primary w-90 shadow " data-bs-toggle="modal" data-bs-target="#myModal" onClick={onAdd}><i className="bi bi-plus-circle p-2 "></i> Add New Role</button>
    </div>
    <table className="table table-bordered table-hover shadow">
      <thead className="table-light">
        <tr>
          <th>Role ID</th>
          <th>Role Name</th>
        </tr>
      </thead>
      <tbody>
        {roles.map((role) => (
          <tr key={role.id}>
            <td>{role.id}</td>
            <td>{role.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
);

export default RoleRegistration;
