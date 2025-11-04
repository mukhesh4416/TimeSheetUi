import React from 'react';
import { useField } from 'formik';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

const CustomdatePicker = ({ name, label, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const { setValue } = helpers;

  const handleChange = (newValue) => {
    // Convert dayjs object to a format suitable for your backend or Formik state
    setValue(newValue ? newValue.toISOString() : null); 
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={field.value ? dayjs(field.value) : null} // Convert stored value to dayjs object
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            {...props}
            name={name}
            error={meta.touched && !!meta.error}
            helperText={meta.touched && meta.error}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default CustomdatePicker;