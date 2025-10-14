import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import timesheetService from '../shared/services/TimesheetService';
import { useParamsApiCallMutation, usePostApiCallMutation } from '../core/store/globalApi';
import CoreButton from '../core/CoreButton';
import { useFormik } from 'formik';
import CoreTextField from '../core/CoreTextField';
import CoreValidations from '../core/CoreValidations';
import * as yup from 'yup';

function Dayplan() {

  const [ paramsApi ] = useParamsApiCallMutation();
  const [ postAPi ] = usePostApiCallMutation();

  const userData = JSON.parse(sessionStorage.getItem("userData"))

  const coreValidations = new CoreValidations()
  const dayPlanValidations = yup.object().shape({
       taskName: coreValidations.stringValidation(2,50),
  });
  
  const rows = [{protein:"--"},{protein:"--"},{protein:"--"},{protein:"--"}]

  const dayplanFormik = useFormik({
      initialValues: {
        taskName: "",
        projectName: 0,
        assignedBy: 0,
        startTime: 0,
        endTime: 0
      },
    validationSchema: dayPlanValidations,

  });

  const addDayPlan = ()=>{

  }

  const getDayPlanList = async()=>{
    const res = await paramsApi({ url:timesheetService.params.getDayPlayByDate, data:{uId:userData?.uId,date:'2026-10-14'}})
  }

  useEffect(()=>{
    getDayPlanList();
  },[])

  return (
    <>
      <Grid container spacing={2} sx={{ p: 1, alignItems: "center" }}>
        <Grid item size={6}>
          <Typography variant="h6">Day Plan</Typography>
        </Grid>
        <Grid item size={6} sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
          <CoreButton onClick={addDayPlan}>Add Dayplan</CoreButton>
        </Grid>
      </Grid>
      <Box sx={{ p: 2 }}>
        <form onSubmit={dayplanFormik.handleSubmit} id="dayplan-form">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Task Name</TableCell>
                  <TableCell>Project</TableCell>
                  <TableCell>Assigned By</TableCell>
                  <TableCell>Start Time</TableCell>
                  <TableCell>End Time</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Total Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell sx={{m:0,p:0}}>
                      <CoreTextField field="taskName" label="Task Name" formFormik={dayplanFormik}/>
                    </TableCell>
                     <TableCell sx={{m:0,p:0}}>
                      <CoreTextField field="taskName" label="Task Name" formFormik={dayplanFormik}/>
                    </TableCell>
                        <TableCell sx={{m:0,p:0}}>
                      <CoreTextField field="taskName" label="Task Name" formFormik={dayplanFormik}/>
                    </TableCell>
                        <TableCell sx={{m:0,p:0}}>
                      <CoreTextField field="taskName" label="Task Name" formFormik={dayplanFormik}/>
                    </TableCell>
                        <TableCell sx={{m:0,p:0}}>
                      <CoreTextField field="taskName" label="Task Name" formFormik={dayplanFormik}/>
                    </TableCell>
                    <TableCell sx={{m:0,p:0}}>
                      <CoreTextField field="taskName" label="Task Name" formFormik={dayplanFormik}/>
                    </TableCell>
                    <TableCell sx={{m:0,p:0}}>
                      <CoreTextField field="taskName" label="Task Name" formFormik={dayplanFormik}/>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </form>
      </Box>
    </>
  )
}

export default Dayplan