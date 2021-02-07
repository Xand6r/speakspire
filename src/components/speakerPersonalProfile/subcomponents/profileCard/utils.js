const currencyMap = {
	dollars: '$',
	naira: 'NGN',
};

export const formatPrice = (priceString) => {
	return Number(priceString.replace(' ', '')).toLocaleString();
};

export const getPrice = (price) => {
	try {
		const priceRange = price.split('$')[0].split(' - ');
		const currency = price.split('$')[1];
		const formattedPriceRange = `${formatPrice(priceRange[0])} ${currencyMap[currency]} - ${formatPrice(priceRange[1])} ${currencyMap[currency]}`;
		return formattedPriceRange;
	} catch (err) {
		return '100,000 NGN - 650,000 NGN';
	}
};
