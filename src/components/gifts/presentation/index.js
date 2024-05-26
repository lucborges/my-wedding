import React, { useContext } from 'react';
import s from './style.module.scss';
import Image from 'next/image';
import Button from '@/components/button';
import { CartContext } from '@/context/cart';
import { useRouter } from 'next/router';
import { formatBrazilianMoney } from '@/lib/formatBrazilianMoney';
import { GiftsList } from '../giftsList';

const Gifts = () => {
	const { addToCart } = useContext(CartContext);
	const router = useRouter();
	return (
		<>
			<div className={s.giftContainer}>
				<h1 className={s.title}>Lista de presentes</h1>
				<span className={s.span}>
				Esta é uma lista divertida que criamos a fim de arrecadar presentes em forma de dinheiro, para podermos comprar nossas
				coisinhas do jeito que sempre sonhamos! Mas sinta-se a vontade se quiser nos presentear com algum presente "físico",
				ficaremos igualmente felizes!
				<br />
				<br />
				Há os seguintes métodos de pagamento: PIX, Crédito, Boleto, ou pela conta do PagBank.
				Não se preocupe, é totalmente seguro!
				</span>
				<ul className={s.cardContainer}>
					{GiftsList.map((gift) => (
						<>
							<li className={s.giftCard} key={gift}>
								<Image className={s.giftImage} src={gift.image} width={240} height={240}/>
								<p className={s.giftName}>{gift.name}</p>
								<p className={s.giftValue}>{formatBrazilianMoney(gift.price)}</p>
								<Button
									className={s.button}
									onClick={() => {
										addToCart(gift);
										router.push('/carrinho');
									}}
								>
									Presentear
								</Button>
							</li>
						</>
					))}
				</ul>
			</div>
		</>
	);
};

export default Gifts;
