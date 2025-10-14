import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { baseUrl } from '../shared/global';
import { Box, Card, FormControl, Grid, Input, InputLabel, Typography } from '@mui/material';
import DynamicForm from '../core/DynamicForm';
import CoreValidations from '../core/CoreValidations';
import * as yup from 'yup';
import CoreButton from '../core/CoreButton';

function Login() {

    const navigate = useNavigate();
    const coreValidations = new CoreValidations()
    const departmentValidations = yup.object().shape({
        empCode: coreValidations.stringValidation(4, 10),
        password: coreValidations.stringValidation(3, 50)
    });

    const loginForm = [
        { field: "empCode", label: "Employee Code", type: "Text" },
        { field: "password", label: "Password", type: "Text" }
    ]

    const loginFormik = useFormik({
        initialValues: {
            departmentName: "",
            departmentId: 0
        },
        validationSchema: departmentValidations,
    });

    const handleLogin = async () => {
        if (loginFormik.isValid) {
            let obj = {
                empCode: loginFormik.values.empCode,
                password: loginFormik.values.password
            }
            const res = await axios.post(baseUrl + `user/userLogin`, obj)
            if (res.data) {
                sessionStorage.setItem("userData", JSON.stringify(res.data))
                navigate('/timesheet');
            } else {
                alert("Invalid Credentials");
            }
        }
    }

    return (
        <Grid container sx={{
            justifyContent: "center",
            alignItems: "center",
            minHeight: '100vh'
        }} >
            <Grid size={3}>
                <Card sx={{ p: 3 }}>
                    <Typography variant="h5" sx={{ p: 2, textAlign: "center" }}>Login</Typography>
                    <form onSubmit={loginFormik.handleSubmit} id="login-form">
                        <DynamicForm formTemplate={loginForm} formFormik={loginFormik} />
                    </form>
                    <Box sx={{ p: 2, textAlign: "center" }}>
                        <CoreButton size='large' onClick={handleLogin}>Login</CoreButton>
                    </Box>
                </Card>
            </Grid>
        </Grid>
    );

}

export default Login;

