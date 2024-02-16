import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import s from './style.module.scss';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/navigation';

const Header = ({ children }) => {
	const router = useRouter();
	const [menuOpen, setMenuOpen] = useState(false);
	const [size, setSize] = useState({
		width: 0,
		height: 0,
	});

	useEffect(() => {
		const handleResize = () => {
			setSize({
				width: window.innerWidth,
				height: window.innerHeight
			});
		};
		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		if (size.width > 1324 && menuOpen) {
			setMenuOpen(false);
		}
	}, [size.width, menuOpen]);

	const menuToggleHandler = () => {
		setMenuOpen((p) => !p);
	};

	return (
		<>
			<header className={s.header}>
				<div className={s.header__content}>
					<a className={s.logo} onClick={() => router.push('/')}>
						G & L
					</a>
					<nav className={`${s.navbar}
							${menuOpen && size.width < 1324 ? `${s.isMenu}` : ''}
							}`}>

						<ul>
							<div className={s.line}></div>
							<li onClick={() => {
								setMenuOpen(false);
								router.push('/confirme-sua-presença');
							}}>Confirme sua presença</li>
							<li onClick={() => {
								setMenuOpen(false);
								router.push('/lista-de-presentes');
							}}>Lista de presentes</li>
							<li onClick={() => {
								setMenuOpen(false);
								router.push('/nosso-casamento');
							}}>Nosso casamento</li>
							<li></li>
						</ul>
					</nav>
					<div className={s.rightIcons}>
						<div>
							<Badge badgeContent={2} color="error" className={s.badge}>
								<ShoppingCartIcon fontSize='large'className={s.cart} />
							</Badge>
						</div>
						<div className={s.toggleDiv}>
							{!menuOpen ? (
								<MenuIcon fontSize='large' className={s.toggle} onClick={menuToggleHandler}/>
							) : (
								<CloseIcon fontSize='large' className={s.close} onClick={menuToggleHandler}/>
							)}
						</div>
					</div>
				</div>
			</header>
			<div>{children}</div>
		</>
	);
};

Header.propTypes = {
	children: propTypes.node,
};

export default Header;
