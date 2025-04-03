import OrderRepository from "./order.repository.js";

export default class OrderController {
  constructor() {
    this.orderRepository = new OrderRepository();
  }

  async placeOrder(req, res, next) {
    try {
      const userId = req.userID;
      await this.orderRepository.placeOrder(userId);
      res.status(201).send("Order placed successfully");
    } catch (err) {
      console.error(err, "error in controller");
      return res.status(400).send("Error in placing order");
    }
  }
}
