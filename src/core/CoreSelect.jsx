import { FormControl, InputLabel, MenuItem, Select, FormHelperText } from '@mui/material';
import React from 'react';

function CoreSelect({ field, label, formFormik, selectList = [], keyName, valueName }) {
  const isError = Boolean(formFormik.touched[field] && formFormik.errors[field]);

  return (
    <FormControl fullWidth size="medium" error={isError}>
      <InputLabel id={`${field}-label`}>{label}</InputLabel>
      <Select
        id={field}
        labelId={`${field}-label`}
        label={label}
        name={field}
        value={formFormik.values[field]}
        onChange={formFormik.handleChange}
        onBlur={formFormik.handleBlur}
      >
        {/* <MenuItem value=""><em>None</em></MenuItem> */}
        {selectList.map((item) => (
          <MenuItem key={item[keyName]} value={item[keyName]}>
            {item[valueName]}
          </MenuItem>
        ))}
      </Select>
      {isError && <FormHelperText>{formFormik.errors[field]}</FormHelperText>}
    </FormControl>
  );
}

export default CoreSelect;
