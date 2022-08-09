import React from "react";
import "./PostForm.css";
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { useSelector , useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import { Field, Formik, ErrorMessage } from "formik";
import { postAdd } from "../../redux/actions/postAction";
import * as Yup from "yup";


const initialValues = {
    title: "",
    content: "",
};

const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is a required field"),
    content: Yup.string()
        .required("Content is a required field")
        .min(5, "Cassword must be at least 5 characters"),
});

export const PostForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { login, userInfo } = useSelector((state) => state.user);
    const {success, loading} = useSelector((state)=> state.post)
    const [uploadLoading, setUploadLoading] = useState(false);
    const [file, setFile] = useState("");
    let [postData, setPostData] = useState({
        title: "",
        content: ""
    });

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    )

    const submitForm = async(e) => {
        e.preventDefault();
        const dataArray = new FormData();
        dataArray.append("user_id",userInfo.data.id)
        if(postData.title !== "")
            dataArray.append("title", postData.title);
        if(postData.content !== "")
            dataArray.append("content", postData.content);
        if(file!== "")
            dataArray.append("images", file);
        dispatch(postAdd(dataArray));
        setUploadLoading(true)
        await delay(5000);
        setUploadLoading(false)
        navigate("/") 
    };


    useEffect(() => {
        if (!login) navigate("/login");
    }, [navigate, login]);
    
    return (
        <div className="RegisterPage">
            <div className="PostContainer">
                <span>Create a post</span>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                >
                    {({ touched, errors, isValid }) => (
                        <div className="RegisterWrapper">
                            <form>
                                <div className="form-group">
                                    <label>Post Title</label>
                                    <Field
                                        type="text"
                                        name="title"
                                        placeholder="Enter Title"
                                        className={`mt-2 form-control
                                        ${touched.title && errors.title
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        onKeyUp={(e) =>
                                            setPostData((prevState) => ({
                                                ...prevState,
                                                title: e.target.value,
                                            }))
                                        }
                                    />
                                    <ErrorMessage
                                        component="div"
                                        name="title"
                                        className="invalid-feedback"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Post Content</label>
                                    <Field
                                        component="textarea"
                                        name="content"
                                        placeholder="Enter content"
                                        className={`mt-2 form-control postContent
                                        ${touched.content && errors.content
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        onKeyUp={(e) =>
                                            setPostData((prevState) => ({
                                                ...prevState,
                                                content: e.target.value,
                                            }))
                                        }
                                    />
                                    <ErrorMessage
                                        component="div"
                                        name="content"
                                        className="invalid-feedback"
                                    />
                                </div>

                                <div className="form-group files">
                                    <label>Image</label>
                                    <input
                                        type="file"
                                        className="form-control-file"
                                        id="exampleFormControlFile1"
                                        onChange={(e) => setFile(e.target.files[0])}
                                    />
                                </div>
                                <button type="submit" className="btn btn-dark" onClick={submitForm || loading} disabled={!isValid}>
                                    Post
                                </button>
                            </form>
                        </div>
                        
                    )}
                </Formik>

            </div>
            <div className="loadingBar">
                {uploadLoading && (
                    <Stack sx={{ width: '42%', color: 'black' }} spacing={2}>
                        <LinearProgress color="inherit" />
                    </Stack>
                )}
            </div>
        </div>
    );
};
