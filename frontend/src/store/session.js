// Session slice of state sample if current user:
	// {
	//   user: { // This is also the data format returned by backend show.json, with top-level key of user
	//     id,
	//     email,
	//     username,
	//     createdAt,
	//     updatedAt
	//   }
	// }
// Session slice of state sample if NO current user:
	// {
	// 		user: null
	// }

import csrfFetch, {storeCSRFToken} from "./csrf"

// Action type constants
export const SET_CURRENT_USER = "session/setCurrentUser"
export const REMOVE_CURRENT_USER = "session/removeCurrentUser"

// Redux action creators
export const setSession = (user) => ({
	type: SET_CURRENT_USER,
	user
})

export const removeSession = () => ({
	type: REMOVE_CURRENT_USER
})

// Redux thunk action creators
export const loginUser = (user) => async dispatch => {
	const {credential, password} = user;
	const res = await csrfFetch('api/session', {
		method: 'POST',
		body: JSON.stringify({credential, password})
	})
	console.log(res.bodyUsed)
	// debugger
	if(res.ok){
		// Currently, backend app/views/api/users/show.json.jbuilder returns a { user: { id, email, username, etc } }
		// Need to grab the actual user from within the `user` key of the returned response body, we call `data`
		const data = await res.json();

		// RETAIN SESSION USER INFO ACROSS REFRESHES!!!
		storeCurrentUser(data.user)
		dispatch(setSession(data.user))
	}
	return res;
}

export const restoreSession = () => async dispatch => {
	// First we make a DB call to check if anyone logged in on backend side.
	const res = await csrfFetch('/api/session');
	// We storeSCRFToken regardless of whether someone logged in on the back
	storeCSRFToken(res);
	// Parse the API response body into POJO from JSON
	const data = await res.json();
	storeCurrentUser(data.user);
	// Here is the magic where we restore the current user to app's session slice of state.
	dispatch(setSession(data.user));
}

// RETAIN SESSION USER INFO ACROSS REFRESHES!!!
const storeCurrentUser = (user) => {
	// check null first
	if(user){ 
		const stringifiedUser = JSON.stringify(user.user);
		sessionStorage.setItem("currentUser", stringifiedUser);

	} else {
		sessionStorage.removeItem("currentUser");
	}
}

// Session Reducer
const sessionReducer = (state = { user: null }, action) => {
	Object.freeze(state)
	const nextState = {...state}
	switch (action.type) {
		case SET_CURRENT_USER:
			// nextState["user"] = action.user;
			// return nextState;
			return {...nextState, user: action.user};
		case REMOVE_CURRENT_USER:
			return {...nextState, user: null };
		default:
			return state;
	}
}

export default sessionReducer;