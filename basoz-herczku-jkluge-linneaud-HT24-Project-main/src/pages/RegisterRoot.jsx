import { observer } from "mobx-react-lite";
import { RegisterPanel } from "../presenters/registerPresenter";
import { LoaderView } from "../views/loaderView";
import { Link, Navigate } from "react-router-dom";

export const RegisterRoot = observer(function AuthRoot({ model }) {
	if (model.user === undefined) return <LoaderView />;
	if (model.user) return <Navigate to={"/"} />;
	return (
		<div className="auth-container col justify-center items-center">
			<h1 className="text-xl">Register</h1>
			<p className="text-muted">Sign up to continue</p>
			<RegisterPanel model={model} />
			<Link className="text-muted text-sm" to="/auth">
				Login here
			</Link>
		</div>
	);
});
