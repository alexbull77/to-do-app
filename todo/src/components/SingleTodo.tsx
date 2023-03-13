import React from 'react';
import {observer} from "mobx-react-lite";
import {Card, Checkbox, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Fab from '@mui/material/Fab';
import ToDoModel from "../ToDoModel";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const SingleTodo = observer(({ task: ToDoModel }) => {
    return (
        <Card variant="outlined">
            <Checkbox {...label} />
            <Fab color="primary" aria-label="delete">
                <DeleteIcon />
            </Fab>
            <Typography>
                {task.title}
            </Typography>
        </Card>
    );
});

export default SingleTodo;