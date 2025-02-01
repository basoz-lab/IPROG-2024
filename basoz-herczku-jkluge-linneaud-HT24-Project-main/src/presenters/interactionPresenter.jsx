import { observer } from "mobx-react-lite";
import { InteractionView } from "../views/interactionView";
import { useState } from "react";

const InteractionPresenter = observer(function InteractionPresenter(props) {
	// only temporarily used text fields.
	const [error, setError] = useState("");
	const [currentComment, setCurrentComment] = useState();

	return (
		<InteractionView
			// sets the selection
			setSelectedLines={setSelectedLines}
			// method to set a temporary selection
			setAndRestoreSelectedLines={setAndRestoreSelectedLines}
			error={error}
			currentComment={currentComment}
			// handler for changing the comment field - keeps track of the current comment
			onCommentChanged={onCommentChanged}
			// saves comment to persistence
			submitComment={submitComment}
			songId={props.model.currentSong.id}
			// method to check whether a comment is liked
			isLiked={isLiked}
			// retrieves all comments for a certain song
			comments={props.model.getComments(props.model.currentSong.id)}
			// used for liking a comment
			toggleLikeComment={toggleLikeComment}
			// checks whether a comment is written by a certain person
			isAuthor={isAuthor}
			deleteComment={deleteComment}
			clearSelection={clearSelection}
		/>
	);

	function onCommentChanged(event) {
		setCurrentComment(event.target.value);
	}

	async function submitComment(event) {
		setError("");
		if (!currentComment) {
			setError("You cannot submit an empty comment.");
			return;
		}
		if (props.model.selectedLines.length < 1) {
			setError("Please select a part of the lyrics first.");
			return;
		}
		event.preventDefault();
		const success = await props.model.addComment(
			props.model.currentSong.id || -1,
			currentComment,
			props.model.selectedLines
		);
		setCurrentComment("");
		if (!success) {
			setError("Error posting comment. Try again later");
			return;
		}
	}

	function toggleLikeComment(commentId) {
		if (props.model.isLiked(commentId)) {
			props.model.removeLike(commentId);
		} else {
			props.model.addLike(commentId);
		}
	}

	function isLiked(commentId) {
		return props.model.isLiked(commentId);
	}

	function isAuthor(commentId) {
		return props.model.isAuthor(commentId);
	}

	function deleteComment(commentId) {
		props.model.removeComment(commentId);
	}

	function setSelectedLines(selection) {
		props.model.setSelectedLines(selection);
	}

	function setAndRestoreSelectedLines(selection, flag) {
		// 0 save selection and change to temporary
		// 1 restore selection
		// 2 do not restore, onMouseLeave does not reroll
		if (flag === 0) {
			!props.model.tempSelection
				? props.model.setTempSelection(props.model.selectedLines)
				: props.model.setTempSelection(props.model.tempSelection);
			props.model.setSelectedLines(selection);
		}
		if (flag === 1) {
			props.model.setSelectedLines(props.model.tempSelection);
			props.model.setTempSelection(undefined);
		}
		if (flag === 2) {
			props.model.setTempSelection(selection);
		}
		if (selection[0])
			document
				.querySelectorAll(".lyrics-container .lineno")
				[selection[0]].scrollIntoView();
	}

	function clearSelection() {
		props.model.setSelectedLines([]);
	}
});

export { InteractionPresenter };
