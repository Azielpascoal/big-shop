import Product from "./Product";

export default class Category {
  id: String;
  name: String;
  photo: String;
  color: String;
  products: Product[];

  constructor(
    id: String,
    name: String,
    photo: String,
    products: Product[] = [],
    color: String
  ) {
    this.id = id;
    this.name = name;
    this.photo = photo;
    this.products = products;
    this.color = color;
  }
}
