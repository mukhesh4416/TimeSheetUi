
import React from "react";
import './Dashboard.css';

export const Dashboard = () => (
  <div className="dashboard">
    <center>
       {/* <div className="pt-3 p-3 flex justify-content-between">
      <h1 className="lead text-start fw-bold ps-5 fs-3">Dashboard</h1>
     
        <button className="btn btn-outline-danger w-90 p-2 position-absolute top-0 end-1 m-4 float-end"><i class="bi bi-box-arrow-right p-2"></i>New Project</button>
      </div> */}
      <div className="d-flex justify-content-between align-items-center mb-3 ms-4">
      <h4 className=" ms-5 fw-bold mt-5">Dashboard</h4>
      {/* <button className="btn btn-outline-danger me-4 shadow"><i className="bi bi-plus-circle p-2 "></i>Add New Project</button> */}
    </div>

      {/* Apply gap to the row only */}
      <div className="row p-4 g-4">
        {/* Card 1 */}
        <div className="col-md-4">
          <div className="card p-3 shadow ms-2">
            <h6 className="card-title d-flex align-items-center">
              <i className="bi bi-people text-primary me-2 fs-4"></i>
              Total Users
            </h6>
            <p className="card-text fs-2 fw-bold">50</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="col-md-4">
          <div className="card p-3 shadow">
            <h6 className="card-title d-flex align-items-center">
              <i className="bi bi-list-task text-success me-2 fs-4"></i>
              Active Projects
            </h6>
            <p className="card-text fs-2 fw-bold">12</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="col-md-4">
          <div className="card p-3 shadow">
            <h6 className="card-title d-flex align-items-center">
              <i className="bi bi-clock text-warning me-2 fs-4"></i>
              Total Hours Worked
            </h6>
            <p className="card-text fs-2 fw-bold">1600</p>
          </div>
        </div>
      </div>
      {/*Table display*/}
      <div className="ms-4 me-4 mt-1">
  <h5 className="mt-4 px-3 p-4 text-start">Recent Registrations</h5>

  <table className="table table-hover table-bordered shadow me-2">
    <thead>
      <tr>
        <th>S.no</th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Registration Date</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>1.</th>
        <td>Kavya</td>
        <td>kavyahemanth.heya@gmail.com</td>
          <td>Admin</td>
            <td>20/8/2025</td>
      </tr>
      <tr>
        <th>2.</th>
        <td>Vaishnavi</td>
        <td>Vaishnavi@gmail.com</td>
        <td>Manager</td>
            <td>20/8/2025</td>
      </tr>
      <tr>
         <th>3.</th>
        <td>Meghana</td>
        <td>Meghana@gmail.com</td>
        <td>Team Lead</td>
            <td>20/8/2025</td>
      </tr>
    </tbody>
  </table>
  </div>
  {/*table */}
  <div className="ms-4 me-4 mt-1 rounded-3 overflow-hidden">
  <h5 className="mt-4 px-3 p-4 text-start">Recent Allocations</h5>

  <table className="table table-hover table-bordered shadow rounded-3">
    <thead>
      <tr>
        <th>S.no</th>
        <th>Project</th>
        <th>User</th>
        <th>Role</th>
        <th>Task</th>
        <th>Allocated Hours</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1.</td>
        <td>E-biz</td>
        <td>Kavya</td>
          <td>Frondend</td>
          <td>Dashboard</td>
            <td>9 Hours</td>
      </tr>
      <tr>
        <td>2.</td>
        <td>Eagle-Yard</td>
        <td>Vaishnavi</td>
        <td>Tester</td>
        <td>API</td>
            <td>2 Hours</td>
      </tr>
      <tr>
         <td>3.</td>
        <td>Eagle-Yard</td>
        <td>Meghana</td>
        <td>FrondEnd</td>
        <td>Main Page</td>
            <td>8 Hours</td>
      </tr>
    </tbody>
  </table>
  </div>
    </center>
  </div>
);
