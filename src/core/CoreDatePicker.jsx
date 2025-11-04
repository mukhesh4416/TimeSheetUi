import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function CoreDatePicker({ label, formFormik, field }) {
  const { values, setFieldValue } = formFormik;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={values[field] ? dayjs(values[field]) : null}
        onChange={(newValue) => {
          // update Formik's field value
         setFieldValue(field, newValue ? newValue.toISOString() : null);
         //setFieldValue(field, newValue);
        }}
        slotProps={{
          textField: {
            size: "small",
            fullWidth: true,
            error: Boolean(formFormik.touched[field] && formFormik.errors[field]),
            helperText:
              formFormik.touched[field] && formFormik.errors[field]
                ? formFormik.errors[field]
                : "",
          },
        }}
      />
    </LocalizationProvider>
  );
}

export default CoreDatePicker;


// import React from 'react'
// import TextField from '@mui/material/TextField';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo'; // Optional, used for layout
// import dayjs from 'dayjs';

// function CoreDatePicker({label,formFormik,field}) {
//  const [value, setValue] = React.useState(dayjs());

//   return (
 
  
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DemoContainer components={['DatePicker']}>
//         <DatePicker
//           label={label}
//           value={value}
//           onChange={(newValue) => setValue(newValue)}
//             slotProps={{
//                 textField: {
//                     size: 'small'
//                 },
//             }}
            
//         />
//       </DemoContainer>
//     </LocalizationProvider>
//   );
// }

// export default CoreDatePicker