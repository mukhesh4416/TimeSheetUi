

import { Autocomplete, TextField } from '@mui/material';
import React from 'react';

function CoreSearchSelect({
  field,
  autoSubmit = false,
  label,
  formFormik,
  options = [],
  keyName = 'label',   // label shown in UI
  valueName = 'value', // main value stored (like taskId)
  relatedFields = [],  // 👈 add related fields support
  getOptionLabel = (option) => option[keyName] || '',
}) {
  const { values, setFieldValue, handleBlur, touched, errors } = formFormik;

  // Current selected value
  //const value = options.find((opt) => opt[valueName] === values[field]) || null;

  const value = React.useMemo(() => {
  if (!options?.length) return null;
  return options.find((opt) => opt[valueName] === values[field]) || null;
}, [options, values[field], valueName]);

  const handleChange = (event, newValue) => {
    if (newValue) {
      // Set main field (like taskId)
      //console.log("Selected value:", newValue);
      setFieldValue(field, newValue[valueName]);

      // 👇 also set any related fields
      relatedFields.forEach((rel) => {
         console.log(`Setting ${rel.formKey} = ${newValue[rel.sourceKey]}`);
        setFieldValue(rel.formKey, newValue[rel.sourceKey] || '');
      });


 if (autoSubmit) {
        handleSubmit();
      }
     else {
      setFieldValue(field, '');
      relatedFields.forEach((rel) => setFieldValue(rel.formKey, ''));
    }


    } else {
      setFieldValue(field, '');
      relatedFields.forEach((rel) => setFieldValue(rel.formKey, ''));
    }
  };

  return (
    <Autocomplete
      id={field}
      options={options}
      value={value}
      onChange={handleChange}
      isOptionEqualToValue={(option, value) =>
        option[valueName] === value[valueName]
      }
      size="small"
      getOptionLabel={(option) => option[keyName] || ''}
      onBlur={handleBlur}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          name={field}
          error={Boolean(touched[field] && errors[field])}
          helperText={touched[field] && errors[field]}
        />
      )}
    />
  );
}

export default CoreSearchSelect;


// import { Autocomplete, TextField } from '@mui/material';
// import React from 'react';

// function CoreSearchSelect({
//   field,
//   label,
//   formFormik,
//   options = [],
//   keyName = 'label',  // label shown in UI
//   valueName = 'value', // value stored in form
//   getOptionLabel = (option) => option[keyName] || '',
// }) {
//   // Find the selected value by comparing stored form value to valueName
//   const value = options.find(
//     (opt) => opt[valueName] === formFormik.values[field]
//   ) || null;

//   return (
//     <Autocomplete
//       id={field}
//       options={options}
//       value={value}
//       onChange={(event, newValue) => {
//         // Store only the valueName field in formik
//         formFormik.setFieldValue(field, newValue ? newValue[valueName] : '');
//       }}
//       isOptionEqualToValue={(option, value) =>
//         option[valueName] === value[valueName]
//       }
//       size={'small'}
//       getOptionLabel={(option) => option[keyName] || ''}
//       onBlur={formFormik.handleBlur}
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           label={label}
//           name={field}
//           error={Boolean(formFormik.touched[field] && formFormik.errors[field])}
//           helperText={
//             formFormik.touched[field] && formFormik.errors[field]
//           }
//         />
//       )}
//     />
//   );
// }

// export default CoreSearchSelect;
