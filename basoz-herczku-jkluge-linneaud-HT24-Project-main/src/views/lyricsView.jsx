export function LyricsView(props) {
	function forEachLineCB(string, index) {
		// select a line onClick
		function toggleLineACB() {
			props.toggleLine(index);
		}

		function isSelectedCB(i) {
			if (props.selection.includes(i))
				return isSelectionTemporaryACB() ? "bg-primary-50" : "bg-primary";
		}

		function isSelectionTemporaryACB() {
			return (
				props.tempSelection !== undefined &&
				props.tempSelection !== props.selection
			);
		}

		return (
			<div key={index} className="row">
				<div className="lineno text-muted">{index + 1}</div>
				<button
					className={isSelectedCB(index) + " text-left"}
					title="Click subsequent lines to select"
					onClick={toggleLineACB}
				>
					{string}
				</button>
			</div>
		);
	}

	return (
		<div className="flex-1 padding-10px-tlr border-right-muted lyrics-container lyrics-container-mobile height-95">
			{splitString(props.lyrics).map(forEachLineCB)}
		</div>
	);
}

function splitString(string) {
	let empty = "";
	if (!string)
		empty =
			"No Song available - we are sorry! \nHowever you can still look around \n and see what our app is about. \n Have fun!";
	else empty = empty + string;
	return empty.split(/\r?\n/);
}
