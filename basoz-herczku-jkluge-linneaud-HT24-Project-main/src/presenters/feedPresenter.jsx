import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import { PostPresenter } from "./postPresenter";
import { groupComments, sortPost } from "../utils";

const Feed = observer(function FeedPresenter(props) {
	const comments = props.model.comments || [];
	const postArray = groupComments(comments);
	const posts = sortPost(postArray);

	return (
		<div>
			{posts.map((post) => (
				<PostPresenter
					key={`${post.songId}-${post.lineSelection}`}
					post={post}
					model={props.model}
				/>
			))}
		</div>
	);
});

export { Feed };
