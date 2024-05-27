import React from 'react';
import s from './style.module.scss';
import Image from 'next/image';

const Dashboard = () => {
	const remainingDays = () => {
		const currentDate = new Date();
		const weddingDate = new Date('2024-09-07');
		const diffTime = Math.abs(currentDate - weddingDate);
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

		if (currentDate == weddingDate) {
			return 'Chegou o grande dia!'
		}

		return `Faltam apenas ${diffDays} dias`;
	};
	return (
		<>
			<div className={s.container}>
				<div>
					<Image
						className={s.image}
						src={'/dashboard.png'}
						width={590}
						height={600}
						alt='Casal de noivos' />
				</div>
				<div className={s.textContent}>
					<div className={s.titleGroup}>
						<h1 className={s.title}>Gabrielle & Lucas</h1>
						<p className={s.remainingDays}>{remainingDays()} | 7 de setembro de 2024</p>
					</div>
					<span className={s.span}>
					Seja muito bem-vindo! Estamos extremamente felizes em tê-lo aqui!
					Criamos este site com o objetivo de nos aproximarmos ainda mais de você!
					Por meio dele, você terá acesso a uma série de informações importantes sobre o nosso casamento.
					<br/>
					<br/>
					Na seção de confirmação de presença, gostaríamos de contar com a sua confirmação sobre a sua participação na cerimônia e no restaurante.
					Por favor, confirme sua presença o quanto antes, pois isso facilitará muito o processo de organização.
					Agradecemos desde já pela sua atenção e aguardamos ansiosamente pela sua resposta!
					</span>
				</div>
			</div>
		</>
	);

};

export default Dashboard;
