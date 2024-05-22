import { axiosInstace } from '.';

export default {
	postConfirmPresence: (
		name,
		ceremony,
		restaurant,
		email,
		obs,
		adultEscorts,
		childEscorts,
	) =>
		axiosInstace.post('/confirm-presence', {
			params: {
				name,
				ceremony,
				restaurant,
				email,
				obs,
				adultEscorts,
				childEscorts
			}
		}),
};
