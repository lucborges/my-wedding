import React from 'react';
import s from './style.module.scss';
import Image from 'next/image';

const Dashboard = () => {
	const remainingDays = () => {
		const currentDate = new Date();
		const weddingDate = new Date('2024-09-07');
		const diffTime = Math.abs(currentDate - weddingDate);
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return diffDays;
	};
	return (
		<>
			<div className={s.dashboardContent}>
				<Image
					className={s.image}
					src={'/dashboard.png'}
					width={590}
					height={600}
					alt='Casal de noivos' />
				<div className={s.textContent}>
					<div className={s.titleGroup}>
						<h1 className={s.title}>Gabrielle & Lucas</h1>
						<p className={s.remainingDays}>faltam apenas {remainingDays()} dias | 7 de setembro de 2024</p>
					</div>
					<span className={s.span}>
						Seja bem-vindo! É um prazer enorme ter você aqui! <br />
						Criamos esse site como parte de você estar ainda mais próximo de nós! <br />
						Por aqui você irá encontrar muitas informações sobre o nosso casamento.
						<br />
						<br />
						Na sessão de confirmação de presença, você pode confirmar se vai ou não ao <br />
						casamento. Confirme o mais rápido possível, por favor! Pois assim fica mais <br />
						fácil de organizar tudo.
					</span>
				</div>
			</div>
		</>
	);

};

export default Dashboard;
