import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Box, Card, Typography} from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

export default function NewTaskDialog( ) {

    const [open, setOpen] = React.useState(false);

    // console.log(open)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Card variant="outlined" sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                maxWidth: '600px',
                margin: 'auto'
            }}>
                <Box sx={{display: 'flex', alignItems: 'center', width: '50%'}}>
                    <Fab size="small" color="primary" aria-label="add-task" sx={{
                        display: 'flex',
                        marginRight: '20px'
                    }}
                         onClick={handleClickOpen}
                    >
                        <AddIcon />
                    </Fab>
                    <Typography>Add Task</Typography>
                </Box>
            </Card>
            {/*<Button variant="outlined" onClick={handleClickOpen}>*/}
            {/*    Open form dialog*/}
            {/*</Button>*/}
            <Dialog fullWidth={true} open={open} onClose={handleClose}>
                <DialogTitle>New Task Form</DialogTitle>
                <DialogContent>
                    <DialogContentText color={'primary'}>
                        Please enter a task's title here
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="normal"
                        id="title"
                        label="Title"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <DialogContentText color={'primary'}>
                        Enter a short description
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="normal"
                        id="name"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="standard"
                    />

                </DialogContent>

                <DialogActions>
                    <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                    <Button variant="outlined" onClick={handleClose}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}