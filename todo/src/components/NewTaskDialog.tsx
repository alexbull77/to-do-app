import AddIcon from "@mui/icons-material/Add";
import { Box, Card, Typography } from "@mui/material";
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

export const NewTaskDialog: React.FC = () => {
    const [open, setOpen] = useState(false);

    // const [title, setTitle] = useState('')
    // const [description, setDescription] = useState('')
    const [task, setTask] = useState(Todo.create({}));

    const handleTitleChange = (event: React.FormEvent<HTMLElement>) => {
        const target = event.target as HTMLTextAreaElement;
        setTask({ ...task, title: target.value });
    };

    const handleDescriptionChange = (event: React.FormEvent<HTMLElement>) => {
        const target = event.target as HTMLTextAreaElement;
        setTask({ ...task, description: target.value });
    };

    const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (!task) {
            console.log("Please enter the task");
            return;
        }

        store.add(task);

        handleClose();
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Card
                variant='outlined'
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    maxWidth: "600px",
                    margin: "auto",
                }}
            >
                <Box
                    sx={{ display: "flex", alignItems: "center", width: "50%" }}
                >
                    <Fab
                        size='small'
                        color='primary'
                        aria-label='add-task'
                        sx={{
                            display: "flex",
                            marginRight: "20px",
                        }}
                        onClick={handleClickOpen}
                    >
                        <AddIcon />
                    </Fab>
                    <Typography>Add Task</Typography>
                </Box>
            </Card>
            <Dialog fullWidth={true} open={open} onClose={handleClose}>
                <DialogTitle>New Task Form</DialogTitle>
                <DialogContent>
                    <DialogContentText color={"primary"}>
                        Please enter a task's title here
                    </DialogContentText>
                    <TextField
                        autoFocus={true}
                        margin='normal'
                        id='title'
                        label='Title'
                        type='text'
                        fullWidth
                        variant='standard'
                        onChange={handleTitleChange}
                    />
                    <DialogContentText color={"primary"}>
                        Enter a short description
                    </DialogContentText>
                    <TextField
                        margin='normal'
                        id='name'
                        label='Description'
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
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
