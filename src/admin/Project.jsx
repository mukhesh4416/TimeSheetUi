import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { TypeH1 } from "react-bootstrap-icons";
import { baseUrl } from "../shared/global";

function Project() {
  const [projectList, setProjectList] = useState([]);
  const [editFlag, setEditFlag] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleClick = async (projectList) => {

  //  formik.formReset();
    formik.setValues({
      id: projectList?.projectId,
      project: projectList?.projectName,
    });
    setEditFlag(true);
    setShowModal(true);
  };



  const handleDelete = async (ad) => {
    const res = await axios.delete(
      `http://10.100.72.140:8080/user/globalDelete?actionMode=${"Project"}&id=${ad.departmentId}`
    );

    projectList();
      
  };

  const formik = useFormik({
    initialValues: {
      id: "",
      project: "",
    },
    onSubmit: (values) => {
      saveProject(values);
    },
  });

  const saveProject = async (values) => {
    const obj = {
      projectName: values.project,
      createdBy: values.createdBy,
      actionMode: editFlag ? "update" : "insert",
      projectId: values.id,
    };
    const res = await axios.post(
      baseUrl+`user/saveProject`,obj);
    if (res.data) {
      getprojectList();
      setShowModal(false);
      alert(`Data ${editFlag ? "Updated" : "Saved"} successfully`);
    } else {
      alert("unable to add data");
    }
  };

  const addProject = () => {
    setShowModal(true);
  };
  const getprojectList = async () => {
    const res = await axios.get(
      baseUrl + `user/getAllProjects`
    );
    setProjectList(res.data);
  };

  useEffect(() => {
    getprojectList();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3 p-3 mt-5">
        <h3>Project Registration</h3>
        <button
          className="btn btn-outline-primary w-90 shadow "
          data-bs-toggle="modal"
          data-bs-target="#myModal"
          onClick={()=>addProject()}
        >
          <i className="bi bi-plus-circle p-2 "></i> Add New Project
        </button>
      </div>
      <table className="table table-bordered table-hover shadow">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Project</th>
            <th>Createdby</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {projectList.map((project) => (
            <tr key={project.projectId}>
              <td>{project.projectId}</td>
              <td>{project.projectName}</td>
              <td>{project.createdBy}</td>
              <td>
                <button onClick={() => handleClick(project)}>Edit</button>
                <button onClick={() => handleDelete(project)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    <div>
        {/* <div>{showModal && <h1>tttt</h1>}</div> */}
        {showModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content shadow">
              <div className="modal-header">
                <h3 className="p-3">Add New Project</h3>
              </div>
              <div className="modal-body">
                <form onSubmit={formik.handleSubmit}>
               
                  <div className="mb-3 p-3">
                    <label className="form-label ">Project</label>
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
                    onClick={()=>{setShowModal(false)}}
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

export default Project;
