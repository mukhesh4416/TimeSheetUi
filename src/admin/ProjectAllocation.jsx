import React from "react";

const ProjectAllocation = ({ projects, onAdd }) => (
  <>
    <div className="d-flex justify-content-between align-items-center mb-3 p-3 mt-5">
      <h3>Project Allocation</h3>
      <button className="btn btn-outline-primary w-90 shadow" onClick={onAdd}><i className="bi bi-plus-circle p-2 "></i> Allocate Project</button>
    </div>
    <table className="table table-bordered table-hover shadow">
      <thead className="table-light">
        <tr>
            <th>S.no</th>
          <th>Project Name</th>
          <th>Employee Name</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project) => (
          <tr key={project.id}>
            <td>{project.id}</td>
            <td>{project.name}</td>
             <td>{project.empname}</td>
              <td>{project.start}</td>
               <td>{project.end}</td>
                <td>{project.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
);

export default ProjectAllocation;
