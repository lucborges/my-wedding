import React, { useContext } from 'react';
import s from './style.module.scss';
import { CartContext } from '@/context/cart';
import Image from 'next/image';

const Cart = () => {
	const { cartItems, removeFromCart, getCartTotal } = useContext(CartContext);
	console.log(cartItems);
	return (
		<>
			<div className={s.cartContainer}>
				<span className={s.title}>Meu carrinho</span>
				{cartItems.length > 0 ? (
					<>
						<div className={s.cartHeaders}>
							<span>Descrição do presente</span>
							<span>Valor</span>
						</div>
						<div className={s.line} />
						<ul className={s.cartItens}>
							{cartItems.map((item) => (
								<>
									<li>
										<div>
											<Image src={item.image} width={122} height={122}/>
											<div className={s.column}>
												<span>{item.name}</span>
												<span
													className={s.remove}
													onClick={() => removeFromCart}
												>
												Remover
												</span>
											</div>
											<span className={s.value}>{item.value}</span>
										</div>
									</li>
								</>
							))}
						</ul>
						<div className={s.line} />
						<div>
							<></>
							<span>{`Total: ${getCartTotal}`}</span>
						</div>
					</>
				) : (
					<h1>O Carrinho está vazio.</h1>
				)}
			</div>
		</>
	);
};

export default Cart;
