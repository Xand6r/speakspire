import { scheduleValidator } from '../../../components/eventsRegister/component/validators';

export const cleanData = (state) => {
	const {
		name,
		theme,
		language,
		location,
		physicalLink,
		onlineLink,
		frequency,
		dateFrom,
		dateTo,
		timeTo,
		timeFrom,
		interval,
		interval_day_of_week,
	} = state;

	// transform the variables for use for the API.
	return {};
};

export const validateData = (scheduleState) => {
	return _validateLocation(scheduleState) && _validateFrequency(scheduleState) && _localValidator(scheduleState);
};

const _localValidator = (state) => {
	return state.name && state.theme && state.language;
};

const _validateLocation = (scheduleState) => {
	return (
		(scheduleState.location === 'Physical' && scheduleState.physicalLink !== '') ||
		(scheduleState.location === 'Virtual' && scheduleState.onlineLink.every((o) => o !== '')) ||
		(scheduleState.location === 'Physical and Virtual' && scheduleState.onlineLink.every((o) => o !== '') && scheduleState.physicalLink !== '')
	);
};

const _validateFrequency = (scheduleState) => {
	return (
		(['Single-day Event', 'Multi-day Event'].includes(scheduleState.frequency) &&
			scheduleState.dateFrom.length > 0 &&
			scheduleState.dateTo.length > 0 &&
			scheduleState.timeFrom.length > 0 &&
			scheduleState.timeTo.length > 0) ||
		(['Recurring Event'].includes(scheduleState.frequency) &&
			scheduleState.interval !== '' &&
			scheduleState.dateFrom.length > 0 &&
			scheduleState.dateTo.length > 0 &&
			scheduleState.timeFrom.length > 0 &&
			scheduleState.timeTo.length > 0)
	);
};

export const cleanDate = (from, to) => {
	return `${from[1]}-${to[1]}`;
};
