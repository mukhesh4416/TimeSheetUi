import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";

function Department() {
  const [department, setDepartment] = useState([]);
  const [editFlag, setEditFlag] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleClick = async (department) => {
    formik.setValues({
      id: department?.departmentId,
      department: department?.departmentName,
    });
  //  formik.formReset();
    setEditFlag(true);
    setShowModal(true);
  };

  const formik = useFormik({
    initialValues: {
      id: "",
      department: "",
    },
    onSubmit: (values) => {
      saveDepartment(values);
    },
  });

  const saveDepartment = async (values) => {
    const obj = {
      departmentName: values.department,
      createdBy: values.createdBy,
      actionMode: editFlag ? "update" : "insert",
      departmentId: values.id,
    };
    const res = await axios.post(
      `http://10.100.72.140:8080/user/saveDepartment`,
      obj
    );
    if (res.data) {
      departmentList();
      setShowModal(false);
      alert(`Data ${editFlag ? "Updated" : "Saved"} successfully`);
    } else {
      alert("unable to add data");
    }
  };

  const addDepartment = () => {
    // formik.formReset();
    setShowModal(true);
  };
  const departmentList = async () => {
    const res = await axios.get(
      `http://10.100.72.140:8080/user/getAllDepartments`
    );
    setDepartment(res.data);
  };

  useEffect(() => {
    departmentList();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3 p-3 mt-5">
        <h3>Department Registration</h3>
        <button
          className="btn btn-outline-primary w-90 shadow "
          data-bs-toggle="modal"
          data-bs-target="#myModal"
          onClick={()=>addDepartment()}
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
                <button onClick={() => handleClick(item)}>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    <div>
        {showModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content shadow">
              <div className="modal-header">
                <h3 className="p-3">Add New Department</h3>
              </div>
              <div className="modal-body">
                <form onSubmit={formik.handleSubmit}>
                  <div className="mb-3 p-3">
                    <label className="form-label ">Id</label>
                    <input
                      type="text"
                      id="id"
                      name="id"
                      className="form-control shadow "
                      onChange={formik.handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3 p-3">
                    <label className="form-label ">Department</label>
                    <input
                      type="text"
                      id="department"
                      name="department"
                      className="form-control shadow "
                      onChange={formik.handleChange}
                      required
                    />
                  </div>

                  <div className="modal-footer">
                    <button
                      type="submit"
                      className="btn btn-outline-success ms-3 shadow "
                    >
                      {editFlag ? "Update" : "Save"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger ms-2 shadow "
                      onClick={addDepartment}
                    //   onClick={()=>{setShowModal(false)}}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

export default Department;
