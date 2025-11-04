import React, { useState } from "react";
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
import userService from "../../shared/services/UserService";
import { useDeleteApiCallMutation, useGetApiCallQuery, usePostApiCallMutation } from "../../core/store/globalApi";

function Designation() {

  const {data:designationList,refetch:fetchDesignations} = useGetApiCallQuery(userService.get.getAllDesignations);
  const [ postAPi ] = usePostApiCallMutation();
  const [ deleteApi ] = useDeleteApiCallMutation();
  const [exceptName, setExceptName] = useState(false);
  const [editFlag, setEditFlag] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [filterText, setFilterText] = useState(false);
  const userData = JSON.parse(sessionStorage.getItem("userData"))

  const coreValidations = new CoreValidations()
  const designationValidations = yup.object().shape({
    designationName: coreValidations.duplicateValidation(2,50,designationList,'designationName',exceptName),
  });

  const designationForm = [
    { field: "designationName", label: "Designation Name", type: "Text" }
  ]

  const designationFormik = useFormik({
    initialValues: {
      designationName: "",
      designationId: 0
    },
    validationSchema: designationValidations,
  });

  const dtOptions = {
    columnDefs: [
      { field: "designationName", headerName: "Designation Name", minWidth: 170 },
      { field: "createdBy", headerName: "Created By" },
      {
        headerName: "Actions",
        field: "actions",
        minWidth: 150,
        cellRenderer: (params) => (
          <>
            <CoreIconButton icon={faEdit} onClick={() => editDesignation(params.data)} />
            <CoreIconButton icon={faTrashAlt} color="error" onClick={() => deleteDesignation(params.data)} />
          </>
        ),
      },
    ]
  }

  const addDesignation = () => {
    setExceptName('')
    setEditFlag(false)
    designationFormik.resetForm();
    setShowModal(true);
  };

  const editDesignation = (data) => {
    setExceptName(data.designationName)
    designationFormik.resetForm();
    designationFormik.setValues({
      designationName: data.designationName,
      designationId: data.designationId
    })
    setEditFlag(true)
    setShowModal(true);
  };

  const deleteDesignation = (data) => {
    GlobalConfirmation({
      confirmButtonText:"Delete",
      successMsg:"Deleted",
       onConfirm: async () => {
        await deleteApi({ url:userService.delete.globalDelete, data:{actionMode:'Designation',id:data.designationId}})
        fetchDesignations();
        setShowModal(false);
      },
    });
  }

  const saveDesignation = async () => {
    designationFormik.validateForm();
    designationFormik.setTouched({
      designationName: true,
    });
    const formVal = designationFormik.values
    if(designationFormik.isValid){
      const payload = {
        "designationId": formVal.designationId,
        "designationName": formVal.designationName,
        "createdBy": userData?.profileName,
        "actionMode": editFlag ? "update" : "insert",
      };

      GlobalConfirmation({
      confirmButtonText:editFlag ? "Update" : "Save",
      successMsg:editFlag ? 'Updated' :'Saved',
      onConfirm: async () => {
          const res = await postAPi({ url:userService.post.saveDesignation, data:payload})
          if (res.data) {
            fetchDesignations();
            setShowModal(false);
            Swal.fire( editFlag ? 'Updated!' :'Saved!', `Designation ${editFlag ? 'Updated' :'Saved'} Successfully`, 'success');
          }
        },
      });
    }
  };

  return (
    <>
      <Grid container spacing={2} sx={{ p: 1, px:2,alignItems: "center", mt: '68px', ml: '240px',}}>
        <Grid item size={6}>
          <Typography variant="h6">Designation List</Typography>
        </Grid>
        <Grid item size={6} sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
          <CoreButton onClick={addDesignation}>Add Designation</CoreButton>
          <GlobalFilter onFilterChange={setFilterText} />
        </Grid>
      </Grid>
      <Box sx={{ p: 2 , ml: '240px' }}>
        <AgGridDataTable dtOptions={dtOptions} data={designationList} filterInput={filterText} />
      </Box>
      <Dialog open={showModal} onClose={() => setShowModal(false)} maxWidth="xs" fullWidth>
        <DialogTitle>{editFlag ? "Edit Designation" : "Add Designation"}</DialogTitle>
        <DialogContent>
          <form onSubmit={designationFormik.handleSubmit} id="designation-form">
            <DynamicForm formTemplate={designationForm} formFormik={designationFormik} />
          </form>
        </DialogContent>
        <DialogActions>
          <CoreButton onClick={saveDesignation}>{editFlag ? "Update" : "Save"}</CoreButton>
          <CoreButton color={"secondary"} onClick={() => setShowModal(false)} >Close</CoreButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Designation;
