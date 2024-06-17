import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomNavbar from './components/CustomNavbar';
import ItemsListDetails from './components/ItemsListDetails';
import Cart from './components/Cart';
import ItemsDetails from './components/ItemsDetails';

function App() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <Router>
      <div className='container-app'>
        <CustomNavbar cartCount={cartCount} />
        <Routes>
          <Route path="/products" element={<ItemsListDetails setCartCount={setCartCount} />} />
          <Route path="/products/:id" element={<ItemsDetails setCartCount={setCartCount} />} />
          <Route path="/cart" element={<Cart setCartCount={setCartCount} />} />
          <Route path="/" element={<ItemsListDetails setCartCount={setCartCount} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
