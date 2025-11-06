import Button from '@mui/material/Button';


import React from 'react'

function CoreButton({ children, onClick, variant = "contained", color = "primary", size = "medium" }) {
    return (
        <Button
        sx = {{m:1}}

            variant={variant}
            color={color}
            backgroundColor= '#FFA500'
             
            size={size}
            onClick={onClick}
        >
            {children}
        </Button>
    )
}

export default CoreButton