import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import DynamicForm from "../../core/DynamicForm";
import { baseUrl } from "../../shared/global";
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

function Department() {
  const [departmentList, setDepartmentList] = useState([]);
  const [exceptName, setExceptName] = useState(false);
  const [editFlag, setEditFlag] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [filterText, setFilterText] = useState(false);
  const userData = JSON.parse(sessionStorage.getItem("userData"))

  const coreValidations = new CoreValidations()
  const departmentValidations = yup.object().shape({
    departmentName: coreValidations.duplicateValidation(2,50,departmentList,'departmentName',exceptName),
  });

  const departmentForm = [
    { field: "departmentName", label: "Department Name", type: "Text" }
  ]

  const departmentFormik = useFormik({
    initialValues: {
      departmentName: "",
      departmentId: 0
    },
    validationSchema: departmentValidations,
  });

  const dtOptions = {
    columnDefs: [
      { field: "departmentName", headerName: "Department Name", minWidth: 170 },
      { field: "createdBy", headerName: "Created By" },
      {
        headerName: "Actions",
        field: "actions",
        minWidth: 150,
        cellRenderer: (params) => (
          <>
            <CoreIconButton icon={faEdit} onClick={() => editDepartment(params.data)} />
            <CoreIconButton icon={faTrashAlt} color="error" onClick={() => deleteDepartment(params.data)} />
          </>
        ),
      },
    ]
  }

  const addDepartment = () => {
    setExceptName('')
    departmentFormik.resetForm();
    setShowModal(true);
  };

  const editDepartment = (data) => {
    setExceptName(data.departmentName)
    departmentFormik.resetForm();
    departmentFormik.setValues({
      departmentName: data.departmentName,
      departmentId: data.departmentId
    })
    setEditFlag(true)
    setShowModal(true);
  };

  const deleteDepartment = (data) => {
    GlobalConfirmation({
      confirmButtonText:"Delete",
      successMsg:"Deleted",
       onConfirm: async () => {
        await axios.delete(baseUrl + `user/globalDelete?actionMode=${'Department'}&id=${data.departmentId}`);
        getDepartmentData();
        setShowModal(false);
      },
    });
  }

  const saveDepartment = async () => {
    departmentFormik.validateForm();
    departmentFormik.setTouched({
      departmentName: true,
    });
    const formVal = departmentFormik.values
    if(departmentFormik.isValid){
      const payload = {
        "departmentId": formVal.departmentId,
        "departmentName": formVal.departmentName,
        "createdBy": userData?.profileName,
        "actionMode": editFlag ? "update" : "insert",
      };

      GlobalConfirmation({
      confirmButtonText:editFlag ? "Update" : "Save",
      successMsg:editFlag ? 'Updated' :'Saved',
      onConfirm: async () => {
          const res = await axios.post(baseUrl + `user/saveDepartment`, payload);
          if (res.data) {
            getDepartmentData();
            setShowModal(false);
            Swal.fire( editFlag ? 'Updated!' :'Saved!', `Department ${editFlag ? 'Updated' :'Saved'} Successfully`, 'success');
          }
        },
      });
    }
  };

  const getDepartmentData = async () => {
    const res = await axios.get(baseUrl + `user/getAllDepartments`);
    setDepartmentList(res.data);
  };

  useEffect(() => {
    getDepartmentData();
  }, []);

  return (
    <>
      <Grid container spacing={2} sx={{ p: 1, alignItems: "center" }}>
        <Grid item size={6}>
          <Typography variant="h6">Department Registration</Typography>
        </Grid>
        <Grid item size={6} sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
          <CoreButton onClick={addDepartment}>Add Department</CoreButton>
          <GlobalFilter onFilterChange={setFilterText} />
        </Grid>
      </Grid>
      <Box sx={{ p: 2 }}>
        <AgGridDataTable dtOptions={dtOptions} data={departmentList} filterInput={filterText} />
      </Box>
      <Dialog open={showModal} onClose={() => setShowModal(false)} maxWidth="xs" fullWidth>
        <DialogTitle>{editFlag ? "Edit Department" : "Add New Department"}</DialogTitle>
        <DialogContent>
          <form onSubmit={departmentFormik.handleSubmit} id="department-form">
            <DynamicForm formTemplate={departmentForm} formFormik={departmentFormik} />
          </form>
        </DialogContent>
        <DialogActions>
          <CoreButton onClick={saveDepartment}>{editFlag ? "Update" : "Save"}</CoreButton>
          <CoreButton color={"secondary"} onClick={() => setShowModal(false)} >Close</CoreButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Department;
