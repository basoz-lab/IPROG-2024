import { FaHeart, FaRegHeart, FaUserCircle } from "react-icons/fa";
import { formatTimestamp, sortCommentsByDate } from "../utils";

export function InteractionView(props) {
	return (
		<div className="col comment-section">
			<form
				onSubmit={submitCommentACB}
				className="padding-20px comment-form col"
			>
				<textarea
					disabled={!props.songId}
					onKeyDown={onKeyPressedACB}
					onChange={onCommentChangedACB}
					className="input height-textbox"
					type="text"
					value={props.currentComment || ""}
					placeholder="Select some lines in the lyrics and comment your opinion!"
				></textarea>
				{props.error && (
					<p className="text-sm text-destructive">{props.error}</p>
				)}
				<div className="row justify-between items-center">
					<button
						disabled={!props.songId}
						className="btn btn-primary"
						type="submit"
					>
						Post Comment
					</button>
					<button
						className="btn btn-destructive"
						onClick={onClearSelectionACB}
						type="button"
					>
						Clear Selection
					</button>
				</div>
			</form>
			<div className="padding-20px comments col">
				{sortCommentsByDate(props.comments).map(commentRenderCB)}
			</div>
		</div>
	);

	function onKeyPressedACB(event) {
		if (event.key === "Enter" && !event.shiftKey) {
			event.preventDefault();
			submitCommentACB();
		}
	}

	function commentRenderCB(comment) {
		function onToggleLikeClicked() {
			props.toggleLikeComment(comment.id);
		}

		function setSelectedLinesACB() {
			props.setAndRestoreSelectedLines(comment.lineSelection, 0);
		}

		function restoreSelectedLinesACB() {
			props.setAndRestoreSelectedLines(comment.lineSelection, 1);
		}

		function doNotRestoreSelectedLinesACB() {
			props.setAndRestoreSelectedLines(comment.lineSelection, 2);
		}

		function onDeleteCommentClickedACB() {
			props.deleteComment(comment.id);
		}

		return (
			<div
				className="row items-center comment-container"
				key={comment.id}
				onMouseEnter={setSelectedLinesACB}
				onMouseLeave={restoreSelectedLinesACB}
				onClick={doNotRestoreSelectedLinesACB}
			>
				<FaUserCircle className="comment-icon" size={30} />
				<div className="col comment-box">
					<div className="row items-center comment-author-box">
						<p className="text-sm comment-author">
							{comment.author.displayname}
						</p>
						<p className="comment-created-at text-muted">
							{formatTimestamp(comment.createdAt)}
						</p>
						{props.isAuthor(comment.id) ? (
							<button
								onClick={onDeleteCommentClickedACB}
								className="comment-delete btn-destructive"
							>
								Delete
							</button>
						) : null}
					</div>

					<p className="comment-text">{comment.text}</p>
				</div>
				<div className="col comment-like items-center">
					{props.isLiked(comment.id) ? (
						<FaHeart
							size={25}
							className="dislike-icon"
							onClick={onToggleLikeClicked}
						/>
					) : (
						<FaRegHeart
							size={25}
							className="like-icon"
							onClick={onToggleLikeClicked}
						/>
					)}
					<p className="comment-like-caption">{comment.likes.length}</p>
				</div>
			</div>
		);
	}

	function onCommentChangedACB(event) {
		props.onCommentChanged(event);
	}

	function submitCommentACB(target) {
		event.preventDefault();
		props.submitComment(target);
	}

	function onClearSelectionACB(event) {
		props.clearSelection();
	}
}
