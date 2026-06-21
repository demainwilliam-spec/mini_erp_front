const API_URL = "http://localhost:8000";

export async function getBooks() {
  const res = await fetch(`${API_URL}/books/`);
  return res.json();
}

export async function getOrders() {
  const res = await fetch(`${API_URL}/orders/`);
  return res.json();
}

export async function getOrder(orderId) {
  const res = await fetch(`${API_URL}/orders/${orderId}`);
  return res.json();
}

export async function getOrderSummary(orderId) {
  const res = await fetch(`${API_URL}/orders/${orderId}/summary`);
  return res.json();
}

export async function getCustomers() {
  const res = await fetch(`${API_URL}/customers/`);
  return res.json();
}

export async function createOrder(customerId) {
  const res = await fetch(`${API_URL}/orders/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ customer_id: customerId }),
  });
  return res.json();
}

export async function addOrderLine(orderId, bookId, quantity) {
  const res = await fetch(`${API_URL}/orders/${orderId}/add-line`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ book_id: bookId, quantity }),
  });
  return res.json();
}

export async function confirmOrder(orderId) {
  const res = await fetch(`${API_URL}/orders/${orderId}/confirm`, {
    method: "POST",
  });
  return res.json();
}

export async function closeOrder(orderId) {
  const res = await fetch(`${API_URL}/orders/${orderId}/close`, {
    method: "POST",
  });
  return res.json();
}