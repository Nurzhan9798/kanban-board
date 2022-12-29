import React from "react";
import { TodoModel } from "../../model/TodoModel";
import { observer } from "mobx-react-lite";
import TodoStore from "../../store/TodoStore";
import { toast } from "react-toastify";
import "./Todo.css";

const Todo = observer((props: TodoModel) => {
  // console.log("TODO Rendered", title);
  const { id, title, categoryId, img, description } = props;
  const handleDeleteTodo = () => {
    if (id !== undefined) {
      TodoStore.removeTodo(id);
      toast.success("Task deleted");
    }
  };

  const handleDuplicateTodo = () => {
    const newTodo: TodoModel = { ...props };
    TodoStore.addTodo(newTodo);
    toast.success("Task duplicated!");
  };

  return (
    <div className="todo">
      {img !== undefined && <img src={img} alt="" className="todo__img" />}

      <p className="todo__title">{title}</p>
      <p className="todo__description">
        {description !== undefined && description}
      </p>

      <button className="button button_error" onClick={handleDeleteTodo}>
        Delete task
      </button>
      <button className="button button_success" onClick={handleDuplicateTodo}>
        Duplicate task
      </button>
    </div>
  );
});

export default Todo;
