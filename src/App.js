import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MenuPage from './pages/MenuPage';
import AnalyticsPage from './pages/AnalyticsPage'
import TablesPage from './pages/TablesPage';
import OrderLinePage from './pages/OrderLinePage'
import CartPage from './pages/CartPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<MenuPage />} />
          <Route path='/analytics' element={<AnalyticsPage />} />
          <Route path='/tables' element={<TablesPage />} />
          <Route path='/orders' element={<OrderLinePage />} /> 
          <Route path='/cart' element={<CartPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
