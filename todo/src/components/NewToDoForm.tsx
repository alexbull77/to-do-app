import React, {useState} from 'react';
import {ToDoStore} from "../ToDoStore";

type NewToDoInputProps = {
    addToDo: ToDoStore["addToDo"]
}

const NewToDoForm: React.FC<NewToDoInputProps> = ({ addToDo }) => {
    const [toDoTitle, setToDoTitle] = useState('')

    const onAddToDoClick = () => {
        addToDo(toDoTitle);
        setToDoTitle('')
    }

    // const toDoStore = useToDoStore()

    return (
        <>
            <input value={toDoTitle}
                   onChange={(event) => setToDoTitle(event.target.value)}
                   type="text"
                   name="title"
                   placeholder="ToDo Title"
            />
            {/*<input value={toDoDescription}/>*/}
            <button
                onClick={onAddToDoClick}>Add note
            </button>
        </>
    );
};

export default NewToDoForm;