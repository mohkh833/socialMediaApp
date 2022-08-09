import React from "react";
import "./LoginForm.css";
import { Form, Field, Formik, ErrorMessage } from "formik";
import Error from "../Error/Error";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../redux/actions/userAction";
import * as Yup from "yup";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

const initialValues = {
    email: "",
    password: "",
};

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .required("Email is a required field")
        .email("Invalid email format"),
    password: Yup.string()
        .required("Password is a required field")
        .min(5, "Password must be at least 5 characters"),
});

export const LoginForm = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });
    const { loading, error, login } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const submitForm = () => {
        dispatch(userLogin(userData));
    };
    

    useEffect(() => {
        if (login) navigate('/')
    }, [navigate, login]);


    let buttonValue = "Login";
    loading ? (buttonValue = "Loading") : (buttonValue = "Login");
    return (
        <div className="LoginPage">
            <div className="LoginContainer">
                <span>Login</span>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                >
                    {({ touched, errors, isValid }) => (
                        <div className="LoginWrapper">
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <Field
                                        type="email"
                                        name="email"
                                        onKeyUp={(e) =>
                                            setUserData((prevState) => ({
                                                ...prevState,
                                                email: e.target.value,
                                            }))
                                        }
                                        placeholder="Enter email"
                                        className={`mt-2 form-control
                            ${touched.email && errors.email ? "is-invalid" : ""
                                            }`}
                                    />

                                    <ErrorMessage
                                        component="div"
                                        name="email"
                                        className="invalid-feedback"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password" className="mt-3">
                                        Password
                                    </label>
                                    <Field
                                        type="password"
                                        name="password"
                                        placeholder="Enter password"
                                        onKeyUp={(e) =>
                                            setUserData((prevState) => ({
                                                ...prevState,
                                                password: e.target.value,
                                            }))
                                        }
                                        className={`mt-2 form-control
                            ${touched.password && errors.password
                                                ? "is-invalid"
                                                : ""
                                            }`}
                                    />
                                    <ErrorMessage
                                        component="div"
                                        name="password"
                                        className="invalid-feedback"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-dark loginButton"
                                    disabled={!isValid || loading}
                                    onClick={submitForm}
                                >
                                    {buttonValue}
                                </button>
                                {error && <Error>{error}</Error>}
                            </Form>
                            <a href="/register" className="createAcoount">
                                <span>Create an account</span>
                            </a>
                        </div>
                    )}
                </Formik>
            </div>
        </div>
    );
};
