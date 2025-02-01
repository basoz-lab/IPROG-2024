import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { BiMicrophone, BiMusic } from "react-icons/bi";
import { MdSearch } from "react-icons/md";

function SidebarView({
	topSongs, // List of trending songs passed as a prop
	user, // Current user information
	onSongClickedACB, // Callback for when a song is clicked
	onSignOut, // Callback for signing out the user
	onSignIn, // Callback for signing in the user
}) {
	// Function to render each top song as a list item
	function renderTopSongACB(song) {
		return (
			<li key={song.id} className="trending-song text-primary text-sm ">
				{/* Button that triggers onSongClickedACB when a song is clicked */}
				<button onClick={() => onSongClickedACB(song.id)}>{song.title}</button>
			</li>
		);
	}

	return (
		<div className="sidebar"> {/* Sidebar container */}
			<div className="sidebar-inner"> {/* Inner wrapper for the sidebar */}
				<h2 className="text-xl"> {/* App logo-title */}
					{/* Links to the homepage */}
					<Link to="/" className="logo-music disable-text-decoration">
						Music
					</Link>
					<Link to="/" className="logo-book disable-text-decoration">
						Book
					</Link>
				</h2>
				<nav className="mb-4"> {/* Navigation menu */}
					<ul className="nav-list col gap-2">
						{/* Navigation link to the Feed page */}
						<li>
							<Link
								to="/feed"
								className="nav-link text-sm flex items-center gap-2"
							>
								<AiOutlineHome size={20} /> {/* Home icon */}
								Feed
							</Link>
						</li>
						{/* Navigation link to the Search page */}
						<li>
							<Link
								to="/search"
								className="nav-link text-sm flex items-center gap-2"
							>
								<MdSearch size={20} /> {/* Search icon */}
								Search
							</Link>
						</li>
						{/* Navigation link to the Artists page */}
						<li>
							<Link
								to="/artists"
								className="nav-link text-sm flex items-center gap-2"
							>
								<BiMicrophone size={20} /> {/* Microphone icon */}
								Artists
							</Link>
						</li>
					</ul>
				</nav>
				<div className="mb-6"> {/* Trending songs section */}
					<h3 className="text-lg">Trending</h3> {/* Trending section header */}
					{/* List of trending songs rendered dynamically */}
					<ol className="trending-song">{topSongs.map(renderTopSongACB)}</ol>
				</div>
				<div className="mtlr-auto"> {/* User account section */}
					{/* If the user is logged in, display a welcome message and sign-out button */}
					{user ? (
						<div className="personal items-center">
							<p className="personal-welcome">Welcome, {user.displayName}</p>
							<button
								className="btn btn-primary max-width"
								onClick={() => onSignOut()}
							>
								Sign Out
							</button>
						</div>
					) : (
						/* If the user is not logged in, show a sign-in button */
						<>
							<p className="text-muted">You are not logged in.</p>
							<button className="btn btn-primary" onClick={() => onSignIn()}>
								Sign In
							</button>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default SidebarView;
