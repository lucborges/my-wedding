import React, { useState } from 'react';
import s from './style.module.scss';
import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import {
	Button,
	FormControlLabel,
	FormHelperText,
	IconButton,
	Radio,
	RadioGroup,
	Stack
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Modal from '@mui/material/Modal';
import Image from 'next/image';
import { useConfirmPresence, useSendEmail } from '@/hook/use-confirm-presence';
import { useMutation } from '@tanstack/react-query';
import { toast, ToastContainer } from 'react-toastify';
import Spinner from '@/components/spinner';

const ConfirmPresence = () => {
	const [escortsCounter, setEscortsCounter] = useState(1);
	const [customerName, setCustomerName] = useState(null);
	const [customerEmail, setCustomerEmail] = useState(null);
	const [obs, setObs] = useState(null);
	const [ceremony, setCeremony] = useState(null);
	const [restaurant, setRestaurant] = useState(null);
	const [escortsInput, setEscortsInput] = useState([{ value: '' }]);
	const [open, setOpen] = useState(false);

	const { mutateAsync: savePresence, isError, isPending, data } = useMutation({
		mutationFn: useConfirmPresence,
	});

	const { mutateAsync: forceSendEmail } = useMutation({
		mutationFn: useSendEmail,
	});

	const router = useRouter();

	const { register, handleSubmit, formState: { errors } } = useForm();

	const handleClose = () => setOpen(false);

	const handleSetCustomerName = (e) => {
		setCustomerName(e.target.value);
	};

	const handleSetEmail = (e) => {
		setCustomerEmail(e.target.value);
	};

	const handleSetObs = (e) => {
		setObs(e.target.value);
	};

	const handleSetCeremony = (e) => {
		setCeremony(e.target.value);
	};

	const handleSetRestaurant = (e) => {
		setRestaurant(e.target.value);
	};

	const handleAdultEscortsInputValueChange = (index, e) => {
		const values = [...escortsInput];
		values[index].value = e;
		setEscortsInput(values);
	};

	const handleAddAdultEscortsInput = () => {
		setEscortsInput([...escortsInput, { value: '' }]);
		setEscortsCounter(escortsCounter + 1);
	};

	const handleRemoveAdultEscortsInput = () => {
		const newInputFields = [...escortsInput];
		newInputFields.splice(escortsInput.length - 1, 1);
		setEscortsInput(newInputFields);
		setEscortsCounter(escortsCounter - 1);
	};

	const escortsName = escortsInput.map((i) => {
		return i.value;
	});

	const presenceModel = {
		name: customerName,
		ceremony: ceremony,
		restaurant: restaurant,
		email: customerEmail,
		obs: obs,
		escorts: escortsCounter,
		escortsName: escortsName
	};

	const handleSubmitConfirmation = async () => {
		try {
			setOpen(true);
			await savePresence({
				presenceModel
			});

		} catch (error) {
			return;
		}
	};

	const handleForceSendEmail = async () => {
		try {
			await forceSendEmail(customerEmail);
			toast.success('Email enviado!');
		} catch (error) {
			return;
		}
	};

	const handleDisableButton = (restaurant, ceremony) => {
		if (restaurant === null || ceremony === null) {
			return true;
		}
		return false;
	};

	const confirmationModal = (errorMessage, isError) => {
		if (isError) {
			return (
				<div className={s.contentContainer}>
					<Image src='/ops.png' width={171} height={171}/>
					<h1 className={s.modalTitle}>Ocorreu um erro!</h1>
					<span className={s.modalDescription}>
						Parece que ocorreu algum erro ao confirmar sua presença.<br/>
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
			);
		} else if (errorMessage == 'Email has already send') {
			return (
				<div className={s.contentContainer}>
					<Image src='/email-has-already-send-sticker.png' width={171} height={171}/>
					<h1 className={s.modalTitle}>Um convite já foi enviado nesse email</h1>
					<span className={s.modalDescription}>
						Parece que um convite já foi enviado para esse email.<br/>
						Valide em seu email se já recebeu seu convite! Caso não tenha<br/>
						recebido, por favor entre em contato conosco.
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
			);
		} else {
			return (
				<div className={s.contentContainer}>
					<Image src='/email-sticker.png' width={171} height={171}/>
					<h1 className={s.modalTitle}>Estamos muito felizes com a sua presença!</h1>
					<span className={s.modalDescription}>
						Acabamos de enviar no seu email o convite. Caso tenha algum<br/>
						imprevisto peço que nos comunique com o máximo<br/>
						de antecedência possível!
					</span>
					<Stack className={s.buttonGroup}>
						<Button
							variant='contained'
							className={s.modalButtons}
							style={{ color: '#fff'}}
							onClick={handleForceSendEmail}
						>
							Não recebi o email
						</Button>
						<Button
							variant='outlined'
							className={s.modalButtons}
							onClick={handleClose}
						>
							Fechar
						</Button>
					</Stack>
				</div>
			);
		}
	};

	return (
		<>
			<div className={s.container}>
				<h1 className={s.title}>Confirme sua presença</h1>
				<span className={s.description}>
					Confirme sua presença abaixo e não esqueça de colocar<br/>
					quantos membros da sua família irão.
				</span>
				<form className={s.formContainer} onSubmit={handleSubmit(handleSubmitConfirmation)}>
					<div className={s.row}>
						<div className={s.col25}>
							<label>Nome completo*</label>
						</div>
						<div className={s.col75}>
							<input
								className={s.textField}
								placeholder='Digite seu nome aqui'
								{...register('name', { required: true, maxLength: 25, pattern: /^[A-Z a-z]+$/i })}
								onChange={(e) => handleSetCustomerName(e)}
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
							<label>Você irá à cerimônia?*</label>
							<FormHelperText className={s.helper} onClick={() => router.push('/nosso-casamento')}>
								Mais informações sobre à cerimônia
							</FormHelperText>
						</div>
						<div className={s.col75}>
							<RadioGroup
								name="radio-buttons-group"
								row
							>
								<div required>
									<FormControlLabel
										value="true"
										control={<Radio />}
										label="Sim"
										color='primary'
										onChange={(e) => handleSetCeremony(e)}
										re
									/>
									<FormControlLabel
										value="false"
										control={<Radio />}
										label="Não" color='primary'
										onChange={(e) => handleSetCeremony(e)}
									/>
								</div>
							</RadioGroup>
						</div>
					</div>
					<div className={s.row}>
						<div className={s.col25}>
							<label>Você irá ao restaurante?*</label>
							<FormHelperText className={s.helper} onClick={() => router.push('/nosso-casamento')}>
								Mais informações sobre o restaurante
							</FormHelperText>
						</div>
						<div className={s.col75}>
							<RadioGroup
								name="radio-buttons-group"
								row
							>
								<FormControlLabel
									value="true"
									control={<Radio />}
									label="Sim"
									color='primary'
									onChange={(e) => handleSetRestaurant(e)}
								/>
								<FormControlLabel
									value="false"
									control={<Radio />}
									label="Não"
									color='primary'
									onChange={(e) => handleSetRestaurant(e)}
								/>
							</RadioGroup>
						</div>
					</div>
					<div className={s.row}>
						<div className={s.col25}>
							<label>Email*</label>
						</div>
						<div className={s.col75}>
							<input
								className={s.textField}
								placeholder='exemplo@gmail.com'
								type='email'
								{...register('email', {
									required: true,
									pattern: /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/
								})}
								onChange={(e) => handleSetEmail(e)}
							/>
							{errors?.email?.type === 'required' && <p className={s.inputError}>Campo obrigatório.</p>}
							{errors?.email?.type === 'pattern' && (
								<p className={s.inputError}>Email inválido.</p>
							)}
						</div>
					</div>
					<div className={s.row}>
						<div className={s.col25}>
							<label>Observações</label>
						</div>
						<div className={s.col75}>
							<textarea
								className={s.obs}
								placeholder='Deixe aqui suas observações'
								{...register('description')}
								onChange={(e) => handleSetObs(e)}
							/>
						</div>
					</div>
					<div className={s.companionsContainer}>
						<span className={s.spanTitle}>Quantos acompanhantes?</span>
						<div className={s.row}>
							<div className={s.col25}>
								<label>Acompanhantes</label>
							</div>
							<div className={s.col75}>
								<div>
									<IconButton
										size='small'
										onClick={handleRemoveAdultEscortsInput}
										disabled={escortsCounter == 0 ? true : false}
										color='primary'
									>
										<RemoveIcon />
									</IconButton>
									<span className={s.counterSpan}>{escortsCounter}</span>
									<IconButton
										size='small'
										onClick={handleAddAdultEscortsInput}
										disabled={escortsCounter == 5 ? true : false}
										color='primary'
									>
										<AddIcon />
									</IconButton>
								</div>
							</div>
						</div>
						{escortsCounter > 0 ? (
							escortsInput.map((inputField, index) => {
								return (
									<>
										<div className={s.row}>
											<div className={s.col25}>
												<label className={s.escortsName}>Nome do acompanhante {index + 1}*</label>
											</div>
											<div className={s.col75} key={index}>
												<input
													className={s.textField}
													placeholder='Digite o nome do acompanhante aqui'
													value={inputField.value}
													required
													onInput={(e) => {
														handleAdultEscortsInputValueChange(index, e.target.value);
													}}
												/>
											</div>
										</div>
									</>
								);
							}
							)
						) : (<></>)}
					</div>
					<Button
						className={s.confirmButton}
						variant='contained'
						type='submit'
						disabled={handleDisableButton(restaurant, ceremony)}
					>
					Confirmar presença
					</Button>
				</form>
				<Modal
					open={open}
					onClose={handleClose}
				>
					<div className={s.modalContainer}>
						{isPending ? (
							<>
								<div className={s.spinnerContainer}>
									<Spinner />
									<span className={s.spinnerSpan}>Confirmando sua presenca...</span>
								</div>
							</>
						) : (
							confirmationModal(data?.message, isError)
						)}
					</div>
				</Modal>
				<ToastContainer />
			</div>
		</>
	);
};

export default ConfirmPresence;
