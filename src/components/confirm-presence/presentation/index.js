import React, { useState } from 'react';
import s from './style.module.scss';
import TextField from '@mui/material/TextField';
import { FormControlLabel, MenuItem, Radio, RadioGroup, Select } from '@mui/material';

const ConfirmPresence = () => {
	const [adultQuantity, setAdultQuantity] = useState(0);

	const adultQuantityCount = ({count}) => (
		Array.from({length: count}).map(index => <div className={s.row} key={index}>
			<div className={s.col25}>
				<label>Nome completo do adulto</label>
			</div>
			<div className={s.col75}>
				<TextField size='small' placeholder='Digite seu nome aqui' fullWidth required/>
			</div>
		</div>
		));

	const handleAdultChange = (e) => {
		adultQuantityCount(e.target.value);
	};

	const handleChildChange = (e) => {
		adultQuantity(e.target.value);
	};

	console.log(adultQuantity);

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
							<label>Nome completo</label>
						</div>
						<div className={s.col75}>
							<TextField size='small' placeholder='Digite seu nome aqui' fullWidth required/>
						</div>
					</div>
					<div className={s.row}>
						<div className={s.col25}>
							<label>Você irá a cerimônia?</label>
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
							<label>Você irá ao restaurante?</label>
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
							<label>Quantidade de adultos (Incluindo você)</label>
						</div>
						<div className={s.col75}>
							<Select
								value={adultQuantity}
								onChange={handleAdultChange}
								required
								defaultValue={0}
							>
								<MenuItem value={1}>1</MenuItem>
								<MenuItem value={2}>2</MenuItem>
								<MenuItem value={3}>3</MenuItem>
								<MenuItem value={4}>4</MenuItem>
								<MenuItem value={5}>5</MenuItem>
							</Select>
						</div>
						{adultQuantity !== 0 ? (
							adultQuantityCount()
						) : (
							<></>
						)}
					</div>
					<div className={s.row}>
						<div className={s.col25}>
							<label>Quantidade de crianças</label>
						</div>
						<div className={s.col75}>
							<Select
								value={adultQuantity}
								onChange={handleChildChange}
								required
							>
								<MenuItem value={1}>1</MenuItem>
								<MenuItem value={2}>2</MenuItem>
								<MenuItem value={3}>3</MenuItem>
								<MenuItem value={4}>4</MenuItem>
								<MenuItem value={5}>5</MenuItem>
							</Select>
						</div>
					</div>
					<div className={s.row}>
						<div className={s.col25}>
							<label>Email</label>
						</div>
						<div className={s.col75}>
							<TextField size='small' placeholder='exemplo@gmail.com' fullWidth required/>
						</div>
					</div>
					<div className={s.row}>
						<div className={s.col25}>
							<label>Observações</label>
						</div>
						<div className={s.col75}>
							<TextField placeholder='Deixe aqui suas observações' fullWidth/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ConfirmPresence;
