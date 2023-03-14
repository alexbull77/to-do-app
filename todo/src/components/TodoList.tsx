import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import todo from "../Store/ToDoStore"
import ToDoModel from "../Store/ToDoModel";
import {Box, Button, Card, Checkbox, Grid, List, Typography} from "@mui/material";
import Fab from "@mui/material/Fab";
import DeleteIcon from "@mui/icons-material/Delete";
import FetchButton from "./FetchButton";
import NewTaskDialog from "./NewTaskDialog";

const label = {inputProps: {'aria-label': 'Checkbox demo'}};

const TodoList = observer(() => {

    // useEffect(() => {
    //     todo.fetchTasks()
    //     console.log(todo.tasks.title)
    // }, [])
    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                minHeight: '10vh',
                marginTop: '20px',
                marginBottom: '20px'
            }}>
                <Grid container sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    pl: '20%',
                    pr: '20%'
                }}>

                    <Grid item xs={6}>
                        <Typography variant="h4" gutterBottom>
                            My Todo List
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <FetchButton handleClick={() => todo.fetchTasks()}></FetchButton>
                    </Grid>
                </Grid>

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
                        <Box sx={{display: 'flex', alignItems: 'center', width: '50%'}}>
                            <Checkbox {...label} sx={{mr: 1}} checked={task.IsCompleted} onChange={() => todo.changeTaskCompletion(task)}/>
                            <Typography>{task.Title}</Typography>
                        </Box>
                        <Fab size="small" color="primary" aria-label="delete" onClick={() => todo.removeTask(task.ID)}>
                            <DeleteIcon />
                        </Fab>
                    </Card>
                ))}
                <NewTaskDialog />
            </List>
        </>
    );
});

export default TodoList;