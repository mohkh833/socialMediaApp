import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import "./Profile.css";
import { useEffect } from "react";
import Loading from "../Loading/Loading";

export const ProfileBox = () => {

  const { userInfo,login  } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!login) navigate("/login");
  }, [navigate, login]);

  if (Object.keys(userInfo).length !== 0) {
    return (
      <div className="card">
        <Card
          sx={{
            width: 700,
            height: 600,
            marginTop: "100px",
            backgroundColor: "rgb(254, 251, 251)",
          }}
          className="ProfileCard"
        >
          <div className="AvatarContainer">
            <Avatar
              alt="Remy Sharp"
              src={userInfo.data.imgUrl}
              sx={{ width: 400, height: 400, margin: "auto" }}
            />
          </div>
          <CardContent className="ProfileContent">
            <Typography
              gutterBottom
              variant="h4"
              component="div"
              className="ProfileName"
              style={{ fontWeight: "bold" }}
            >
              {userInfo.data.name}
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <a href="/profile/edit">
                  <EditIcon style={{ color: "black" }} />{" "}
                </a>
              </IconButton>
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {userInfo.data.email}
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  } else {
    return <Loading />;
  }
};
