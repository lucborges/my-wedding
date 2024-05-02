import React, { useState } from 'react';
import s from './style.module.scss';
import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
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
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';

const ConfirmPresence = () => {
	const [adultCounter, setAdultCounter] = useState(0);
	const [childCounter, setChildCounter] = useState(0);
	const [open, setOpen] = useState(false);

	const router = useRouter();

	const { register, handleSubmit, formState: { errors } } = useForm();

	const handleClose = () =>
		setOpen(false);


	const renderAdultInput = (count) => {
		const inputs=[];
		for(let i = 0; i < count; i++){
			inputs.push(
				<div className={s.row}>
					<div className={s.col25}>
						<label>Nome do adulto*</label>
					</div>
					<div className={s.col75}>
						<TextField size='small' placeholder='Digite o nome do adulto aqui' fullWidth required/>
					</div>
				</div>);
		}
		return inputs;
	};

	const renderChildInput = (count) => {
		const inputs=[];
		for(let i=0; i<count; i++){
			inputs.push(
				<div className={s.row}>
					<div className={s.col25}>
						<label>Nome da criança*</label>
					</div>
					<div className={s.col75}>
						<TextField size='small' placeholder='Digite o nome da criança aqui' fullWidth required/>
					</div>
				</div>);
		}
		return inputs;
	};

	const handleSubmitConfirmation = (data) => {
		setOpen(true);
		return console.log(data);
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
							<label>Você irá a cerimônia?*</label>
							<FormHelperText className={s.helper} onClick={() => router.push('/mais-informacoes')}>
								Mais informações sobre a cerimônia
							</FormHelperText>
						</div>
						<div className={s.col75}>
							<RadioGroup
								name="radio-buttons-group"
								row
								{...register('wedding', { required: true })}
							>
								<FormControlLabel value="sim" control={<Radio />} label="Sim" color='primary'/>
								<FormControlLabel value="não" control={<Radio />} label="Não" color='primary'/>
							</RadioGroup>
							{errors?.wedding?.type === 'required' && <p className={s.inputError}>Campo obrigatório.</p>}
						</div>
					</div>
					<div className={s.row}>
						<div className={s.col25}>
							<label>Você irá ao restaurante?*</label>
							<FormHelperText className={s.helper} onClick={() => router.push('/mais-informacoes')}>
								Mais informações sobre o restaurante
							</FormHelperText>
						</div>
						<div className={s.col75}>
							<RadioGroup
								name="radio-buttons-group"
								row
								{...register('restaurant', { required: true })}
							>
								<FormControlLabel value="sim" control={<Radio />} label="Sim" color='primary'/>
								<FormControlLabel value="não" control={<Radio />} label="Não" color='primary'/>
							</RadioGroup>
							{errors?.restaurant?.type === 'required' && <p className={s.inputError}>Campo obrigatório.</p>}
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
							/>
						</div>
					</div>
					<div className={s.companionsContainer}>
						<span className={s.spanTitle}>Quantos acompanhantes?</span>
						<div className={s.row}>
							<div className={s.col25}>
								<label>Adultos</label>
							</div>
							<div className={s.col75}>
								<div>
									<IconButton
										size='small'
										onClick={() => setAdultCounter(adultCounter - 1)}
										disabled={adultCounter == 0 ? true : false}
										color='primary'
									>
										<RemoveIcon />
									</IconButton>
									<span className={s.counterSpan}>{adultCounter}</span>
									<IconButton
										size='small'
										onClick={() => setAdultCounter(adultCounter + 1)}
										disabled={adultCounter == 5 ? true : false}
										color='primary'
									>
										<AddIcon />
									</IconButton>
								</div>
							</div>
						</div>
						{ adultCounter > 0 ? (
							renderAdultInput(adultCounter)
						) : (<></>) }
						<div className={s.row}>
							<div className={s.col25}>
								<label>Crianças</label>
							</div>
							<div className={s.col75}>
								<div>
									<IconButton
										size='small'
										onClick={() => setChildCounter(childCounter - 1)}
										disabled={childCounter == 0 ? true : false}
										color='primary'
									>
										<RemoveIcon />
									</IconButton>
									<span className={s.counterSpan}>{childCounter}</span>
									<IconButton
										size='small'
										onClick={() => setChildCounter(childCounter + 1)}
										disabled={childCounter == 5 ? true : false}
										color='primary'
									>
										<AddIcon />
									</IconButton>
								</div>
							</div>
						</div>
						{ childCounter > 0 ? (
							renderChildInput(childCounter)
						) : (<></>) }
					</div>
					<Button
						className={s.confirmButton}
						variant='contained'
						type='submit'
					>
					Confirmar presença
					</Button>
				</form>
				<Modal
					open={open}
					onClose={handleClose}
				>
					<div className={s.modalContainer}>
						<IconButton>
							<CloseIcon color='primary' onClick={handleClose} fontSize='medium'/>
						</IconButton>
						<div className={s.contentContainer}>
							<Image src='/email-sticker.png' width={171} height={171}/>
							<h1 className={s.modalTitle}>Estamos muito felizes com a sua presença!</h1>
							<span className={s.modalDescription}>
								Acabamos de enviar no seu email o convite. Caso tenha algum<br/>
								imprevisto peço que nos comunique com o máximo<br/>
								de antecedência possível!
							</span>
							<Stack direction="row" className={s.buttonGroup}>
								<Button variant='contained' style={{ color: '#fff'}}>Não recebi o email</Button>
								<Button variant='outlined' onClick={handleClose}>Fechar</Button>
							</Stack>
						</div>
					</div>
				</Modal>
			</div>
		</>
	);
};

export default ConfirmPresence;
