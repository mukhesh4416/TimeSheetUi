import React from "react";
import { useFormik } from "formik";
import axios from "axios";

const baseUrl = "http://10.100.72.140:8080/";

export const AddDepartmentForm = ({ onCancel,show }) =>{


  const formik = useFormik(


    {
      initialValues:{
        id:'',
        department:'',
        creadtedBy:'',
      },
      onSubmit: values => {
        addDepartment(values)
      }
    }
  )


   const addDepartment = async(values)=>{


    const obj = {
  "departmentName": values.department,
  "createdBy": values.createdBy,
  "actionMode": "insert"
}
        const res = await axios.post(`http://10.100.72.140:8080/user/saveDepartment`,obj)
        if(res.data){

            alert("Data added successfully");

        }else{

            alert("unable to add data");

        }
  }

if (!show) return null;



return(
  <>
   <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content shadow">
          <div className="modal-header">
             <h3 className="p-3">Add New Department</h3>
          </div>
   <div className="modal-body">
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-3 p-3">
        <label className="form-label ">Id</label>
        <input type="text" id="id" name="id" className="form-control shadow " onChange={formik.handleChange} required />
      </div>
      <div className="mb-3 p-3">
        <label className="form-label ">Department</label>
        <input type="text" id="department" name="department" className="form-control shadow " onChange={formik.handleChange} required />
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


