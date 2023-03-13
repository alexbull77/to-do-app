import React from 'react';
import {observer} from "mobx-react-lite";
import todo from "../Store/ToDoClass"
import SingleTodo from "./SingleTodo";
import ToDoModel from "../ToDoModel";
import {Box, Button, Card, Checkbox, List, styled, Typography} from "@mui/material";
import Fab from "@mui/material/Fab";
import DeleteIcon from "@mui/icons-material/Delete";
import FetchButton from "./FetchButton";

const label = {inputProps: {'aria-label': 'Checkbox demo'}};

const TodoList = observer(() => {
    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'up',
                minHeight: '10vh',
                marginTop: '20px',
                marginBottom: '20px'
            }}>
                <Typography variant="h4" gutterBottom>
                    My Todo List
                </Typography>
            </Box>
            <FetchButton handleClick={() => todo.fetchTasks()}></FetchButton>

            <List>
                {todo.tasks.map((task) => (
                    <Card variant="outlined" key={task.ID} sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        maxWidth: '600px',
                        margin: 'auto'
                    }}>
                        <Box sx={{display: 'flex', alignItems: 'center', width: '50%'}}>
                            <Checkbox {...label} sx={{mr: 1}} checked={task.IsCompleted} onChange={() => todo.changeTaskCompletion(task)}/>
                            <Typography>{task.Title}</Typography>
                        </Box>
                        <Fab size="small" color="primary" aria-label="delete" onClick={() => todo.removeTask(task.ID)}>
                            <DeleteIcon />
                        </Fab>
                    </Card>
                ))}

            </List>
        </>
    );
});

export default TodoList;