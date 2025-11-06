import { TextField, Stack ,MenuItem} from "@mui/material";
import React from "react";

function GlobalFilter({ onFilterChange, onMonthChange, onChange, statusList=[]}) {
  return (
    <>
    <Stack direction="row" spacing={2} alignItems="center">
      {/* Search Field */}
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        onChange={(e) => onFilterChange(e.target.value)}
 sx={{
    width: 200,
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      backgroundColor: (theme) => theme.palette.background.paper,
      '&.Mui-focused fieldset': {
        borderColor: (theme) => theme.palette.primary.main,
      },
    },
  }}

      />

      {/* Date Field */}
      <TextField
      
        label="Select Month"
        type="month"
        size="small"
  
        onChange={(e) => onMonthChange(e.target.value)}

  sx={{
    width: 200,
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      backgroundColor: (theme) => theme.palette.background.paper,
      '&.Mui-focused fieldset': {
        borderColor: (theme) => theme.palette.primary.main,
      },
    },
  }}

      />
    </Stack>

     {/* <TextField
     spacing={2}
        label="Select"
        select
        size="small"
        defaultValue=""
        onChange={(e) => onChange(e.target.value)}
      >
         <MenuItem value="">All</MenuItem>
        {statusList.map((item, index) => (
          <MenuItem key={index} value={item.value || item}>
            {item.label || item}
          </MenuItem>
        ))}
      </TextField> */}
      </>
  );
}

export default GlobalFilter;


// import { TextField } from '@mui/material'
// import React from 'react'

// function GlobalFilter({ onFilterChange }) {
//   return (
//     <div width="150px" className={"globalFilter"}>
//       <TextField
//         width="100px"
//         label={"Search"}
//         variant="outlined"
//         name="filter"
//         onChange={(e) => onFilterChange(e.target.value)}
//         size="small"
//       />
//     </div>
//   )
// }

// export default GlobalFilter


