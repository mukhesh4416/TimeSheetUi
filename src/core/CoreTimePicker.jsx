import React from 'react'
import TextField from '@mui/material/TextField';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'; // Optional, used for layout
import dayjs from 'dayjs';

function CoreTimePicker({label,formFormik,field}) {

  const { values, setFieldValue, touched, errors } = formFormik;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label={label}
        ampm={false}
        value={values[field] ? dayjs(values[field]) : null}
        onChange={(newValue) => {
          // Update Formik field value with ISO time or raw object
          setFieldValue(field, newValue ? newValue.toISOString() : null);
        }}
        slotProps={{
          textField: {
            size: "small",
            fullWidth: true,
            error: Boolean(touched[field] && errors[field]),
            helperText: touched[field] && errors[field] ? errors[field] : "",
          },
        }}
      />
    </LocalizationProvider>

  

 
    // <LocalizationProvider dateAdapter={AdapterDayjs}>
    //   <DemoContainer components={['TimePicker']}>
    //     <TimePicker
    //       label="Task Hours"
    //       value={value}
    //       ampm={false}
    //       onChange={(newValue) => setValue(newValue)}
    //         slotProps={{
    //             textField: {
    //                 size: 'small'
    //             },
    //         }}
            
    //     />
    //   </DemoContainer>
    // </LocalizationProvider>
  );
}

export default CoreTimePicker