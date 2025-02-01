import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { RegisterView } from "../views/registerView";
import { auth } from "../firebase";

const RegisterPanel = observer(function RegisterPanel({ model }) {
	const [displayname, setDisplayname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	if (model.user === undefined) {
		return <LoaderView />;
	}

	if (model.user) {
		return <Navigate to="/" />;
	}

	return (
		<RegisterView
			error={error}
			email={email}
			displayname={displayname}
			setEmail={setEmail}
			setDisplayname={setDisplayname}
			setPassword={setPassword}
			password={password}
			register={register}
		/>
	);

	async function register() {
		setError("");
		if (displayname.length < 3) {
			setError("Your display name should be at least 3 characters.");
			return;
		}
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;
			await updateProfile(user, {
				displayName: displayname,
			});
		} catch (e) {
			setError(e.message);
		}
	}
});

export { RegisterPanel };
