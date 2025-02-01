import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthView } from "../views/authView";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { LoaderView } from "../views/loaderView";

const AuthPanel = observer(function AuthPanel({ model }) {
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
		<AuthView
			error={error}
			email={email}
			setEmail={setEmail}
			setPassword={setPassword}
			password={password}
			signIn={signIn}
			signInWithGoogle={signInWithGoogle}
		/>
	);

	async function signIn() {
		setError("");
		try {
			await signInWithEmailAndPassword(auth, email, password);
		} catch (e) {
			setError("Please enter the correct credentials");
		}
	}

	function signInWithGoogle() {
		signInWithPopup(auth, googleProvider);
	}
});

export { AuthPanel };
