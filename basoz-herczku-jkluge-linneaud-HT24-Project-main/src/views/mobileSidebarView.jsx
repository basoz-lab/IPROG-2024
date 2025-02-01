import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { BiMicrophone, BiMusic } from "react-icons/bi";
import { MdSearch } from "react-icons/md";

export function MobileSidebarView({
	isMenuOpen,
	toggleMenu,
	topSongs,
	user,
	signOut,
	selectSong,
}) {
	function onBurgerIconClicked() {
		toggleMenu();
	}

	function onSignOutClicked() {
		signOut();
	}

	function onSongClickedACB(songId) {
		selectSong(songId);
	}

	function renderTopSongACB(song, idx) {
		return (
			<div
				className="row sidebar-mobile-trending-element"
				onClick={() => onSongClickedACB(song.id)}
				key={song.id}
			>
				<p className="text-primary w-20">{idx + 1 + "."}</p>
				<p>{song.title}</p>
			</div>
		);
	}

	return (
		<div
			className={`col sidebar-container ${
				isMenuOpen ? "sidebar-container-mobile-open" : ""
			}`}
		>
			<div
				className={`row sidebar-mobile ${
					isMenuOpen ? "sidebar-mobile-open" : ""
				}`}
			>
				<div className="row">
					<Link
						to="/"
						className="font-bold disable-text-decoration text-default"
					>
						Music<span className="text-primary">Book</span>
					</Link>
				</div>
				<div className="col" onClick={onBurgerIconClicked}>
					<div className="burger-icon"></div>
					<div className="burger-icon"></div>
					<div className="burger-icon"></div>
				</div>
			</div>
			{isMenuOpen ? (
				<div className="col sidebar-mobile-content">
					<div className="col sidebar-mobile-links">
						<Link to={"/feed"} className="row items-center gap-2">
							<AiOutlineHome size={20} />
							Feed
						</Link>
						<Link to={"/search"} className="row items-center gap-2">
							<MdSearch size={20} />
							Search
						</Link>
						<Link to={"/artists"} className="row items-center gap-2">
							<BiMicrophone size={20} />
							Artists
						</Link>
					</div>
					<div className="col sidebar-mobile-trending">
						<h2 className="text-lg">Trending</h2>
						{topSongs.map(renderTopSongACB)}
					</div>
					<div className="col sidebar-mobile-footer">
						<p>Welcome, {user.displayName}</p>
						<button onClick={onSignOutClicked} className="btn btn-primary">
							Log out
						</button>
					</div>
				</div>
			) : null}
		</div>
	);
}
