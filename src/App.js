import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuPage from './pages/MenuPage';
import TablesPage from './pages/TablesPage';
import OrderLinePage from './pages/OrderLinePage'
import CartPage from './pages/CartPage';
import DashboardPage from './pages/DashboardPage';
import MenuManagement from './pages/MenuManagement';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<DashboardPage />} />
          <Route path='/tables' element={<TablesPage />} />
          <Route path='/orders' element={<OrderLinePage />} />
          <Route path='/menumanagement' element={<MenuManagement />} />

          <Route path='/menu' element={<MenuPage />} />
          <Route path='/cart' element={<CartPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
