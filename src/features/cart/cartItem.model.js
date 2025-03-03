export default class CartItemModel {
  constructor(productID, userID, quantity, id) {
    this.productID = productID;
    this.userID = userID;
    this.quantity = quantity;
    this.id = id;
  }

  static add(productID, userID, quantity) {
    const cartItem = new CartItemModel(productID, userID, quantity);
    cartItem.id = cartItems.length + 1;
    cartItems.push(cartItem);
    return cartItem;
  }

  static getCartItem(userID) {
    return cartItems.filter((cartItem) => cartItem.userID === userID);
  }

  static deleteItem(productID) {
    const index = cartItems.findIndex(
      (cartItem) => cartItem.productID === productID
    );
    if (index === -1) {
      return "Product not found in cart";
    }
    const deletedItem = cartItems.splice(index, 1);
    return deletedItem;
  }
}

var cartItems = [new CartItemModel(1, 2, 1, 1)];
