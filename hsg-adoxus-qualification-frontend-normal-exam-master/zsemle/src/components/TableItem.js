import Icon from "./Icon";

const TableItem = ({ item, handleDelete, handleQuantityChange }) => {
  const { id, name, category, price, count } = item;
  return (
    <tr>
      <td>{name}</td>
      <td>{category}</td>
      <td>
        {new Intl.NumberFormat("hu-HU", {
          style: "currency",
          currency: "HUF",
          maximumFractionDigits: 0,
        }).format(price)}
      </td>
      <td>{count}</td>
      <td>
        <Icon className="bi-cart-plus" id={`increment-${id}`}  onClick={() => {handleQuantityChange(item, true);}} />
        <Icon className="bi-cart-dash" id={`decrement-${id}`} onClick={() => {handleQuantityChange(item, false);}} />
        <i className="bi-cart-x"  id={`delete-${id}`} onClick={() => {
          handleDelete(id);
        }}></i>
      </td>
    </tr>
  );
};

export default TableItem;
