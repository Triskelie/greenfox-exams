import {useState, useEffect} from "react";
import {getDataByCollection, convertQuerySnapshot} from "../firebase/utils";
import {collection, getDocs, query, where, doc, deleteDoc} from "firebase/firestore";
import TableItem from "../components/TableItem";
import db from "../firebase/db";
import {Link} from "react-router-dom";

function App() {
  const [userList, setUserList] = useState([]);
  const [stats, setStats] = useState({});

  async function loadData() {
    let stat = {};
    const users = await getDataByCollection("registrations");
    setUserList(users);
    users.map(user => {
      if (stat[user.role] === undefined) {
        stat[user.role] = {
          role: user.role,
          count: 0
        }
      }
      stat[user.role].count++;
    });
    setStats(stat);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleDelete(id) {
    await deleteDoc(doc(db, "registrations", id));
    loadData();
  }

  async function handletSelect(event) {
    const selectedRole = event.target.value;
    if (selectedRole !== "") {
      filterByRole(selectedRole);
    } else {
      loadData();
    }
  }

  async function filterByRole(role) {
    const q = query(collection(db, "registrations"), where("role", "==", role));
    const querySnapshot = await getDocs(q);
    const users = convertQuerySnapshot(querySnapshot);
    setUserList(users);
  }

  function onCheckboxChange(event) {
    const isChecked = event.target.checked;
    if (isChecked) {
      filterByActiveUsers();
    } else {
      loadData();
    }
  }

  async function filterByActiveUsers() {
    const q = query(collection(db, "registrations"), where("isActive", "==", true));
    const querySnapshot = await getDocs(q);
    const users = convertQuerySnapshot(querySnapshot);
    setUserList(users);
  }

  return (
    <>
      <header className="container mt-3 mb-3">
        <h1>Regisztráció admin</h1>
      </header>
      <section className="container">
        <label>Szűrés jogkörre</label>
        <select className="form-select" onChange={handletSelect}>
          <option defaultValue value="">Válassz!</option>
          <option value="admin" key="admin">admin</option>
          <option value="vendég" key="vendég">vendég</option>
          <option value="regisztrált felhasználó" key="regisztrált felhasználó">regisztrált felhasználó</option>
        </select>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="aktiv-users-check" onChange={onCheckboxChange}/>
          <label className="form-check-label" htmlFor="aktiv-users-check">Aktív felhasználók</label>
        </div>
        <Link to="/users/new" className="btn btn-primary mb-3">Új felhasználó</Link>
        <table className="table table-striped">
          <thead>
          <tr>
            <th>Név</th>
            <th>Email</th>
            <th>Jogkör</th>
            <th>Születési év</th>
            <th>Műveletek</th>
          </tr>
          </thead>
          <tbody>
          {userList.map((user) => (
            <TableItem
              key={user.id}
              fullName={user.fullName}
              yearOfBirth={user.yearOfBirth}
              role={user.role}
              email={user.email}
              id={user.id}
              handleDelete={handleDelete}
            />
          ))}
          </tbody>
        </table>
        <table className="table table-bordered table-striped">
        <thead>
        <tr>
          <th>
            Jogkör
          </th>
          <th>
            Darab
          </th>
        </tr>
        </thead>
        <tbody>
        {stats && Object.entries(stats).map(([key, {role, count}]) => (
          <tr key={key}>
            <td>
              {role}
            </td>
            <td>
              {count}
            </td>
          </tr>
        ))}
          <tr>
            <td><strong>Összesen</strong></td>
            <td><strong>{userList.length}</strong></td>
          </tr>
        </tbody>
      </table>
      </section>
    </>
  );
}

export default App;
