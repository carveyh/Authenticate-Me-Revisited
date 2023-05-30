import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/session";

const ProfileButton = () => {
	const dispatch = useDispatch();
	const sessionUser = useSelector(state => state.session?.user)
	const [showMenu, setShowMenu] = useState(false);

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logoutUser());
		setShowMenu(false); //Do I need this?
	}

	const openMenu = (e) => {
		e.preventDefault();
		if(showMenu) return
		setShowMenu(true)
	}

	useEffect(() => {
		if(showMenu){
			const closeMenu = () => {
				setShowMenu(false)
			}	
			document.addEventListener("click", closeMenu)
			return () => document.removeEventListener("click", closeMenu)
		}
	}, [showMenu])

	return (
		<div>
			<div 
				style={{ color: "red", fontSize: "30px" }} 
				// onClick={e => setShowMenu(oldShowMenu => !oldShowMenu)}
				onClick={openMenu}
			>
				{sessionUser && <i className="fa-solid fa-poo"></i>}
				{!sessionUser && <i className="fa-solid fa-bars"></i>}
			</div>

			{(showMenu && sessionUser) && <ul>
				<li>Logged in as: {sessionUser.username}</li>
				<li>Email: {sessionUser.email}</li>
				<li><button type="submit" onClick={handleLogout}>Logout</button></li>
			</ul>}

		</div>
	)
}

export default ProfileButton;