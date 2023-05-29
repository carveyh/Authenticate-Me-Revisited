import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/session";
import { Redirect } from "react-router-dom";
// import { useEffect } from "react";

const LoginFormPage = () => {
	const sessionUser = useSelector((state = {}) => state.session?.user )
	
	const dispatch = useDispatch();
	
	
	
	const [credential, setCredential] = useState();	
	const [password, setPassword] = useState();	
	
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
		// Error handling - display if any
	}
	
	
	if(sessionUser) return <Redirect to="/"/>
	// debugger
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label>Credential:&nbsp;
					<input
						type="text"
						value={credential}
						onChange={handleCredential}
					/>
				</label>
				<br />
				<br />
				<label>Password:&nbsp;
					<input
						type="password"
						value={password}
						onChange={handlePassword}
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