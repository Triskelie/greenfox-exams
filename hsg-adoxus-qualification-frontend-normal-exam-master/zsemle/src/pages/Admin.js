import { useEffect, useState } from "react";
import {getDataByCollection, convertQuerySnapshot} from "../firebase/utils";
import TableItem from "../components/TableItem";
import {doc, deleteDoc, collection, getDocs, query, where, updateDoc} from "firebase/firestore";
import db from "../firebase/db";
import {categories} from "../utils";
import {Link} from "react-router-dom";

function Admin() {
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({});
  const [countAll, setCountAll] = useState(0);
  const [sumAll, setSumAll] = useState(0);

  async function loadData() {
    let stat = {};
    let sum = 0;
    let count = 0;

    Object.values(categories).map((category) => (
      stat[category] = { 
        category: category,
        count: 0,
        sum: 0
      }
    ));

    const products = await getDataByCollection("zsemle");

    products.map((product) => {
      stat[product.category].count+=parseInt(product.count);
      stat[product.category].sum+=parseInt(product.price);
      count+=parseInt(product.count);
      sum+=parseInt(product.price);
      return null;
    });

    setStats(stat);
    setCountAll(count);
    setSumAll(sum);

    setProducts(products);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleDelete(id) {
    await deleteDoc(doc(db, "zsemle", id));
    loadData();
  }

  async function handleSelect(event) {
    const selectedCategory = event.target.value;
    if (selectedCategory !== "") {
      filterByCategory(selectedCategory);
    } else {
      loadData();
    }
  }

  async function filterByCategory(category) {
    const q = query(collection(db, "zsemle"), where("category", "==", category));
    const querySnapshot = await getDocs(q);
    const productList = convertQuerySnapshot(querySnapshot);
    setProducts(productList);
  }

  async function handleQuantityChange(item, isIncrease) {
    const itemRef = doc(db, "zsemle", item.id);
    const amount = isIncrease ? 1 : -1;
    const newCount = item.count + amount;
    if (newCount >= 0) {
      updateDoc(itemRef, {
        count: newCount
      });
      loadData();
    }
  }

  return (
    <>
      <section className={"container-md"}>
        <header className={"mt-4 mb-4"}>
          <h1>zsemle.hu - vásárlói kosár</h1>
        </header>
        <Link to="/products/add" className="btn btn-primary mb-3">Új termék felvitele</Link>
        <div>
          <label>Szűrés kategóriára</label>
          <select className="form-select mb-3 mt-3" onChange={handleSelect}>
            <option defaultValue value="">Válassz!</option>
            {Object.values(categories).map((category) => (
              <option value={category} key={category}>{category}</option>
            ))}
          </select>
        </div>
        <table id="products-table" className="table table-striped">
          <thead>
            <tr>
              <th>Termék</th>
              <th>Kategória</th>
              <th>Egységár</th>
              <th>Darab</th>
              <th>Műveletek</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <TableItem key={product.id} item={product} handleDelete={handleDelete} handleQuantityChange={handleQuantityChange} />
            ))}
          </tbody>
        </table>
        <table className="table table-bordered table-striped">
        <thead>
        <tr>
          <th>
            Kategória
          </th>
          <th>
            Darab
          </th>
          <th>
            Összeg
          </th>
        </tr>
        </thead>
        <tbody>
        {stats && Object.entries(stats).map(([key, {category, count, sum}]) => (
          <tr key={key}>
            <td>
              {category}
            </td>
            <td>
              {count}
            </td>
            <td>
              {sum} Ft
            </td>
          </tr>
        ))}
          <tr>
            <td><strong>Összesen</strong></td>
            <td><strong>{countAll}</strong></td>
            <td><strong>{sumAll} Ft</strong></td>
          </tr>
        </tbody>
      </table>
      </section>
    </>
  );
}

export default Admin;
