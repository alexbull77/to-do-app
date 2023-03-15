import ToDoModel from "./ToDoModel";
import {action, makeAutoObservable} from "mobx";
import axios from "axios";

class Tasks {
    tasks: ToDoModel[] = []

    constructor() {
        makeAutoObservable(this)
    }

    addTask(newTask: ToDoModel) {
        const taskForAPI = {
            // "id": newTask.ID,
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
                newTask.ID = data.id
                console.log(newTask)
                this.tasks.push(newTask)
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    updateTask(updatedTask: ToDoModel) {
        // console.log('UPDATE UPDATE UPDATE')
        // this.tasks.push(updatedTask)
        const taskForAPI = {
            'id': updatedTask.ID,
            "title": updatedTask.Title,
            "description": updatedTask.Description,
            "isCompleted": updatedTask.IsCompleted
        }

        // console.log(`http://127.0.0.1:8000/api/todos/${updatedTask.ID}`)

        fetch(`http://127.0.0.1:8000/api/todos/${updatedTask.ID}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(taskForAPI),
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log("Success:", data);
                // get the old task to change the values without fetching data from backend
                // although might not be optimal
                // who knows))
                const oldTask = this.tasks.find(task => task.ID === updatedTask.ID)
                // 2 possibly changed fields
                oldTask.Title = updatedTask.Title
                oldTask.Description = updatedTask.Description
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

    removeTask(id: string | undefined) {
        axios.delete(`http://127.0.0.1:8000/api/todos/${id}`)
            .then(res => {
                console.log(res)
                console.log(res.data)
            })
        this.tasks = this.tasks.filter((task) => task.ID !== id)
    }


    changeTaskCompletion(task: ToDoModel) {

        const taskForAPI = {
            'id': task.ID,
            "title": task.Title,
            "description": task.Description,
            "isCompleted": !task.IsCompleted
        }
        fetch(`http://127.0.0.1:8000/api/todos/${task.ID}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(taskForAPI),
        })
            .then((response) => response.json())
            .then((data) => {
                task.IsCompleted = !task.IsCompleted
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }


    get titles() {
        let output = []
        for (let i = 0; i < this.tasks.length; i++)
            output.push(this.tasks[i].Title)
        // console.log('Titles', output)
        return output
    }

    get ids() {
        let output = []
        for (let i = 0; i < this.tasks.length; i++)
            output.push(this.tasks[i].ID)
        // console.log('IDS', output)
        return output
    }

    fetchTasks() {
        // console.log('fetch')
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