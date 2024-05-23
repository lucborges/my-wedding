import axios from 'axios';

export const http = axios.create({
	baseURL: process.env.REACT_APP_WEDDING_SERVICE_URL,
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
	}
});
