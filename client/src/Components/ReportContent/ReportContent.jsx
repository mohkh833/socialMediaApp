import React from 'react'
import {ListItem, List,  ListItemText,ListItemAvatar, Avatar,Typography, Divider} from "@mui/material"
import "./ReportContent.css"

export const ReportContent = () => {
  return (
    <div className="ReportContent">
        <List sx={{ width: '100%', maxWidth: 800, bgcolor: 'background.paper' ,borderRadius:"15px" }} className="ReportList">
            <ListItem>
                <ListItemAvatar>
                    <Avatar />
                </ListItemAvatar>
                <ListItemText
                    primary="Brunch this weekend?"
                    secondary={
                    <>
                        <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                        >
                        Ali Connors
                        </Typography>
                        {" — I'll be in your neighborhood doing errands this…"}
                    </>
                    }
            />
            </ListItem>
        <Divider variant="inset" component="li" />
    </List>
  </div>
  )
}
