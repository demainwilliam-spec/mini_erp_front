import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import BooksPage from "./pages/BooksPage";
import OrdersPage from "./pages/OrdersPage";
import OrderDetailPage from "./pages/OrderDetailPage";

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: "16px", borderBottom: "1px solid #ddd", display: "flex", gap: "16px" }}>
        <Link to="/books">📚 Livres</Link>
        <Link to="/orders">📋 Commandes</Link>
      </nav>

      <Routes>
        <Route path="/books" element={<BooksPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/orders/:orderId" element={<OrderDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;