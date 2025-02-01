export function sortCommentsByDate(comments) {
	function sortCB(a, b) {
		return b.createdAt - a.createdAt;
	}
	return comments.sort(sortCB);
}

export function formatTimestamp(timestamp) {
	const now = Date.now();
	const diff = (now - timestamp) / 1000;
	if (diff < 60) return "just now";
	if (diff > 60 && diff < 60 * 60) {
		const mins = Math.floor(diff / 60);
		return mins + " minutes ago";
	}
	if (diff >= 60 * 60 && diff < 60 * 60 * 24) {
		const hours = Math.floor(diff / 60 / 60);
		return hours + " hours ago";
	}
	if (diff >= 60 * 60 * 24) {
		const hours = Math.floor(diff / 60 / 60 / 24);
		return hours + " days ago";
	}
	return "";
}

export function getArtists(cache) {
	const cacheArray = [];
	Object.entries(cache).forEach(([id, song]) => {
		cacheArray.push(song);
	});
	let artists = {};
	cacheArray.forEach((song) => {
		if (!artists[song.artist.id]) {
			artists[song.artist.id] = {
				artist: song.artist,
				songs: [
					{
						id: song.id,
						title: song.title,
					},
				],
			};
		} else {
			let newSongs = [...artists[song.artist.id].songs];
			newSongs.push({
				id: song.id,
				title: song.title,
			});
			artists[song.artist.id] = {
				...artists[song.artist.id],
				songs: newSongs,
			};
		}
	});
	const returnList = [];
	Object.entries(artists).forEach(([name, object]) => {
		returnList.push(object);
	});
	return returnList;
}
export function sortCommentByLikes(comments) {
	function sortCB(a, b) {
		return b.likes.length - a.likes.length;
	}

	return comments.sort(sortCB);
}

export function groupComments(comments) {
	const posts = {};
	comments.forEach(function (comment) {
		const { songId, lineSelection } = comment;

		// Ensure songId grouping exists
		if (!posts[songId]) {
			posts[songId] = {};
		}

		// Ensure lineSelection grouping exists within songId
		if (!posts[songId][lineSelection]) {
			posts[songId][lineSelection] = {
				songId,
				lineSelection,
				comments: [],
			};
		}

		// Add comment to the appropriate group
		posts[songId][lineSelection].comments.push(comment);
	});

	// Convert grouped posts into an array format
	const groupedArray = [];
	Object.values(posts).forEach(function (lineGroups) {
		Object.values(lineGroups).forEach(function (post) {
			groupedArray.push(post);
		});
	});

	return groupedArray;
}

export function sortPost(posts) {
	function getLatestComment(post) {
		//timestamps i an array that contains all the createdAt values for a post
		const timestamps = post.comments.map(function (comment) {
			return comment.createdAt;
		});
		//Find the maximum timestamp using the spread operator
		return Math.max(...timestamps);
	}

	function sortCB(a, b) {
		const latestCommentA = getLatestComment(a);
		const latestCommentB = getLatestComment(b);
		return latestCommentB - latestCommentA; //Descending order
	}

	return posts.sort(sortCB);
}

export async function getTrendingSongs(model) {
	const popularity = {};
	model.comments.forEach((comment) => {
		if (!popularity[comment.songId]) {
			popularity[comment.songId] = 0;
		}
		popularity[comment.songId]++;
	});

	const sortedSongIds = Object.entries(popularity)
		.sort(([nameA, countA], [nameB, countB]) => countB - countA)
		.slice(0, 3);

	const top3SongIds = sortedSongIds.map(([songId]) => songId);
	let top3Songs = [];
	for (let i = 0; i < top3SongIds.length; i++) {
		top3Songs.push(await model.getSong(top3SongIds[i]));
	}
	return top3Songs;
}
