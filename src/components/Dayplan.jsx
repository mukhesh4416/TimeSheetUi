import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
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
import { faEdit, faTrashAlt, faPlus, faPaperPlane, faSave, faMarsAndVenus } from "@fortawesome/free-solid-svg-icons";
import { GlobalConfirmation } from '../core/GlobalConfirmation';
import dayjs from "dayjs";
import Swal from "sweetalert2";

function Dayplan() {
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const [newData,setNewData] = useState(userData);
  

 // const {data:projectList} = useGetApiCallQuery(userService.get.getAllProjects);
 // const {data:downTeamList} = useGetApiCallQuery(`${userService.get.getDownTeamList}+${userData?.uid}`);
 // const {data:usersList} = useGetApiCallQuery(userService.get.getUserList);
  //const {data:timesheetList,refetch:fetchTimesheets} = useGetApiCallQuery(timesheetService.get.getAllTimeSheets);
  //const {data:rlList} = useGetApiCallQuery("http://10.100.72.249:8080/timeSheet.service/getAllRLList");
  // const {data:tasksList} = useGetApiCallQuery(timesheetService.get.getTaskList);
  // const {data:projectList} = useGetApiCallQuery(userService.get.getAllProjects);


  const { data: tasksList } = useGetApiCallWithParamsQuery({
  url: timesheetService.get.getAllApprovedTasksList,
  params: { userId: 3 }, 
});

// const { data: timesheetList,refetch:fetchTimesheets } = useGetApiCallWithParamsQuery({
//   url: timesheetService.get.UserTimesheet,
//   params: { userId: 3 }, 
// });

  const [paramsApi] = useParamsApiCallMutation();
  const [postAPi] = usePostApiCallMutation();
  const [ deleteApi ] = useDeleteApiCallMutation();

  const [dayPlanList, setDayPlanList] = useState([])
  const [filterText, setFilterText] = useState();
  const [editFlag, setEditFlag] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [ timesheetPayload, setTimesheetPayload] = useState( {
            "userId" : 3,
            "monthYear" : new Date().toISOString().slice(0, 7)
          })
    const [selectedMonth, setSelectedMonth] = useState("2025-11");

 const {data:timesheetList, refetch:fetchTimesheets } = useGetApiCallWithParamsQuery({ url:timesheetService.get.UserTimesheet, params:timesheetPayload});
  useEffect(() => {
  
    if (selectedMonth) {
        const payload = {
          "userId" : 3,
          "monthYear" : selectedMonth,
        }
      setTimesheetPayload(payload)
      fetchTimesheets()
    
  
  }
},[selectedMonth]);

  const coreValidations = new CoreValidations()
  const dayPlanValidations = yup.object().shape({
    taskName: coreValidations.stringValidation(2, 50),
  });

  const dtOptions = {
    columnDefs: [
      { field: "taskName", headerName: "Task Name" },
       { field: "taskHours", headerName: "Task Hours" },
      { field: "projectName", headerName: "Project Name" },
      { field: "taskDescription", headerName: " Task Description" },
      { field: "assignedBy", headerName: "Assigned By" },
      { field: "startTime", headerName: "Start Date Time" },
      { field: "endTime", headerName: "End Date Time" },
      { field: "totalTime", headerName: "Total Time Taken" },
      { field: "createdBy", headerName: "Created By" },
      {
        headerName: "Actions",
        field: "actions",
        minWidth: 150,
        cellRenderer: (params) => {

          let statussubmit = (Number(params.data.submitStatus ) ===0) ;

          return(
          <>
            <CoreIconButton icon={faEdit} title="Edit Timesheet" disabled={!statussubmit} onClick={() => edittimesheet(params.data)} />
            <CoreIconButton icon={faTrashAlt} title="Delete Timesheet" disabled={!statussubmit} color="error" onClick={() => deleteTimesheet(params.data)} />
              <CoreIconButton icon={faPaperPlane} title="Save Timesheet"color="success" disabled={!statussubmit} onClick={() => submitTimesheet(params.data)} />

          </>
          )
        }
      },

{
        headerName: "Status",
        field: "status",
        minWidth: 150,
        cellRenderer: (params) => {

        

            let statussubmit = (Number(params.data.submitStatus ) ===0) ;
             let verifyStatus = (Number(params.data.verifyStatus ) ===0) ;
              let approveStatus = (Number(params.data.approveStatus ) ===0) ;
            let rejectStatus = (Number(params.data.rejectStatus ) ===0) ;
          
      
         

          return(
        
          <>
       <div style={{color:!statussubmit && !verifyStatus && !approveStatus && rejectStatus ?"green": (!rejectStatus ? "red":"blue")}} >{ !statussubmit && !verifyStatus && !approveStatus && rejectStatus? "Approved" : (!rejectStatus ? "Rejected":"Pending")}</div>
            
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

  

  const addtimesheet = () => {
    timesheetFormik.resetForm();
    setEditFlag(false)
    setShowModal(true)
  }

  const edittimesheet = (data) => {
    timesheetFormik.resetForm();
    timesheetFormik.setValues({
      timesheetId : data.timesheetId,
      taskId : data.taskId,
     // taskName:data.taskId,
     // projectName: data.projectName,
     // assignedBy: data.assignedBy,
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
       // "createdBy": userData?.profileName,
        "timesheetId":formVal.timesheetId,
         "taskId" : formVal.taskId,
         //"taskDescription": formVal.taskDescription,
         //"projectId": formVal.projectName,
         "taskUId": formVal.taskUId,
         //"assignName": formVal.profileName,
        // "taskHours": formVal.taskHours,
         "startTime":formVal.startTime,
         "endTime":formVal.endTime,
          "createdBy" : "kavya",
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

  const deleteTimesheet = (data) => {
    GlobalConfirmation({
      confirmButtonText: "Delete",
      successMsg: "Deleted",
      onConfirm: async () => {
      await deleteApi({ url: timesheetService.delete.deleteTimeSheet, data: { actionMode: 'Delete', timesheetId: data.timesheetId } })
      fetchTimesheets();
        setShowModal(false);
      },
    });
  }

  const submitTimesheet = (data) =>{

        const formVal = timesheetFormik.values
    timesheetFormik.setValues({
 timesheetId : data.timesheetId,
    
    
    })

    const payload = {
      
         "timeSheetId": data.timesheetId,
         "submittedBy": "kavya"
         
         
      };

    GlobalConfirmation({
      
      confirmButtonText: "Save",
      successMsg: "Saved",
      onConfirm: async () => {
      await paramsApi({ url: timesheetService.params.submitTimeSheet, data : payload })
      fetchTimesheets();
        setShowModal(false);
      },
    });

     

  }



   const submitAllTimesheet = () =>{

   

    const payload = {
      
         "taskUId": 3,
        
         
         
      };

    GlobalConfirmation({
      
      confirmButtonText: "Submit",
      successMsg: "Submitted",
      onConfirm: async () => {
      await postAPi({ url: timesheetService.post.submitAllTimeSheets, data : payload })
      fetchTimesheets();
        setShowModal(false);
      },
    });

     

  }

  // const finalsubmission () =>
  // {}
  

  // const getDayPlanList = async () => {
  //   const res = await paramsApi({ url: timesheetService.params.getDayPlayByDate, data: { uId: userData?.uId, date: '2026-10-14' } })
  //   setDayPlanList(res.data);
  // }

  // useEffect(() => {
  //   getDayPlanList();
  // }, [])

  return (
    <>
      <Grid container spacing={2} sx={{ p: 1, alignItems: "center",mt: '68px', ml: '240px', }}>
        <Grid item size={6}>
          <Typography variant="h6">Time sheet</Typography>
        </Grid>
       
        <Grid item size={6} sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
           <CoreButton onClick={submitAllTimesheet}>Submit Timesheets</CoreButton>
           <CoreButton onClick={addtimesheet}>Add Timesheet</CoreButton> 
          <GlobalFilter onFilterChange={setFilterText} onMonthChange={setSelectedMonth} />
         
        </Grid>
      </Grid>
      <Box sx={{ px: 2 , ml: '240px'}}>
        <AgGridDataTable dtOptions={dtOptions} data={timesheetList} filterInput={filterText}  />
        <Box sx={{ display: "flex", justifyContent: "center",mb: 4}}></Box>
        
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
    </>
  )
}

export default Dayplan