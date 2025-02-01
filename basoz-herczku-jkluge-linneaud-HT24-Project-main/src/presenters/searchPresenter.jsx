import React, { useState } from "react";
import { SearchFormView } from "../views/searchFormView";
import { SearchResultsView } from "../views/searchResultView";
import { LoaderView } from "../views/loaderView";
import { observer } from "mobx-react-lite";

export const SearchPresenter = observer(function SearchPresenter({ model }) {
	const [artist, setArtist] = useState("");
	const [title, setTitle] = useState("");
	const [loadingSong, setLoadingSong] = useState(null);

	function handleSetArtistTextACB(newArtist) {
		setArtist(newArtist); // Update React state
	}

	function handleSetTitleTextACB(newTitle) {
		setTitle(newTitle); // Update React state
	}

	function handleSearchNowACB() {
		const updated = title === "" ? " " : title;
		model.doSearchQuery(updated, artist); // Use the updated title
	}

	async function clickedOnSong(songId) {
		setLoadingSong(songId); // Set loading state for clicked song
		await model.setCurrentSong(songId); // Perform async operation
		if (songId != model.currentSong.id) return;
		setLoadingSong(null); // Clear loading state after operation
		window.location.hash = "/song";
	}

	function renderSearchResults() {
		const searchResultState = model.currentSearch;

		if (
			searchResultState.promise &&
			!searchResultState.data &&
			!searchResultState.error
		) {
			return <LoaderView />;
		}
		if (!searchResultState || !searchResultState.promise) {
			return (
				<div className="no-results">
					<p>Enter an artist or a song</p>
				</div>
			);
		}

		if (searchResultState.error) {
			return (
				<p className="text-xl justify-center">Enter a valid artist and song</p>
			);
		}
		if (searchResultState.data && searchResultState.data.length === 0) {
			return <p>No data available for the search.</p>;
		}
		return (
			<SearchResultsView
				searchResults={searchResultState.data.searchResults}
				clickedSong={clickedOnSong}
				loadingSong={loadingSong} // Pass loadingSong down as a prop
			/>
		);
	}

	return (
		<div>
			<div className="text-xl justify-center row">
				<SearchFormView
					artist={artist}
					title={title}
					onArtistChange={handleSetArtistTextACB}
					onTitleChange={handleSetTitleTextACB}
					onSearchClick={handleSearchNowACB}
				/>
			</div>
			{renderSearchResults()}
		</div>
	);
});
