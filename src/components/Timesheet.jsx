import { useState } from "react";

function Timesheet(){

    const [rows,setRows]=useState([]);
    const [input,setInput] = useState([{date: '',
        project: '',
        task: '',
        description: '',
        starttime: '',
        endtime: '',
        hours: '',}]);


 const addRow = () => {
    setRows([
      ...rows,
      {
        date: '',
        project: '',
        task: '',
        description: '',
        starttime: '',
        endtime: '',
        hours: '',
      },
    ]);
  };
  console.log(rows);
 const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  console.log(input);

    return(
        <>
        <h4>Timesheet</h4>

        <table className="ms-0 table table-bordered shadow width-max mb-5">
            <thead>
                <tr>
                <th>Date</th>
                 <th>Project</th>
                  <th>Task</th>
                   <th>Description</th>
                    <th>Start Time</th>
                     <th>End Time</th>
                      <th>Total hours worked</th>
                      </tr>
            </thead>
            <tbody>

              {rows.map((row)=>(
                <tr key={row.index}>
                  <td><input type="date" name="date" onChange={handleChange}></input></td>
                  <td><select><option>ebiz</option>
                  <option>ebiz</option>
                  <option>eagle yard</option>
                  <option>Haasu</option>
                  </select></td>
                  <td><input type="text" name="task"  onChange={handleChange}/></td>
                   <td><input type="text" name="description"  onChange={handleChange} /></td>
                    <td><input type="time" name="starttime"  onChange={handleChange} /></td>
                     <td><input type="time" name="endtime" onChange={handleChange}/></td>
                      <td><input type="text" name="hours" onChange={handleChange}/></td>
                </tr>
              ))}
            {/* <tr>
          <td>  <input type="date"></input></td>
            
          <td>  <select className="form-select">

               <option>Eagle yard</option> 
               <option>E biz</option>
               <option>Haasu</option>
            </select></td>
            
           <td> <input type="text" className="form-control"></input></td>
           <td> <input type="text" className="form-control time-input"></input></td>
           <td> <input type="text" className="form-control time-input"></input></td>
           <td> <input type="text" className="form-control"></input></td>
           <td> <input type="text" className="form-control"></input></td>
            
            </tr> */}
            </tbody>
        </table>
         <div className="d-flex gap-2 mt-3">
        <button className="btn btn-outline-primary" onClick={addRow}>
          <i className="bi bi-plus-circle p-2 "></i> Add row
        </button>

        <button className="btn btn-outline-primary"> Save</button>
      </div>
        
        </>
    );
}
export default Timesheet;