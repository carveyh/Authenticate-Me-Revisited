import "./Navigation.css";
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"

import ProfileButton from "./ProfileButton"
import LoginFormModal from "../LoginFormModal";

const Navigation = () => {
	const sessionUser = useSelector(state => state.session?.user)

	let sessionLinks;

	if(!sessionUser){
		sessionLinks = (
			<>
			{/* <NavLink className="nav-link" exact activeStyle={{ backgroundColor:"gray" }} to="/login">Login</NavLink> */}
			<LoginFormModal />
			<NavLink className="nav-link" exact activeStyle={{ backgroundColor:"teal" }} to="/signup">Signup</NavLink>
			</>
		)
	}

return (
		<>
			<div className="above-nav-banner">

			</div>
			<div className="nav-bar-container">
				<ProfileButton />
				<ul>
					<li>
						<NavLink className="nav-link" exact activeStyle={{ backgroundColor:"blue" }} to="/">Home</NavLink>
						{sessionLinks}	
					</li>
				</ul>
			</div>
			<div className="nav-bar-placeholder"></div>
		</>
	)
}

export default Navigation;