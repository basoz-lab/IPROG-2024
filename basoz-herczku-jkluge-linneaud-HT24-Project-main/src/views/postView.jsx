import { FaHeart, FaRegHeart, FaUserCircle } from "react-icons/fa";
import { formatTimestamp } from "../utils";

export function PostView({
  songDetails,
  comments,
  linesForComments,
  commentsToShow,
  handleToggleCommentsACB,
  seeMoreClickedACB,
  toggleLikeComment,
  showComments,
  isLiked,
}) {
  return (
    <div className="post-container">
      <div className="row post-header">
        <img src={songDetails.song_image} alt="Artist" className="avatar" />
        <div className="song-info">
          <p className="song-title">{songDetails.title}</p>
          <p className="artist-name">{songDetails.artist_name}</p>
        </div>
        <button
          className="btn-secondary btn see-more"
          onClick={() => seeMoreClickedACB(songDetails.songId)}
        >
          See more
        </button>
      </div>
      <div onClick={() => seeMoreClickedACB(songDetails.songId)} className="post-lyrics-container">
        <p>
          {linesForComments
            ? linesForComments
                .replace(/\[.*?\]/g, "") // Remove text inside square brackets
                .split(/\r?\n/) // Split by line breaks
                .filter((line) => line.trim() !== "") // Remove empty lines
                .map((line, idx) => (
                  <span key={idx}>
                    {line}
                    <br />
                  </span>
                ))
            : "Loading lyrics..."}
        </p>
      </div>

      <div className="row post-details"></div>

      <div className="comment-section flex-1 col">
        {comments.length > 0 && (
          <>
            <div className="comments">
              {commentsToShow.map((comment) => (
                <div
                  key={comment.id}
                  className="comment-container row items-center"
                  style={{ marginBottom: "16px" }}
                >
                  <FaUserCircle className="comment-icon" size={30} />
                  <div className="col comment-box">
                    <div className="row items-center comment-author-box">
                      <p className="text-sm comment-author">{comment.author.displayname}</p>
                      <p className="comment-created-at text-muted">
                        {formatTimestamp(comment.createdAt)}
                      </p>
                    </div>
                    <p className="comment-text">{comment.text}</p>
                  </div>
                  <div className="col comment-like items-center">
                    {isLikedCB(comment.id) ? (
                      <FaHeart
                        size={25}
                        className="dislike-icon"
                        onClick={() => toggleLikeComment(comment.id)}
                      />
                    ) : (
                      <FaRegHeart
                        size={25}
                        className="like-icon"
                        onClick={() => toggleLikeComment(comment.id)}
                      />
                    )}
                  </div>
                  <p className="comment-like-caption">{comment.likes.length}</p>
                </div>
              ))}
            </div>

            {/* Show more/less button */}
            {comments.length > 2 && (
              <button
                className="btn btn-primary"
                style={{ margin: "10px 0" }}
                onClick={handleToggleCommentsACB}
              >
                {showComments ? "Show Less" : `Show ${comments.length - 2} more`}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );

  function isLikedCB(commentId){
    return isLiked(commentId)
  }
}
