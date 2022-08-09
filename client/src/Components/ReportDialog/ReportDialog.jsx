import {Dialog, TextField,Button,DialogTitle,DialogActions ,DialogContent} from '@mui/material'
import React from 'react'

export const ReportDialog = ({open,setOpenReport}) => {
  
  const handleCloseReport = () => setOpenReport(false);
  return (
    <div>
            <Dialog open={open} PaperProps={{ sx: { width: "50%" } }} >
                <DialogTitle>Report</DialogTitle>
                <DialogContent>
                    <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Add Report"
                    type="report"
                    fullWidth
                    variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseReport} variant="outlined" color="error">Cancel</Button>
                    <Button onClick={handleCloseReport}>Add Report</Button>
                </DialogActions>
            </Dialog>
        </div>
  )
}
