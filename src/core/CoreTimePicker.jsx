import React from 'react'
import TextField from '@mui/material/TextField';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'; // Optional, used for layout
import dayjs from 'dayjs';

function CoreTimePicker({}) {
 const [value, setValue] = React.useState(dayjs());

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimePicker']}>
        <TimePicker
          label="Task Hours"
          value={value}
          ampm={false}
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

export default CoreTimePicker