import React from 'react';
import s from './style.module.scss';
import giftsList from 'server/mocks/giftsMock';
import Image from 'next/image';

const Gifts = () => {
	return (
		<>
			<div className={s.giftContainer}>
				<h1 className={s.title}>Lista de presentes</h1>
				<div className={s.cardsContainer}>
					<div className={s.giftCard}>
						{giftsList.map((gift) => {
							<Image src={gift.image} width={240} height={240}/>;
						})}
					</div>
				</div>
			</div>
		</>
	);
};

export default Gifts;
