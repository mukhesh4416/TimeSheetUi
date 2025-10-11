import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import DynamicForm from "../../shared/DynamicForm";
import { baseUrl } from "../../shared/global";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
  Paper,
  Box,
} from '@mui/material';
import AgGridDataTable from "../../shared/AgGridDataTable";

function Department() {
  const [departmentList, setDepartmentList] = useState([]);
  const [editFlag, setEditFlag] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const departmentForm = [
    { field: "departmentName", label: "Department Name", type: "Text" }
  ]

  const rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
  ];

  const columnDefs = [
    { field: 'make', sortable: true, filter: true },
    { field: 'model', sortable: true, filter: true },
    { field: 'price', sortable: true, filter: true },
  ];

  const departmentFormik = useFormik({
    initialValues: {
      departmentName: "",
      departmentId: 0
    },
  });

  const saveDepartment = async () => {
    const formVal = departmentFormik.values
    const payload = {
      "departmentId": 0,
      "departmentName": formVal.departmentName,
      "createdBy": "string",
      "actionMode": editFlag ? "update" : "insert",
    };
    const res = await axios.post(baseUrl + `user/saveDepartment`, payload);
    if (res.data) {
      getDepartmentData();
      setShowModal(false);
      alert(`Data ${editFlag ? "Updated" : "Saved"} successfully`);
    } else {
      alert("unable to add data");
    }
  };

  const addDepartment = () => {
    setShowModal(true);
  };

  const getDepartmentData = async () => {
    const res = await axios.get(baseUrl + `user/getAllDepartments`);
    setDepartmentList(res.data);
  };

  useEffect(() => {
    getDepartmentData();
  }, []);

  return (
    <div>
      <div>
         <Grid container>
        <Grid item xs={6}>1</Grid>
        <Grid item xs={6}>1</Grid>
        <Grid item xs={6}>1</Grid>
      </Grid>
    {/* <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} md={6}  lg={6}
        xl={6}>
        <Typography variant="h5">
          Department Registration
        </Typography>
      </Grid>

      <Grid
        item
        xs={12}
        md={6}
        lg={6}
        xl={6}
        sx={{
          display: 'flex',
          justifyContent: { xs: 'flex-start', md: 'flex-end' }, // responsive
        }}
      >
        <Button variant="outlined" color="error" onClick={addDepartment}>
          Add New Department
        </Button>
      </Grid>
    </Grid> */}
      </div>
      <Box sx={{p:2}}>
        <AgGridDataTable dtOptions={columnDefs} tableData={rowData} />
      </Box>
      <div>
        <Dialog open={showModal} onClose={() => setShowModal(false)} maxWidth="xs" fullWidth>
          <DialogTitle>{editFlag ? "Edit Department" : "Add New Department"}</DialogTitle>
          <DialogContent>
            <form onSubmit={departmentFormik.handleSubmit} id="department-form">
              <DynamicForm formTemplate={departmentForm} formFormik={departmentFormik} />
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              type="submit"
              form="department-form"
              variant="outlined"
              color="success"
              onClick={saveDepartment}
            >
              {editFlag ? "Update" : "Save"}
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

      </div>
    </div>
  );
}

export default Department;
