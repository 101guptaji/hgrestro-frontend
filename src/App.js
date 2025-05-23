import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MenuPage from './pages/MenuPage';
import AnalyticsPage from './pages/AnalyticsPage'
import TablesPage from './pages/TablesPage';
import OrderLinePage from './pages/OrderLinePage'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<MenuPage />} />
          <Route path='/analytics' element={<AnalyticsPage />} />
          <Route path='/tables' element={<TablesPage />} />
          <Route path='/orders' element={<OrderLinePage />} /> 
        </Routes>
      </Router>
    </>
  );
}

export default App;
