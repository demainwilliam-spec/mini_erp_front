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
    await confirmOrder(orderId);
    loadSummary();
  }

  async function handleClose() {
    await closeOrder(orderId);
    loadSummary();
  }

  if (loading) return <p>Chargement...</p>;

  return (
    <div style={{ padding: "24px" }}>
      <h1>Commande #{summary.order_id}</h1>
      <p>
        Client : <strong>{summary.customer_name}</strong> — Date : {summary.date}
      </p>
      <StatusBadge status={summary.status} />

      <h2 style={{ marginTop: "24px" }}>Lignes</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #ddd" }}>
            <th style={{ textAlign: "left", padding: "8px" }}>Livre</th>
            <th style={{ textAlign: "left", padding: "8px" }}>Quantité</th>
            <th style={{ textAlign: "left", padding: "8px" }}>Prix unitaire</th>
            <th style={{ textAlign: "left", padding: "8px" }}>Sous-total</th>
          </tr>
        </thead>
        <tbody>
          {summary.lines.map((line, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "8px" }}>{line.book}</td>
              <td style={{ padding: "8px" }}>{line.quantity}</td>
              <td style={{ padding: "8px" }}>{line.unit_price} €</td>
              <td style={{ padding: "8px" }}>{line.subtotal} €</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p style={{ marginTop: "16px", fontWeight: "bold" }}>
        Total : {summary.total_amount} €
      </p>

      {summary.status === "draft" && (
        <div style={{ marginTop: "24px", padding: "16px", background: "#f9f9f9", borderRadius: "8px" }}>
          <h3>Ajouter un livre</h3>
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
            style={{ marginLeft: "8px", width: "60px" }}
          />
          <button onClick={handleAddLine} style={{ marginLeft: "8px" }}>
            Ajouter
          </button>

          <div style={{ marginTop: "16px" }}>
            <button onClick={handleConfirm}>✅ Confirmer la commande</button>
          </div>
        </div>
      )}

      {summary.status === "confirmed" && (
        <div style={{ marginTop: "24px" }}>
          <button onClick={handleClose}>🏁 Clôturer la commande</button>
        </div>
      )}
    </div>
  );
}

export default OrderDetailPage;