function ArtistsView({ artists, selectSong }) {
	return (
		<div className="flex-1">
			<div className="col artists-container">
				<h1 className="artists-title row items-center">
					Top artists <span>({artists.length})</span>
				</h1>
				<div className="row artists-row">{artists.map(artistTileCB)}</div>
			</div>
		</div>
	);

	function artistTileCB(artist) {
		return (
			<div className="artist-tile-container col" key={artist.artist.id}>
				<img className="artist-tile-image" src={artist.artist.image} />
				<h2 className="artist-tile-name">{artist.artist.name}</h2>
				<p className="artist-tile-trending">Trending songs</p>
				{artist.songs.map(artistSongCB)}
			</div>
		);

		function artistSongCB(song) {
			function songClickedACB() {
				selectSong(song.id);
			}

			return (
				<p onClick={songClickedACB} key={song.id} className="artist-tile-song">
					{song.title}
				</p>
			);
		}
	}
}

export default ArtistsView;
