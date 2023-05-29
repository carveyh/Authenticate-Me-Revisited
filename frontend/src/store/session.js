// Session slice of state sample if current user:
	// {
	//   user: {
	//     id,
	//     email,
	//     username,
	//     createdAt,
	//     updatedAt
	//   }
	// }
// Session slice of state sample if NO current user:
	// {
	// 	user: null
	// }

import csrfFetch from "./csrf"

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
		const user = await res.json();
		dispatch(setSession(user))
	}
	return res;
}

// Session Reducer
const sessionReducer = (state = { user: null }, action) => {
	Object.freeze(state)
	const nextState = {...state}
	switch (action.type) {
		case SET_CURRENT_USER:
			// nextState["user"] = action.user;
			// return nextState;
			return {...nextState, ...action.user};
		case REMOVE_CURRENT_USER:
			return {...nextState, user: null };
		default:
			return state;
	}
}

export default sessionReducer;