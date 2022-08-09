import { useState } from "react";
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ReportDialog } from "../../ReportDialog/ReportDialog";
import { Comment } from "../../Comment/Comment";
import { useDispatch, useSelector } from "react-redux";
import FALLBACK_IMAGE from "../../../assets/1658561838233.jpg";
import { Link } from "react-router-dom";

import "../Post.css";
import { postDelete } from "../../../redux/actions/postAction";
export const Post = ({ item }) => {
    const onMediaFallback = (event) => (event.target.src = FALLBACK_IMAGE);
    const { userInfo } = useSelector((state) => state.user);
    const [open, setOpen] = useState(false);
    const [openReport, setOpenReport] = useState(false);
    const dispatch =useDispatch()
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleReportDialogOpen = () => {
        setOpenReport(true);
    };

    const handleDelete =(id) => {
        dispatch(postDelete(id))
        window.location.reload(false);
    }

    
    return (
        <div className="card">
            <Card sx={{ maxWidth: 800, maxHeight: 800, minWidth: 600 }}>
                <span className="PostUserName">{item.postWriter.name}</span>
                <CardMedia
                    className="PostImage"
                    component="img"
                    height="500"
                    image={item.postImg}
                    alt="green iguana"
                    onError={onMediaFallback}
                />

                <CardContent>
                    <div className="PostTitle">
                        <Typography gutterBottom variant="h5" component="div">
                            {item.title}
                            {Object.keys(userInfo).length !== 0  && (userInfo.data.email === item.postWriter.email || userInfo.data.isAdmin === true)  && (
                                <>
                                    <IconButton color="primary" component="span" onClick={() => handleDelete(item.id)}>
                                        <button className="deleteButton" >
                                            <DeleteIcon style={{ color: "red" }} />
                                        </button>
                                    </IconButton>
                                </>
                            )}
                                {Object.keys(userInfo).length !== 0  && userInfo.data.email === item.postWriter.email && (
                                    <>
                                    <IconButton color="primary" component="span">
                                        <a href={'/post/edit/'+ item.id}>
                                            <EditIcon style={{ color: "black" }} />
                                        </a>
                                    </IconButton>
                                    </>
                                )}
                        </Typography>
                    </div>
                    <Typography variant="body2" color="text.secondary">
                        {item.content}
                    </Typography>
                </CardContent>

                <CardActions>
                    <Button size="small" variant="outlined" onClick={handleClickOpen}>
                        View Comments
                    </Button>
                    {open && (
                        <Comment open={open} setOpen={setOpen} data={item.comments} post_id={item.id}  />
                    )}
                    <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={handleReportDialogOpen}
                    >
                        Report
                    </Button>
                    {openReport && (
                        <ReportDialog open={openReport} setOpenReport={setOpenReport} />
                    )}
                </CardActions>
            </Card>
        </div>
    );
};
