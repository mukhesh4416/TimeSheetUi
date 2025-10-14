import { Autocomplete, TextField } from '@mui/material';
import React from 'react';

function CoreSearchSelect({
  field,
  label,
  formFormik,
  options = [],
  keyName = 'label',  // label shown in UI
  valueName = 'value', // value stored in form
  getOptionLabel = (option) => option[keyName] || '',
}) {
  // Find the selected value by comparing stored form value to valueName
  const value = options.find(
    (opt) => opt[valueName] === formFormik.values[field]
  ) || null;

  return (
    <Autocomplete
      id={field}
      options={options}
      value={value}
      onChange={(event, newValue) => {
        // Store only the valueName field in formik
        formFormik.setFieldValue(field, newValue ? newValue[valueName] : '');
      }}
      isOptionEqualToValue={(option, value) =>
        option[valueName] === value[valueName]
      }
      getOptionLabel={(option) => option[keyName] || ''}
      onBlur={formFormik.handleBlur}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          name={field}
          error={Boolean(formFormik.touched[field] && formFormik.errors[field])}
          helperText={
            formFormik.touched[field] && formFormik.errors[field]
          }
        />
      )}
    />
  );
}

export default CoreSearchSelect;
