import { observer } from "mobx-react-lite";
import { PostView } from "../views/postView";
import { useState, useEffect } from "react";
import { sortCommentByLikes, sortCommentsByDate } from "../utils";

const PostPresenter = observer(function PostPresenter(props) {
	const [songDetails, setSongDetails] = useState({
		artist_name: "Loading...",
		song_image: "",
		title: "",
	});
	const [linesForComments, setLinesForComments] = useState("");
	const [showComments, setShowComments] = useState(false);

	useEffect(() => {
		async function fetchSongDetails() {
			try {
				const songData = await props.model.getSong(props.post.songId);
				setSongDetails({
					artist_name: songData.artist.name,
					song_image: songData.thumbnail,
					title: songData.title,
				});
			} catch (error) {
				console.error("Failed to load song details:", error);
			}
		}
		fetchSongDetails();
	}, [props.model, props.post.songId]);

	useEffect(() => {
		async function getLines() {
			try {
				const lyrics = await props.model.getLinesForComment(
					props.post.comments[0].id
				);
				setLinesForComments(lyrics);
			} catch (error) {
				console.error("Failed to find lyrics", error);
			}
		}
		getLines();
	}, [props.model, props.post.comments]);

	function isLiked(commentId) {
		return props.model.isLiked(commentId);
	}

	function toggleLikeComment(commentId) {
		if (props.model.isLiked(commentId)) props.model.removeLike(commentId);
		else props.model.addLike(commentId);
	}

	const handleToggleComments = () => {
		setShowComments((prev) => !prev);
	};

	const seeMoreClicked = async () => {
		await props.model.setCurrentSong(props.post.songId);
		window.location.hash = "/song";
	};

	const sortedCommentsByDate = sortCommentsByDate(props.post.comments);
	const topComments = sortCommentByLikes(props.post.comments);

	const commentsToShow = showComments
		? sortedCommentsByDate
		: topComments.slice(0, 2);

	return (
		<PostView
			key={props.post.songId}
			comments={props.post.comments}
			songDetails={songDetails}
			linesForComments={linesForComments}
			commentsToShow={commentsToShow}
			handleToggleCommentsACB={handleToggleComments}
			seeMoreClickedACB={seeMoreClicked}
			showComments={showComments}
			toggleLikeComment={toggleLikeComment}
			isLiked={isLiked}
		/>
	);
});

export { PostPresenter };
