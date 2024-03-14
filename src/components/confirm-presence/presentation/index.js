import React, { useState } from 'react';
import s from './style.module.scss';

import TextField from '@mui/material/TextField';
import { Button, FormControlLabel, IconButton, Radio, RadioGroup } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';

const ConfirmPresence = () => {
	const [adultCounter, setAdultCounter] = useState(0);
	const [childCounter, setChildCounter] = useState(0);
	const [open, setOpen] = useState(false);

	const handleOpen = () =>
		setOpen(true);

	const handleClose = () =>
		setOpen(false);


	const renderAdultInput = (count) => {
		const inputs=[];
		for(let i = 0; i < count; i++){
			inputs.push(
				<div className={s.row}>
					<div className={s.col25}>
						<label>Nome do acompanhante*</label>
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

	return (
		<>
			<div className={s.container}>
				<h1 className={s.title}>Confirme sua presença</h1>
				<span className={s.description}>
					Confirme sua presença abaixo e não esqueça de colocar<br/>
					quantos membros da sua família irão.
				</span>
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
							<label>Você irá a cerimônia?*</label>
						</div>
						<div className={s.col75}>
							<RadioGroup
								name="radio-buttons-group"
								row
								required
							>
								<FormControlLabel value="sim" control={<Radio />} label="Sim" color='primary'/>
								<FormControlLabel value="não" control={<Radio />} label="Não" color='primary'/>
							</RadioGroup>
						</div>
					</div>
					<div className={s.row}>
						<div className={s.col25}>
							<label>Você irá ao restaurante?*</label>
						</div>
						<div className={s.col75}>
							<RadioGroup
								name="radio-buttons-group"
								row
								required
							>
								<FormControlLabel value="sim" control={<Radio />} label="Sim" color='primary'/>
								<FormControlLabel value="não" control={<Radio />} label="Não" color='primary'/>
							</RadioGroup>
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
							<label>Observações*</label>
						</div>
						<div className={s.col75}>
							<TextField
								placeholder='Deixe aqui suas observações'
								fullWidth
								required
								className={s.obs}
							/>
						</div>
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
					onClick={handleOpen}
				>
					Confirmar presença
				</Button>
				<Modal
					open={open}
					onClose={handleClose}
				>
					<div className={s.modalContainer}>
						<IconButton>
							<CloseIcon onClick={handleClose}/>
						</IconButton>
					</div>
				</Modal>
			</div>
		</>
	);
};

export default ConfirmPresence;
