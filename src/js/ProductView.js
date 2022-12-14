import Storage from "./Storage.js";

const addNewProductBtn = document.querySelector("#add-new-product");
const productTitle = document.querySelector("#product-title");
const productQuantity = document.querySelector("#product-quantity");
const selectedCategory = document.querySelector("#product-category");

class ProductView {
  constructor() {
    addNewProductBtn.addEventListener("click", (e) => this.addNewProduct(e));
    this.products = [];
  }
  setApp() {
    this.products = Storage.getAllProducts();
  }
  addNewProduct(e) {
    e.preventDefault();
    const title = productTitle.value;
    const quantity = productQuantity.value;
    const category = selectedCategory.value;

    if (!title || !quantity || !category) return;

    Storage.saveProducts({ title, quantity, category });
    this.products = Storage.getAllProducts();
    this.createProductList();
    productTitle.value = "";
    productQuantity.value = "";
    selectedCategory.value = "";
  }
  createProductList() {
    const productsDOM = document.getElementById("products-list");
    let result = "";
    this.products.forEach((item) => {
      const selectedCategory = Storage.getAllCategories().find(
        (c) => c.id == item.category
      );
      result += ` <div class="flex items-center justify-between mb-8">
        <span class="text-slate-400">${item.title}</span>
        <div class="flex items-center gap-x-3">
            <span class="text-slate-400">${new Date().toLocaleDateString(
              "fa-IR"
            )}</span>
            <span
                class="block text-sm px-3 py-0.5 text-slate-400 border border-slate-500 rounded-2xl">${
                  selectedCategory.title
                }</span>
            <span
                class="flex items-center justify-center w-7 h-7 rounded-full bg-slate-500 text-slate-300 border-2 border-slate-400">${
                  item.quantity
                }</span>
            <button
                class="border px-3 py-0.5 rounded-2xl border-red-400 text-sm text-red-400" data-id=${
                  item.id
                }>delete</button>
        </div>
    </div>`;
    });
    productsDOM.innerHTML = result;
  }
}

export default new ProductView();
