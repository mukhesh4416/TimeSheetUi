import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { faEdit, faTrashAlt, faPlus, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import timesheetService from '../shared/services/TimesheetService';
import { useGetApiCallQuery, useParamsApiCallMutation, usePostApiCallMutation, useDeleteApiCallMutation,useGetApiCallWithParamsQuery ,} from '../core/store/globalApi';
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
import "../styles.scss";




function Tasks() {
  const userData = JSON.parse(sessionStorage.getItem("userData"));
   const loginData = JSON.parse(sessionStorage.getItem("userData"));



   const { data: tasksList, refetch:fetchTasks } = useGetApiCallWithParamsQuery({
  url: timesheetService.get.UserTasks,
  params: { taskUId: 3 }, 
});






  

  const {data:projectList} = useGetApiCallQuery(userService.get.getAllProjects);
   const {data:rlList} = useGetApiCallQuery("http://10.100.72.249:8080/timeSheet.service/getAllRLList");
 // const {data:downTeamList} = useGetApiCallQuery(`${userService.get.getDownTeamList}+${userData?.uid}`);
  //const {data:usersList} = useGetApiCallQuery(userService.get.getAllUsersList);
  //const {data:tasksList,refetch:fetchTasks} = useGetApiCallQuery(timesheetService.get.getTaskList);

  const [paramsApi] = useParamsApiCallMutation();
  const [postAPi] = usePostApiCallMutation();
   const [deleteApi] = useDeleteApiCallMutation();
  const [buttonDisable, setButtonDisable] = useState({});
const [exceptName, setExceptName] = useState(false);
  const [taskData, setTaskData] = useState([])
  const [filterText, setFilterText] = useState();
  const [editFlag, setEditFlag] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [ taskPayload, setTaskPayload] = useState( {
          "taskUId" : loginData.userId,
          "monthYear" : new Date().toISOString().slice(0, 7)
        })
  const [selectedMonth, setSelectedMonth] = useState("2025-11");
  const coreValidations = new CoreValidations()
  const dayPlanValidations = yup.object().shape({
    taskName: coreValidations.stringValidation(2, 50),
  });




  const taskValidations = yup.object().shape({
    taskName: coreValidations.duplicateValidation(2,50,tasksList,'taskName',exceptName),
  });

  const {data:taskDataa, refetch:fetchTasksData } = useGetApiCallWithParamsQuery({ url:timesheetService.get.getAllTaskUser, params:taskPayload});
  useEffect(() => {
  
    if (selectedMonth) {
        const payload = {
          "taskUId" : loginData.userId,
          "monthYear" : selectedMonth,
        }
      setTaskPayload(payload)
      fetchTasksData()
    
  
  }
},[selectedMonth]);

// useEffect(() => {
//   if (selectedMonth) {
//     fetchTasksByMonth(selectedMonth);
//   }
// }, [selectedMonth]);

  const dtOptions = {
    columnDefs: [
      { field: "taskName", headerName: "Task Name" },
      { field: "projectName", headerName: "Project Name" },
      { field: "assignedBy", headerName: "RL" },
      { field: "taskDescription", headerName: "Task Description" },
      { field: "taskHours", headerName: "Task Hours" },
      { field: "createdBy", headerName: "Created By" },
       { field: "taskDate", headerName: " Task Date" },
      
     
      {
        headerName: "Actions",
        field: "actions",
        minWidth: 150,
        cellRenderer: (params) => {

        

            let statussubmit = (Number(params.data.submitStatus ) ===0) ;

          
      
         

          return(
        
          <>
          
            <CoreIconButton icon={faEdit}  title="Edit Task" disabled = {!statussubmit} onClick={() => editTasks(params.data)} />
            <CoreIconButton icon={faTrashAlt} title="Delete Task" color="error" disabled = {!statussubmit} onClick={() => deleteTasks(params.data)} />
              <CoreIconButton icon={faPaperPlane} title="Submit Task" color="success" disabled = {!statussubmit} onClick={() => submitTasks(params.data)} />
          </>
        );
      },
      },
       
      {
        headerName: "Status",
        field: "status",
        minWidth: 150,
        cellRenderer: (params) => {
          const data = params.data
          if(+data.rejectStatus){
            return <div className=' status rejected'>Rejected</div>
          }else if(!+data.submitStatus && !+data.verifyStatus && !+data.approveStatus){
            return <div className='status pending'>Pending</div>
          }else if(+data.submitStatus  && !+data.verifyStatus && !+data.approveStatus ){
            return <div className='status submitted'>Submitted</div>
          }else if(+data.verifyStatus && !+data.approveStatus && +data.submitStatus){
            return <div className='status verified'>Verified</div>
          }else if(+data.verifyStatus && +data.approveStatus && +data.submitStatus){
            return <div className='status approved'>Approved</div>
          }
      },
      },
     
    ]
  }

  const userFormik = useFormik({
      initialValues: {
        uid: userData?.uid,
      },
    });
  // const userForm = [
  //   { field: "uId", label: "Employee Name", type: "SearchSelect", options:downTeamList, keyName:"profileName", valueName:"uid" }
  // ]

  const TasksForm = [
    { field: "taskName", label: "Task Name", type: "Text" },
    { field: "projectName", label: "Project Name", type: "SearchSelect" , options:projectList, keyName:"projectName", valueName:"projectId" },
    { field: "assignedBy", label: "Assigned By", type: "SearchSelect", options:rlList, keyName:"profileName", valueName:"profileName" },
    { field: "taskHours", label: "Task Hours", type: "Text" },
    { field: "taskDescription", label: "Description", type: "Text", multiline:true },
  ]

  const TasksFormik = useFormik({
    initialValues: {
      taskName: "",
      assignedBy:"",
      projectName: "",
      taskHours: "",
      taskDescription: "",
      taskUId:"",
      taskId:""
    
    },
    validationSchema: taskValidations,
  });


  

const fetchTasksByMonth = async (month) => {

  const payload = {
    "taskUId" : 3,
    "monthYear" : month,
    
  }

  // setTaskPayload(payload)

    // const res = await getApi({ url:timesheetService.get.getAllTaskUser, params:payload});
    // debugger
    // setTaskData(res);
    // console.log(taskData)
};

  const addTasks = () => {
   // console.log(taskData);
   console.log(selectedMonth)
    TasksFormik.resetForm();
    setEditFlag(false)
    setShowModal(true)
  }

  const editTasks = (data) => {

    //console.log(taskList)
    setExceptName(data.taskName)
    TasksFormik.resetForm();
    console.log(data)
    console.log(rlList)
    TasksFormik.setValues({
       assignedBy: data.rlName,
      projectName : data.projectId,
      taskName: data.taskName,
      taskId:data.taskId,
     
      taskHours: data.taskHours,
      taskUId:data.taskUId,
      taskDescription: data.taskDescription
    })
    setEditFlag(true)
    setShowModal(true);
  };

    const saveTasks = async () => {
    TasksFormik.validateForm();
    TasksFormik.setTouched({
    });
    const formVal = TasksFormik.values
    if(TasksFormik.isValid){
      const payload = {
        "createdBy": userData?.profileName,
        "actionMode": editFlag ? "update" : "insert",
         "taskName": formVal.taskName,
         "taskDescription": formVal.taskDescription,
         "projectId": formVal.projectName,
         "taskHours": formVal.taskHours,
         "taskId":formVal.taskId,
         "assignedBy" : formVal.assignedBy,
         "createdBy":"kavya",
         "taskUId" :3
         
      };

      GlobalConfirmation({
      confirmButtonText:editFlag ? "Update" : "Save",
      successMsg:editFlag ? 'Updated' :'Saved',
      onConfirm: async () => {
          const res = await postAPi({ url:timesheetService.post.saveTask, data:payload})
         
          if (res.data) {
             fetchTasksData();
            setShowModal(false);
            Swal.fire( editFlag ? 'Updated!' :'Saved!', `Task ${editFlag ? 'Updated' :'Saved'} Successfully`, 'success');
             setShowModal(false);
          }
        },
      });
    }
  };


  const submitTasks = (data) =>{
//setButtonDisable(prev => ({ ...prev, [data.taskId]: true}));
     //  TasksFormik.resetForm();

     
        const formVal = TasksFormik.values
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
         "submittedBy": "kavya"
         
         
      };

    GlobalConfirmation({
      
      confirmButtonText: "Submit",
      successMsg: "Submitted",
      onConfirm: async () => {
      await paramsApi({ url: timesheetService.params.submitTask, data : payload })
      fetchTasksData();
        setShowModal(false);
      },
    });

     

  }

  const deleteTasks = (data) => {
    GlobalConfirmation({
      confirmButtonText: "Delete",
      successMsg: "Deleted",
      onConfirm: async () => {

        try{
       const res = await deleteApi({ url: timesheetService.delete.deleteTask, data: { actionMode: "Delete" , taskId: data.taskId } })
        fetchTasksData();
        setShowModal(false);
        }
        catch(error){

          if(response.error){

            Swal.fire("Unable to Delete Task");

          }

        }
      },
    });
  }

  // const getTasksList = async () => {
  //   const res = await paramsApi({ url: timesheetService.params.getDayPlayByDate, data: { uId: userData?.uId, date: '' } })
  //   setTaskList(res.data);
  // }


  // const getTaskList = async () =>{

  //   const res = await getApi({ url: timesheetService.get.getTaskList, data: { uId: userData?.uId, date: '' } })
  //   setTaskList(res.data);

  // }

  // useEffect(() => {
  //   getTaskList();
  // }, [])

  return (
    <>
      <Grid container spacing={2} sx={{ p: 1, alignItems: "center" ,mt: '68px', ml: '240px',}}>
        <Grid item size={5}>
          <Typography variant="h6">Tasks</Typography>
        </Grid>
        <Grid item size={2}>
          {/* <form id="user-form">
            <DynamicForm formTemplate={userForm} formFormik={userFormik} />
          </form> */}
        </Grid>
        <Grid item size={5} sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
          <CoreButton onClick={addTasks}>Add Task</CoreButton>
          <GlobalFilter onFilterChange={setFilterText} onMonthChange={setSelectedMonth} />
          
        </Grid>
      </Grid>
      <Box sx={{ px: 2 , ml: '240px'}}>
        <AgGridDataTable dtOptions={dtOptions} data={taskDataa} filterInput={filterText} />
      </Box>
      <Dialog open={showModal} onClose={() => setShowModal(false)} maxWidth="md" fullWidth>
        <DialogTitle>{editFlag ? "Edit Task" : "Add Task"}</DialogTitle>
        <DialogContent>
          <form onSubmit={TasksFormik.handleSubmit} id="dayplan-form">
            <DynamicForm formTemplate={TasksForm} formFormik={TasksFormik} size={4} />
          </form>
        </DialogContent>
        <DialogActions>
          <CoreButton onClick={saveTasks}>{editFlag ? "Update" : "Save"}</CoreButton>
          <CoreButton color={"secondary"} onClick={() => setShowModal(false)} >Close</CoreButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Tasks