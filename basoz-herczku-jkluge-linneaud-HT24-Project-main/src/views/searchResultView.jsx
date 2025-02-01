export function SearchResultsView(props) {
    if (props.searchResults.length === 0) {
        return <div className="no-results">No results found. Try a different search.</div>;
    }

    function songItemCB(song) {
        return (
            <span key={song.id} className="song-item-container" onClick={() => props.clickedSong(song.id)}>
                <div className="text-lg">{song.title}</div>
                <div className="text-muted text-sm">by {song.artist}</div>
                {props.loadingSong === song.id && <div className="loader-small"></div>} {/* Loader depends on prop */}
            </span>
        );
    }

    return (
        <div className="search-results">
            <p className="text-xl">Choose a song to comment on</p>
            {props.searchResults.map(songItemCB)}
        </div>
    );
}
