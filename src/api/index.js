import axios from 'axios';
import { config } from 'dotenv';
config();

export const http = axios.create({
	baseURL: process.env.NEXT_PUBLIC_WEDDING_SERVICE_URL,
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
	}
});
