import React from 'react';
import '../index.css';

const TicketModal = ({ cartItems, onClose, onConfirm }) => {
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className='modal'>
      <div className='modal-content'>
        <h2>Resumen del Carrito</h2>
        <ul>
          {cartItems.map((item, index) => (
            <li className='item' key={index}>
              <img src={item.image} alt={item.title} />
              <div>
                <h3>{item.title}</h3>
                <p>${item.price}</p>
              </div>
            </li>
          ))}
        </ul>
        <p>Total: ${totalPrice.toFixed(2)}</p>
        <div className='modal-content-buttons'>
          <button className='btn btn-primary' onClick={onConfirm}>Confirmar</button>
          <button className='btn btn-secondary' onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default TicketModal;
