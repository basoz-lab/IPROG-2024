import { observer } from "mobx-react-lite";
import ArtistsView from "../views/artistsView";
import { getArtists } from "../utils";

const Artists = observer(function Artists({ model }) {
    // Retrieve artists from the model's cache using a utility function
	const artists = getArtists(model.cache);

	// Render the ArtistsView, passing the artist data and song selection handler
	return <ArtistsView artists={artists} selectSong={selectSong} />;


	// redirects to the song, which has been clicked

	async function selectSong(id) {
		await model.setCurrentSong(id); // Set the current song in the model
		window.location.hash = "/song";  // Navigate to the song details page
	}
});

export { Artists };
