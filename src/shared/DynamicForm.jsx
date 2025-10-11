import { TextField } from '@mui/material'
import React from 'react'

function DynamicForm({formTemplate, formFormik}) {

    

  const formInputTemplate = (fieldConfig) => {
    switch (fieldConfig.type) {
      case "Text":
        return (
          <div key={fieldConfig.field} style={{ marginBottom: '1rem' }}>
            <TextField
              id={fieldConfig.field}
              label={fieldConfig.label}
              variant="outlined"
              name={fieldConfig.field}
              onChange={formFormik.handleChange}
              onBlur={formFormik.handleBlur}
              value={formFormik.values[fieldConfig.field]}
              fullWidth
              size="medium"
              error={formFormik.touched[fieldConfig.field] && Boolean(formFormik.errors[fieldConfig.field])}
              helperText={formFormik.touched[fieldConfig.field] && formFormik.errors[fieldConfig.field]}
            />
          </div>
        )
      default:
        return null;
    }
  }

    return (
        <div>
            {
                formTemplate.map((fieldConfig)=>{
                    return formInputTemplate(fieldConfig)
                })
            }
        </div>
    )
}

export default DynamicForm