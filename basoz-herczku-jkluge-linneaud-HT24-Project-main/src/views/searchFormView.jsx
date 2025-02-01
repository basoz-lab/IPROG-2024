export function SearchFormView(props) {
    
    function handleArtistChangeACB(evt) {
        props.onArtistChange(evt.target.value);
    }

    function handleTitleChangeACB(evt) {
        props.onTitleChange(evt.target.value);
    }

    function handleSearchClickACB(event) {
        event.preventDefault();
        props.onSearchClick();
    }

    return (
            <form className="search-content row">

            <input
                type="text"
                placeholder="Artist"
                value={props.artist || ""}
                onChange={handleArtistChangeACB}
                className="input"
            />
            <input
                type="text"
                placeholder="Song Title"
                value={props.title || ""}
                onChange={handleTitleChangeACB}
                className="input"
            />
            <button type="submit" onClick={handleSearchClickACB} className="btn btn-primary">Search</button>

            </form>
    );
}
