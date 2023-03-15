import ToDoModel from "./ToDoModel";
import {action, makeAutoObservable} from "mobx";
import axios from "axios";

class Tasks {
    tasks: ToDoModel[] = [
        // {ID: 4, Title: 'First task', Description: 'First Description', IsCompleted: false},
        // {ID: 2, Title: 'Second task', Description: 'Second Description', IsCompleted: false},
        // {ID: 3, Title: 'Third task', Description: 'Third Description', IsCompleted: false},
    ]

    constructor() {
        makeAutoObservable(this)
    }

    addTask(newTask: ToDoModel) {
        this.tasks.push(newTask)
        const taskForAPI = {
            "title": newTask.Title,
            "description": newTask.Description,
            "isCompleted": newTask.IsCompleted
        }
        fetch("http://127.0.0.1:8000/api/todos/", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(taskForAPI),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    addTasks(tasks) {
        tasks.map(({id, title, description, isCompleted}) => {
            this.tasks.push({
                ID: id,
                Title: title,
                Description: description,
                IsCompleted: isCompleted
            })
        })
    }

    removeTask(id: number | undefined) {
        // const deletedTask  = this.tasks.find(task => task.ID === id)
        // remove the given task from the backend
        axios.delete(`http://127.0.0.1:8000/api/todos/${id}`)
            .then (res => {
                console.log(res)
                console.log(res.data)
            })
        this.tasks = this.tasks.filter((task) => task.ID !== id)
    }



    changeTaskCompletion(task: ToDoModel) {
        task.IsCompleted = !task.IsCompleted
    }

    setTasks(new_Tasks: ToDoModel[]) {
        this.tasks = [...this.tasks, ...new_Tasks]
    }

    get titles() {
        let output = []
        for (let i = 0; i < this.tasks.length; i++)
            output.push(this.tasks[i].Title)
        // console.log('Titles', output)
        return output
    }

    fetchTasks() {
        console.log('fetch')
        axios.get('http://127.0.0.1:8000/api/todos')
            .then(response => {
                if (this.tasks.length === 0)
                    this.addTasks(response.data)
                else {
                    // we check if data was fetched before so there is no need to fetch again
                    const newTasks = response.data.filter((obj) => !this.titles.includes(obj.title))
                    // console.log('New Tasks', newTasks)
                    if (newTasks.length !== 0)
                        this.addTask(newTasks)
                    else
                        console.log('Nothing new to fetch')
                }

            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export default new Tasks()