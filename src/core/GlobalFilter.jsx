import { TextField } from '@mui/material'
import React from 'react'

function GlobalFilter({ onFilterChange }) {
  return (
    <div width="150px" className={"globalFilter"}>
      <TextField
        width="100px"
        label={"Search"}
        variant="outlined"
        name="filter"
        onChange={(e) => onFilterChange(e.target.value)}
        size="small"
      />
    </div>
  )
}

export default GlobalFilter