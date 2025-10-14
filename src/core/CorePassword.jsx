import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import React from 'react'

function CorePassword({field,label,formFormik}) {
    return (
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor={field}>Password</InputLabel>
            <OutlinedInput
                id={field}
                type={showPassword ? 'text' : 'password'}
                label={label}
                variant="outlined"
                name={field}
                onChange={formFormik.handleChange}
                onBlur={formFormik.handleBlur}
                value={formFormik.values[field]}
                fullWidth
                size="medium"
                error={
                    Boolean(formFormik.touched[field] && formFormik.errors[field])
                }
                helperText={
                    formFormik.touched[field] && formFormik.errors[field]
                }
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label={
                                showPassword ? 'hide the password' : 'display the password'
                            }
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
    )
}

export default CorePassword