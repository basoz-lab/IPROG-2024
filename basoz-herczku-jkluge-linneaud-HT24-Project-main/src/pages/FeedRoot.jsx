import { observer } from "mobx-react-lite";
import { SidebarPresenter } from "../presenters/sidebarPresenter";
import { Navigate } from "react-router-dom";
import { Feed } from "/src/presenters/feedPresenter";
import { LoaderView } from "../views/loaderView";

export const FeedRoot = observer(function FeedRoot({ model }) {
    // If user data is still loading, show the loader
	if (model.user === undefined) return <LoaderView />;
	// If no user is logged in, redirect to the authentication page
	if (!model.user) return <Navigate to={"/auth"} />;

	if (!model.trendingSongs.data) return <LoaderView/>;

	return (
		<div className="page">
			{/* Sidebar with navigation and user-related actions */}
			<SidebarPresenter model={model} />

			{/* Main content area displaying the feed */}
			<div className="main-content">
				<Feed model={model} /> {/* Feed component to show the list of posts or content */}
			</div>
		</div>
	);
});
