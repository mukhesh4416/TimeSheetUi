import Button from '@mui/material/Button';
import React from 'react';

function CoreButton({
  children,
  onClick,
  variant = "contained",
  color = "primary",
  size = "small",
  width = "100px",      // ✅ default fixed width
  height = "40px"       // ✅ default fixed height
}) {
  return (
    <Button
      sx={{
        m: { xs: 0.5, sm: 1 },
        fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.9rem" },
        borderRadius: { xs: "6px", sm: "8px", md: "10px" },

        // ✅ FIXED width & height (overrides padding)
        width: { xs: "100%", sm: width },
        height: height,

        // ✅ Remove default MUI padding when fixed height is used
        padding: 0,

        // ✅ Button color
        backgroundColor: "#003366ff",
        "&:hover": {
          backgroundColor: "#001F3F",
        },
      }}
      variant={variant}
      color={color}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export default CoreButton;

// import Button from '@mui/material/Button';


// import React from 'react'

// function CoreButton({ children, onClick, variant = "contained", color = "primary", size = "small" }) {
//     return (
//         <Button
//         // sx = {{m:1}}
//         sx={{
//         m: { xs: 0.5, sm: 1 },                     
//         px: { xs: 1.5, sm: 2, md: 3 },             
//         py: { xs: 0.5, sm: 0.8, md: 1 },            
//         fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.9rem" },
//         borderRadius: { xs: "6px", sm: "8px", md: "10px" },
//         width: { xs: "100%", sm: "auto" },        
//       }}

//             variant={variant}
//             color={color}
//             backgroundColor= '#FFA500'
             
//             size={size}
//             onClick={onClick}
//         >
//             {children}
//         </Button>
//     )
// }

// export default CoreButton