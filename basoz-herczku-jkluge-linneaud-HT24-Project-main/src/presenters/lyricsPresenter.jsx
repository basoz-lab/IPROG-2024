import { observer } from "mobx-react-lite";
import { LyricsView } from "../views/lyricsView";

const LyricsPresenter = observer(function LyricsPresenter(props) {
	return (
		<LyricsView
			toggleLine={toggleLineACB}
			tempSelection={props.model.tempSelection}
			selection={props.model.selectedLines}
			lyrics={props.model.currentSong.lyrics}
		/>
	);

	function toggleLineACB(lineno) {
		props.model.toggleLine(lineno);
	}
});

export { LyricsPresenter };
