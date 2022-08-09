import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { postGet , postEdit} from '../../redux/actions/postAction';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { Field, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const initialValues = {
	title: '',
	content: ''
};

const validationSchema = Yup.object().shape({
	title: Yup.string(),
	content: Yup.string().min(5, 'Cassword must be at least 5 characters')
});

export const EditPostBox = () => {
	const location = useLocation();
	const id = location.pathname.split('/')[3];
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
	const { loading, postsInfo } = useSelector((state) => state.post);
	const { userInfo } = useSelector((state) => state.user);
	const [ uploadLoading, setUploadLoading ] = useState(false);
	const [ file, setFile ] = useState('');
	let [ postData, setPostData ] = useState({
		title: '',
		content: ''
	});

	useEffect(
		() => {
			
			dispatch(postGet(id));
		},
		[ id, dispatch ]
	);

	const submitForm = async (e) => {
		e.preventDefault();

		const dataArray = new FormData();
		if (postData.title !== '') dataArray.append('title', postData.title);
		if (postData.content !== '') dataArray.append('content', postData.content);
		if (file !== '') dataArray.append('images', file);

		dispatch(postEdit({dataArray,id}));
		
		setUploadLoading(true);
		await delay(5000);
		setUploadLoading(false);
		
		navigate('/');
	};

	if (loading !== true && postsInfo !== undefined) {
		return (
			<div>
				<div className="RegisterPage">
					<div className="PostContainer">
						<span>Edit a post</span>
						<Formik initialValues={initialValues} validationSchema={validationSchema}>
							{({ touched, errors, isValid }) => (
								<div className="RegisterWrapper">
									<form>
										<div className="form-group">
											<label>Post Title</label>
											<Field
												type="text"
												name="title"
												placeholder={postsInfo.data.title}
												className={`mt-2 form-control
                                        ${touched.title && errors.title ? 'is-invalid' : ''}`}
												onKeyUp={(e) =>
													setPostData((prevState) => ({
														...prevState,
														title: e.target.value
													}))}
											/>
											<ErrorMessage component="div" name="title" className="invalid-feedback" />
										</div>

										<div className="form-group">
											<label>Post Content</label>
											<Field
												component="textarea"
												name="content"
												placeholder={postsInfo.data.content}
												className={`mt-2 form-control postContent
                                        ${touched.content && errors.content ? 'is-invalid' : ''}`}
												onKeyUp={(e) =>
													setPostData((prevState) => ({
														...prevState,
														content: e.target.value
													}))}
											/>
											<ErrorMessage component="div" name="content" className="invalid-feedback" />
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
										<button
											type="submit"
											className="btn btn-dark"
											onClick={submitForm || loading}
											disabled={!isValid}
										>
											Edit
										</button>
									</form>
								</div>
							)}
						</Formik>
					</div>
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
	} else {
		return <Loading />;
	}
};
