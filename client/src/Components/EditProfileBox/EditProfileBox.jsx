import React, { useState, useEffect } from "react";
import Error from "../Error/Error";
import { Form, Field, Formik, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userEdit } from "../../redux/actions/userAction";

const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
};

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email format"),
    password: Yup.string()
        .min(5, "Password must be at least 5 characters"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    name: Yup.string()
        .min(3, "Name must be at least 3 characters"),
});

export const EditProfileBox = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, error, success, userInfo } = useSelector(
        (state) => state.user
    );

    const [file, setFile] = useState("");
    
    let [userData, setUserData] = useState({
        email: "",
        password: "",
        name: "",
    });

    const submitForm = () => {
        let id = userInfo.data.id
        const dataArray = new FormData();
        if(userData.email !== '') dataArray.append("email", userData.email);
        if(userData.password !== '') dataArray.append("password", userData.password);
        if(userData.name !== '') dataArray.append("name", userData.name);
        if(file !== '') dataArray.append("images", file);
        dispatch(userEdit({dataArray,id}));
        if(success) navigate('/profile')
    };


    return (
        <div className="RegisterPage">
            <div className="RegisterContainer">
                <span>Edit Profile</span>
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
                                        placeholder={userInfo.data.email}
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
                                        placeholder={userInfo.data.name}
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
                                    disabled={!isValid || loading}
                                    onClick={submitForm}
                                >
                                    Edit
                                </button>
                                {error && <Error>{error}</Error>}
                        </div>
                    )}
                </Formik>
            </div>
        </div>
    );
};
