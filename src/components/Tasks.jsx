import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import timesheetService from '../shared/services/TimesheetService';
import { useGetApiCallQuery, useParamsApiCallMutation, usePostApiCallMutation } from '../core/store/globalApi';
import CoreButton from '../core/CoreButton';
import { useFormik } from 'formik';
import CoreTextField from '../core/CoreTextField';
import CoreValidations from '../core/CoreValidations';
import * as yup from 'yup';
import AgGridDataTable from '../shared/agGrid/AgGridDataTable';
import GlobalFilter from '../core/GlobalFilter';
import DynamicForm from '../core/DynamicForm';
import userService from '../shared/services/UserService';
import { GlobalConfirmation } from '../core/GlobalConfirmation';
import CoreDatePicker from '../core/coreDatePicker';

function Tasks() {
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  

  const {data:projectList} = useGetApiCallQuery(userService.get.getAllProjects);
  const {data:downTeamList} = useGetApiCallQuery(`${userService.get.getDownTeamList}+${userData?.uid}`);
  const {data:usersList} = useGetApiCallQuery(userService.get.getUserList);
  const [paramsApi] = useParamsApiCallMutation();
  const [postAPi] = usePostApiCallMutation();
  

  const [taskList, setTaskList] = useState([])
  const [filterText, setFilterText] = useState();
  const [editFlag, setEditFlag] = useState(false);
  const [showModal, setShowModal] = useState(false);


  const coreValidations = new CoreValidations()
  const dayPlanValidations = yup.object().shape({
    taskName: coreValidations.stringValidation(2, 50),
  });


  const taskValidations = yup.object().shape({
    taskName:coreValidations.stringValidation(2,50),
  });

  const dtOptions = {
    columnDefs: [
      { field: "taskName", headerName: "Task Name" },
      { field: "projectName", headerName: "Project Name" },
      { field: "assignedTo", headerName: "Assigned By" },
      { field: "taskDescription", headerName: "Task Description" },
      { field: "taskHours", headerName: "Task Hours" },
      { field: "createdBy", headerName: "Created By" },
      {
        headerName: "Actions",
        field: "actions",
        minWidth: 150,
        cellRenderer: (params) => (
          <>
            <CoreIconButton icon={faEdit} onClick={() => editTasks(params.data)} />
            <CoreIconButton icon={faTrashAlt} color="error" onClick={() => deleteTasks(params.data)} />
          </>
        ),
      },
    ]
  }

  const userFormik = useFormik({
      initialValues: {
        uid: userData?.uid,
      },
    });
  const userForm = [
    { field: "uId", label: "Employee Name", type: "SearchSelect", options:downTeamList, keyName:"profileName", valueName:"uid" }
  ]

  const TasksForm = [
    { field: "taskName", label: "Task Name", type: "Text" },
    { field: "projectName", label: "Project Name", type: "Text", type: "SearchSelect" , options:projectList, keyName:"projectName", valueName:"projectId" },
    { field: "assignedTo", label: "Assigned To", type: "SearchSelect", options:usersList, keyName:"profileName", valueName:"uid" },
    { field: "taskHours", label: "Task Hours", type: "Time" },
    { field: "taskDescription", label: "Description", type: "Text", multiline:true },
  ]

  const TasksFormik = useFormik({
    initialValues: {
      taskName: "",
      projectName: "",
      assignedTo: "",
      taskHours: "",
      taskDescription: "",
    
    },
    validationSchema: taskValidations,
  });

  const addTasks = () => {
    TasksFormik.resetForm();
    setEditFlag(false)
    setShowModal(true)
  }

  const editTasks = (data) => {
    TasksFormik.resetForm();
    TasksFormik.setValues({
      projectName: data.projectName,
      assignedBy: data.assignedBy,
      startTime: data.startTime,
      endTime: data.endTime,
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
         "projectId": 0,
         "assignId": 0,
         "assignName": "string",
         "hours": formVal.taskHours,
      };

      GlobalConfirmation({
      confirmButtonText:editFlag ? "Update" : "Save",
      successMsg:editFlag ? 'Updated' :'Saved',
      onConfirm: async () => {
          const res = await postAPi({ url:timesheetService.post.saveTask, data:payload})
          if (res.data) {
            setShowModal(false);
            Swal.fire( editFlag ? 'Updated!' :'Saved!', `Task ${editFlag ? 'Updated' :'Saved'} Successfully`, 'success');
          }
        },
      });
    }
  };

  const deleteTasks = (data) => {
    GlobalConfirmation({
      confirmButtonText: "Delete",
      successMsg: "Deleted",
      onConfirm: async () => {
        // await deleteApi({ url: timesheetService.delete.globalDelete, data: { actionMode: 'Department', id: data.departmentId } })
        setShowModal(false);
      },
    });
  }

  const getTasksList = async () => {
    const res = await paramsApi({ url: timesheetService.params.getDayPlayByDate, data: { uId: userData?.uId, date: '2026-10-14' } })
    setTaskList(res.data);
  }

  useEffect(() => {
    getTasksList();
  }, [])

  return (
    <>
      <Grid container spacing={2} sx={{ p: 1, alignItems: "center" }}>
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
          <GlobalFilter onFilterChange={setFilterText} />
          
        </Grid>
      </Grid>
      <Box sx={{ px: 2 }}>
        <AgGridDataTable dtOptions={dtOptions} data={taskList} filterInput={filterText} />
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