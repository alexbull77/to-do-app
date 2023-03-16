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
import {useState} from "react";
import EditIcon from "@mui/icons-material/Edit";

export const EditTaskDialog: React.FC = ({task}) => {

    if (!task) return null

    const [open, setOpen] = useState(false);

    const [title, setTitle] = useState(task.title)
    const [description, setDescription] = useState(task.description)

    // console.log('Title is ' + title)
    // console.log('Description is ' + description)

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
        // check if we have changed anything at all
        if (task.title === title && task.description === description) {
            console.log('Nothing had changed!')
            handleClose()
            return
        }

        todo.updateTask({
            id: task.id,
            title: title,
            description: description,
            isCompleted: task.isCompleted
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
                        // somehow doesn't work
                        // didn't find a way to make it work
                        autoFocus={true}
                        value={title}
                        margin="normal"
                        id="title"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleTitleChange}
                    />
                    <DialogContentText color={'primary'}>
                        Refactor the existing description
                    </DialogContentText>
                    <TextField
                        margin="normal"
                        id="name"
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