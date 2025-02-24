import { defineStore } from "pinia";
export const useTodoListStore = defineStore("todoList", {
  state: () => ({
    todos: [],
  }),
  actions: {
    /**Add task */
    addTodo(text) {
      this.todos.push({
        id: Date.now(),
        text,
        completed: false,
      });
    },
    /**Removes task by id */
    removeTodo(id) {
      this.todos = this.todos.filter((todo) => todo.id != id);
    },
  },
  getters: {
    completedTodos(state) {
      return state.todos.filter((todo) => todo.completed);
    },
  },
});
