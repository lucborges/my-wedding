import React from 'react';

import s from './style.module.scss';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const PaymentCompleted = () => {
	return (
		<div className={s.container}>
			<h1 className={s.title}>Pagamento Realizado!</h1>
			<CheckCircleIcon fontSize='large' className={s.icon} />
			<span className={s.spanContent}>
				O pagamento foi realizado com sucesso!<br />
				Muito obrigado por estar abençoando nosso casamento, o seu apoio é muito significativo
				para nós!
			</span>
		</div>
	);
};

export default PaymentCompleted;
