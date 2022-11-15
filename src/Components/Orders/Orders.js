import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';

const Orders = () => {
    const { products, InitialCart } = useLoaderData();
    const [cart, setCart] = useState(InitialCart)

    const handleRemoveItem = (id) => {
        const remaining = cart.filter(product => product._id !== id)
        setCart(remaining)
        removeFromDb(id)
    }

    const clearCart = () => {
        setCart([])
        deleteShoppingCart()
    }

    return (
        <div className='shop-container'>
            <div className='orders-container'>
                {
                    cart.map(product => <ReviewItem
                        key={product._id}
                        handleRemoveItem={handleRemoveItem}
                        product={product}
                    ></ReviewItem>)
                }
                {
                    cart.length === 0 && <p>This is not found 404 <Link to='/'>Shop More</Link> </p>
                }
            </div>
            <div className='cart-container'>
                <Cart clearCart={clearCart} cart={cart}></Cart>
                <Link to='/shipping'>
                    <button>Proceed Shipping</button>
                </Link>
            </div>
        </div>
    );
};

export default Orders;