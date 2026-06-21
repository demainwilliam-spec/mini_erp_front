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

  if (loading) return <div className="container">Chargement...</div>;

  return (
    <div className="container">
      <h1>📚 Catalogue de livres</h1>
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Titre</th>
              <th>Prix</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td className="price">{book.price} €</td>
                <td>
                  <span className="stock-bar">
                    <span className={`stock-dot ${book.stock_quantity <= 3 ? "low" : ""}`}></span>
                    {book.stock_quantity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BooksPage;