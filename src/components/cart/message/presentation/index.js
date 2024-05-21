import React, { useContext, useState } from 'react';
import s from './style.module.scss';
import propTypes from 'prop-types';

import { Button, Stack } from '@mui/material';
import { formatBrazilianMoney } from '@/lib/formatBrazilianMoney';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Modal from '@mui/material/Modal';
import Image from 'next/image';
import { useGetCheckoutLink, useSaveGiftMessage } from '@/hook/use-gift';
import { CartContext } from '@/context/cart';
import { useMutation } from '@tanstack/react-query';
import Spinner from '@/components/spinner';


const Message = ({ total }) => {
	const { register, handleSubmit, formState: { errors } } = useForm();
	const { cartItems } = useContext(CartContext);
	const router = useRouter();

	const [name, setName] = useState(null);
	const [email, setEmail] = useState(null);
	const [customerMessage, setCustomerMessage] = useState(null);
	const [open, setOpen] = useState(false);

	const handleClose = () => setOpen(false);

	const items = [];
	const pushCartItems = () => {
		cartItems.map((item) => {
			const itemsObject = {
				name: item.name,
				quantity: item.quantity,
				unit_amount: (item.price * 100)
			};
			items.push(itemsObject);
		});
	};

	const { mutateAsync: saveGiftMessage } = useMutation({
		mutationFn: useSaveGiftMessage,
	});

	const { mutateAsync: getCheckoutLink, data: checkoutLink, isError } = useMutation({
		mutationFn: useGetCheckoutLink
	});

	const messageModel = {
		name: name,
		email: email,
		message: customerMessage,
	};

	const checkoutModel = {
		customerName: name,
		email: email,
		message: customerMessage,
		items: items
	};

	if (checkoutLink !== undefined) {
		router.push(checkoutLink);
	}

	const handleSubmitMessage = async () => {
		try {
			setOpen(true);
			await saveGiftMessage({
				messageModel
			});
			pushCartItems();
			await getCheckoutLink({
				checkoutModel
			});
		} catch (error) {
			return;
		}
	};

	const handleSetCustomerName = (e) => {
		setName(e.target.value);
	};

	const handleSetCustomerEmail = (e) => {
		setEmail(e.target.value);
	};

	const handleSetCustomerMessage = (e) => {
		setCustomerMessage(e.target.value);
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
								onInput={(e) => handleSetCustomerName(e)}
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
								onInput={(e) => handleSetCustomerEmail(e)}
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
								onInput={(e) => handleSetCustomerMessage(e)}
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
						>
							Concluir compra
						</Button>
					</Stack>
				</form>
				<Modal
					open={open}
					onClose={handleClose}
				>
					<div className={s.modalContainer}>
						{isError ? (
							<div className={s.contentContainer}>
								<Image src='/ops.png' width={171} height={171}/>
								<h1 className={s.modalTitle}>Ocorreu um erro!</h1>
								<span className={s.modalDescription}>
								Parece que ocorreu algum erro ao redirecionar para o pagamento.<br/>
								Tente novamente mais tarde, caso não consiga
								por favor entre em contato conosco.
								</span>
								<Stack className={s.buttonGroup}>
									<Button
										variant='outlined'
										className={s.modalButtons}
										onClick={handleClose}
									>
									Fechar
									</Button>
								</Stack>
							</div>
						) : (
							<>
								<div className={s.spinnerContainer}>
									<Spinner />
									<span className={s.spinnerSpan}>Redirecionando para pagamento...</span>
								</div>
							</>
						)

						}
					</div>
				</Modal>
			</div>
		</>
	);
};

export default Message;

Message.propTypes = {
	total: propTypes.string,
};
