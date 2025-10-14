import { TextField } from '@mui/material'
import React from 'react'

function CoreTextField({field,label,formFormik}) {
  return (
    <TextField
      // sx={{my:1}}
      id={field}
      label={label}
      variant="outlined"
      name={field}
      onChange={formFormik.handleChange}
      onBlur={formFormik.handleBlur}
      value={formFormik.values[field]}
      fullWidth
      size="medium"
       error={
        Boolean(formFormik.touched[field] && formFormik.errors[field])
      }
      helperText={
        formFormik.touched[field] && formFormik.errors[field]
      }
    />
  )
}

export default CoreTextField