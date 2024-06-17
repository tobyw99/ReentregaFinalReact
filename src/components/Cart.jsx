import React, { useEffect, useState } from 'react';
import { db, ref, child, get, remove } from '../services/firebase';
import TicketModal from './TicketModal';

const Cart = ({ setCartCount }) => {
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, 'cart'));
        if (snapshot.exists()) {
          const cartItems = Object.keys(snapshot.val()).map(key => ({
            id: key,
            ...snapshot.val()[key]
          }));
          setCart(cartItems);
          setCartCount(cartItems.length);
          localStorage.setItem('cart', JSON.stringify(cartItems)); // Actualizar localStorage
        } else {
          setCart([]);
          setCartCount(0);
          localStorage.removeItem('cart'); // Limpiar localStorage si no hay elementos
          console.log("No items in cart.");
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchCart();
  }, [setCartCount]);

  const removeFromCart = async (id) => {
    const newCart = cart.filter(item => item.id !== id);
    setCart(newCart);
    setCartCount(newCart.length);

    try {
      await remove(ref(db, `cart/${id}`));
      localStorage.setItem('cart', JSON.stringify(newCart)); // Actualizar localStorage después de eliminar
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const resetCart = async () => {
    setCart([]);
    setCartCount(0);

    try {
      await remove(ref(db, 'cart'));
      localStorage.removeItem('cart'); // Limpiar localStorage al resetear el carrito
      closeModal();
    } catch (error) {
      console.error("Error resetting cart:", error);
    }
  };

  return (
    <div className='container-cart'>
      <h1>Cart</h1>
      <ul>
        {cart.map((item, index) => (
          <li className='item-cart' key={index}>
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <div className='item-price'>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
              <p>${item.price}</p>
            </div>
          </li>
        ))}
      </ul>
      <button className='btn btn-secondary' onClick={openModal}>Ticket</button>

      {showModal && (
        <TicketModal cartItems={cart} onClose={closeModal} onConfirm={resetCart} />
      )}
    </div>
  );
};

export default Cart;
