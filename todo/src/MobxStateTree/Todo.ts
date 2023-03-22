import { types } from "mobx-state-tree";

export const Todo = types
    .model({
        id: 0,
        title: "",
        description: "",
        isCompleted: false,
    })
    .actions((self) => ({
        setTitle(newTitle: string) {
            self.title = newTitle;
        },

        toggle() {
            self.isCompleted = !self.isCompleted;
        },

        edit(title, descritpion) {
            self.title = title;
            self.description = descritpion;
        },
    }))
    .views((self) => ({
        get isCompleted() {
            return self.isCompleted;
        },

        get title() {
            return self.title;
        },

        get description() {
            return self.description;
        },
    }));
