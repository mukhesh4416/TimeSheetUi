import React, { useEffect, useState } from "react";
import axios from "axios";

function DepartmentRegistration({ onAdd, onEdit }) {
  const [department, setDepartment] = useState([
    { departmentId: null, departmentName: "", createdBy: "" },
  ]);

  useEffect(() => {
    const departmentList = async () => {
      const res = await axios.get(
        `http://10.100.72.140:8080/user/getAllDepartments`
      );
      setDepartment(res.data);
    };
    departmentList();
  }, []);

  const handleClick = async () => {
    const obj = {
      departmentName: department.departmentName,
      createdBy: department.createdBy,
      actionMode: "update",
    };
    const res = await axios.post(
      `http://10.100.72.140:8080/user/saveDepartment`,
      obj
    );
    if (res.data) {
      alert("Data Updated successfully");
    } else {
      alert("unable to update data");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3 p-3 mt-5">
        <h3>Department Registration</h3>
        <button
          className="btn btn-outline-primary w-90 shadow "
          data-bs-toggle="modal"
          data-bs-target="#myModal"
          onClick={onAdd}
        >
          <i className="bi bi-plus-circle p-2 "></i> Add New Department
        </button>
      </div>
      <table className="table table-bordered table-hover shadow">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Department</th>
            <th>Createdby</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {department.map((item) => (
            <tr key={item.departmentId}>
              <td>{item.departmentId}</td>
              <td>{item.departmentName}</td>
              <td>{item.createdBy}</td>
              <td>
                <button onClick={onEdit}>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
export default DepartmentRegistration;
