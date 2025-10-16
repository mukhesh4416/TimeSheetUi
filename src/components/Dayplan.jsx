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
import CoreDatePicker from '../core/coreDatePicker';

function Dayplan() {
  const userData = JSON.parse(sessionStorage.getItem("userData"))

  const {data:projectList} = useGetApiCallQuery(userService.get.getAllProjects);
  const {data:downTeamList} = useGetApiCallQuery(`${userService.get.getDownTeamList}+${userData?.uid}`);
  const {data:usersList} = useGetApiCallQuery(userService.get.getUserList);
  const [paramsApi] = useParamsApiCallMutation();
  const [postAPi] = usePostApiCallMutation();

  const [dayPlanList, setDayPlanList] = useState([])
  const [filterText, setFilterText] = useState();
  const [editFlag, setEditFlag] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const coreValidations = new CoreValidations()
  const dayPlanValidations = yup.object().shape({
    taskName: coreValidations.stringValidation(2, 50),
  });

  const dtOptions = {
    columnDefs: [
      { field: "taskName", headerName: "Task Name" },
      { field: "projectName", headerName: "Project Name" },
      { field: "assignedBy", headerName: "Assigned By" },
      { field: "taskDescription", headerName: "Description" },
      { field: "startTime", headerName: "Start Time" },
      { field: "endTime", headerName: "End Time" },
      { field: "createdBy", headerName: "Created By" },
      {
        headerName: "Actions",
        field: "actions",
        minWidth: 150,
        cellRenderer: (params) => (
          <>
            <CoreIconButton icon={faEdit} onClick={() => editDayplan(params.data)} />
            <CoreIconButton icon={faTrashAlt} color="error" onClick={() => deleteDayplan(params.data)} />
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

  const dayplanForm = [
    { field: "taskName", label: "Task Name", type: "Text" },
    { field: "projectName", label: "Project Name", type: "Text", type: "SearchSelect" , options:projectList, keyName:"projectName", valueName:"projectId" },
    { field: "assignedBy", label: "Assigned By", type: "SearchSelect", options:usersList, keyName:"profileName", valueName:"uid" },
    { field: "startTime", label: "Start Time", type: "Text" },
    { field: "endTime", label: "End Time", type: "Text" },
    { field: "taskDescription", label: "Description", type: "Text", multiline:true },
  ]

  const dayplanFormik = useFormik({
    initialValues: {
      taskName: "",
      projectName: "",
      assignedBy: "",
      startTime: "",
      endTime: "",
      taskDescription: ""
    },
    validationSchema: dayPlanValidations,
  });

  const addDayPlan = () => {
    dayplanFormik.resetForm();
    setEditFlag(false)
    setShowModal(true)
  }

  const editDayplan = (data) => {
    dayplanFormik.resetForm();
    dayplanFormik.setValues({
      projectName: data.projectName,
      assignedBy: data.assignedBy,
      startTime: data.startTime,
      endTime: data.endTime,
      taskDescription: data.taskDescription
    })
    setEditFlag(true)
    setShowModal(true);
  };

    const saveDayplan = async () => {
    dayplanFormik.validateForm();
    dayplanFormik.setTouched({
    });
    const formVal = dayplanFormik.values
    if(dayplanFormik.isValid){
      const payload = {
        "createdBy": userData?.profileName,
        "actionMode": editFlag ? "update" : "insert",
      };

      GlobalConfirmation({
      confirmButtonText:editFlag ? "Update" : "Save",
      successMsg:editFlag ? 'Updated' :'Saved',
      onConfirm: async () => {
          const res = await postAPi({ url:userService.post.saveDepartment, data:payload})
          if (res.data) {
            setShowModal(false);
            Swal.fire( editFlag ? 'Updated!' :'Saved!', `Dayplan ${editFlag ? 'Updated' :'Saved'} Successfully`, 'success');
          }
        },
      });
    }
  };

  const deleteDayplan = (data) => {
    GlobalConfirmation({
      confirmButtonText: "Delete",
      successMsg: "Deleted",
      onConfirm: async () => {
        // await deleteApi({ url: timesheetService.delete.globalDelete, data: { actionMode: 'Department', id: data.departmentId } })
        setShowModal(false);
      },
    });
  }

  const getDayPlanList = async () => {
    const res = await paramsApi({ url: timesheetService.params.getDayPlayByDate, data: { uId: userData?.uId, date: '2026-10-14' } })
    setDayPlanList(res.data);
  }

  useEffect(() => {
    getDayPlanList();
  }, [])

  return (
    <>
      <Grid container spacing={2} sx={{ p: 1, alignItems: "center" }}>
        <Grid item size={5}>
          <Typography variant="h6">Day Plan</Typography>
        </Grid>
        <Grid item size={2}>
          <form id="user-form">
            <DynamicForm formTemplate={userForm} formFormik={userFormik} />
          </form>
        </Grid>
        <Grid item size={5} sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
          <CoreButton onClick={addDayPlan}>Add Dayplan</CoreButton>
          <GlobalFilter onFilterChange={setFilterText} />
          <CoreDatePicker/>
        </Grid>
      </Grid>
      <Box sx={{ px: 2 }}>
        <AgGridDataTable dtOptions={dtOptions} data={dayPlanList} filterInput={filterText} />
      </Box>
      <Dialog open={showModal} onClose={() => setShowModal(false)} maxWidth="md" fullWidth>
        <DialogTitle>{editFlag ? "Edit Dayplan" : "Add Dayplan"}</DialogTitle>
        <DialogContent>
          <form onSubmit={dayplanFormik.handleSubmit} id="dayplan-form">
            <DynamicForm formTemplate={dayplanForm} formFormik={dayplanFormik} size={4} />
          </form>
        </DialogContent>
        <DialogActions>
          <CoreButton onClick={saveDayplan}>{editFlag ? "Update" : "Save"}</CoreButton>
          <CoreButton color={"secondary"} onClick={() => setShowModal(false)} >Close</CoreButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Dayplan