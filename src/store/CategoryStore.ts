import { ICategory } from "./../model/Category";
import { makeAutoObservable } from "mobx";

class CategoryStore {
  categories: ICategory[] = [
    {
      id: 1,
      name: "To Do",
    },
    {
      id: 2,
      name: "In Progress",
    },
    {
      id: 3,
      name: "Done",
    },
  ];
  categoryId: number = this.categories.length + 1;

  constructor() {
    makeAutoObservable(this);
  }

  addCategory(newCategory: ICategory) {
    newCategory.id = this.categoryId;
    this.categories.push(newCategory);
    this.categoryId++;
  }

  removeCategory(categoryId: number) {
    this.categories = this.categories.filter(
      (category) => category.id !== categoryId
    );
  }

  updateCategory(categoryId: number, updCategory: ICategory) {
    console.log("updated");

    let category = this.categories.find((c) => c.id === categoryId);
    category = updCategory;
    console.log(this.categories);
  }
}

export default new CategoryStore();
