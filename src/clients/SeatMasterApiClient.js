const axios = require('axios').default;

const setConfig = (authToken) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			...(authToken && {'Authorization': authToken})
		} 
	};
	console.log('config: ', config);
	return config;
};

const SeatMasterApiClient = {
	get: async (url, queryParams, authToken) => {
		
		const fullUrl = `${url}/${queryParams}`;
		console.log('Getting with url: ', fullUrl);

		const config = setConfig(authToken);

		try {
			const resp = await axios.get(fullUrl, config);
			console.log('Get response', resp);
			return resp;
		} catch (err) {
			console.error('error in Get response', err);
			return err;
		}
	},
	post: async (url, bodyParams, authToken) => {
		const config = setConfig(authToken);
		console.log('Posting with url: ', url);
		console.log('Posting with params: ', bodyParams);

		try {
			const resp = await axios.post(url, bodyParams, config);
			console.log('Post response', resp);
			return resp;
		} catch (err) {
			console.error('error in Post response', err);
			return err;
		}
	},
	put: async (url, bodyParams) => {
		// todo
		console.log(url, bodyParams);
	},
	delete: async (url, queryParams) => {
		// todo
		console.log(url, queryParams);
	},
	
};

export default SeatMasterApiClient;