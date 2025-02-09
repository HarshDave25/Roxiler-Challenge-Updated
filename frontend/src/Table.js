import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import "./Tables.css";

const Table = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [transactions, setTransactions] = useState([]);
  const perPage = 10;

  const months = useMemo(() => [...Array(12)].map((_, i) => ({
    name: new Date(0, i).toLocaleString("default", { month: "long" }),
    number: i + 1
  })), []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/transactions", { params: { search, page, perPage } });
        setTransactions(data.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchData();
  }, [search, page]);

  return (
    <div className="submitted-data-main">
      <div className="submitted-instructions">
        <input type="text" placeholder="Search transaction" onChange={(e) => setSearch(e.target.value)} />
        <select onChange={(e) => setSearch(e.target.value)}>
          <option>Select Month</option>
          {months.map(({ name, number }) => (
            <option key={number} value={number}>{name}</option>
          ))}
        </select>
      </div>
      <table>
        <thead>
          <tr><th>Id</th><th>Title</th><th>Description</th><th>Price</th><th>Category</th><th>Sold</th><th>Image</th></tr>
        </thead>
        <tbody>
          {transactions.map((t, i) => (
            <tr key={t.id} style={{ backgroundColor: i % 2 ? "#f0f0f0" : "#fff" }}>
              <td>{t.id}</td><td>{t.title}</td><td>{t.description}</td><td>{t.price}</td>
              <td>{t.category}</td><td>{t.sold ? "Yes" : "No"}</td>
              <td><a href={t.image} target="_blank" rel="noopener noreferrer">View</a></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="btns">
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>Previous</button>
        <button disabled={transactions.length < perPage} onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
    </div>
  );
};
export default Table;