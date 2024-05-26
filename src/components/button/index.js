import React from 'react';
import PropTypes from 'prop-types';
import s from './style.module.scss';
import classnames from 'classnames';

const Button = ({
	type,
	onClick,
	className,
	children,
	title,
	id,
	appearance,
	disabled
}) => {
	const getAppearanceButton = () => {
		switch (appearance) {
			case 'primary':
				return s.primaryButton;

			case 'secondary':
				return s.secondaryButton;

			case 'disable':
				return s.disableButton;

			default:
				return s.primaryButton;
		}
	};

	return (
		<button
			type={type ? type : 'button'}
			className={classnames(getAppearanceButton(), className)}
			onClick={onClick}
			title={title}
			id={id}
			disabled={disabled}
		>
			{children}
		</button>
	);
}

Button.propTypes = {
	// aplica uma aparência específica no botão
	className: PropTypes.string,
	// conteúdo do botão
	children: PropTypes.node,
	// tipo de botão ex: submit, button
	type: PropTypes.string,
	// sublinhado do botão ao colocar o mouse sob
	title: PropTypes.string,
	// aparência do botão (primary, secondary, disable)
	appearance: PropTypes.string,
	// função executada ao clicar no botão
	onClick: PropTypes.func,
	// id para teste
	id: PropTypes.string,
	disabled: PropTypes.bool,
};

export default Button;
