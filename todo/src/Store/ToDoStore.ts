import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import ToDoModel from "./ToDoModel";

interface ApiObject {
    id: number;
    description: string;
    title: string;
    isCompleted: boolean;
}

class Tasks {
    tasks: ToDoModel[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    addTask(newTask: ToDoModel) {
        fetch("http://127.0.0.1:8000/api/todos/", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTask),
        })
            .then((response) => response.json())
            .then((data) => {
                runInAction(() => {
                    console.log("Success:", data);
                    newTask.id = data.id;
                    console.log(newTask);
                    this.tasks.push(newTask);
                });
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    updateTask(updatedTask: ToDoModel) {
        // console.log(`http://127.0.0.1:8000/api/todos/${updatedTask.ID}`)

        fetch(`http://127.0.0.1:8000/api/todos/${updatedTask.id}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedTask),
        })
            .then((response) => response.json())
            .then((data) => {
                // to fix the error of mobx about editing an attribute without an action
                runInAction(() => {
                    // console.log("Success:", data);
                    // get the old task to change the values without fetching data from backend
                    // although it might not be optimal
                    // who knows))
                    const oldTask = this.tasks.find(
                        (task) => task.id === updatedTask.id
                    );
                    // 2 possibly changed fields
                    oldTask.title = updatedTask.title;
                    oldTask.description = updatedTask.description;
                });
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    addTasks(tasks: ToDoModel[]) {
        tasks.map(({ id, title, description, isCompleted }) => {
            this.tasks.push({
                id: id,
                title: title,
                description: description,
                isCompleted: isCompleted,
            });
        });
    }

    removeTask(id: string | undefined) {
        // tried axios, but it doesn't really matter in such simple instances
        axios.delete(`http://127.0.0.1:8000/api/todos/${id}`).then((res) => {
            console.log(res);
            console.log(res.data);
        });
        runInAction(() => {
            this.tasks = this.tasks.filter((task) => task.id !== id);
        });
    }

    changeTaskCompletion(task: ToDoModel) {
        fetch(`http://127.0.0.1:8000/api/todos/${task.id}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...task, isCompleted: !task.isCompleted }),
        })
            .then((response) => response.json())
            .then((data) => {
                runInAction(() => {
                    task.isCompleted = !task.isCompleted;
                });
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    get titles() {
        let output = [];
        for (let i = 0; i < this.tasks.length; i++)
            output.push(this.tasks[i].title);
        // console.log('Titles', output)
        return output;
    }

    // not using it but might in the future
    get ids() {
        let output = [];
        for (let i = 0; i < this.tasks.length; i++)
            output.push(this.tasks[i].id);
        // console.log('IDS', output)
        return output;
    }

    fetchTasks() {
        // console.log('fetch')
        axios
            .get("http://127.0.0.1:8000/api/todos")
            .then((response) => {
                if (this.tasks.length === 0) this.addTasks(response.data);
                else {
                    // we check if data was fetched before so there is no need to fetch again
                    const newTasks = response.data.filter(
                        (obj: ApiObject) => !this.titles.includes(obj.title)
                    );
                    // console.log('New Tasks', newTasks)
                    if (newTasks.length !== 0) this.addTask(newTasks);
                    else console.log("Nothing new to fetch");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export default new Tasks();
