import ordersRepository from "./ordersRepository";

const ordersController = {};

ordersController.get = async (req, res) => {
  const orders = await ordersRepository.getAll();
  res.json(orders);
};

ordersController.getOne = async (req, res) => {
  const order = await ordersRepository.getOne(req.params.id);
  res.json(order);
};

ordersController.create = async (req, res) => {
  const order = req.body;

  if (!(order.name && order.address && order.base && order.topping)) {
    return res.status(400).json({ result: 'error', error: `Missing required field` });
  }

  const createParams = {
    name: order.name,
    address: order.address,
    base: order.base,
    topping: order.topping,
    status: "ordered"
  };
  const orderEntity = await ordersRepository.create(createParams);
  res.json(orderEntity);
};

export default ordersController;
