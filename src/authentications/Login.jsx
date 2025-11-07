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
import { Link } from 'react-router-dom';
import { MuiOtpInput } from 'mui-one-time-password-input';
import {
  Button, Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import Swal from 'sweetalert2';

function Login() {

     const [editFlag, setEditFlag] = useState(false);
      const [showModal, setShowModal] = useState(false);

      const [inputotp,setInputOtp]=useState(false);
      const [otpModal, setOtpModal]=useState(false);
  const [otp, setOtp] = useState();

      const handleChange = (event) => {
        setOtp(event.target.value);
      };

    const navigate = useNavigate();
    const coreValidations = new CoreValidations()

const emailValidations = yup.object().shape({

    emailId:coreValidations.mailValidation()
})

    const departmentValidations = yup.object().shape({
        empCode: coreValidations.stringValidation(4, 10),
        password: coreValidations.stringValidation(3, 50)
    });


    const passwordresetForm = [
          { field: "emailId", label: "Enter registered Email Id", type: "Text" }
        ]
      
        const passwordresetFormik = useFormik({
          initialValues: {
            emailId: "",
            
          },
          validationSchema: emailValidations,
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

            try{
            const res = await axios.post(baseUrl + `userLogin`, obj)
            if (res.data) {
                sessionStorage.setItem("userData", JSON.stringify(res.data))
                navigate('/timesheet');
            } else {
                alert("Invalid Credentials");
            }

          } catch(error){
            Swal.fire("Invalid Credentials");
          }
        }
    }
const handleClick =()=>{
    setEditFlag(true);
    setShowModal(true);
}

    const resetPassword = () =>{

        setOtpModal(true);
        setEditFlag(false);
        setInputOtp(true);
    }

     
    return (
        <>
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
                        <Grid item>
        <Button variant="text" onClick={handleClick}>Forgot Password</Button>
      </Grid>
                        
                    </Box>
                    
                </Card>
            </Grid>
        </Grid>
         <Dialog open={showModal} onClose={() => setShowModal(false)} maxWidth="xs" fullWidth>
        <DialogTitle>{editFlag && "Reset Password"}</DialogTitle>
        <DialogContent>
          <form onSubmit={passwordresetFormik.handleSubmit} id="reset-form">
            <DynamicForm formTemplate={passwordresetForm} formFormik={passwordresetFormik} />

           
          </form>
      <Box sx={{ p: 2, textAlign: "center" }}> {  inputotp && <MuiOtpInput length={6}  onChange={handleChange} />}</Box>
     
        </DialogContent>
        <DialogActions>
          <CoreButton onClick={resetPassword}>{editFlag ?"Send OTP":"Submit"}</CoreButton>
          <CoreButton color={"secondary"} onClick={() => setShowModal(false)} >Close</CoreButton>
        </DialogActions>

          
      </Dialog>


       { otpModal && <Dialog open={showModal} onClose={() => setShowModal(false)} maxWidth="xs" fullWidth>
        <DialogTitle>OTP has been sent to your registered mail</DialogTitle>
        <DialogContent>
      
        <form>
<MuiOtpInput length={6} value={otp} onChange={handleChange} />
           
      
      </form>
     
        </DialogContent>
        <DialogActions>
          <CoreButton onClick={resetPassword}>Submit</CoreButton>
          <CoreButton color={"secondary"} onClick={() => setShowModal(false)} >Close</CoreButton>
        </DialogActions>

          
      </Dialog>
}


       {/* { otpModal && <Dialog open={showModal} onClose={() => setShowModal(false)} maxWidth="xs" fullWidth>
        <DialogTitle>{editFlag && "Reset Password"}</DialogTitle>
        <DialogContent>
          <form onSubmit={passwordresetFormik.handleSubmit} id="reset-form">
            <DynamicForm formTemplate={passwordresetForm} formFormik={passwordresetFormik} />

           
          </form>
      <Box sx={{ p: 2, textAlign: "center" }}> {  inputotp && <MuiOtpInput length={6}  onChange={handleChange} />}</Box>
     
        </DialogContent>
        <DialogActions>
          <CoreButton onClick={resetPassword}>{editFlag ?"Send OTP":"Submit"}</CoreButton>
          <CoreButton color={"secondary"} onClick={() => setShowModal(false)} >Close</CoreButton>
        </DialogActions>

          
      </Dialog>
} */}




      
      </>
    );

}

export default Login;

