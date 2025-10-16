import React from 'react'
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'; // Optional, used for layout
import dayjs from 'dayjs';

function CoreDatePicker({}) {
 const [value, setValue] = React.useState(dayjs());

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker
          label="Date"
          value={value}
          onChange={(newValue) => setValue(newValue)}
            slotProps={{
                textField: {
                    size: 'small'
                },
            }}
            
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default CoreDatePicker