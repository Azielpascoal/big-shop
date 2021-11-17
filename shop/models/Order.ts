import Product from "./Product";

export default class order {
  id: String;
  status: String;
  totalPrice: Number;
  shopertino_products: Product[];
  createdAt: Date;
  user: Object;
  selectedShippingMethod: Object;
  selectedPaymentMethod: Object;
  shippingAddress: Object;
  user_id: Object;

  constructor(
    createdAt: Date,
    id: String,
    status: String,
    totalPrice: Number,
    shopertino_products: Product[],
    user: Object,
    selectedShippingMethod: Object,
    selectedPaymentMethod: Object,
    shippingAddress: Object,
    user_id: String
  ) {
    this.createdAt = createdAt;
    this.id = id;
    this.status = status;
    this.totalPrice = totalPrice;
    this.shopertino_products = shopertino_products;
    this.user = user;
    this.selectedShippingMethod = selectedShippingMethod;
    this.selectedPaymentMethod = selectedPaymentMethod;
    this.shippingAddress = shippingAddress;
    this.user_id = user_id;
  }
}
