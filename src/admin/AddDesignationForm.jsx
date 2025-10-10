import React from "react";
import { useFormik } from "formik";
import axios from "axios";

const baseUrl = "http://10.100.72.140:8080/";

export const AddDesignationForm = ({ onCancel,show }) =>{


  const formik = useFormik(


    {
      initialValues:{
        id:'',
        designation:'',
        createdBy:'',
      },
      onSubmit: (values) => {
        addDesignation(values);
        formik.resetForm();

      }
    }
  )


   const addDesignation = async(values)=>{

const obj = {
  "designationName": values.designation,
  "createdBy": values.createdBy,
  "actionMode": "insert"
}
    
        const res = await axios.post(`http://10.100.72.140:8080/user/saveDesignation`,obj)
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
             <h3 className="p-3">Add New Designation</h3>
          </div>
   <div className="modal-body">
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-3 p-3">
        <label className="form-label ">Id</label>
        <input type="text" id="id" name="id" className="form-control shadow " onChange={formik.handleChange} required />
      </div>
      <div className="mb-3 p-3">
        <label className="form-label ">Designation</label>
        <input type="text" id="designation" name="designation" className="form-control shadow " onChange={formik.handleChange} required />
      </div>
      <div className="mb-3 p-3">
        <label className="form-label ">CreatedBy</label>
        <input type="text" id="createdby" name="createdBy" className="form-control shadow " onChange={formik.handleChange} required />
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


