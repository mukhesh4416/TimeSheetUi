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

function UserRegistration() {

  const {data:departmentList} = useGetApiCallQuery(userService.get.getAllDepartments);
  const {data:desingationList} = useGetApiCallQuery(userService.get.getAllDesignations);
  const {data:usersList,refetch:fetchUsers} = useGetApiCallQuery(userService.get.getAllUsersList);
  const [ postAPi ] = usePostApiCallMutation();
  const [ deleteApi ] = useDeleteApiCallMutation();
  const [exceptName, setExceptName] = useState(false);
  const [editFlag, setEditFlag] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [filterText, setFilterText] = useState(false);
  const userData = JSON.parse(sessionStorage.getItem("userData"))

  const coreValidations = new CoreValidations()
  const userValidations = yup.object().shape({
    // userName: coreValidations.duplicateValidation(2,50,userList,'userName',exceptName),
  });

  const userForm = [
    { field: "userName", label: "User Name", type: "Text" },
    { field: "profileName", label: "Profile Name", type: "Text" },
    { field: "mailId", label: "Mail Id", type: "Text" },
    { field: "empCode", label: "Employee Code", type: "Text" },
    { field: "phoneNumber", label: "Phone Number", type: "Text" },
    { field: "department", label: "Department", type: "SearchSelect", options:departmentList, keyName:"departmentName", valueName:"departmentId" },
    { field: "designation", label: "Designation", type: "SearchSelect", options:desingationList, keyName:"designationName", valueName:"designationId" },
    { field: "reportingLevel", label: "Reporting Level", type: "SearchSelect", options:usersList, keyName:"profileName", valueName:"uid" },
  ]

  const userFormik = useFormik({
    initialValues: {
      userName:"",
      profileName:"",
      mailId:"",
      empCode:"",
      phoneNumber:"",
      department:"",
      designation:"",
      reportingLevel:"",
    },
    validationSchema: userValidations,
  });

  const dtOptions = {
    columnDefs: [
      { field: "profileName", headerName: "Profile Name", minWidth: 170 },
      { field: "empCode", headerName: "Employee Code", minWidth: 170 },
      { field: "userName", headerName: "User Name", minWidth: 170 },
      { field: "mailId", headerName: "Mail Id", minWidth: 170 },
      { field: "phoneNumber", headerName: "Phone Number", minWidth: 170 },
      { field: "departmentName", headerName: "Department", minWidth: 170 },
      { field: "designationName", headerName: "Designation", minWidth: 170 },
      { field: "rlName", headerName: "Reporting Level", minWidth: 170 },
      { field: "createdBy", headerName: "Created By" },
      {
        headerName: "Actions",
        field: "actions",
        minWidth: 150,
        cellRenderer: (params) => (
          <>
            <CoreIconButton icon={faEdit} onClick={() => editUser(params.data)} />
            <CoreIconButton icon={faTrashAlt} color="error" onClick={() => deleteUser(params.data)} />
          </>
        ),
      },
    ]
  }

  const addUser = () => {
    setExceptName('')
    setEditFlag(false)
    userFormik.resetForm();
    setShowModal(true);
  };

  const editUser = (data) => {
    setExceptName(data.userName)
    userFormik.resetForm();
    userFormik.setValues({
      userName: data.userName,
      userId: data.userId
    })
    setEditFlag(true)
    setShowModal(true);
  };

  const deleteUser = (data) => {
    GlobalConfirmation({
      confirmButtonText:"Delete",
      successMsg:"Deleted",
      onConfirm: async () => {
        await deleteApi({ url:userService.delete.globalDelete, data:{actionMode:'User',id:data.uid}})
        fetchUsers();
        setShowModal(false);
      },
    });
  }

  const saveUser = async () => {
    console.log(userFormik.values)
    userFormik.validateForm();
    userFormik.setTouched({
      userName: true,
    });
    const formVal = userFormik.values
    if(userFormik.isValid){
      const payload = {
        "actionMode": editFlag?'update':'insert',
        "userName": formVal.userName,
        "profileName":  formVal.profileName,
        "mailId": formVal.mailId,
        "password": formVal.userName+'@123',
        "reportingLevel": formVal.reportingLevel,
        "designationId": formVal.designation,
        "departmentId": formVal.department,
        "empCode": formVal.empCode,
        "phoneNumber": formVal.phoneNumber,
        "createdBy": userData?.profileName,
      };

      GlobalConfirmation({
      confirmButtonText:editFlag ? "Update" : "Save",
      successMsg:editFlag ? 'Updated' :'Saved',
      onConfirm: async () => {
          const res = await postAPi({ url:userService.post.userRegistration, data:payload})
          if (res.data) {
            fetchUsers();
            setShowModal(false);
            Swal.fire( editFlag ? 'Updated!' :'Saved!', `User ${editFlag ? 'Updated' :'Saved'} Successfully`, 'success');
          }
        },
      });
    }
  };

  return (
    <>
      <Grid container spacing={2} sx={{ p: 1, alignItems: "center" }}>
        <Grid item size={6}>
          <Typography variant="h6">Users List</Typography>
        </Grid>
        <Grid item size={6} sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
          <CoreButton onClick={addUser}>Add User</CoreButton>
          <GlobalFilter onFilterChange={setFilterText} />
        </Grid>
      </Grid>
      <Box sx={{ p: 2 }}>
        <AgGridDataTable dtOptions={dtOptions} data={usersList} filterInput={filterText} />
      </Box>
      <Dialog open={showModal} onClose={() => setShowModal(false)} maxWidth="lg" fullWidth>
        <DialogTitle>{editFlag ? "Edit User" : "Add User"}</DialogTitle>
        <DialogContent>
          <form onSubmit={userFormik.handleSubmit} id="user-form">
            <DynamicForm formTemplate={userForm} formFormik={userFormik} size={4} />
          </form>
        </DialogContent>
        <DialogActions>
          <CoreButton onClick={saveUser}>{editFlag ? "Update" : "Save"}</CoreButton>
          <CoreButton color={"secondary"} onClick={() => setShowModal(false)} >Close</CoreButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UserRegistration;
