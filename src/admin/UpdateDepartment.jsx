import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useState, useEffect } from "react";

const baseUrl = "http://10.100.72.140:8080/";

export const UpdateDepartmentForm = ({ onCancel, show }) => {
  const [department, setDepartment] = useState([
    { departmentId: null, departmentName: "", createdBy: "" },
  ]);

  useEffect(() => {
    const departmentList = async () => {
      const res = await axios.get(
        `http://10.100.72.140:8080/user/getAllDepartments`
      );
      console.log(res.data);

      formik.setValues(res.data);
    };
    departmentList();
  }, []);

  const formik = useFormik({
    initialValues: {
      id: "",
      department: "",
      createdBy: "",
    },
    onSubmit: (values) => {
      updateDepartment(values);
    },
  });

  const updateDepartment = async (values) => {
    const obj = {
      departmentName: values.department,
      createdBy: values.createdBy,
      actionMode: "update",
    };
    const res = await axios.post(
      `http://10.100.72.140:8080/user/saveDepartment`,
      obj
    );
    if (res.data) {
      alert("Data updated successfully");
    } else {
      alert("unable to update data");
    }
  };

  if (!show) return null;

  return (
    <>
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
                    value={formik.values.id}
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
                    value={formik.values.department}
                    required
                  />
                </div>

                <div className="mb-3 p-3">
                  <label className="form-label ">Created</label>
                  <input
                    type="text"
                    id="createdBy"
                    name="createdBy"
                    className="form-control shadow "
                    onChange={formik.handleChange}
                    value={formik.values.createdBy}
                    required
                  />
                </div>

                <div className="modal-footer">
                  <button
                    type="submit"
                    className="btn btn-outline-success ms-3 shadow "
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger ms-2 shadow "
                    onClick={onCancel}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
