import React from 'react';
import TodoList from "./components/TodoList";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import EditWindow from "./components/EditWindow";
import EditTaskDialog from "./components/EditTaskDialog";
import todo from "./Store/ToDoStore"


const theme = createTheme({
    palette: {
        primary: {
            main: '#317773',
        },
        secondary: {
            main: '#E2D1F9',
        },
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
});

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <TodoList />
        </ThemeProvider>
    )

};

export default App;
