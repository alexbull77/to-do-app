import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Card, Checkbox, List, Typography } from "@mui/material";
import Fab from "@mui/material/Fab";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Todo } from "../MobxStateTree/Todo";
// import { default as todo, default as ToDoStore } from "../Store/ToDoStore";
import { store } from "../MobxStateTree/RootStore";
import { EditTaskDialog } from "./EditTaskDialog";
import { NewTaskDialog } from "./NewTaskDialog";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export const TodoList: React.FC = observer(() => {
    useEffect(() => {
        console.log(store.Todos);
    }, [store.Todos]);

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    minHeight: "10vh",
                    marginTop: "20px",
                    marginBottom: "20px",
                }}
            >
                <Typography
                    variant='h4'
                    gutterBottom
                    sx={{
                        fontFamily: "Lato",
                        fontWeight: 500,
                        letterSpacing: ".1rem",
                        color: "inherit",
                        textDecoration: "none",
                    }}
                >
                    My ToDo List
                </Typography>
            </Box>

            <List>
                {store.Todos.map((task) => (
                    <Card
                        variant='outlined'
                        key={task.id}
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
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                width: "50%",
                            }}
                        >
                            <Checkbox
                                {...label}
                                sx={{ mr: 1 }}
                                checked={task.isCompleted}
                                onChange={() => task.toggle()}
                            />
                            <Typography
                                // add a strike style depending on the completed property of the todo item
                                style={{
                                    textDecoration: task.isCompleted
                                        ? "line-through"
                                        : "none",
                                }}
                            >
                                {task.title}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                justifyContent: "space-around",
                            }}
                        >
                            <EditTaskDialog task={task} />
                            <Fab
                                size='small'
                                color='primary'
                                aria-label='delete'
                                onClick={() => store.remove(task.id)}
                            >
                                <DeleteIcon />
                            </Fab>
                        </Box>
                    </Card>
                ))}
                <NewTaskDialog />
            </List>
        </>
    );
});
