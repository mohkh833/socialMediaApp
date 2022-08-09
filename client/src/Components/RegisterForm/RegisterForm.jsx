import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Error from "../Error/Error";
import "./RegisterForm.css";
import { userRegister } from "../../redux/actions/userAction";
import { Field, Formik, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
};

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .required("Email is a required field")
        .email("Invalid email format"),
    password: Yup.string()
        .required("Password is a required field")
        .min(5, "Password must be at least 5 characters"),
    confirmPassword: Yup.string()
        .required("Password is a required field")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    name: Yup.string()
        .required("Name is a required field")
        .min(3, "Name must be at least 3 characters"),
});

export const RegisterForm = () => {
    const [file, setFile] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, success, userInfo } = useSelector(
        (state) => state.user
    );
    let [userData, setUserData] = useState({
        email: "",
        password: "",
        name: "",
        imgUrl: "",
    });

    const submitForm = () => {
        const dataArray = new FormData();
        dataArray.append("email", userData.email);
        dataArray.append("password", userData.password);
        dataArray.append("name", userData.name);
        dataArray.append("images", file);
        dispatch(userRegister(dataArray));
    };

    useEffect(() => {
        // redirect user to login page if registration was successful
        //if (success) navigate("/login");
        // redirect authenticated user to profile screen
        if (Object.keys(userInfo).length !== 0) navigate("/");
    }, [navigate, userInfo, success]);

    return (
        <div className="RegisterPage">
            <div className="RegisterContainer">
                <span>Register</span>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                >
                    {({ touched, errors, isValid }) => (
                        <div className="RegisterWrapper">
                            <div className="form-group">
                                <label>Email address</label>
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
                                <label>Name</label>
                                <Field
                                    type="text"
                                    name="name"
                                    onKeyUp={(e) =>
                                        setUserData((prevState) => ({
                                            ...prevState,
                                            name: e.target.value,
                                        }))
                                    }
                                    placeholder="Enter Name"
                                    className={`mt-2 form-control
                            ${touched.name && errors.name ? "is-invalid" : ""}`}
                                />
                                <ErrorMessage
                                    component="div"
                                    name="name"
                                    className="invalid-feedback"
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <Field
                                    type="password"
                                    name="password"
                                    onKeyUp={(e) =>
                                        setUserData((prevState) => ({
                                            ...prevState,
                                            password: e.target.value,
                                        }))
                                    }
                                    placeholder="Enter Password"
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
                            <div className="form-group">
                                <label>Confirm Password</label>
                                <Field
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Enter Password"
                                    className={`mt-2 form-control
                            ${touched.confirmPassword && errors.confirmPassword
                                            ? "is-invalid"
                                            : ""
                                        }`}
                                />
                                <ErrorMessage
                                    component="div"
                                    name="confirmPassword"
                                    className="invalid-feedback"
                                />
                            </div>
                            <div className="form-group files">
                                <label>Image</label>
                                <input
                                    type="file"
                                    className="form-control-file"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-dark"
                                disabled={!isValid}
                                onClick={submitForm || loading}
                            >
                                Register
                            </button>
                            {error && <Error>{error}</Error>}
                        </div>
                    )}
                </Formik>
            </div>
        </div>
    );
};
