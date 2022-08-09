import React from 'react'
import { Grid, Divider, Badge } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import "./ReportBox.css"
import { ReportContent } from '../ReportContent/ReportContent';
export const ReportBox = () => {
  return (
    <div className="ReportBox">
      
    <Grid container>

      <Grid item xs>
          <h5>Posts  <Badge badgeContent={4} color="primary">
            <MailIcon color="action" />
          </Badge>
          </h5>
          <ReportContent/>
      </Grid>

      <Divider orientation="vertical" flexItem>
        Reports
      </Divider>

      <Grid item xs>
        <h5>Comments  <Badge badgeContent={4} color="primary">
            <ChatBubbleIcon color="action" />
          </Badge>
        </h5>
          <ReportContent/>
      </Grid>

    </Grid>
    </div>
  )
}
