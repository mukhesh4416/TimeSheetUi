import React from 'react'
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'; // Optional, used for layout
import dayjs from 'dayjs';

function CoreDateTimePicker({}) {
 const [value, setValue] = React.useState(dayjs());

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DateTimePicker
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

export default CoreDateTimePicker