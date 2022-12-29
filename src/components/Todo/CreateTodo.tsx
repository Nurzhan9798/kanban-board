import React, { useState } from "react";
import { TodoModel } from "../../model/TodoModel";
import TodoStore from "../../store/TodoStore";
import { toast } from "react-toastify";
import "./CreateTodo.css";

interface CreateTodoProps {
  categoryId: number;
}

const CreateTodo = ({ categoryId }: CreateTodoProps) => {
  const [visibleInput, setVisibleInput] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState("");

  const handleCreateTask = () => {
    if (inputValue === "") {
      toast.warning("New task title is empty!");
      return;
    }

    const newTask: TodoModel = {
      title: inputValue,
      categoryId: categoryId,
    };

    TodoStore.addTodo(newTask);
    setInputValue("");
    setVisibleInput(false);
    toast.success("New task created");
  };

  return (
    <div>
      {visibleInput ? (
        <div className="create-todo">
          <textarea
            placeholder="Enter title of task"
            className="craete-todo__input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <div className="create-todo__actions">
            <button
              className="button button_success"
              onClick={handleCreateTask}
            >
              Create
            </button>
            <button
              className="button button_error"
              onClick={() => {
                setVisibleInput(false);
                setInputValue("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          className="button button_success create-todo__button"
          onClick={() => setVisibleInput(true)}
        >
          Create new task
        </button>
      )}
    </div>
  );
};

export default CreateTodo;
