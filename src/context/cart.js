import React, { createContext, useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [cartItems, setCartItems] = useState([]);

	useEffect(() => {
		const storedCartItems = localStorage.getItem('cartItems');
		if (storedCartItems) {
			setCartItems(JSON.parse(storedCartItems));
		}
	}, []);

	const addToCart = (item) => {
		if (cartItems.find((cartItem) => cartItem.name === item.name)) {
			toast.error('Item já adicionado ao carrinho.');
			return;
		}

		setCartItems([...cartItems, { ...item, quantity: 1 }]); // if the item is not in the cart, add the item to the cart
		toast.success('Item adicionado ao carrinho!');
	};

	const removeFromCart = (item) => {
		const isItemInCart = cartItems.find((cartItem) => cartItem.name === item.name);

		if (isItemInCart.quantity === 1) {
			setCartItems(cartItems.filter((cartItem) => cartItem.name !== item.name)); // if the quantity of the item is 1, remove the item from the cart
		} else {
			setCartItems(
				cartItems.map((cartItem) =>
					cartItem.id === item.id
						? { ...cartItem, quantity: cartItem.quantity - 1 } // if the quantity of the item is greater than 1, decrease the quantity of the item
						: cartItem
				)
			);
		}
	};

	const clearCart = () => {
		setCartItems([]); // set the cart items to an empty array
	};

	const getCartTotal = () => {
		return cartItems.reduce((total, item) => total + item.value, 0); // calculate the total price of the items in the cart
	};

	useEffect(() => {
		localStorage.setItem('cartItems', JSON.stringify(cartItems));
	}, [cartItems]);

	useEffect(() => {
		const cartItems = localStorage.getItem('cartItems');
		if (cartItems) {
			setCartItems(JSON.parse(cartItems));
		}
	}, []);

	return (
		<CartContext.Provider
			value={{
				cartItems,
				addToCart,
				removeFromCart,
				clearCart,
				getCartTotal,
			}}
		>
			{children}
			<ToastContainer />
		</CartContext.Provider>
	);
};

CartProvider.propTypes = {
	children: propTypes.node.isRequired,
};
