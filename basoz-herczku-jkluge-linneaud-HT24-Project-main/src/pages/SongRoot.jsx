import { Navigate } from "react-router-dom";
import { LoaderView } from "../views/loaderView";
import { SidebarPresenter } from "../presenters/sidebarPresenter";
import { LyricsPresenter } from "../presenters/lyricsPresenter";
import { SongDetailsPresenter } from "../presenters/songDetailsPresenter";
import { InteractionPresenter } from "../presenters/interactionPresenter";
import { observer } from "mobx-react-lite";

export const SongRoot = observer(function SongRoot({ model }) {
	if (model.currentSong === undefined) {
		return <Navigate to={"/"} />;
	}
	if (model.user === undefined) return <LoaderView />;
	else if (!model.user) {
		return <Navigate to={"/auth"} />;
	} else
		return (
			// this page divides the frame into sidebar, lyrics view and song / interaction view.
			<div className="page">
				<SidebarPresenter model={model} />
				<div className="flex-1 ">
					<div className="page width-100 padding-20px max-height-100">
						<LyricsPresenter model={model} />
						<div className="flex-1 height-95 col ">
							<SongDetailsPresenter model={model} />
							<div className="div-line"></div>
							<InteractionPresenter model={model} />
						</div>
					</div>
				</div>
			</div>
		);
});
