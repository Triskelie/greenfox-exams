const TableItem = ({ fullName, yearOfBirth, role, email, id, handleDelete }) => {
  return (
    <tr>
      <td>{fullName}</td>
      <td>{yearOfBirth}</td>
      <td>{role}</td>
      <td>{email}</td>
      <td>
        <button className="btn btn-danger" id={`delete-${id}`} onClick={() => {
          handleDelete(id);
        }}>Törlés
        </button>
      </td>
    </tr>
  );
};

export default TableItem;
