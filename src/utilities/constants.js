import countries from 'countries-list';

export const COUNTRY_LIST = Object.keys(countries.countries)
	.map((code) => countries.countries[code].name)
	.sort()
	.map((a) => ({ value: a, label: a }));
