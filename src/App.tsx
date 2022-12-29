import { observer } from "mobx-react-lite";
import React from "react";
import { ToastContainer } from "react-toastify";
import Column, { IColumn } from "./components/Column/Column";
import { ICategory } from "./model/Category";
import CategoryStore from "./store/CategoryStore";
import TodoStore from "./store/TodoStore";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = observer(() => {
  // console.log("APP Rendered");
  const categories: ICategory[] = CategoryStore.categories;

  const categoryColumns: IColumn[] = categories.map((category) => {
    const newColumn: IColumn = {
      category: category,
      todoList: [],
    };
    if (category.id !== undefined)
      newColumn.todoList = TodoStore.getTodosByCategory(category.id);
    return newColumn;
  });

  const handleCreateColumn = () => {
    const newColumn: ICategory = {
      name: "New created column",
    };
    CategoryStore.addCategory(newColumn);
  };

  return (
    <div className="board">
      {categoryColumns.map((categoryColumn) => (
        <Column key={categoryColumn.category.id} {...categoryColumn} />
      ))}

      <button className="button button_success" onClick={handleCreateColumn}>
        Create new column
      </button>

      <ToastContainer />
    </div>
  );
});

export default App;
