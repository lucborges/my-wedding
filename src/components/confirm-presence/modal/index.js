import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import s from './style.module.scss';

import Modal from '@mui/material/Modal';
import IconButton from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const SuccessModal = ({ handle }) => {
	const [open, setOpen] = useState(false);

	console.log(handle);

	useEffect(() => {
		setOpen(handle);
	}, []);

	const handleClose = () => {
		setOpen(false);
	};

	return (
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
	);
};

export const AlreadySentModal = ({ open, handleClose }) => {
	return (
		<Modal
			open={open}
			onClose={handleClose}
		>
			<div className={s.modalContainer}>
				<IconButton>
					<CloseIcon />
				</IconButton>
			</div>
		</Modal>
	);
};

SuccessModal.propTypes = {
	handle: propTypes.bool,
};

AlreadySentModal.propTypes = {
	open: propTypes.bool,
	handleClose: propTypes.bool
};

