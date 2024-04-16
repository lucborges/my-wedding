import React, { useContext } from 'react';
import s from './style.module.scss';
import { CartContext } from '@/context/cart';
import Image from 'next/image';
import { formatBrazilianMoney } from '@/lib/formatBrazilianMoney';
import {
	Button,
	Stack
} from '@mui/material';
import { useRouter } from 'next/navigation';

const Cart = () => {
	const { cartItems, removeFromCart, getCartTotal } = useContext(CartContext);
	const router = useRouter();
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
											<Image src={item.image} width={122} height={122}/>
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
												<span className={s.value}>{formatBrazilianMoney(item.value)}</span>
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
						<Stack direction="row" className={s.buttonGroup}>
							<Button variant='outlined' onClick={() => router.push('/lista-de-presentes')}>Adicionar mais itens</Button>
							<Button variant='contained' style={{ color: '#fff'}}>Continuar compra</Button>
						</Stack>
					</>
				) : (
					<h1>O Carrinho está vazio.</h1>
				)}
			</div>
		</>
	);
};

export default Cart;
