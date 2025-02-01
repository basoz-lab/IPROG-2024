import { configure, observable } from "mobx";
import { createRoot } from "react-dom/client";
import { model } from "/src/model";
import { createHashRouter, RouterProvider } from "react-router-dom"; // Korrekt import
import "./style.css";
import { connectToFirebase } from "./firebase";
import { AuthRoot } from "./pages/AuthRoot";
import { RegisterRoot } from "./pages/RegisterRoot";
import { SearchRoot } from "/src/pages/SearchRoot.jsx";
import { FeedRoot } from "/src/pages/FeedRoot.jsx";
import { ArtistRoot } from "/src/pages/ArtistRoot.jsx";
import { SongRoot } from "/src/pages/SongRoot.jsx";

configure({ enforceActions: "never" });

const reactiveModel = observable(model);
connectToFirebase(reactiveModel);

export function makeRouter(model) {
	return createHashRouter([
		{
			path: "/",
			element: <FeedRoot model={model} />,
		},
		{
			path: "/auth",
			element: <AuthRoot model={model} />,
		},
		{
			path: "/auth/register",
			element: <RegisterRoot model={model} />,
		},
		{
			path: "/feed",
			element: <FeedRoot model={model} />,
		},

		{
			path: "/artists",
			element: <ArtistRoot model={model} />,
		},

		{
			path: "/search",
			element: <SearchRoot model={model} />,
		},
		{
			path: "/song",
			element: <SongRoot model={model} />,
		},
	]);
}

createRoot(document.getElementById("root")).render(
	<RouterProvider router={makeRouter(reactiveModel)} />
);

window.myModel = reactiveModel;
