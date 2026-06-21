import { useState, useEffect } from "react";
import { getBooks } from "../api/client";

function BooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBooks().then((data) => {
      setBooks(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div style={{ padding: "24px" }}>
      <h1>📚 Catalogue de livres</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #ddd" }}>
            <th style={{ textAlign: "left", padding: "8px" }}>Titre</th>
            <th style={{ textAlign: "left", padding: "8px" }}>Prix</th>
            <th style={{ textAlign: "left", padding: "8px" }}>Stock</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "8px" }}>{book.title}</td>
              <td style={{ padding: "8px" }}>{book.price} €</td>
              <td style={{ padding: "8px" }}>{book.stock_quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BooksPage;