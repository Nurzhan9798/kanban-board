import { useState } from "react";
import { observer } from "mobx-react-lite";
import { toast } from "react-toastify";
import { ICategory } from "../../model/Category";
import { TodoModel } from "../../model/TodoModel";
import CategoryStore from "../../store/CategoryStore";
import CreateTodo from "../Todo/CreateTodo";
import Todo from "../Todo/Todo";
import "./Column.css";
import TodoStore from "../../store/TodoStore";

export interface IColumn {
  category: ICategory;
  todoList: TodoModel[];
}

const Column = observer(({ category, todoList }: IColumn) => {
  // console.log("Column Rendered", category.name);
  const [inputValue, setInputValue] = useState(category.name);

  const handleDeleteCategory = () => {
    if (category.id === undefined) return;
    CategoryStore.removeCategory(category.id);
    TodoStore.removeTodosByCategory(category.id);
    toast.success("Column deleted");
  };

  const handleDuplicateCateogry = () => {
    const newCategory: ICategory = {
      name: category.name,
    };
    CategoryStore.addCategory(newCategory);
    toast.success("Column duplicated");
  };

  const handleEditCategory = () => {
    if (category.name === inputValue) return;
    if (category.id === undefined) return;
    if (inputValue === "") {
      toast.warning("Column name can not be empty");
      return;
    }

    const updatedCategory = category;
    updatedCategory.name = inputValue;
    CategoryStore.updateCategory(category.id, updatedCategory);
    toast.success("Column name updated");
  };

  return (
    <div className="column column__container">
      <div className="column__header">
        <input
          className="column__title-input"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleEditCategory}
        />
        <div className="column__actions">
          <button
            className="button button_error"
            onClick={handleDeleteCategory}
          >
            Delete
          </button>
          <button
            className="button button_success"
            onClick={handleDuplicateCateogry}
          >
            Duplicate
          </button>
        </div>
      </div>
      <hr className="column__divider" />
      <div className="column__body">
        {todoList.map((todo) => (
          <Todo key={todo.id} {...todo} />
        ))}
        <CreateTodo categoryId={category.id ?? 0} />
      </div>
    </div>
  );
});

export default Column;
