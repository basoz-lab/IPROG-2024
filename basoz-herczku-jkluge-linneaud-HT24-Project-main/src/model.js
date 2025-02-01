import { resolvePromise } from "./resolvePromise";
import { searchLyrics, searchSongs } from "./handleAPIs";
import {
	createComment,
	createLike,
	deleteComment,
	deleteLike,
} from "./firebase";
import { getTrendingSongs } from "./utils";

const model = {
	user: undefined,
	currentSong: undefined,
	currentSearch: {},
	cache: {},
	selectedLines: [],
	comments: [],
	trendingSongs: {},
	tempSelection: undefined,

	getTrendingSongs() {
		resolvePromise(getTrendingSongs(this), this.trendingSongs);
	},

	isAuthor(commentId) {
		return (
			this.comments.find((comment) => comment.id === commentId)?.author.id ===
			this.user.uid
		);
	},

	setTempSelection(tempSelection) {
		this.tempSelection = tempSelection;
	},

	doSearchQuery(title, artist) {
		this.currentSearch.promise = null;
		this.currentSearch.data = null;
		this.currentSearch.error = null;

		if (this.currentSearch.data && !this.currentSearch.error) return;
		resolvePromise(searchSongs(title, artist), this.currentSearch, (data) => {
			this.currentSearch.data = data;
		});
	},
	isLiked(commentId) {
		return (
			this.comments
				.find((comment) => comment.id === commentId)
				.likes.find((like) => like.author.id === this.user.uid) !== undefined
		);
	},

	async addComment(songId, text, lineSelection) {
		if (!this.user) return;
		const newComment = await createComment(songId, text, lineSelection);
		this.setComments(this.comments.concat(newComment));
		return true;
	},

	async removeComment(commentId) {
		if (!this.user) return;
		if (
			this.comments.find((comment) => comment.id === commentId).author.id !==
			this.user.uid
		) {
			throw Error("You cannot delete this comment.");
		}
		await deleteComment(commentId);
		this.setComments(
			this.comments.filter((comment) => comment.id !== commentId)
		);
	},

	async addLike(commentId) {
		if (!this.user) return;
		if (
			this.comments
				.find((comment) => comment.id === commentId)
				.likes.find((like) => like.author.id === this.user.uid)
		)
			return;
		const like = await createLike(commentId);
		// create a new array where the like is inserted to the comment
		const newComments = this.comments.map((comment) => {
			if (comment.id === commentId) {
				return {
					...comment,
					likes: comment.likes.concat(like),
				};
			}
			return comment;
		});
		this.setComments(newComments);
	},

	async removeLike(commentId) {
		if (!this.user) return;
		if (
			!this.comments
				.find((comment) => comment.id === commentId)
				.likes.find((like) => like.author.id === this.user.uid)
		)
			return;
		const likeId = this.comments
			.find((comment) => comment.id === commentId)
			.likes.find((like) => like.author.id === this.user.uid).id;
		const newComments = this.comments.map((comment) => {
			if (comment.id === commentId) {
				return {
					...comment,
					likes: comment.likes.filter(
						(like) => like.author.id !== this.user.uid
					),
				};
			}
			return comment;
		});
		await deleteLike(likeId);
		this.setComments(newComments);
	},

	async setCurrentSong(id) {
		this.currentSong = await this.getSong(id);
		this.selectedLines = [];
	},

	async getSong(id) {
		if (this.cache[id]) return this.cache[id];
		const data = await searchLyrics(id);
		this.cache[id] = data;
		return data;
	},

	setComments(comments) {
		if (!comments) {
			this.comments = [];
		}
		this.comments = comments;
	},
	getComments(songId) {
		if (!this.comments || !songId) return [];
		return this.comments.filter((comment) => comment.songId === songId);
	},

	setUser(user) {
		if (!user) user = null;
		this.user = user;
	},

	toggleLine(linenr) {
		if (this.selectedLines.includes(linenr))
			this.selectedLines = this.selectedLines.filter((line) => line !== linenr);
		else if (this.selectedLines.length >= 10)
			// disallow more than 10 selected lines
			return;
		else if (this.selectedLines) {
			if (
				linenr < this.selectedLines[0] ||
				linenr > this.selectedLines[this.selectedLines.length - 1] + 1
			)
				this.selectedLines = [];
			else this.selectedLines = [...this.selectedLines, linenr];
		}
	},

	setSelectedLines(selection) {
		this.selectedLines = selection;
	},

	async getLinesForComment(commentId) {
		let comment = this.comments.find((comment) => comment.id === commentId);
		let song = await this.getSong(comment.songId);
		return song.lyrics
			.split(/\r?\n/)
			.reduce((lines, currentLine, index) =>
				comment.lineSelection.includes(index)
					? lines + "\n" + currentLine
					: lines
			);
	},
};
export { model };
