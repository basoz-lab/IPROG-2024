import { observer } from "mobx-react-lite";
import { SongDetailsView } from "../views/songDetailsView";
const SongDetailsPresenter = observer(function SongDetailsPresenter(props) {
    // the title, artist, thumbnail and spotify link of the current song are passed.
    return <SongDetailsView
            title={props.model.currentSong.title}
            artist={props.model.currentSong.artist}
            thumbnail={props.model.currentSong.thumbnail}
            spotifyEmbed={props.model.currentSong.spotifyEmbed}
        />;
});

export { SongDetailsPresenter }