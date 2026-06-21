import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import BooksPage from "./pages/BooksPage";
import OrdersPage from "./pages/OrdersPage";
import OrderDetailPage from "./pages/OrderDetailPage";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <NavLink to="/books" className={({ isActive }) => (isActive ? "active" : "")}>
          📚 Livres
        </NavLink>
        <NavLink to="/orders" className={({ isActive }) => (isActive ? "active" : "")}>
          📋 Commandes
        </NavLink>
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