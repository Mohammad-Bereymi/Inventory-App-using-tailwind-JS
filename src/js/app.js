import CategoryView from "./CategoryView.js";
import ProductView from "./ProductView.js";

document.addEventListener("DOMContentLoaded", () => {
  CategoryView.setApp();
  console.log(CategoryView);
  CategoryView.createCategoriesList(CategoryView.categories);
  ProductView.setApp();
  console.log(ProductView);

  ProductView.createProductList(ProductView.products);
});
