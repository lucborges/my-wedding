import axios from 'axios';
import { config } from 'dotenv';
config();

console.log(process.env.WEDDING_SERVICE_URL)

export const http = axios.create({
	baseURL: "https://my-wedding-service-production.up.railway.app",
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
	}
});
