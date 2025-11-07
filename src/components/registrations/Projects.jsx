import React, { useState } from "react";
import { useFormik } from "formik";
import DynamicForm from "../../core/DynamicForm";
import dayjs from "dayjs";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
} from '@mui/material';
import AgGridDataTable from "../../shared/agGrid/AgGridDataTable";
import GlobalFilter from "../../core/GlobalFilter";
import Grid from '@mui/material/Grid';
import CoreButton from "../../core/CoreButton";
import CoreIconButton from "../../core/CoreIconButton";
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import CoreValidations from "../../core/CoreValidations";
import * as yup from 'yup';
import Swal from "sweetalert2";
import { GlobalConfirmation } from "../../core/GlobalConfirmation";
import userService from "../../shared/services/UserService";
import { useDeleteApiCallMutation, useGetApiCallQuery, usePostApiCallMutation } from "../../core/store/globalApi";

function Projects() {

  // const {data:projectList,refetch:fetchProjects} = useGetApiCallQuery(userService.get.getAllProjects);
  const {data:projectList,refetch:fetchProjects} = useGetApiCallQuery(userService.get.getAllProjects);
  const [ postAPi ] = usePostApiCallMutation();
  const [ deleteApi ] = useDeleteApiCallMutation();
  const [exceptName, setExceptName] = useState(false);
  const [editFlag, setEditFlag] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [filterText, setFilterText] = useState(false);
  const userData = JSON.parse(sessionStorage.getItem("userData"))

  const coreValidations = new CoreValidations()
  const projectValidations = yup.object().shape({
    projectName: coreValidations.duplicateValidation(2,50,projectList,'projectName',exceptName),
  });

  const projectForm = [
    { field: "projectName", label: "Project Name", type: "Text" },
   // { field: "createdBy", label: "Project Manager", type: "Text" },
     { field: "startDate", label: "Start Date", type: "Date" },
     { field: "endDate", label: "End Date", type: "Date" }
  ]

  const projectFormik = useFormik({
    initialValues: {
      projectName: "",
     // createdBy: "",
      startDate:"",
      endDate:"",
      
    },
    //validationSchema: projectValidations,
  });

  const dtOptions = {
    columnDefs: [
      { field: "projectName", headerName: "Project Name", minWidth: 170 },
       { field: "createdBy", headerName: "Manager Name", minWidth: 170 },
      {
      field: "startDate",
      headerName: "Start Date",
      minWidth: 160,
      valueGetter: (params) => {
        const date = params?.data?.startDate || params?.value;
        return date ? dayjs(date).format("YYYY-MM-DD") : "";
      },
    },
    {
      field: "endDate",
      headerName: "End Date",
      minWidth: 160,
      valueGetter: (params) => {
        const date = params?.data?.endDate || params?.value;
        return date ? dayjs(date).format("YYYY/MM/DD") : "";
      },
    },
    
      { field: "createdDate", headerName: "Created On" },
      { field: "createdBy", headerName: "Created By" },
      {
        headerName: "Actions",
        field: "actions",
        minWidth: 150,
        cellRenderer: (params) => (
          <>
            <CoreIconButton icon={faEdit} onClick={() => editProject(params.data)} />
            <CoreIconButton icon={faTrashAlt} color="error" onClick={() => deleteProject(params.data)} />
          </>
        ),
      },
    ]
  }

  const addProject = () => {
    setExceptName('')
    setEditFlag(false)
    projectFormik.resetForm();
    setShowModal(true);
  };

  const editProject = (data) => {
    setExceptName(data.projectName)
    projectFormik.resetForm();
    projectFormik.setValues({
      projectName: data.projectName,
      projectId: data.projectId,
      startDate: data.startDate,
      endDate: data.endDate,
    })
    setEditFlag(true)
    setShowModal(true);
  };

  const deleteProject = (data) => {
    GlobalConfirmation({
      confirmButtonText:"Delete",
      successMsg:"Deleted",
       onConfirm: async () => {
        await deleteApi({ url:userService.delete.deleteProject, data:{projectId:data.projectId}})
        fetchProjects();
        setShowModal(false);
      },
    });
  }

  const saveProject = async () => {
    projectFormik.validateForm();
    projectFormik.setTouched({
      projectName: true,
    });
    const formVal = projectFormik.values
    if(projectFormik.isValid){
      const payload = {
        "projectId": formVal.projectId,
        "projectName": formVal.projectName,
       // "createdBy" : formVal.createdBy,
        "startDate":formVal.startDate,
        "endDate":formVal.endDate,
        "createdBy": userData?.profileName,
        "actionMode": editFlag ? "update" : "insert",
      };

      GlobalConfirmation({
      confirmButtonText:editFlag ? "Update" : "Save",
      successMsg:editFlag ? 'Updated' :'Saved',
      onConfirm: async () => {
          // const res = await postAPi({ url:userService.post.saveProject, data:payload})
          const res = await postAPi({ url:"http://10.100.72.249:8080/timeSheet.service/saveProject", data:payload})
          if (res.data) {
            fetchProjects();
            setShowModal(false);
            Swal.fire( editFlag ? 'Updated!' :'Saved!', `Project ${editFlag ? 'Updated' :'Saved'} Successfully`, 'success');
          }
        },
      });
    }
  };

  return (
    <>
      <Grid container spacing={2} sx={{ p: 1,px:2, alignItems: "center",mt: '68px', ml: '240px', }}>
        <Grid item size={6}>
          <Typography variant="h6">Project List</Typography>
        </Grid>
        <Grid item size={6} sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
          <CoreButton onClick={addProject}>Add Project</CoreButton>
          <GlobalFilter onFilterChange={setFilterText} />
        </Grid>
      </Grid>
      <Box sx={{ p: 2 , ml: '240px'}}>
        <AgGridDataTable dtOptions={dtOptions} data={projectList} filterInput={filterText} />
      </Box>
      <Dialog open={showModal} onClose={() => setShowModal(false)} maxWidth="xs" fullWidth>
        <DialogTitle>{editFlag ? "Edit Project" : "Add Project"}</DialogTitle>
        <DialogContent>
          <form onSubmit={projectFormik.handleSubmit} id="project-form">
            <DynamicForm formTemplate={projectForm} formFormik={projectFormik} />
            
          </form>
        </DialogContent>
        <DialogActions>
          <CoreButton onClick={saveProject}>{editFlag ? "Update" : "Save"}</CoreButton>
          <CoreButton color={"secondary"} onClick={() => setShowModal(false)} >Close</CoreButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Projects;
