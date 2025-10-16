import { Grid, TextField } from '@mui/material'
import { ErrorMessage } from 'formik';
import React from 'react'
import CoreTextField from './CoreTextField.jsx';
import CorePassword from './CorePassword.jsx';
import CoreSelect from './CoreSelect.jsx';
import CoreSearchSelect from './CoreSearchSelect.jsx';

function DynamicForm({ formTemplate, formFormik, size=12 }) {

  const formInputTemplate = (fieldConfig) => {
    switch (fieldConfig.type) {
      case "Text":
        return <CoreTextField field={fieldConfig.field} label={fieldConfig.label} formFormik={formFormik} multiline={fieldConfig?.multiline}/>

      case "Number":
        return <CoreTextField field={fieldConfig.field} label={fieldConfig.label} formFormik={formFormik} />
      case "Password":
        return <CorePassword field={fieldConfig.field} label={fieldConfig.label} formFormik={formFormik} />
      case "Select":
        return <CoreSelect field={fieldConfig.field} label={fieldConfig.label} formFormik={formFormik} selectList={fieldConfig.options} keyName={fieldConfig.key} valueName={fieldConfig.value} />
      case "SearchSelect":
        return <CoreSearchSelect field={fieldConfig.field} label={fieldConfig.label} formFormik={formFormik} options={fieldConfig.options} keyName={fieldConfig.keyName}
          valueName={fieldConfig.valueName}
          getOptionLabel={(option) => option[fieldConfig.valueName] || ''}
        />
      default:
        return null;
    }
  }

  return (
    <Grid container spacing={2}>
      {
        formTemplate?.map((fieldConfig) => {
          return <Grid size={size}>
              {formInputTemplate(fieldConfig)}
            </Grid>
        })
      }
    </Grid>
  )
}

export default DynamicForm