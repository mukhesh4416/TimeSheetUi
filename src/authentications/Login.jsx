import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { baseUrl } from '../shared/global';

function Login() {

    const navigate = useNavigate();
    const formik = useFormik(
        {
            initialValues: {
                email: '',
                password: '',
            },
            onSubmit: values => {
                userLogin(values)
            }
        });

    const userLogin = async (values) => {
        let obj={
            empCode:values.email,
            password:values.password
        }
        const res = await axios.post(baseUrl + `user/userLogin`, obj)
        if (res.data) {
            navigate('/timesheet');
        } else {
            alert("Invalid Credentials");
        }
    }

    return (
        <div>
            <div className="mb-5 p-5"></div>
            <div className="container justify-content-center h-50 w-25 shadow mt-5 rounded-5">
                <div><h3 className="pt-4 text-center" title="header">Login</h3></div>
                <form autoComplete="off" onSubmit={formik.handleSubmit}>
                    <div className="p-4">
                        <label className="form-label" data-testid="email">
                            Username:
                        </label>
                        <input className="form-control p-2" type="text"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange} />
                        <br></br>
                        <label className="form-label">
                            Password:
                        </label>
                        <input className="form-control p-2" type="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange} />
                    </div>
                    <br></br>
                    <div className="text-center mb-3">
                        <a href="#" >Forgot password</a>
                    </div>
                    <div className="text-center container">
                        <button className="btn btn-outline-primary " type="submit"><div className="ms-4 me-4">Login</div></button>
                    </div>
                </form> <br></br><br></br>
            </div>
        </div>

    );

}

export default Login;

