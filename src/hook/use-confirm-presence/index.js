import { http } from '@/api';

export const useConfirmPresence = async (data) => {
	return await http.post('/confirm-presence', {
		name: data.presenceModel.name,
		ceremony: data.presenceModel.ceremony,
		restaurant: data.presenceModel.restaurant,
		email: data.presenceModel.email,
		obs: data.presenceModel.obs,
		escorts: data.presenceModel.escorts,
		escortsName: data.presenceModel.escortsName
	}
	).then((data) => data.data);
};

export const useSendEmail = async (email) => {
	return await http.post(`/mail-send?email=${email}`).then((data) => data.data);
};
