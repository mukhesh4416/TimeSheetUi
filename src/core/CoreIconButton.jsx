import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from '@mui/material'
import React from 'react'

function CoreIconButton({onClick, icon, title, disabled, size="sm", color="primary"}) {
  return (
     <IconButton title={title} onClick={onClick} color={color} size="small" disabled ={disabled} >
        <FontAwesomeIcon icon={icon} size={size} />
    </IconButton>
  )
}

export default CoreIconButton