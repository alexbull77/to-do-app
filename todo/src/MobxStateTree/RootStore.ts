import { types } from "mobx-state-tree";

const Todo = types.model({
    id: 0,
    title: "",
    description: "",
    isCompleted: false,
});

const TaskStore = types
    .model("Todo", {
        Todo: types.array(Todo),
    })
    .actions((self) => ({
        add(task) {
            self.Todo.push(task);
        },
    }));
export default TaskStore;
