import ToDoModel from "./Store/ToDoModel";

export const getToDos = ():Promise<ToDoModel[]> => {
    return fetch('http://localhost:8000/api/todos/')
        .then(res => res.json())
        .catch(e => console.log(e))
}

export const postToDos = (toDos: ToDoModel[]) => {
    fetch('http://localhost:8000/api/todos', {
        method: 'POST',
        headers: {
            Accept: "application.json",
            "Content-type": "application/json"
        },
        body: JSON.stringify(toDos),
    })
}