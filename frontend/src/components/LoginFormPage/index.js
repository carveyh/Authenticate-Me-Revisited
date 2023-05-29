import './LoginForm.css';

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/session";
import { Redirect } from "react-router-dom";
// import { useEffect } from "react";

const LoginFormPage = () => {
	const sessionUser = useSelector((state = {}) => state.session?.user )
	
	const dispatch = useDispatch();
	
	
	
	const [credential, setCredential] = useState('');	
	const [password, setPassword] = useState('');	
	const [errors, setErrors] = useState([]);
	
	const handleCredential = (e) => {
		e.preventDefault();
		setCredential(e.target.value);
	}
	
	const handlePassword = (e) => {
		e.preventDefault();
		setPassword(e.target.value);
	}
	
	const handleSubmit = (e) => {
		e.preventDefault();
		const user = {credential, password}
		dispatch(loginUser(user))
			// .then(async res => {
			// 	// It seems by the time we receive the res from prior invocation, Response.body is used and can't parse from .json()
			// 	console.log(res.bodyUsed)
			// 	const user = await res.json()
			// 	console.log(user)
			// 	return res
			// })
			.catch(async (res) => {
				// Somehow this will catch error, even if loginUser does not return fetch response?
				// TO READ: https://redux-toolkit.js.org/api/createAsyncThunk#unwrapping-result-actions
				// Error handling
				let data;
				try {
					// without cloning first, res.json() will consume the body as JSON, and will no longer be avail for use.
					data = await res.clone().json();
				} catch {
					data = await res.text()
				}
				if(data?.errors) setErrors(data.errors)
				else if(data) setErrors([data]) //NOT SURE WHAT THIS LINE DOES
				else setErrors([res.statusText]);

			})
	}
	
	
	// debugger
	if(sessionUser) return <Redirect to="/"/>
	return (
		<div className="login-form">
			<form onSubmit={handleSubmit}>
				<ul>
					{errors.map(error => <li key={error}>{error}</li>)}
				</ul>
				<label>Credential:&nbsp;
					<input
						type="text"
						value={credential}
						onChange={handleCredential}
						required
					/>
				</label>
				<br />
				<br />
				<label>Password:&nbsp;
					<input
						type="password"
						value={password}
						onChange={handlePassword}
						required
					/>
				</label>
				<br />
				<br />
				<input type="submit" value="Login" />
			</form>
		</div>
	)
}

export default LoginFormPage;