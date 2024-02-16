import React from 'react';
import PropTypes from 'prop-types';
import Layout from '@/components/layout/layout';
import '../styles/global.css';

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
