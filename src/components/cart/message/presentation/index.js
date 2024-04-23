import React from 'react';
import s from './style.module.scss';
import propTypes from 'prop-types';

import TextField from '@mui/material/TextField';
import { Button, Stack } from '@mui/material';
import { formatBrazilianMoney } from '@/lib/formatBrazilianMoney';

const Message = ({ total }) => {
	return (
		<>
			<div className={s.container}>
				<h1 className={s.title}>Deixe sua mensagem de carinho</h1>
				<div className={s.formContainer}>
					<div className={s.row}>
						<div className={s.col25}>
							<label>Nome completo*</label>
						</div>
						<div className={s.col75}>
							<TextField size='small' placeholder='Digite seu nome aqui' fullWidth required/>
						</div>
					</div>
					<div className={s.row}>
						<div className={s.col25}>
							<label>Email*</label>
						</div>
						<div className={s.col75}>
							<TextField size='small' placeholder='exemplo@gmail.com' fullWidth required/>
						</div>
					</div>
					<div className={s.row}>
						<div className={s.col25}>
							<label>Sua mensagem</label>
						</div>
						<div className={s.col75}>
							<TextField
								size='small'
								placeholder='Mensagem'
								fullWidth
								className={s.description}
							/>
						</div>
					</div>
					<span>{`Total: ${formatBrazilianMoney(total)}`}</span>
					<Stack direction="row" className={s.buttonGroup}>
						<Button variant='outlined'>Voltar para o carrinho</Button>
						<Button variant='contained' style={{ color: '#fff'}}>Concluir compra</Button>
					</Stack>
				</div>
			</div>
		</>
	);
};

export default Message;

Message.propTypes = {
	total: propTypes.string,
};
