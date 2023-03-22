import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Fab from "@mui/material/Fab";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useState } from "react";
import { store } from "../MobxStateTree/RootStore";
import { Todo } from "../MobxStateTree/Todo";
import ToDoModel from "../Store/ToDoModel";
import todo from "../Store/ToDoStore";

interface Props {
    task: ToDoModel;
}

export const EditTaskDialog: React.FC<Props> = ({ task }) => {
    if (!task) return null;

    const [open, setOpen] = useState(false);
    const [editedTask, setTask] = useState(Todo.create({ task }));
    // const [title, setTitle] = useState(task.title)
    // const [description, setDescription] = useState(task.description)

    // console.log('Title is ' + title)
    // console.log('DescriptioeditedTaskn is ' + description)

    const handleTitleChange = (event: React.FormEvent<HTMLElement>) => {
        const target = event.target as HTMLTextAreaElement;
        setTask({ ...editedTask, title: target.value });
    };

    const handleDescriptionChange = (event: React.FormEvent<HTMLElement>) => {
        const target = event.target as HTMLTextAreaElement;
        setTask({ ...editedTask, description: target.value });
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event: React.ChangeEvent<HTMLButtonElement>) => {
        event.preventDefault();
        // check if we have changed anything at all
        if (
            task.title !== editedTask.title &&
            task.description !== editedTask.description
        ) {
            let neededTask = store.getById(task.id);
            neededTask = { ...neededTask, ...task };
        } else {
            console.log("Nothing has changed");
            return;
        }
        handleClose();
    };

    return (
        <>
            <Fab
                size='small'
                color='secondary'
                aria-label='edit'
                onClick={handleClickOpen}
            >
                <EditIcon />
            </Fab>
            <Dialog fullWidth={true} open={open} onClose={handleClose}>
                <DialogTitle>Edit Task Form</DialogTitle>
                <DialogContent>
                    <DialogContentText color={"primary"}>
                        Please rename your task
                    </DialogContentText>
                    <TextField
                        // somehow doesn't work
                        // didn't find a way to make it work
                        autoFocus={true}
                        value={editedTask.title}
                        margin='normal'
                        id='title'
                        type='text'
                        fullWidth
                        variant='standard'
                        onChange={handleTitleChange}
                    />
                    <DialogContentText color={"primary"}>
                        Refactor the existing description
                    </DialogContentText>
                    <TextField
                        margin='normal'
                        id='name'
                        value={editedTask.description}
                        type='text'
                        fullWidth
                        variant='standard'
                        onChange={handleDescriptionChange}
                    />
                </DialogContent>

                <DialogActions>
                    <Button variant='outlined' onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant='outlined' onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
