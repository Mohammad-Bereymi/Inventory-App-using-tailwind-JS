const products = [
  {
    id: 1,
    title: "React.js",
    category: "frontend",
    createdAt: "2022-10-31T15:02:00.411Z",
  },
  {
    id: 2,
    title: "Node.js",
    category: "backend",
    createdAt: "2022-10-31T15:03:23.556Z",
  },
  {
    id: 3,
    title: "Vue.js",
    category: "frontend",
    createdAt: "2022-11-01T10:47:26.411Z",
  },
];

const categories = [
  {
    id: 1,
    title: "frontend",
    description: "frontend of applications",
    createdAt: "2022-10-31T15:03:23.556Z",
  },
  {
    id: 2,
    title: "backend",
    description: "the backend of the applications",
    createdAt: "2022-12-31T15:03:23.556Z",
  },
];

export default class Storage {
  //add new category
  //save category
  //getAllCategories
  static getAllCategories() {
    const savedCategories = JSON.parse(localStorage.getItem("category")) || [];
    //sort=>Descending
    const sortedCategories = savedCategories.sort((a, b) => {
      return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
    });
    return sortedCategories;
  }
  static saveCategory(categoryToSave) {
    const savedCategories = Storage.getAllCategories();
    //edit=>...save
    //new=>..save
    const existedItem = savedCategories.find((c) => c.id == categoryToSave.id);
    if (existedItem) {
      //edit
      existedItem.title = categoryToSave.title;
      existedItem.description = categoryToSave.description;
    } else {
      //new
      categoryToSave.id = new Date().getTime();
      categoryToSave.createdAt = new Date().toISOString();
      savedCategories.push(categoryToSave);
    }
    localStorage.setItem("category", JSON.stringify(savedCategories));
  }

  static getAllProducts() {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    //sort=>Descending
    return savedProducts.sort((a, b) => {
      return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
    });
  }
  static saveProducts(productToSave) {
    const savedProducts = Storage.getAllProducts();
    //edit=>...save
    //new=>..save
    const existedItem = savedProducts.find((c) => c.id == productToSave.id);
    if (existedItem) {
      //edit
      existedItem.title = productToSave.title;
      existedItem.quantity = productToSave.quantity;
      existedItem.category = productToSave.category;
    } else {
      //new
      productToSave.id = new Date().getTime();
      productToSave.createdAt = new Date().toISOString();
      savedProducts.push(productToSave);
    }
    localStorage.setItem("category", JSON.stringify(savedProducts));
  }
}
