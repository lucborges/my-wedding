import React from 'react';
import s from './style.module.scss';
import propTypes from 'prop-types';
// import axios from 'axios';

import { Button, Stack } from '@mui/material';
import { formatBrazilianMoney } from '@/lib/formatBrazilianMoney';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';


const Message = ({ total }) => {
	const { register, handleSubmit, formState: { errors } } = useForm();

	const handleSubmitMessage = (data) => {
		return console.log(data);
	};

	const router = useRouter();

	const useAxios = () => {
		const options = {
			method: 'POST',
			headers: {
				accept: 'application/json',
				Authorization: 'Bearer 4D1AAB212CA3470189F1BA060F0747E0',
				'Content-type': 'application/json',
			}
		};

		fetch('https://sandbox.api.pagseguro.com/checkouts', options)
			.then(response => response.json())
			.then(response => console.log(response))
			.catch(err => console.error(err));
	// 	axios.post('https://sandbox.api.pagseguro.com/checkouts', {
	// 		headers: {
	// 			accept: 'application/json',
	// 			Authorization: 'Bearer 4D1AAB212CA3470189F1BA060F0747E0',
	// 			'Content-type': 'application/json',
	// 			'Access-Control-Allow-Origin': '*'
	// 		}
	// 	})
	// 		.then(function (response) {
	// 			console.log(response.data);
	// 		})
	// 		.catch(function (error) {
	// 			console.error(error);
	// 		});
	// 	// .request(options)
	// 	// .then(function (response) {
	// 	// 	console.log(response.data);
	// 	// })
	// 	// .catch(function (error) {
	// 	// 	console.error(error);
	// 	// });
	};



	return (
		<>
			<div className={s.container}>
				<h1 className={s.title}>Deixe sua mensagem de carinho</h1>
				<form className={s.formContainer} onSubmit={handleSubmit(handleSubmitMessage)}>
					<div className={s.row}>
						<div className={s.col25}>
							<label>Nome completo*</label>
						</div>
						<div className={s.col75}>
							<input
								className={s.textField}
								placeholder='Digite seu nome aqui'
								{...register('name', { required: true, maxLength: 25, pattern: /^[A-Z a-z]+$/i })}
							/>
							{errors?.name?.type === 'required' && <p className={s.inputError}>Campo obrigatório.</p>}
							{errors?.name?.type === 'maxLength' && (
								<p className={s.inputError}>O campo não pode conter mais que 20 caracteres</p>
							)}
							{errors?.name?.type === 'pattern' && (
								<p className={s.inputError}>Apenas caracteres alfabéticos.</p>
							)}
						</div>
					</div>
					<div className={s.row}>
						<div className={s.col25}>
							<label>Email*</label>
						</div>
						<div className={s.col75}>
							<input
								className={s.textField}
								type='email'
								placeholder='exemplo@gmail.com'
								{...register('email', {
									required: true,
									pattern: /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/
								})}
							/>
							{errors?.email?.type === 'required' && <p className={s.inputError}>Campo obrigatório.</p>}
							{errors?.email?.type === 'pattern' && (
								<p className={s.inputError}>Email inválido.</p>
							)}
						</div>
					</div>
					<div className={s.row}>
						<div className={s.col25}>
							<label>Sua mensagem</label>
						</div>
						<div className={s.col75}>
							<textarea
								className={s.description}
								placeholder='Mensagem' {...register('description')}
							/>
						</div>
					</div>
					<span className={s.total}>{`Total: ${formatBrazilianMoney(total)}`}</span>
					<Stack direction="row" className={s.buttonGroup}>
						<Button variant='outlined' onClick={() => router.refresh()}>Voltar para o carrinho</Button>
						<Button
							variant='contained'
							style={{ color: '#fff'}}
							type='submit'
							onClick={() => useAxios()}
						>
							Concluir compra
						</Button>
					</Stack>
				</form>
			</div>
		</>
	);
};

export default Message;

Message.propTypes = {
	total: propTypes.string,
};
