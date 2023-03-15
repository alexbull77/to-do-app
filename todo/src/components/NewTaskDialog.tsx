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
import todo from "../Store/ToDoStore"
import AddIcon from "@mui/icons-material/Add";
import {useState} from "react";

export default function NewTaskDialog( ) {

    const [open, setOpen] = useState(false);

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const handleTitleChange = (event: React.FormEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
        // console.log(title)
    }

    const handleDescriptionChange = (event: React.FormEvent<HTMLInputElement>) => {
        setDescription(event.target.value)
        // console.log(description)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (!title || title.length === 0) {
            console.log('Please enter the title!')
            return
        }

        // console.log("Before insert>> ", todo.tasks)
        todo.addTask({
            // ID: '99',
            Title: title,
            Description: description,
            IsCompleted: false
        })

        // so that we don't have left over values from another task
        setTitle('')
        setDescription('')
        handleClose()
    }

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
            <Dialog fullWidth={true} open={open} onClose={handleClose} autoFocus={false}>
                <DialogTitle>New Task Form</DialogTitle>
                <DialogContent>
                    <DialogContentText color={'primary'}>
                        Please enter a task's title here
                    </DialogContentText>
                    <TextField
                        autoFocus={true}
                        margin="normal"
                        id="title"
                        label="Title"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleTitleChange}
                    />
                    <DialogContentText color={'primary'}>
                        Enter a short description
                    </DialogContentText>
                    <TextField
                        margin="normal"
                        id="name"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleDescriptionChange}
                    />

                </DialogContent>

                <DialogActions>
                    <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                    <Button variant="outlined" onClick={handleSubmit}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}