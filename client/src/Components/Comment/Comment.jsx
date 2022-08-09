import {
	List,
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	Typography,
	Dialog,
	TextField,
	Button,
	DialogTitle,
	DialogActions,
	DialogContent
} from '@mui/material';
import { blue } from '@mui/material/colors';
import './Comment.css';
import { useState } from 'react';
import { ReportDialog } from '../ReportDialog/ReportDialog';
import { useDispatch, useSelector } from 'react-redux';
import { commentAdd, commentDelete, commentEdit } from '../../redux/actions/commentAction';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const Comment = ({ open, setOpen, data, post_id }) => {
	const { userInfo } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const [ openReport, setOpenReport ] = useState(false);
	const [ editbutton, seteditbutton ] = useState(false);
	const [ content, setContent ] = useState('');
	const [ commentId, setCommentId ] = useState();

	const handleClose = () => setOpen(false);
	const handleReport = () => setOpenReport(true);

	const handleChangeEdit = (content, id) => {
		seteditbutton(true);
		setContent(content);
		setCommentId(id);
	};

	const handleEdit = () => {
		dispatch(commentEdit({ commentId, content }));
		window.location.reload(false);
	};

	const handleDelete = (id) => {
		dispatch(commentDelete(id));
		window.location.reload(false);
	};

	const handleSend = () => {
		let user_id = userInfo.data.id;
		dispatch(commentAdd({ content, post_id, user_id }));
		window.location.reload(false);
	};

	return (
		<div>
			<Dialog open={open} PaperProps={{ sx: { width: '50%' } }}>
				<DialogTitle>Comments</DialogTitle>
				<List sx={{ pt: 0 }}>
					{data.map((comment) => (
						<ListItem button key={comment.id}>
							<ListItemAvatar>
								<Avatar
									sx={{
										bgcolor: blue[100],
										color: blue[600],
										width: '60px',
										height: '60px',
										marginRight: '10px'
									}}
									src={comment.CommentWriter.imgUrl}
								/>
							</ListItemAvatar>
							<ListItemText
								primary={
									<Typography type="body2">
										<span className="commentName">{comment.CommentWriter.name}</span>
										<br />
										<span>{comment.content}</span>
									</Typography>
								}
							/>
							{Object.keys(userInfo).length !== 0 && (
								<div className="ListButtons">
									{comment.CommentWriter.email === userInfo.data.email && (
										<Button
											onClick={() => handleChangeEdit(comment.content, comment.id)}
											size="small"
										>
											<EditIcon style={{ color: 'blue' }} />
										</Button>
									)}
									{(comment.CommentWriter.email === userInfo.data.email || userInfo.data.isAdmin) && (
										<Button onClick={() => handleDelete(comment.id)} color="error" size="small">
											<DeleteIcon style={{ color: 'red' }} />
										</Button>
									)}
									{comment.CommentWriter.email !== userInfo.data.email && (
										<Button size="small" variant="outlined" color="error" onClick={handleReport}>
											Report
										</Button>
									)}
								</div>
							)}
						</ListItem>
					))}
				</List>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						type="text"
						fullWidth
						variant="standard"
						onChange={(e) => setContent(e.target.value)}
						value={content}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} variant="outlined" color="error">
						Cancel
					</Button>

					{!editbutton && <Button onClick={handleSend}>Add Comment</Button>}
					{editbutton && <Button onClick={handleEdit}>Edit Comment</Button>}
				</DialogActions>
			</Dialog>
			{openReport && <ReportDialog open={openReport} setOpenReport={setOpenReport} />}
		</div>
	);
};
