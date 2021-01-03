/**
 * A function to persist and fetch data in the localstorage
 */

export const cacheFormState = (key, dataToCache) => {
	if (!dataToCache) return;
	localStorage.setItem(key, JSON.stringify(dataToCache));
};

export const getFormState = (key) => {
	const jsonData = localStorage.getItem(key);
	return jsonData ? JSON.parse(jsonData) : null;
};

export const deleteFormState = (keys) => {
	for (const key of keys) {
		localStorage.removeItem(key);
	}
};
