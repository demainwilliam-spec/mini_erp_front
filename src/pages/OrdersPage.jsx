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

  if (loading) return <div className="container">Chargement...</div>;

  return (
    <div className="container">
      <h1>📋 Commandes</h1>
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Client</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>
                  <Link className="link-id" to={`/orders/${order.id}`}>
                    #{order.id}
                  </Link>
                </td>
                <td>Client #{order.customer_id}</td>
                <td>
                  <StatusBadge status={order.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrdersPage;
