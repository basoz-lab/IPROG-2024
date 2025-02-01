import { get, ref, set } from "firebase/database";
import { auth, db } from "./firebase";

const OUR_OWN_API = "https://songapi-gamma.vercel.app";
const ENDPOINT_GET_SONGS = "/api/getsongs";
const ENDPOINT_GET_LYRICS = "/api/getlyrics";

export function searchLyrics(queue) {
	const options = {
		method: "GET",
		headers: {},
	};
	const params = {
		id: queue,
	};

	return fetch(
		OUR_OWN_API + ENDPOINT_GET_LYRICS + "?" + new URLSearchParams(params),
		options
	).then(parseJSON);
}

export function searchSongs(title, artist) {
	const options = {
		method: "GET",
		headers: {},
	};
	const params = {
		title: title,
		artist: artist,
	};

	return fetch(
		OUR_OWN_API + ENDPOINT_GET_SONGS + "?" + new URLSearchParams(params),
		options
	).then(parseJSON);
}

function parseJSON(response) {
	if (response.ok) return response.json();
	throw new Error("API Call Unsuccessfull!");
}
