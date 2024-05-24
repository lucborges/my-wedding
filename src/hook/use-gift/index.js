import { http } from '@/api';

export const useSaveGiftMessage = async (data) => {
	return await http.post('/gift-message', {
		name: data.messageModel.name,
		email: data.messageModel.email,
		message: data.messageModel.message,
	}
	).then((data) => data.data);
};

export const useGetCheckoutLink = async (data) => {
	return await http.post('/checkout', {
		customer: {
			name: data.checkoutModel.customerName,
			email: data.checkoutModel.email,
			message: data.checkoutModel.message
		},
		items: data.checkoutModel.items
	}
	).then((data) => data.data);
};
