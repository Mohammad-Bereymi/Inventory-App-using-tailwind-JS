import Storage from "./Storage.js";

const title = document.querySelector("#category-title");
const description = document.querySelector("#category-description");
const addNewCategoryBtn = document.querySelector("#add-new-category");

class CategoryView {
  constructor() {
    addNewCategoryBtn.addEventListener("click", (e) => this.addNewCategory(e));
    this.categories = [];
  }
  addNewCategory(e) {
    e.preventDefault();
    const title = title.value;
    const description = description.value;
    if (!title || !description) return;
    Storage.saveCategory({ title, description });
    this.categories = Storage.getAllCategories();
    this.createCategoriesList(this.categories);
  }
  setApp() {
    this.categories = Storage.getAllCategories();
  }
  createCategoriesList(categories) {
    let result = `<option class="bg-slate-500 text-slate-400" value="">select a category</option>`;
    categories.forEach((element) => {
      result += `<option class="bg-slate-500 text-slate-400" value=${element.id}>${element.title}</option>`;
    });
    const categoryDOM = document.getElementById("product-category");
    categoryDOM.innerHTML = result;
  }
}

export default new CategoryView();
