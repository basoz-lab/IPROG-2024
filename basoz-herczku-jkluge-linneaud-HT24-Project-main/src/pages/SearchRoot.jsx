import { observer } from "mobx-react-lite";
import { SidebarPresenter } from "../presenters/sidebarPresenter";
import { Navigate } from "react-router-dom";
import { LoaderView } from "../views/loaderView";
import { SearchPresenter } from "../presenters/searchPresenter";

export const SearchRoot = observer(function SearchRoot({ model }) {
	// If user data is still being fetched, show a loader
	if (model.user === undefined) return <LoaderView />;
	// If no user is logged in, redirect them to the authentication page
	if (!model.user) return <Navigate to={"/auth"} />;

	return (
		<div className="page">
            {/* Sidebar component for navigation and actions */}
			<SidebarPresenter model={model} />
			{/* Main content area displaying the search functionality */}
			<div className="main-content">
				<SearchPresenter model={model} /> {/* Presenter for handling search logic */}
			</div>
		</div>
	);
});
