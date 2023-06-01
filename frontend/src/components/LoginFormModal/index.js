import LoginForm from "./LoginForm";
import { useState } from "react";
import { Modal } from "../../context/Modal";

const LoginFormModal = () => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<button onClick={e => setShowModal(true)}>Log In</button>
			{showModal && <Modal onClose={e => setShowModal(false)}>
				<LoginForm />
			</Modal>}
		</>
	)
}

export default LoginFormModal;