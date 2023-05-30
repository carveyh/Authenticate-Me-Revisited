import ProfileButton from "./ProfileButton"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"

const Navigation = () => {
	const sessionUser = useSelector(state => state.session?.user)
	if(sessionUser) return (
		<div>
			<ProfileButton />
			<ul>
				<li>
					<NavLink exact activeStyle={{ backgroundColor:"blue" }} to="/">Home</NavLink>
				</li>
			</ul>
		</div>
	) 
	else return (
		<div>
			<ProfileButton />
			<ul>
				<li>
					<NavLink exact activeStyle={{ backgroundColor:"blue" }} to="/">Home</NavLink>
				</li>
				<li>
					<NavLink exact activeStyle={{ backgroundColor:"gray" }} to="/login">Login</NavLink>
				</li>
				<li>
					<NavLink exact activeStyle={{ backgroundColor:"teal" }} to="/signup">Signup</NavLink>
				</li>
			</ul>
		</div>
	)
}

export default Navigation;