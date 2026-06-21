import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getOrders } from "../api/client";
import StatusBadge from "../components/StatusBadge";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders().then((data) => {
      setOrders(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div style={{ padding: "24px" }}>
      <h1>📋 Commandes</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #ddd" }}>
            <th style={{ textAlign: "left", padding: "8px" }}>ID</th>
            <th style={{ textAlign: "left", padding: "8px" }}>Client</th>
            <th style={{ textAlign: "left", padding: "8px" }}>Statut</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "8px" }}>
                <Link to={`/orders/${order.id}`}>#{order.id}</Link>
              </td>
              <td style={{ padding: "8px" }}>Client #{order.customer_id}</td>
              <td style={{ padding: "8px" }}>
                <StatusBadge status={order.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersPage;