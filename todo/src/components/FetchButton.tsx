import React from 'react';
import {Button, styled} from "@mui/material";
import todo from "../Store/ToDoClass";

const StyledButton = styled(Button)({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    '&:hover': {
        boxShadow: 'none',
        backgroundColor: '#ff5722',
    },
});

const FetchButton = ({ handleClick }) => {
    return (
        <StyledButton variant="contained" onClick={handleClick}>
            Fetch
        </StyledButton>
    );
};

export default FetchButton;