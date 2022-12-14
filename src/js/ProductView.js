import Storage from "./Storage.js";

const addNewProductBtn = document.querySelector("#add-new-product");
const productTitle = document.querySelector("#product-title");
const productQuantity = document.querySelector("#product-quantity");
const selectedCategory = document.querySelector("#product-category");
const searchInput = document.querySelector("#search-input");
const selectedSort = document.querySelector("#sort-products");

class ProductView {
  constructor() {
    addNewProductBtn.addEventListener("click", (e) => this.addNewProduct(e));
    searchInput.addEventListener("input", (e) => this.searchProducts(e));
    selectedSort.addEventListener("change", (e) => this.sortProducts(e));
    // deleteProductBtn.addEventListener("click", (e) => this.deleteProducts(e));
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
    this.createProductList(this.products);
    productTitle.value = "";
    productQuantity.value = "";
    selectedCategory.value = "";
  }
  createProductList(products) {
    const productsDOM = document.getElementById("products-list");
    let result = "";
    products.forEach((item) => {
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
                class="delete-product border px-3 py-0.5 rounded-2xl border-red-400 text-sm text-red-400" data-product-id=${
                  item.id
                }>delete</button>
        </div>
    </div>`;
    });
    productsDOM.innerHTML = result;
    const deleteBtns = [...document.querySelectorAll(".delete-product")];

    deleteBtns.forEach((item) => {
      item.addEventListener("click", (e) => this.deleteProducts(e));
    });
  }
  searchProducts(e) {
    const value = e.target.value.trim().toLowerCase();
    const filteredProducts = this.products.filter((p) => {
      return p.title.toLowerCase().includes(value);
    });
    this.createProductList(filteredProducts);
  }
  sortProducts(e) {
    const value = e.target.value;
    this.products = Storage.getAllProducts(value);
    this.createProductList(this.products);
  }
  deleteProducts(e) {
    const productId = e.target.dataset.productId;
    Storage.deleteProduct(productId);
    this.products = Storage.getAllProducts();
    this.createProductList(this.products);
  }
}

export default new ProductView();
