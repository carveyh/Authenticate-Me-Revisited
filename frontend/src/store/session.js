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
export const SET_SESSION = "session/SET_SESSION"
export const REMOVE_SESSION = "session/REMOVE_SESSION"

// Redux action creators
export const setSession = (user) => ({
	type: SET_SESSION,
	user
})

export const removeSession = () => ({
	type: REMOVE_SESSION
})

// Redux thunk action creators
export const loginUser = (user) => async dispatch => {
	const res = await csrfFetch('api/session', {
		method: 'POST',
		body: JSON.stringify(user)
	})

	if(res.ok){
		// Currently, backend app/views/api/users/show.json.jbuilder returns a { user: { id, email, username, etc } }
		// Need to grab the actual user from within the `user` key of the returned response body, we call `data`
		const data = await res.json();
		dispatch(setSession(data.user))
	}
}

// Session Reducer
const sessionReducer = (state = { user: null }, action) => {
	Object.freeze(state)
	const nextState = {...state}
	switch (action.type) {
		case SET_SESSION:
			nextState["user"] = action.user;
			return nextState;
		default:
			return state;
	}
}

export default sessionReducer;