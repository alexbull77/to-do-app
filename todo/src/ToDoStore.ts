import { action, configure, observable } from 'mobx';
import ToDoModel from "./ToDoModel";


configure({ enforceActions: 'always' })

export default class ToDoStore {
    @observable
    ToDos: ToDoModel[] = [];

    private todoAPI = 'https://localhost:8000/api/todos';

    @action.bound
    async init() {
        let response = await fetch(this.todoAPI);
        let newToDos = ToDoModel[] = await response.json();
        this.addToDoStore(newToDos);
    }

    @action.bound
    addToDoStore(ToDos: ToDoModel[]) {
        this.ToDos.length = 0;
        for (let todo of ToDos) {
            this.ToDos.push(todo);
        }
    }

    @action.bound
    getToDos() {
        return this.ToDos;
    }

    @action.bound
    async addToDo(title: string, isCompleted: boolean) {
        let response = await fetch(this.todoAPI, {
            method: 'Post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ title, isCompleted }),
        });
        let createdToDo = await response.json();
        this.addNewToDoToStore(createdToDo);
    }

    @action.bound
    async addNewToDoStore(todo: ToDoModel) {
        this.ToDos.push(todo);
    }
}