
export const TimeAllocationDashboard =(timeA) =>{

    return(
<div className="row p-4 g-4">
        {/* Card 1 */}
        <div className="col-md-4">
          <div className="card p-3 shadow">
            <h6 className="card-title d-flex align-items-center">
              <i className="bi bi-people text-danger me-2 fs-4"></i>
              Pending Allocations
            </h6>
            <p className="card-text fs-2 fw-bold">5</p>
            <a href={timeA} class="btn btn-outline-danger stretched-link">Clear the pendings Actions</a>
          </div>
        </div>

        {/* Card 2 */}
        <div className="col-md-4">
          <div className="card p-3 shadow">
            <h6 className="card-title d-flex align-items-center">
              <i className="bi bi-list-task text-danger me-2 fs-4"></i>
              Completed Allocations
            </h6>
            <p className="card-text fs-2 fw-bold">10</p>
            <a href="" class="btn btn-outline-danger stretched-link">Review the completetd Actions</a>
          </div>
        </div>

        
      </div>

    );
}
