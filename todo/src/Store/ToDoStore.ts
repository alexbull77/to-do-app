import ToDoModel from "./ToDoModel";
import {action, makeAutoObservable} from "mobx";
import axios from "axios";

class Tasks {
    tasks: ToDoModel[] = [
        {ID: 4, Title: 'First task', Description: 'First Description', IsCompleted: false},
        {ID: 2, Title: 'Second task', Description: 'Second Description', IsCompleted: false},
        {ID: 3, Title: 'Third task', Description: 'Third Description', IsCompleted: false},
    ]

    constructor() {
        makeAutoObservable(this)
    }

    addTask(newTask: ToDoModel) {
        this.tasks.push(newTask)
    }

    addTasks(tasks) {

        tasks.map(({ id, title, description, isCompleted }) => {
            this.tasks.push({
                ID: id,
                Title: title,
                Description: description,
                IsCompleted: isCompleted
            })
        })
    }

    removeTask(id: number | undefined) {
        this.tasks = this.tasks.filter(task => task.ID !== id)
    }

    changeTaskCompletion(task: ToDoModel) {
        task.IsCompleted = !task.IsCompleted
    }

    setTasks(new_Tasks: ToDoModel[]) {
        this.tasks = [...this.tasks, ...new_Tasks]
    }

    fetchTasks() {
        console.log('fetch')
        axios.get('http://127.0.0.1:8000/api/todos')
            .then(response => this.addTasks(response.data))
            .catch(function (error) {
                console.log(error);
            });
    }
}

export default new Tasks()