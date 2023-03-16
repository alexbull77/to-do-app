import React from 'react';
import {TodoList} from "./components/TodoList";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";


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

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <TodoList />
        </ThemeProvider>
    )

};

export default App;
