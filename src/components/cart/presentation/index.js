import React, { useContext, useState } from 'react';
import s from './style.module.scss';
import { CartContext } from '@/context/cart';
import Image from 'next/image';
import { formatBrazilianMoney } from '@/lib/formatBrazilianMoney';
import { Stack } from '@mui/material';
import Button from '@/components/button';
import { useRouter } from 'next/navigation';
import Message from '../message/presentation';

const Cart = () => {
	const { cartItems, removeFromCart, getCartTotal } = useContext(CartContext);
	const [isFinished, setIsFinished] = useState(null);
	const router = useRouter();

	const handleIsFinished = () => {
		setIsFinished(true);
	};

	if(isFinished) {
		return (
			<Message total={getCartTotal()}/>
		);
	}

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
						<ul className={s.cartItems}>
							{cartItems.map((item) => (
								<>
									<li>
										<div className={s.cartItem}>
											<Image src={item.image} width={122} height={122} className={s.image}/>
											<div className={s.cartContent}>
												<div className={s.column}>
													<span className={s.itemName}>{item.name}</span>
													<span
														className={s.remove}
														onClick={() => removeFromCart(item)}
													>
												Remover
													</span>
												</div>
												<span className={s.value}>{formatBrazilianMoney(item.price)}</span>
											</div>
										</div>
									</li>
								</>
							))}
						</ul>
						<div className={s.line} />
						<div className={s.cartTotal}>
							<div></div>
							<span className={s.total}>{`Total: ${formatBrazilianMoney(getCartTotal())}`}</span>
						</div>
						<div className={s.buttonGroup}>
							<Button
								appearance='secondary'
								onClick={() => router.push('/lista-de-presentes')}
							>
								Adicionar mais itens
							</Button>
							<Button
								onClick={() => handleIsFinished()}
							>
								Continuar compra
							</Button>
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
