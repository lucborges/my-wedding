import Head from 'next/head';
import React from 'react';
import propTypes from 'prop-types';
import Header from '@/components/header';

const Layout = ({ children }) => {
	return (
		<>
			<Head>
				<link rel="shortcut icon" href="/favicon.ico" />
				<title>Gabrielle e Lucas (07/09/2024)</title>
			</Head>
			<Header>
				<main>{children}</main>
			</Header>
		</>
	);
};

Layout.propTypes = {
	children: propTypes.node,
};


export default Layout;
