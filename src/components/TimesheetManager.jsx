import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Grid,Autocomplete,TextField, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import timesheetService from '../shared/services/TimesheetService';
import { useGetApiCallQuery, useParamsApiCallMutation, usePostApiCallMutation,  useDeleteApiCallMutation, useGetApiCallWithParamsQuery} from '../core/store/globalApi';
import CoreButton from '../core/CoreButton';
import { useFormik } from 'formik';
import CoreTextField from '../core/CoreTextField';
import CoreValidations from '../core/CoreValidations';
import * as yup from 'yup';
import AgGridDataTable from '../shared/agGrid/AgGridDataTable';
import GlobalFilter from '../core/GlobalFilter';
import DynamicForm from '../core/DynamicForm';
import userService from '../shared/services/UserService';
import CoreIconButton from '../core/CoreIconButton';
import { faEdit, faTrashAlt, faPlus, faPaperPlane, faSave, faMarsAndVenus,faCheckCircle,faClose } from "@fortawesome/free-solid-svg-icons";
import { GlobalConfirmation } from '../core/GlobalConfirmation';
import dayjs from "dayjs";
import Swal from "sweetalert2";

function TimesheetManager() {
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const [newData,setNewData] = useState(userData);
  

 // const {data:projectList} = useGetApiCallQuery(userService.get.getAllProjects);
 // const {data:downTeamList} = useGetApiCallQuery(`${userService.get.getDownTeamList}+${userData?.uid}`);
 // const {data:usersList} = useGetApiCallQuery(userService.get.getUserList);
 // const {data:timesheetList,refetch:fetchTimesheets} = useGetApiCallQuery(timesheetService.get.getAllSubmittedTimesheets);
  //const {data:rlList} = useGetApiCallQuery("http://10.100.72.249:8080/timeSheet.service/getAllRLList");
  // const {data:tasksList} = useGetApiCallQuery(timesheetService.get.getTaskList);
  // const {data:projectList} = useGetApiCallQuery(userService.get.getAllProjects);


  const { data: tasksList } = useGetApiCallWithParamsQuery({
  url: timesheetService.get.getAllApprovedTasksList,
  params: { userId: 2 }, 
});

//  const { data: timesheetList,refetch:fetchTimesheets } = useGetApiCallWithParamsQuery({
//   url: timesheetService.get.ManagerTimesheet,
//   params: { managerId: 1 }, 
// });

  const [rejectform, setRejectForm] = useState(false);
  const [rejectTimesheet,setRejectTimesheet] = useState();
  const [paramsApi] = useParamsApiCallMutation();
  const [postAPi] = usePostApiCallMutation();
  const [ deleteApi ] = useDeleteApiCallMutation();

  const [dayPlanList, setDayPlanList] = useState([])
  const [filterText, setFilterText] = useState();
  const [editFlag, setEditFlag] = useState(false);
  const [showModal, setShowModal] = useState(false);
   const [buttonStatus, setButtonStatus] = useState(true);
   const [selectTeam,setSelectTeam] = useState();
      const [selectDownTeam,setSelectDownTeam] = useState();

const [ timesheetPayload, setTimesheetPayload] = useState( {
            "userId" : 0,
            "reportingLevel" : 0,
            "monthYear" : new Date().toISOString().slice(0, 7)
          })
    const [selectedMonth, setSelectedMonth] = useState("2025-11");

    

 const {data:downTeam} = useGetApiCallWithParamsQuery({ url:timesheetService.get.getDownTeam, params:{"reportingLevel" : selectTeam}});
  const {data:RLList } = useGetApiCallWithParamsQuery({ url:timesheetService.get.getRLList});
 const {data:timesheetList, refetch:fetchTimesheets } = useGetApiCallWithParamsQuery({ url:timesheetService.get.ManagerTimesheet, params:timesheetPayload});
  useEffect(() => {
  
    if (!selectedMonth && !selectTeam && !selectDownTeam) 
      return
        const payload = {
          "userId" : selectDownTeam || 0,
          "reportingLevel" : selectTeam || 0,
          "monthYear" : selectedMonth || new Date().toISOString().slice(0, 7),
        }
      setTimesheetPayload(payload)
      fetchTimesheets()
    
  
  
},[selectedMonth,selectTeam,selectDownTeam]);

  const coreValidations = new CoreValidations()
  const dayPlanValidations = yup.object().shape({
    taskName: coreValidations.stringValidation(2, 50),
  });

  const dtOptions = {
    columnDefs: [
        {field : "empCode",  headerName: "Employee Code" },
      {field : "profileName",  headerName: "Employee Name" },
      { field: "taskName", headerName: "Task Name" },
       { field: "taskHours", headerName: "Task Hours" },
      { field: "projectName", headerName: "Project Name" },
      { field: "taskDescription", headerName: " Task Description" },
        { field: "rlName", headerName: " RL Name" },
      { field: "assignedBy", headerName: "Assigned By" },
      { field: "createdDate", headerName: "Created On" },
      { field: "startTime", headerName: "Start Date Time" },
      { field: "endTime", headerName: "End Date Time" },
      { field: "totalTime", headerName: "Total Time Taken" },
      { field: "createdBy", headerName: "Created By" },
      {
        headerName: "Actions",
        field: "actions",
        minWidth: 150,
        cellRenderer: (params) => {

          let approvestatus = (Number(params.data.approveStatus ) ===0) ;

          return(
          <>
            {/* <CoreIconButton icon={faEdit} title="Edit Timesheet" disabled={!approvestatus} onClick={() => edittimesheet(params.data)} /> */}
            {/* <CoreIconButton icon={faTrashAlt} title="Delete Timesheet" disabled={!approvestatus} color="error" onClick={() => deleteTimesheet(params.data)} />
              <CoreIconButton icon={faPaperPlane} title="Save Timesheet"color="success" disabled={!approvestatus} onClick={() => submitTimesheet(params.data)} /> */}

                 <CoreIconButton icon={faCheckCircle} disabled = {!approvestatus} title="Approve" color="success" onClick={() => approveTimesheet(params.data)} /> 
   <CoreIconButton icon={faClose} disabled = {!approvestatus} title="Reject" color="error"  onClick={() =>ManagerReject(params.data)} />

          </>
          )
        }
      },

{
        headerName: "Status",
        field: "status",
        minWidth: 150,
        cellRenderer: (params) => {

        

            let statussubmit = (Number(params.data.approveStatus ) ===0) ;
            
          
      
         

          return(
        
          <>
          
            <div style={{color:!statussubmit?"green":"red"}} >{ !statussubmit ? "Approved" : "Pending"}</div>
            
          </>
        );
      },


      
      },

      

      

    ]
  }

  const timesheetFormik = useFormik({
      initialValues: {
      timesheetId:"",
      taskName: "",
      projectName: "",
      assignedBy: "",
      taskHours: "",
      taskId:"",
      startTime:"",
      endTime:"",
      taskUId:"",

      },
    });
  // const userForm = [
  //   { field: "uId", label: "Employee Name", type: "SearchSelect", options:downTeamList, keyName:"profileName", valueName:"uid" }
  // ]

  const timesheetForm = [
    { field: "taskId", label: "Task Name", type: "SearchSelect" , options:tasksList, keyName:"taskName", valueName:"taskId", relatedFields: [
      { formKey: "taskUId", sourceKey: "taskUId" },     
      { formKey: "projectId", sourceKey: "projectId" } 
    ] },
   // { field: "projectName", label: "Project Name", type: "Text", type: "SearchSelect" , options:projectList, keyName:"projectName", valueName:"projectId" },
   // { field: "assignedBy", label: "Assigned By", type: "SearchSelect", options:rlList, keyName:"profileName", valueName:"userId" },
   {
  field: "startTime",
  label: "Start Date Time",
  type: "DateTime",


},

    { field: "endTime", label: "End Date Time", type: "DateTime" , 
    },
    // { field: "totalHours", label: "Total Hours", type: "Time" },
   // { field: "taskDescription", label: "Task Description", type: "Text", multiline:true },

  ]

   const rejectForm =[
    
         { field: "remarks", label: "Remarks", type: "Text" },
    
      ]
    
      const RejectFormik = useFormik(
        {
          initialValues:{
            remarks:""
          }
        }
      )

  const addtimesheet = () => {
    timesheetFormik.resetForm();
    setEditFlag(false)
    setShowModal(true)
  }

  const edittimesheet = (data) => {
    timesheetFormik.resetForm();
    timesheetFormik.setValues({
      timesheetId : data.timesheetId,
      taskName:data.taskName,
     // projectName: data.projectName,
     // assignedBy: data.assignedBy,
      taskId:data.taskId,
     // taskUId:data.taskUId,
      startTime: data.startTime,
      endTime: data.endTime,
      //taskDescription: data.taskDescription
    })
    setEditFlag(true)
    setShowModal(true);
  };

    const saveTimesheet = async () => {
    timesheetFormik.validateForm();
    timesheetFormik.setTouched({
    });
    const formVal = timesheetFormik.values
    if(timesheetFormik.isValid){
      const payload = {
        "createdBy": userData?.profileName,
        "timesheetId":formVal.timesheetId,
         "taskId" : formVal.taskId,
         //"taskDescription": formVal.taskDescription,
         //"projectId": formVal.projectName,
         "taskUId": formVal.taskUId,
         //"assignName": formVal.profileName,
        // "taskHours": formVal.taskHours,
         "startTime":formVal.startTime,
         "endTime":formVal.endTime,
        "actionMode": editFlag ? "update" : "insert",
      };

      GlobalConfirmation({
      confirmButtonText:editFlag ? "Update" : "Save",
      successMsg:editFlag ? 'Updated' :'Saved',
      onConfirm: async () => {
          const res = await postAPi({ url:timesheetService.post.saveTimeSheet, data:payload})
          if (res.data) {
            fetchTimesheets();
            setShowModal(false);
            Swal.fire( editFlag ? 'Updated!' :'Saved!', `TimeSheet ${editFlag ? 'Updated' :'Saved'} Successfully`, 'success');
             setShowModal(false);
          }
        },
      });
    }
  };

const approveTimesheet = (data) =>{
         // const formVal = TasksFormik.values
      timesheetFormik.setValues({
        projectName: data.projectName,
        assignedBy: data.assignedBy,
        startTime: data.startTime,
        endTime: data.endTime,
        taskDescription: data.taskDescription,
        timesheetId: data.timesheetId,
      })
  
      const payload = {
        
           "timeSheetId": data.timesheetId,
           "approvedBy": "Meehika"
           
           
        };
  
      GlobalConfirmation({
        
        confirmButtonText: "Approve",
        successMsg: "Approved",
        onConfirm: async () => {
        await paramsApi({ url: timesheetService.params.approveTimesheet, data : payload })
       fetchTimesheets();
          setShowModal(false);
          setButtonStatus(false);
        },
      });
  
       
  
    }

     const ManagerReject = (data) =>{

   setRejectTimesheet(data);

    setRejectForm(true);
    return

  }

  const RejectTimesheet = () => {

    RejectFormik.setTouched({ remarks: true });
  const formVal = RejectFormik.values;

  const Id = rejectTimesheet?.timesheetId;
  if (formVal.remarks && formVal.remarks.trim() !== "" && RejectFormik.isValid) {
    const payload = {
      timeSheetId: Id,
      rejectedBy: "Meehika",
      remarks: formVal.remarks,
    };

    GlobalConfirmation({
      confirmButtonText: "Reject",
      successMsg: "Rejected",
      onConfirm: async () => {
        await paramsApi({
          url: timesheetService.params.rejectTimesheetManager,
          data: payload,
        });
       // setShowModal(false);
       // setButtonStatus(false);
          fetchTimesheets();
        setRejectForm(false);
        RejectFormik.resetForm();
        setRejectTimesheet(null);
      },
    });
  }

  }




  return (
    <>
      <Grid container spacing={2} sx={{ p: 1, alignItems: "center",mt: '68px', ml: '240px', }}>
        <Grid item size={5}>
          <Typography variant="h6">Time sheet</Typography>
        </Grid>
        <Grid item size={2}>
          {/* <form id="timesheet-form">
            <DynamicForm formTemplate={timesheetForm} formFormik={timesheetFormik} />
          </form> */}
        </Grid>
        <Grid item size={5} sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" ,gap:1 }}>
          {/* <CoreButton onClick={addtimesheet}>Add Timesheet</CoreButton> */}

          <Autocomplete
                      sx={{
    width: 200,
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      backgroundColor: (theme) => theme.palette.background.paper,
      '&.Mui-focused fieldset': {
        borderColor: (theme) => theme.palette.primary.main,
      },
    },
  }}
                      options={RLList || []}
                      getOptionLabel={(option) => option?.profileName || ""}
                  
                      value={RLList?.find((opt) => opt.userId === selectTeam) || null}
                      onChange={(event, newValue) => {
                        const selectedId = newValue?.userId || 0;
                        setSelectTeam(selectedId);
                        console.log( selectedId);
                      }}
                      isOptionEqualToValue={(option, value) => option.userId === value.userId}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select RL"
                          variant="outlined"
                          size="small"
                        />
                      )}
                    />
          
                   <Autocomplete

                      sx={{
    width: 200,
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      backgroundColor: (theme) => theme.palette.background.paper,
      '&.Mui-focused fieldset': {
        borderColor: (theme) => theme.palette.primary.main,
      },
    },
  }}
                      options={downTeam || []}
                      getOptionLabel={(option) => option?.profileName || ""}
                  
                      value={downTeam?.find((opt) => opt.userId === selectDownTeam) || null}
                      onChange={(event, newValue) => {
                        const selectedId = newValue?.userId || 0;
                        setSelectDownTeam(selectedId);
                        console.log( selectedId);
                      }}
                      isOptionEqualToValue={(option, value) => option.userId === value.userId}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select Team"
                          variant="outlined"
                          size="small"
                        />
                      )}
                    />
          <GlobalFilter onFilterChange={setFilterText} onMonthChange={setSelectedMonth}/>
          {/* <CoreDatePicker/> */}
        </Grid>
      </Grid>
      <Box sx={{ px: 2 , ml: '240px'}}>
        <AgGridDataTable dtOptions={dtOptions} data={timesheetList} filterInput={filterText}  />
        {/* <Box sx={{ display: "flex", justifyContent: "center",mb: 4}}><CoreButton>Submit Timesheets</CoreButton></Box> */}
        
      </Box>
      <Dialog open={showModal} onClose={() => setShowModal(false)} maxWidth="md" fullWidth>
        <DialogTitle>{editFlag ? "Edit Timesheet" : "Add Timesheet"}</DialogTitle>
        <DialogContent>
          <form onSubmit={timesheetFormik.handleSubmit} id="dayplan-form">
            <DynamicForm formTemplate={timesheetForm} formFormik={timesheetFormik}  />
          </form>
        </DialogContent>
        <DialogActions>
          <CoreButton onClick={saveTimesheet}>{editFlag ? "Update" : "Save"}</CoreButton>
          <CoreButton color={"secondary"} onClick={() => setShowModal(false)} >Close</CoreButton>
        </DialogActions>
      </Dialog>

    <Dialog open={rejectform} onClose={() => setRejectForm(false)} maxWidth="md" fullWidth>
        <DialogTitle>Reject</DialogTitle>
        <DialogContent>
          <form onSubmit={RejectFormik.handleSubmit} id="reject-form">
            <DynamicForm formTemplate={rejectForm} formFormik={RejectFormik} size={6} />
          </form>
        </DialogContent>
        <DialogActions>
          <CoreButton onClick={()=>RejectTimesheet()}>Reject</CoreButton>
          <CoreButton color={"secondary"} onClick={() => setRejectForm(false)} >Close</CoreButton>
        </DialogActions>
      </Dialog>  
    </>
  )
}

export default TimesheetManager