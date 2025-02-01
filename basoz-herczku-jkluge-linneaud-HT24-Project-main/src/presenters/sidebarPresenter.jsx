import React, { useState } from "react";
import SidebarView from "../views/sidebarView";
import { MobileSidebarView } from "../views/mobileSidebarView";
import { LoaderView } from "/src/views/loaderView.jsx";
import { observer } from "mobx-react-lite";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

// SidebarPresenter: Manages the logic for rendering the sidebar, both mobile and desktop views
const SidebarPresenter = observer(function SidebarPresenter({ model }) {
	const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
	const navigate = useNavigate();


    // Callback function to handle when a song is clicked
	async function onSongClickedACB(id) {
		await model.setCurrentSong(id);
		window.location.hash = "/song";
	}
    // Callback function to handle user sign out
	function handleSignOutACB() {
		signOut(auth);
	}

    // Callback function to handle user sign in
	function handleSignInACB() {
		navigate("/auth");
	}

	// Display a loader while the trending songs data is being fetched
	if (!model.trendingSongs.data) return <LoaderView />;

	return (
		<>
			<SidebarView
				onSongClickedACB={onSongClickedACB} // Passes the song click handler to SidebarView
                onSignOut={handleSignOutACB} // Passes the sign out handler to SidebarView
                onSignIn={handleSignInACB} // Passes the sign in handler to SidebarView
                topSongs={model.trendingSongs.data} // Trending songs data passed as a prop
                user={model.user} // Current user data passed as a prop
			/>
			<MobileSidebarView
				isMenuOpen={isMobileSidebarOpen} // Passes the state of the mobile sidebar (open or closed)
				toggleMenu={() => setMobileSidebarOpen((prev) => !prev)} // Toggles the mobile sidebar's open state
				topSongs={model.trendingSongs.data}  // Trending songs data for mobile sidebar
				user={model.user} // Current user data for mobile sidebar
				selectSong={onSongClickedACB} // Song click handler for mobile view
				signOut={handleSignOutACB} // Sign out handler for mobile view
			/>
		</>
	);
});

export { SidebarPresenter };
