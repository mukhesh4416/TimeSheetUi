import React from 'react'
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'; // Optional, used for layout
import dayjs from 'dayjs';

function CoreDateTimePicker({label,formFormik, field}) {
  const { values, setFieldValue } = formFormik;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DateTimePicker
          label={label}
           value={values[field] ? dayjs(values[field]) : null}
                  onChange={(newValue) => {
                  
                   setFieldValue(field, newValue ? newValue.format("YYYY-MM-DD HH:mm:ss") : null);}}
                   
          // value={value}
          // onChange={(newValue) => setValue(newValue)}
            slotProps={{
                textField: {
                    size: 'small',
                     fullWidth: true,
            error: Boolean(formFormik.touched[field] && formFormik.errors[field]),
            helperText:
              formFormik.touched[field] && formFormik.errors[field]
                ? formFormik.errors[field]
                : "",
                },
            }}
            
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default CoreDateTimePicker