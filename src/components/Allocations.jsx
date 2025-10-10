function Allocations(){
    return(
        <>
         <h5 className="mt-4 px-3 p-4 ms-2">Task List with Allocation hours</h5>
          <table className="table table-bordered table-hover shadow ms-4">
            <thead className="table-light">
              <tr>
                <th className="d-none">S.no</th>
                <th>Employee Name</th>
                <th>Project Name</th>
                <th>Task</th>
                <th>Estimation Hours</th>
                <th>Allocated Hours</th>
                <th>Status</th>
                
              </tr>
            
            </thead>
            <tbody>
                <tr>
                <td className="d-none">1</td>
                <td>kavya</td>
                <td>E-biz</td>
                <td>Buggs fix</td>
                <td>5</td>
                <td>3</td>
                <td className="text-success">Approved</td>
                
              </tr>
          
            </tbody>
          </table>
        
        </>
    )
}
export default Allocations;