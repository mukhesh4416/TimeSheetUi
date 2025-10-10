import React, { useEffect, useState } from "react";
import axios from 'axios';



function DesignationReg ({ designations, onAdd }){

const [desig,setDesignations]=useState([{designationId:null,designationName:"",createdBy:""}])

    useEffect(()=>{
const designationList = async()=>{
        const res = await axios.get(`http://10.100.72.140:8080/user/getAllDesignations`);
        console.log(res.data);
        
       setDesignations(res.data);
  }
  designationList(); 
},[]

);
   
    return(

  <>
    <div className="d-flex justify-content-between align-items-center mb-3 p-3 mt-5">
      <h3>Designation Registration</h3>
      <button className="btn btn-outline-primary w-90 shadow " data-bs-toggle="modal" data-bs-target="#myModal" onClick={onAdd}><i className="bi bi-plus-circle p-2 "></i> Add New Designation</button>
    </div>
    <table className="table table-bordered table-hover shadow">
      <thead className="table-light">
        <tr>
          <th>ID</th>
          <th>Designation</th>
          <th>Createdby</th>
        </tr>
      </thead>
      <tbody>
        {desig.map((designation) => (
          <tr key={designation.designationId}>
            <td>{designation.designationId}</td>
            <td>{designation.designationName}</td>
            <td>{designation.createdBy}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
)
}
export default DesignationReg;
