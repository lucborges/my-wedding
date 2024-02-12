import React from 'react';
import PropTypes from 'prop-types';
import '../styles/global.css';
import Layout from '@/components/layout/layout';

const CoreApp = ({ Component, pageProps, ...props }) => {
	return (
		<>
			<Layout>
				<Component {...pageProps} {...props} />
			</Layout>
		</>

	);
};

CoreApp.propTypes = {
	Component: PropTypes.any,
	pageProps: PropTypes.object,
};

export default CoreApp;