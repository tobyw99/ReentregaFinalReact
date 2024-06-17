import React, { useEffect, useState } from 'react';
import { db, ref, child, get, set } from '../services/firebase'; // Asegúrate de que no haya 'doc' aquí
import { Link } from 'react-router-dom';

const ItemsListDetails = ({ setCartCount }) => {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, 'products'));
        console.log(snapshot.val());
        if (snapshot.exists()) {
          const products = [];
          snapshot.forEach(productSnap => {
            products.push({
              id: productSnap.key,
              ...productSnap.val()
            });
          });
          setData(products);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      const cartItems = JSON.parse(cartData);
      setCart(cartItems);
      setCartCount(cartItems.length);
    }
  }, [setCartCount]);

  const addToCart = async (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCartCount(newCart.length);

    await set(ref(db, `cart/${product.id}`), product);
  };

  return (
    <div className='containerList'>
      {data.map((product, index) => (
        <div key={index} className='containerCard'>
          <img src={product.image} className='card-img-top' alt={product.title} />
          <div className='card-body'>
            <h5 className='card-title'>{product.title}</h5>
            <p className='card-text'>{product.description}</p>
            <div className='card-actions'>
              <div className='card-actions-item'>
                <h3 className='card-price'>${product.price}</h3>
                <Link to={`/products/${product.id}`} className='btn btn-secondary'>More ...</Link>
              </div>
              <div>
                <button className='btn btn-primary' onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemsListDetails;
