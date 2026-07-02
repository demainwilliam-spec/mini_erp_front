import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCustomers, createOrder } from "../api/client";

function CreateOrderPage() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getCustomers().then((data) => {
      setCustomers(data);
      setLoading(false);
    });
  }, []);

  async function handleCreate() {
    if (!selectedCustomerId) {
      setError("Veuillez sélectionner un client.");
      return;
    }
    try {
      const order = await createOrder(Number(selectedCustomerId));
      navigate(`/orders/${order.id}`);
    } catch (e) {
      setError("Erreur lors de la création de la commande.");
    }
  }

  if (loading) return <div className="container">Chargement...</div>;

  return (
    <div className="container">
      <h1>Nouvelle commande</h1>
      <div className="card">
        <div className="form-row">
          <select
            value={selectedCustomerId}
            onChange={(e) => setSelectedCustomerId(e.target.value)}
          >
            <option value="">-- Choisir un client --</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <button className="btn" onClick={handleCreate}>
            Créer la commande
          </button>
        </div>
        {error && (
          <p style={{ color: "#ef4444", padding: "0 20px 20px" }}>{error}</p>
        )}
      </div>
    </div>
  );
}

export default CreateOrderPage;