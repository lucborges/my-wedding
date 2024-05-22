import React, { useState } from 'react';

import s from './style.module.scss';
import { useRouter } from 'next/router';
import Modal from '@mui/material/Modal';

const OurWedding = () => {
	const router = useRouter();
	const QUADRANGULAR_MAPS_LINK = 'https://maps.app.goo.gl/m13Z42zzy5gb2gE5A';
	const ESTANCIA_GRILL_MAPS_LINK = 'https://maps.app.goo.gl/AEFkQBPTBwy5JzcB8';

	const [open, setOpen] = useState(false);

	const handleClose = () => setOpen(false);

	return (
		<>
			<div className={s.container}>
				<h1 className={s.title}>Nosso Casamento</h1>
				<span className={s.description}>
					Nosso casamento foi pensando em principalmente chamar todos aqueles que fizeram e ainda fazem parte,<br />
					de nossas vidas. Por isso escolhemos fazer uma cerimônia na igreja e após isso nos reuniremos
					todos em um restaurante <br />
					para curtirmos juntos e desfrutar de ótimos momentos!
				</span>
				<h1 className={s.title}>A Ceriôminia</h1>
				<span className={s.description}>
					A cerimônia vai ocorrer na <a className={s.link} onClick={() => router.push(window.open(QUADRANGULAR_MAPS_LINK, '_blank'))}>Igreja Quadrangular do Jardim Novo Campos Elíseos</a> no dia 7 de setembro de 2024 às 17h.<br />
					Você pode encontrar algumas dicas para a cerimônia <a className={s.link} onClick={() => setOpen(true)}>clicando aqui</a>.<br />
					Endereço: R. Cícero de Oliveira Silva, 101 - Jardim Novo Campos Eliseos, Campinas - SP
				</span>
				<h1 className={s.title}>O Restaurante</h1>
				<span className={s.description}>
					Reservamos um restaurante incrível onde teremos um ótimo espaço para conversar e se divertir após a<br />
					cerimônia. O restaurante escolhido foi o <a className={s.link} onClick={() => router.push(window.open(ESTANCIA_GRILL_MAPS_LINK, '_blank'))}>Estância Grill em Barão Geraldo</a>, é uma churrascaria que conta com<br />
					um rodízio de carnes e um buffet com uma grande variedade. O valor cobra do pelo restaurante é de 70 reais<br />
					por pessoa (fora bebidas). Todos estão mais do que convidados a comparecer e ter um tempo ainda mais especial<br />
					conosco!<br />
					Endereço: Barão Geraldo - Av. Albino J. B. de Oliveira, 271 - Jardim Santa Genebra II (Barao Geraldo), Campinas - SP
				</span>
				<Modal
					open={open}
					onClose={handleClose}
				>
					<div className={s.modalContainer}>
						<div className={s.contentContainer}>
							<h1 className={s.title}>Dicas para a Cerimônia</h1>

							<h4 className={s.subtitle}>Traje</h4>
							<span className={s.spanContent}>
								A cerimônia ocorrerá no período de final da tarde/noite, sendo assim gostaríamos<br />
								que utilizassem um traje esporte fino/social para a ocasião.
								<br />
								<br />
								Branco é <a className={s.highlight}>único e exclusivo da noiva</a>! Mulheres pedimos que evitem vestidos brancos.
								Pedimos que evitem também as cores lilás.
							</span>
							<br />
							<h4 className={s.subtitle}>Uso de celular</h4>
							<span className={s.spanContent}>
								Contratamos uma equipe profissional para registrar todo esse momento tão importante, então pedimos
								que <a className={s.highlight}>durante a cerimônia não fotografem ou gravem vídeos</a> para não atrapalhar o trabalho dos profissionais.
								Em outros momentos você é totalmente livre para fotografar e filmar!
							</span>
						</div>
					</div>
				</Modal>
			</div>
		</>
	);
};

export default OurWedding;
