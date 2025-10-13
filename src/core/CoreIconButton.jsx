import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton } from '@mui/material'
import React from 'react'

function CoreIconButton({onClick, icon, size="sm", color="primary"}) {
  return (
     <IconButton title="edit" onClick={onClick} color={color} size="small" >
        <FontAwesomeIcon icon={icon} size={size} />
    </IconButton>
  )
}

export default CoreIconButton