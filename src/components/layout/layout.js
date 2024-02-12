import Head from 'next/head';
import React from 'react';
import propTypes from 'prop-types';

const Layout = ({ children }) => {
	return (
		<>
			<Head>
				<link rel="shortcut icon" href="/favicon.ico" />
				<title>Gabrielle e Lucas</title>
			</Head>
			<main>{children}</main>
		</>
	);
};

Layout.propTypes = {
	children: propTypes.node,
};


export default Layout;
