import {action, configure, observable} from 'mobx';
import ToDoModel from "./ToDoModel";
import {getToDos, postToDos} from "./api";


configure({enforceActions: 'always'})

export class ToDoStore {

    @observable
    ToDos: ToDoModel[] = [];

    @action
    loadToDos = () => {
        getToDos().then(toDos => this.ToDos = toDos)
    }

    @action
    saveNotes = () => {
        postToDos(this.ToDos)
    }

    @action
    addToDo = (title: string, isCompleted: boolean = false, description: string = '') => {
        this.ToDos.push({
            Title: title,
            IsCompleted: isCompleted,
            Description: description
        })
        console.log(this.ToDos)
    }
}