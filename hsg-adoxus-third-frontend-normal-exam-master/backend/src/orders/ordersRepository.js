import { orders } from '../db';

const ordersRepository = {};

ordersRepository.getAll = () => {
  return new Promise((resolve, reject) => {
    orders.find({}, function (err, docs) {
      if (err) {
        reject(err);
      } else {
        resolve(docs);
      }
    });
  });
};

ordersRepository.getOne = (id) => {
  return {
    id: 10,
    name: "Alma Ország",
    address: "Szabadság tér 10.",
    base: "white rice",
    topping: "chicken",
    status: "ordered"
  };
}

ordersRepository.create = ({name, address, base, topping, status}) => {
  return new Promise((resolve, reject) => {
    orders.insert({
      name,
      address,
      base,
      topping,
      status
    }, function (err, newDoc) {
      if (err) {
        reject(err);
      } else {
        resolve(newDoc);
      }
    });
  });
};

export default ordersRepository;
