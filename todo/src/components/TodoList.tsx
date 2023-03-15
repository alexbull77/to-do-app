import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import todo from "../Store/ToDoStore"
import ToDoModel from "../Store/ToDoModel";
import {Box, Button, Card, Checkbox, Grid, List, Typography} from "@mui/material";
import Fab from "@mui/material/Fab";
import DeleteIcon from "@mui/icons-material/Delete";
import FetchButton from "./FetchButton";
import NewTaskDialog from "./NewTaskDialog";
import EditIcon from '@mui/icons-material/Edit';
import EditTaskDialog from "./EditTaskDialog";

const label = {inputProps: {'aria-label': 'Checkbox demo'}};

const TodoList = observer(() => {

    useEffect(() => {
        todo.fetchTasks()
        // console.log(todo.titles)
    }, [])

    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                minHeight: '10vh',
                marginTop: '20px',
                marginBottom: '20px',
            }}>
                <Typography variant="h4" gutterBottom sx={{
                    fontFamily: "Lato",
                    fontWeight: 500,
                    letterSpacing: ".1rem",
                    color: "inherit",
                    textDecoration: "none",
                }}>
                    My ToDo List
                </Typography>
            </Box>

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
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '50%',
                        }}>
                            <Checkbox {...label} sx={{mr: 1}} checked={task.IsCompleted}
                                      onChange={() => todo.changeTaskCompletion(task)}/>
                            <Typography
                                // add a strike style depending on the completed property of the todo item
                                style={{ textDecoration : task.IsCompleted ? 'line-through' : 'none' }}
                            >{task.Title}</Typography>
                        </Box>
                        <Box sx={{
                            justifyContent: 'space-around'
                        }}>
                            <EditTaskDialog task={task} />
                            <Fab size="small" color="primary" aria-label="delete"
                                 onClick={() => todo.removeTask(task.ID)}>
                                <DeleteIcon/>
                            </Fab>
                        </Box>

                    </Card>
                ))}
                <NewTaskDialog/>
            </List>
        </>
    );
});

export default TodoList;