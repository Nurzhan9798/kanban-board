import { TodoModel } from "./../model/TodoModel";
import { makeAutoObservable } from "mobx";

class TodoStore {
  todos: TodoModel[] = [
    { id: 1, title: "Task 1", categoryId: 1, description: "Description" },
    {
      id: 2,
      title: "Task 2",
      categoryId: 3,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum tempore nam, culpa iste fugit itaque placeat dolorem corporis modi repellendus, dolor commodi officiis qui harum quis quaerat quia incidunt excepturi.",
      img: "https://source.unsplash.com/random/",
    },
    {
      id: 3,
      title: "Task 3",
      categoryId: 2,
      description: "Description lorem ipsum",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOoDJqsgn0kN_yysBVihLqvIsfSz7nRF1dcA&usqp=CAU",
    },
  ];
  todoId = this.todos.length + 1;

  constructor() {
    makeAutoObservable(this);
  }

  addTodo(newTodo: TodoModel) {
    // console.log("add todo executed");

    newTodo.id = this.todoId;
    this.todos.push(newTodo);
    this.todoId += 1;
  }

  removeTodo(todoId: number) {
    // console.log("remove todo executed");

    this.todos = this.todos.filter((todo) => todo.id !== todoId);
  }

  getTodosByCategory(categoryId: number) {
    // console.log("Get todos by category executed");

    return this.todos.filter((todo) => todo.categoryId === categoryId);
  }

  removeTodosByCategory(categoryId: number) {
    this.todos = this.todos.filter((todo) => todo.categoryId !== categoryId);
  }
}

export default new TodoStore();
