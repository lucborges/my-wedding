import React from 'react';
import PropTypes from 'prop-types';
import Layout from '@/components/layout/layout';
import '../styles/global.css';
import { ThemeProvider } from '@mui/material';
import { theme } from '@/components/layout/theme';
import { CartProvider } from '@/context/cart';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const CoreApp = ({ Component, pageProps, ...props }) => {
	const queryClient = new QueryClient();
	return (
		<>
			<ThemeProvider theme={theme}>
				<QueryClientProvider client={queryClient}>
					<CartProvider>
						<Layout>
							<Component {...pageProps} {...props} />
						</Layout>
					</CartProvider>
				</QueryClientProvider>
			</ThemeProvider>
		</>

	);
};

CoreApp.propTypes = {
	Component: PropTypes.any,
	pageProps: PropTypes.object,
};

export default CoreApp;
