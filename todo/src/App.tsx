import React from 'react';
import {useObserver} from "mobx-react";
import NewToDoForm from "./components/NewToDoForm";
import {useRootStore} from "./ToDoContext";
import axios from "axios";
import SingleTodo from "./components/SingleTodo";
import TodoList from "./components/TodoList";

const App = () => {
    const {toDoStore} = useRootStore()

    return (
        <>
            <TodoList />
        </>

    )
    // return useObserver(() => (
    //         <>
    //             <NewToDoForm addToDo={toDoStore.addToDo}/>
    //             <br/>
    //             <ul>
    //                 {
    //                     toDoStore.ToDos.map(todo => (
    //                             <li key={note.ID}>
    //                                 {note.Title}
    //                             </li>
    //                         )
    //                     )
    //                 }
    //             </ul>
    //             <br/>
    //             <button onClick={() => toDoStore.saveNotes()}>Save</button>
    //             <button onClick={() => toDoStore.loadToDos()}>Load</button>
    //         </>
    //     )
    // );
};

export default App;
