// copied from second lab
export function resolvePromise(prms, promiseState, onSuccess) {
	if (prms == null) return;
	promiseState.promise = prms;
	promiseState.data = null;
	promiseState.error = null;

	function dataACB(data) {
		if (promiseState.promise != prms) return;
		promiseState.data = data;
		onSuccess(data);
	}

	function errorACB(err) {
		if (promiseState.promise != prms) return;
		promiseState.error = err;
	}

	prms.then(dataACB).catch(errorACB);
}