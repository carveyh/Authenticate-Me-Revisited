import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/session";
import { Link } from "react-router-dom";

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

	const ProfileDropMenu = () => {
		return (
			<ul className="profile-drop-menu">
				<li>Logged in as: {sessionUser.username}</li>
				<li>Email: {sessionUser.email}</li>
				<li><Link onClick={handleLogout}>Logout</Link></li>
			</ul>
		)
	}

	return (
		<div>
			<div 
				style={{ color: "red", fontSize: "30px" }} 
				// onClick={e => setShowMenu(oldShowMenu => !oldShowMenu)}
				onClick={openMenu}
			>
				{sessionUser && 
				<>
					<i className="fa-solid fa-poo"></i>
					(ProfilePlaceholder)
				</>}
				{!sessionUser && 
				<>
					<i className="fa-solid fa-bars"></i>
					(NotLoggedInPlaceholder)
				</>}
				
			</div>

			{(showMenu && sessionUser) && <ProfileDropMenu />}

		</div>
	)
}

export default ProfileButton;