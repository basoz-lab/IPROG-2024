// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { get, getDatabase, ref, set, serverTimestamp } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBCMHkXm4PvrMavWLXVvQPFyNRBfF2fQrY",
	authDomain: "musicbook-188a2.firebaseapp.com",
	databaseURL:
		"https://musicbook-188a2-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "musicbook-188a2",
	storageBucket: "musicbook-188a2.firebasestorage.app",
	messagingSenderId: "978731441681",
	appId: "1:978731441681:web:b61fb05ebf5c6131bd1bb0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("profile");
googleProvider.addScope("email");

async function firebaseToModel(model) {
	const likes = await fetchLikes();
	const commentPrimitives = await fetchComments();
	const comments = commentPrimitives.map((comment) => ({
		id: comment.id,
		author: comment.author,
		text: comment.text,
		songId: comment.songId,
		createdAt: comment.createdAt,
		lineSelection: comment.lineSelection,
		likes: likes.filter((like) => like.comment_id === comment.id),
	}));

	model.setComments(comments);
	model.getTrendingSongs();
}

function connectToFirebase(model) {
	onAuthStateChanged(auth, (user) => {
		model.setUser(user);
	});

	firebaseToModel(model);
}

export async function fetchLikes() {
	const myRef = ref(db, `likes`);
	const snapshot = await get(myRef);
	if (!snapshot.exists()) return [];
	const value = snapshot.val();
	const likes = [];
	for (const id of Object.keys(value)) {
		const like = value[id];
		likes.push(like);
	}
	return likes;
}

export async function fetchComments() {
	const myRef = ref(db, `comments`);
	const snapshot = await get(myRef);
	if (!snapshot.exists()) return [];
	const value = snapshot.val();
	const comments = [];
	for (const id of Object.keys(value)) {
		const comment = value[id];
		if (!comment.likes) comment.likes = [];
		comments.push(comment);
	}
	return comments;
}

export async function createComment(songId, text, lineSelection) {
	if (!auth.currentUser || !songId || !lineSelection) return;
	const id = crypto.randomUUID();
	const myRef = ref(db, `comments/${id}`);
	await set(myRef, {
		id: id,
		songId: songId,
		text: text,
		lineSelection: lineSelection,
		createdAt: serverTimestamp(),
		author: {
			id: auth.currentUser.uid,
			displayname: auth.currentUser.displayName,
		},
	});
	return {
		id: id,
		songId: songId,
		text: text,
		createdAt: Date.now(),
		lineSelection: lineSelection,
		likes: [],
		author: {
			id: auth.currentUser.uid,
			displayname: auth.currentUser.displayName,
		},
	};
}

export async function deleteComment(commentId) {
	const myRef = ref(db, `comments/${commentId}`);
	await set(myRef, null);
}

export async function createLike(commentId) {
	if (!auth.currentUser) return;
	const id = crypto.randomUUID();
	const myRef = ref(db, `likes/${id}`);
	await set(myRef, {
		id: id,
		comment_id: commentId,
		author: {
			id: auth.currentUser.uid,
			displayname: auth.currentUser.displayName,
		},
	});
	return {
		id: id,
		comment_id: commentId,
		author: {
			id: auth.currentUser.uid,
			displayname: auth.currentUser.displayName,
		},
	};
}

export async function deleteLike(likeId) {
	const myRef = ref(db, `likes/${likeId}`);
	await set(myRef, null);
}

export { auth, db, connectToFirebase, googleProvider, firebaseToModel };
