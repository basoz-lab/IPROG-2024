import { observer } from "mobx-react-lite";
import { SidebarPresenter } from "../presenters/sidebarPresenter";
import { Artists } from "../presenters/artistsPresenter";
import { Navigate } from "react-router-dom";
import { LoaderView } from "../views/loaderView";

export const ArtistRoot = observer(function ArtistRoot({ model }) {
	// If user data is still loading, show a loader
	if (model.user === undefined) return <LoaderView />;
	// If no user is logged in, redirect them to the authentication page
	if (!model.user) return <Navigate to={"/auth"} />;

	return (
		<div className="page">
            {/* Sidebar component for navigation */}
			<SidebarPresenter model={model} />
			{/* Main content area displaying the artists functionality */}
			<div>
				<Artists model={model} /> {/* Presenter for handling artist-related logic */}
			</div>
		</div>
	);
});
