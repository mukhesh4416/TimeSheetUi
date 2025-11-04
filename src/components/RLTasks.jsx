import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { faEdit, faTrashAlt, faPlus, faPaperPlane, faCheckCircle, faThumbsUp,faClose } from "@fortawesome/free-solid-svg-icons";
import timesheetService from '../shared/services/TimesheetService';
import { useGetApiCallQuery, useParamsApiCallMutation, usePostApiCallMutation, useDeleteApiCallMutation, useGetApiCallWithParamsQuery} from '../core/store/globalApi';
import CoreButton from '../core/CoreButton';
import CoreIconButton from '../core/CoreIconButton';
import { useFormik } from 'formik';
import CoreTextField from '../core/CoreTextField';
import CoreValidations from '../core/CoreValidations';
import * as yup from 'yup';
import AgGridDataTable from '../shared/agGrid/AgGridDataTable';
import GlobalFilter from '../core/GlobalFilter';
import DynamicForm from '../core/DynamicForm';
import userService from '../shared/services/UserService';
import { GlobalConfirmation } from '../core/GlobalConfirmation';
import Swal from "sweetalert2";


function RLTasks() {
 
  const { data: taskList, refetch:fetchTasks } = useGetApiCallWithParamsQuery({
  url: timesheetService.get.RLtasks,
  params: { reportingLevel: 2 }, 
});
   
 
const [rejectTask,setRejectTask] = useState();
  const [paramsApi] = useParamsApiCallMutation();
  const [postAPi] = usePostApiCallMutation();
   const [deleteApi] = useDeleteApiCallMutation();
 //const [getApi] = useGetApiCallMutation();
  const [buttonStatus, setButtonStatus] = useState(true);
const [exceptName, setExceptName] = useState(false);
  //const [taskList, setTaskList] = useState([])
  const [filterText, setFilterText] = useState();
  const [editFlag, setEditFlag] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [rejectform, setRejectForm] = useState(false);
  const coreValidations = new CoreValidations()
  const dayPlanValidations = yup.object().shape({
    taskName: coreValidations.stringValidation(2, 50),
  });






  const dtOptions = {
    columnDefs: [
      { field: "taskName", headerName: "Task Name" },
      { field: "projectName", headerName: "Project Name" },
    //  { field: "assignedTo", headerName: "Assigned By" },
      { field: "taskDescription", headerName: "Task Description" },
      { field: "taskHours", headerName: "Task Hours" },
      { field: "createdBy", headerName: "Submitted By" },
      {
        headerName: "Actions",
        field: "actions",
        minWidth: 150,
        cellRenderer: (params) => {

          let approvestatus = (Number(params.data.verifyStatus ) ===0) ;

        return(
        
          <>
        
            <CoreIconButton icon={faEdit}  title="Edit Task" color="warning"  disabled = {!approvestatus} onClick={() => editTasks(params.data)} />
            
              <CoreIconButton icon={faCheckCircle} disabled = {!approvestatus} title="Verify"  color="primary"  onClick={() =>  verifyTasks(params.data)
} /> 
   <CoreIconButton icon={faClose} disabled = {!approvestatus} title="Reject" color="error"  onClick={() =>RLreject(params.data)} />
                
          </>
        );
      },
      },
 {
        headerName: "Status",
        field: "status",
        minWidth: 150,
        cellRenderer: (params) => {

        

           let statussubmit = (Number(params.data.submitStatus ) ===0) ;
            let approveStatus= (Number(params.data.approveStatus ) ===0) ;
            let verifyStatus = (Number(params.data.verifyStatus ) ===0) ;

          
      
         

          return(
        
          <>
          
            <div style={{color:!verifyStatus && !statussubmit?"green":"red"}} >{ !verifyStatus && !statussubmit ? "Verified" : "Pending"}</div>
          </>
        );
      },
      },

    ]
  }



  const TasksForm = [
    { field: "taskName", label: "Task Name", type: "Text" ,readOnly:true },
  
    { field: "taskHours", label: "Task Hours", type: "Text" },
    { field: "taskDescription", label: "Description", type: "Text", multiline:true,readOnly:true },
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

  const TasksFormik = useFormik({
    initialValues: {
      taskName: "",
      projectName: "",
      projectId:"",
      //assignedBy: "",
      taskHours: "",
      taskDescription: "",
      taskUId:"",
      taskId:"",
      remarks:"",
    
    },
    //validationSchema: taskValidations,
  });


  const editTasks = (data) => {

  //  setExceptName(data.taskName)
    TasksFormik.resetForm();
    TasksFormik.setValues({
      taskName: data.taskName,
      taskId:data.taskId,
      projectId:data.projectId,
      //assignedBy: data.assignedBy,
      taskHours: data.taskHours,
      taskUId:data.taskUId,
      taskDescription: data.taskDescription
    })
    setEditFlag(true)
    setShowModal(true);
  };

    const saveTasks = async () => {
   // TasksFormik.validateForm();
    TasksFormik.setTouched({
      
    });
    const formVal = TasksFormik.values
    if(TasksFormik.isValid){
      const payload = {
       // "createdBy": userData?.profileName,
        "actionMode": editFlag ? "update" : "insert",
         "taskName": formVal.taskName,
         "taskDescription": formVal.taskDescription,
         "projectId": formVal.projectId,
         "assignedBy": formVal.profileName,
         "taskHours": formVal.taskHours,
         "taskId":formVal.taskId,
         "modifiedBy":"kavya",
         
      };

      GlobalConfirmation({
      confirmButtonText:editFlag ? "Update" : "Save",
      successMsg:editFlag ? 'Updated' :'Saved',
      onConfirm: async () => {
          const res = await postAPi({ url:timesheetService.post.saveTask, data:payload})
         
          if (res.data) {
             fetchTasks();
            setShowModal(false);
            Swal.fire( editFlag ? 'Updated!' :'Saved!', `Task ${editFlag ? 'Updated' :'Saved'} Successfully`, 'success');
          }
        },
      });
    }
  };


  const verifyTasks = (data) =>{
       // const formVal = TasksFormik.values
    TasksFormik.setValues({
      projectName: data.projectName,
      assignedBy: data.assignedBy,
      startTime: data.startTime,
      endTime: data.endTime,
      taskDescription: data.taskDescription,
      taskId : data.taskId,
    })

   

    const payload = {
      
         "taskId": data.taskId,
         "verifiedBy": "Meehika"
         
         
      };

    GlobalConfirmation({
      
      confirmButtonText: "Verify",
      successMsg: "Verified",
      onConfirm: async () => {
      await paramsApi({ url: timesheetService.params.verifyTask, data : payload })
     //fetchTasks();
        setShowModal(false);
        setButtonStatus(false);
      },
    });

     

  }
  const rejectTasks = (data) => {
console.log(data)
  setRejectForm(true);
  RejectFormik.setTouched({
    remarks: true,
  });
  const formVal = RejectFormik.values;
  const Id = data.taskId;
    
  if (formVal.remarks && formVal.remarks.trim() !== "") {
  
    if (RejectFormik.isValid) {
      //console.log(data.taskId);
      const payload = {
        taskId: Id,
        rejectedBy: "Meehika",
        remarks: formVal.remarks,
      };

      GlobalConfirmation({
        confirmButtonText: "Reject",
        successMsg: "Rejected",
        onConfirm: async () => {
          await paramsApi({
            url: timesheetService.params.rejectTaskRL,
            data: payload,
          });
          setShowModal(false);
          setButtonStatus(false);
          setRejectForm(false);
          RejectFormik.resetForm();
        },
      });
    }
  } 
};



  // const rejectTasks = (data) =>{
  //    RejectFormik.resetForm();

  //    setRejectForm(true);
  //   const formVal = RejectFormik.values
  //    RejectFormik.setTouched({
  //     remarks :true
  //   });
  //  // const formVal = TasksFormik.values
  //  if(RejectFormik.isValid){
  //   const payload = {
      
  //        "taskId": data.taskId,
  //        "rejectedBy": "Meehika",
  //        "remarks":formVal.remarks,
         
         
  //     };

  //   GlobalConfirmation({
      
  //     confirmButtonText: "Reject",
  //     successMsg: "Reject",
  //     onConfirm: async () => {
  //     await paramsApi({ url: timesheetService.params.rejectTaskRL, data : payload })
  //    //fetchTasks();
  //       setShowModal(false);
  //       setButtonStatus(false);
  //     },
  //   });

  // }

  // }

   const approveTasks = (data) =>{
       // const formVal = TasksFormik.values
    TasksFormik.setValues({
      projectName: data.projectName,
      assignedBy: data.assignedBy,
      startTime: data.startTime,
      endTime: data.endTime,
      taskDescription: data.taskDescription,
      taskId : data.taskId,
    })

    const payload = {
      
         "taskId": data.taskId,
         "approvedBy": "Meehika"
         
         
      };

    GlobalConfirmation({
      
      confirmButtonText: "Approve",
      successMsg: "Approved",
      onConfirm: async () => {
      await paramsApi({ url: timesheetService.params.approveTask, data : payload })
     //fetchTasks();
        setShowModal(false);
       // setButtonStatus(false);
      },
    });

     

  }

  const RLreject = (data) =>{

   setRejectTask(data);

    setRejectForm(true);
    return

  }

  const RejectTask = () => {

    RejectFormik.setTouched({ remarks: true });
  const formVal = RejectFormik.values;

  const Id = rejectTask?.taskId;
  if (formVal.remarks && formVal.remarks.trim() !== "" && RejectFormik.isValid) {
    const payload = {
      taskId: Id,
      rejectedBy: "Meehika",
      remarks: formVal.remarks,
    };

    GlobalConfirmation({
      confirmButtonText: "Reject",
      successMsg: "Rejected",
      onConfirm: async () => {
        await paramsApi({
          url: timesheetService.params.rejectTaskRL,
          data: payload,
        });
       // setShowModal(false);
       // setButtonStatus(false);
        setRejectForm(false);
        RejectFormik.resetForm();
        setRejectTask(null);
      },
    });
  }

  }

  
  return (
    <>
      <Grid container spacing={2} sx={{ p: 1, alignItems: "center",mt: '68px', ml: '240px', }}>
        <Grid item size={5}>
          <Typography variant="h6">Submitted Tasks</Typography>
        </Grid>
        <Grid item size={2}>
          {}
        </Grid>
        <Grid item size={5} sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
          {/* <CoreButton onClick={addTasks}>Add Task</CoreButton> */}
          <GlobalFilter onFilterChange={setFilterText} />
          
        </Grid>
      </Grid>
      <Box sx={{ px: 2, ml: '240px' }}>
        <AgGridDataTable dtOptions={dtOptions} data={taskList} filterInput={filterText} />
      </Box>
      <Dialog open={showModal} onClose={() => setShowModal(false)} maxWidth="md" fullWidth>
        <DialogTitle>{editFlag ? "Edit Task" : "Add Task"}</DialogTitle>
        <DialogContent>
          <form onSubmit={TasksFormik.handleSubmit} id="dayplan-form">
            <DynamicForm formTemplate={TasksForm} formFormik={TasksFormik} size={6} />
          </form>
        </DialogContent>
        <DialogActions>
          <CoreButton onClick={saveTasks}>{editFlag ? "Update" : "Save"}</CoreButton>
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
          <CoreButton onClick={()=>RejectTask()}>Reject</CoreButton>
          <CoreButton color={"secondary"} onClick={() => setRejectForm(false)} >Close</CoreButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default RLTasks