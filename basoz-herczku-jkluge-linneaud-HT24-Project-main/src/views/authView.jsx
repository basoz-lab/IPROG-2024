export function AuthView({
	error,
	email,
	password,
	setEmail,
	setPassword,
	signIn,
	signInWithGoogle,
}) {
	function onSignInClicked() {
		signIn();
	}

	function onSignInWithGoogleClicked() {
		signInWithGoogle();
	}

	function onEmailChanged(e) {
		setEmail(e.target.value);
	}

	function onPasswordChanged(e) {
		setPassword(e.target.value);
	}

	return (
		<div className="col auth-panel">
			<input
				value={email}
				onChange={onEmailChanged}
				type="text"
				className="input"
				placeholder="Email address..."
			/>
			<input
				value={password}
				onChange={onPasswordChanged}
				type="password"
				className="input"
				placeholder="Password..."
			/>
			{error && <p className="text-destructive text-sm text-left">{error}</p>}
			<button className="btn btn-primary" onClick={onSignInClicked}>
				Sign in
			</button>
			<p className="text-muted text-sm">Or continue with</p>
			<button className="btn-secondary btn" onClick={onSignInWithGoogleClicked}>
				Google login
			</button>
		</div>
	);
}
