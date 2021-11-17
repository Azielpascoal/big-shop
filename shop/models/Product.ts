
interface Attribute {
  name: string;
  options: string[];
}

export default class Product {
  categories: String[];
  id: String;
  details: String[];
  name: String;
  price: String;
  description: String;
  photo: String;
  colors: String;
  sizes: String;
  attributes: Attribute[];

  constructor(
    id: String,
    name: String,
    price: String,
    description: String,
    photo: String,
    details: String[],
    categories: String[],
    colors: String,
    sizes: String,
    attributes: Attribute[],
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.photo = photo;
    this.details = details;
    this.categories = categories;
    this.colors = colors;
    this.sizes = sizes;
    this.attributes = attributes;
  }
}
