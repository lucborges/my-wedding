import React from 'react';
import PropTypes from 'prop-types';
import Layout from '@/components/layout/layout';
import '../styles/global.css';
import { ThemeProvider } from '@mui/material';
import { theme } from '@/components/layout/theme';

const CoreApp = ({ Component, pageProps, ...props }) => {
	return (
		<>
			<ThemeProvider theme={theme}>
				<Layout>
					<Component {...pageProps} {...props} />
				</Layout>
			</ThemeProvider>
		</>

	);
};

CoreApp.propTypes = {
	Component: PropTypes.any,
	pageProps: PropTypes.object,
};

export default CoreApp;
