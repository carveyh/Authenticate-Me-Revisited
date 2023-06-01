import LoginForm from "./LoginForm";
import { useState } from "react";
import { Modal } from "../../context/Modal";
import { NavLink } from "react-router-dom";

const LoginFormModal = () => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<div onClick={e => setShowModal(true)}>Log In</div>
			{/* <NavLink onClick={e => setShowModal(true)} to="">Log In</NavLink> */}
			{/* <button onClick={e => setShowModal(true)}>Log In</button> */}
			{showModal && <Modal onClose={e => setShowModal(false)}>
				<LoginForm />
			</Modal>}
		</>
	)
}

export default LoginFormModal;