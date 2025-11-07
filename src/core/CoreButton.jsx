import Button from '@mui/material/Button';


import React from 'react'

function CoreButton({ children, onClick, variant = "contained", color = "primary", size = "small" }) {
    return (
        <Button
        // sx = {{m:1}}
        sx={{
        m: { xs: 0.5, sm: 1 },                     
        px: { xs: 1.5, sm: 2, md: 3 },             
        py: { xs: 0.5, sm: 0.8, md: 1 },            
        fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.9rem" },
        borderRadius: { xs: "6px", sm: "8px", md: "10px" },
        width: { xs: "100%", sm: "auto" },        
      }}

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