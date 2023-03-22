import { TypeOfValue, types } from "mobx-state-tree";
import { Todo } from "./Todo";

const TaskStore = types
    .model("Todo", {
        Todos: types.array(Todo),
    })
    .actions((self) => ({
        add(task) {
            self.Todos.push(task);
        },

        remove(id: number) {
            self.Todos = self.Todos.filter((todo) => todo.id !== id);
        },
    }))
    .views((self) => ({
        getById(id: number) {
            return self.Todos.find((todo) => todo.id === id);
        },
    }));

export const store = TaskStore.create({
    Todos: [],
});
