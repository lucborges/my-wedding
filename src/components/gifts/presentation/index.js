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
				Esta é uma lista divertida que criamos para arrecadar presentes em forma de dinheiro,
				permitindo-nos comprar nossas coisinhas do jeito que sempre sonhamos! No entanto, sinta-se
				à vontade para nos presentear com algo físico, ficaremos igualmente felizes!
				<br/>
				<br/>
				Oferecemos várias opções de pagamento, incluindo PIX, cartão de crédito, boleto bancário
				ou pela conta do PagBank. Todas as formas de pagamento são totalmente seguras!
				<br/>
				<br/>
				Agradecemos antecipadamente pelo seu carinho e generosidade!
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
