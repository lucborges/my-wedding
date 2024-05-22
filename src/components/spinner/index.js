import s from './style.module.scss';
import React from 'react';

const Spinner = () => {
	return (
		<>
			<span className={s.loader} />
		</>
	);
};

export default Spinner;
