const csrfFetch = async (url, options = {}) => {
	options.headers ||= {};
	options.method ||= 'GET';
	if(options.method.toUpperCase() !== 'GET'){
		options.headers["Content-Type"] ||= "application/json";
		options.headers["X-CSRF-Token"] = sessionStorage.getItem("X-CSRF-Token");
	}
	const res = await fetch(url, options);
	if(res.status >= 400) throw res;
	return res;
}

export const restoreCSRF = async () => {
	const response = await csrfFetch('/api/session');
	storeCSRFToken(response);
	return response;
}

export const storeCSRFToken = (response) => {
	const csrfToken = response.headers.get("X-CSRF-Token");
	// `if` required: if csrfToken is null, sessionStorage.setItem will coerce that into string "null", whose truthiness is `true`.
	// Btw: to set a key in sessionStorage to `null`, do `sessionStorage.removeItem("headerName")`
	if(csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
}

export default csrfFetch;