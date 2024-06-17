import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, ref, get, child } from '../services/firebase';

const ItemsDetails = ({ setCartCount }) => {
  const { id } = useParams(); // Obtener el ID del parámetro de la URL
  const [product, setProduct] = useState(null); // Estado para almacenar el producto
  const [cart, setCart] = useState([]); // Estado para el carrito de compras

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Referencia al producto específico en la base de datos usando el ID
        const productRef = ref(db, `products/${id}`);

        // Obtener el snapshot del producto
        const productSnap = await get(productRef);

        if (productSnap.exists()) {
          // Si el producto existe, establecerlo en el estado
          setProduct({ id, ...productSnap.val() });
        } else {
          console.error('No such product!');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct(); // Llamar a la función para obtener el producto al cargar el componente
  }, [id]); // Dependencia 'id' para re-ejecutar el efecto cuando cambie el ID

  useEffect(() => {
    // Cargar datos del carrito desde localStorage al cargar el componente
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      setCart(JSON.parse(cartData));
    }
  }, []);

  const addToCart = async () => {
    if (product) {
      // Agregar el producto al carrito
      const newCart = [...cart, product];
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
      setCartCount(prevCount => prevCount + 1);

      // Guardar el producto en Firebase (opcional)
      // await set(ref(db, `cart/${product.id}`), product);
    }
  };

  if (!product) return <div>Loading...</div>; // Mostrar "Loading..." mientras se carga el producto

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.title} />
      <div>
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <div className='product-actions'>
          <h3>${product.price}</h3>
          <button className='btn btn-primary' onClick={addToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ItemsDetails;
