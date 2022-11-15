import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import {
  addToDb,
  deleteShoppingCart,
  getStoredCart,
} from "../../../utilities/fakedb";
import Cart from "../../Cart/Cart";
import Product from "../../Product/Product";
import "./Shop.css";

const Shop = () => {
  // const { products, count } = useLoaderData()
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  useEffect(() => {
    const url = `https://ema-john-server-main.vercel.app/products?page=${page}&size=${size}`;
    console.log(page, size);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCount(data.count);
        setProducts(data.products);
      });
  }, [page, size]);

  const pages = Math.ceil(count / size);

  const clearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  useEffect(() => {
    const storedCart = getStoredCart();
    const savedCart = [];

    const ids = Object.keys(storedCart);
    console.log(ids);

    fetch("https://ema-john-server-main.vercel.app/productsByIds", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ids),
    })
      .then((res) => res.json())
      .then((data) => {
        for (const id in storedCart) {
          const addedProduct = data.find((product) => product._id === id);
          if (addedProduct) {
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct);
          }
        }
        setCart(savedCart);
      });
  }, [products]);

  const handlerAddToCart = (selectedproduct) => {
    console.log(selectedproduct);
    let newCart = [];
    const exists = cart.find((product) => product._id === selectedproduct._id);
    if (!exists) {
      selectedproduct.quantity = 1;
      newCart = [...cart, selectedproduct];
    } else {
      const rest = cart.filter(
        (product) => product._id !== selectedproduct._id
      );
      exists.quantity = exists.quantity + 1;
      newCart = [...rest, exists];
    }
    setCart(newCart);
    addToDb(selectedproduct._id);
  };
  return (
    <div className="shop-container">
      <div className="products-container">
        {products.map((product) => (
          <Product
            key={product._id}
            product={product}
            handlerAddToCart={handlerAddToCart}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart} clearCart={clearCart}>
          <Link to="/orders">
            <button>Review</button>
          </Link>
        </Cart>
      </div>
      <div className="pagination">
        <p>
          Currently selected page:{page} and size: {size}
        </p>
        {[...Array(pages).keys()].map((number) => (
          <button
            key={number}
            className={page === number && "selected"}
            onClick={() => setPage(number)}
          >
            {number + 1}
          </button>
        ))}
        <select onChange={(event) => setSize(event.target.value)}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
    </div>
  );
};

export default Shop;
