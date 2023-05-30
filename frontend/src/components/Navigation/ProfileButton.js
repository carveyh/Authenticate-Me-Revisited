import { useSelector } from "react-redux";

const ProfileButton = () => {
	const sessionUser = useSelector(state => state.session?.user)

	return (
		<div style={{ color: "red", fontSize: "30px" }} >
			{sessionUser && <i className="fa-solid fa-poo"></i>}
			{!sessionUser && <i className="fa-solid fa-bars"></i>}
		</div>
	)
}

export default ProfileButton;