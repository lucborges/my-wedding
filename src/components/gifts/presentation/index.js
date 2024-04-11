import React from 'react';
import s from './style.module.scss';
import giftsList from 'server/mocks/giftsMock';
import Image from 'next/image';
import { Button } from '@mui/material';

const Gifts = () => {
	console.log(giftsList);
	return (
		<>
			<div className={s.giftContainer}>
				<h1 className={s.title}>Lista de presentes</h1>
				<ul className={s.cardContainer}>
					{giftsList.map((gift) => (
						<>
							<li className={s.giftCard}>
								<Image src={gift.image} width={240} height={240}/>
								<p className={s.giftName}>{gift.name}</p>
								<p className={s.giftValue}>{gift.value}</p>
								<Button variant='contained' className={s.button}>Presentear</Button>
							</li>
						</>
					))}
				</ul>
			</div>
		</>
	);
};

export default Gifts;
