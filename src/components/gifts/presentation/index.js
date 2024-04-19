import React, { useContext } from 'react';
import s from './style.module.scss';
import giftsList from 'server/mocks/giftsMock';
import Image from 'next/image';
import { Button } from '@mui/material';
import { CartContext } from '@/context/cart';
import { useRouter } from 'next/router';
import { formatBrazilianMoney } from '@/lib/formatBrazilianMoney';

const Gifts = () => {
	const { addToCart } = useContext(CartContext);
	const router = useRouter();
	return (
		<>
			<div className={s.giftContainer}>
				<h1 className={s.title}>Lista de presentes</h1>
				<ul className={s.cardContainer}>
					{giftsList.map((gift) => (
						<>
							<li className={s.giftCard} key={gift}>
								<Image src={'/sadia.png'} width={240} height={240}/>
								<p className={s.giftName}>{gift.name}</p>
								<p className={s.giftValue}>{formatBrazilianMoney(gift.value)}</p>
								<Button
									variant='contained'
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
