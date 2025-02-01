export function RegisterView({
	displayname,
	setDisplayname,
	error,
	email,
	password,
	setEmail,
	setPassword,
	register,
}) {
	function onRegisterClicked() {
		register();
	}

	function onDisplaynameChanged(e) {
		setDisplayname(e.target.value);
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
				value={displayname}
				onChange={onDisplaynameChanged}
				type="text"
				className="input"
				placeholder="Displayname..."
			/>
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
			<button className="btn btn-primary" onClick={onRegisterClicked}>
				Register
			</button>
		</div>
	);
}
