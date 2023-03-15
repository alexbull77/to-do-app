import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Fab from "@mui/material/Fab";
import todo from "../Store/ToDoStore"
import { useState} from "react";
import EditIcon from "@mui/icons-material/Edit";

export default function EditTaskDialog({task}) {

    if (!task) return null

    const [open, setOpen] = useState(false);

    const [title, setTitle] = useState(task.Title)
    const [description, setDescription] = useState(task.Description)

    console.log('Title is ' + title)
    console.log('Description is ' + description)

    const handleTitleChange = (event: React.FormEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
        console.log(title)
    }

    const handleDescriptionChange = (event: React.FormEvent<HTMLInputElement>) => {
        setDescription(event.target.value)
        console.log(description)
    }

    const handleSubmit = () => {
        // console.log("Before insert>> ", todo.tasks)
        todo.addTask({
            ID: Math.random().toString(16).slice(2),
            Title: title,
            Description: description,
            IsCompleted: task.IsCompleted
        })
        // console.log("After insert>> ", todo.tasks)
        handleClose()
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Fab size="small"
                 color="secondary"
                 aria-label="edit"
                 onClick={handleClickOpen}
            >
                <EditIcon/>
            </Fab>
            <Dialog fullWidth={true} open={open} onClose={handleClose} autoFocus={false}>
                <DialogTitle>Edit Task Form</DialogTitle>
                <DialogContent>
                    <DialogContentText color={'primary'}>
                        Please rename your task
                    </DialogContentText>
                    <TextField
                        autoFocus={true}
                        value={title}
                        margin="normal"
                        id="title"
                        // label="Title"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleTitleChange}
                    />
                    <DialogContentText color={'primary'}>
                        Refactor the existing description
                    </DialogContentText>
                    <TextField
                        // autoFocus
                        margin="normal"
                        id="name"
                        // label="Description"
                        value={description}
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleDescriptionChange}
                    />

                </DialogContent>

                <DialogActions>
                    <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                    <Button variant="outlined" onClick={handleSubmit}>Save Changes</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}