import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getOrderSummary,
  getBooks,
  addOrderLine,
  confirmOrder,
  closeOrder,
} from "../api/client";
import StatusBadge from "../components/StatusBadge";



function OrderDetailPage() {
  const { orderId } = useParams();
  const [summary, setSummary] = useState(null);
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function loadSummary() {
    getOrderSummary(orderId).then((data) => {
      setSummary(data);
      setLoading(false);
    });
  }

  useEffect(() => {
    loadSummary();
    getBooks().then(setBooks);
  }, [orderId]);

  async function handleAddLine() {
    if (!selectedBookId) return;
    await addOrderLine(orderId, Number(selectedBookId), Number(quantity));
    loadSummary();
  }

  async function handleConfirm() {
  setError(null);
  try {
    const res = await confirmOrder(orderId);
    if (res.detail) {
      setError(res.detail);
      return;
    }
    loadSummary();
  } catch (e) {
    setError("Erreur lors de la confirmation.");
  }
}

  async function handleClose() {
    await closeOrder(orderId);
    loadSummary();
  }

  if (loading) return <div className="container">Chargement...</div>;

  return (
    <div className="container">
      <h1>Commande #{summary.order_id}</h1>
      <p className="meta">
        Client : <strong>{summary.customer_name}</strong> — Date : {summary.date}
      </p>
      <StatusBadge status={summary.status} />

      <h2>Lignes</h2>
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Livre</th>
              <th>Quantité</th>
              <th>Prix unitaire</th>
              <th>Sous-total</th>
            </tr>
          </thead>
          <tbody>
            {summary.lines.map((line, i) => (
              <tr key={i}>
                <td>{line.book}</td>
                <td>{line.quantity}</td>
                <td className="price">{line.unit_price} €</td>
                <td className="price">{line.subtotal} €</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="total-row">
          <span>Total</span>
          <strong>{summary.total_amount} €</strong>
        </div>
      </div>

       <p style={{ marginTop: "16px", fontWeight: "bold" }}>
        Total : {summary.total_amount} €
      </p>

      {error && (
        <p style={{ color: "#ef4444", padding: "16px 0" }}>{error}</p>
      )}

      {summary.status === "draft" && (
        <>
          <h2>Ajouter un livre</h2>
          <div className="card">
            <div className="form-row">
              <select value={selectedBookId} onChange={(e) => setSelectedBookId(e.target.value)}>
                <option value="">-- Choisir un livre --</option>
                {books.map((book) => (
                  <option key={book.id} value={book.id}>
                    {book.title} (stock: {book.stock_quantity})
                  </option>
                ))}
              </select>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <button className="btn secondary" onClick={handleAddLine}>
                Ajouter
              </button>
            </div>
          </div>

          <div className="actions">
            <button className="btn" onClick={handleConfirm}>
              ✅ Confirmer la commande
            </button>
          </div>
        </>
      )}

      {summary.status === "confirmed" && (
        <div className="actions">
          <button className="btn" onClick={handleClose}>
            🏁 Clôturer la commande
          </button>
        </div>
      )}
    </div>
  );
}

export default OrderDetailPage;