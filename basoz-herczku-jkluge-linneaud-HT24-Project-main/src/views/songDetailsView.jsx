export function SongDetailsView(props) {
	return (
		<div className="row padding-20px items-center justify-between">
			{props.spotifyEmbed ===
			"https://open.spotify.com/embed/track/?utm_source=generator" ? (
				<>
					<div className="w-half">
						<h3 className="text-xl">{props.title || "No Title"}</h3>
						<h3 className="text-lg">{props.artist.name || "No Artist"}</h3>
					</div>
					{props.thumbnail ? (
						<img src={props.thumbnail} alt="Cover" className="img-64x64" />
					) : (
						<div className="cover-placeholder"></div>
					)}
				</>
			) : (
				<iframe
					src={props.spotifyEmbed}
					width="100%"
					height="152"
					allowfullscreen=""
					allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
					loading="lazy"
				></iframe>
			)}
		</div>
	);
}
