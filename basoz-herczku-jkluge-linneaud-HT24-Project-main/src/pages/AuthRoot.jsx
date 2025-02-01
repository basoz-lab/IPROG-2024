import { observer } from "mobx-react-lite";
import { AuthPanel } from "../presenters/authPresenter";
import { Link } from "react-router-dom";

export const AuthRoot = observer(function AuthRoot({ model }) {
	return (
		<div className="auth-container col justify-center items-center">
			<h1 className="text-xl">Sign in</h1>
			<p className="text-muted">Log in to continue</p>
			<AuthPanel model={model} />
			<Link className="text-muted text-sm" to="/auth/register">
				Register here
			</Link>
		</div>
	);
});
