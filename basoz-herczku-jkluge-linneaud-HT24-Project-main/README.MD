# MusicBook

https://musicbook-188a2.web.app/

### Short Description

MusicBook is a social networking app centered around songs and their lyrics. It provides a platform for users to discover, interact, and share their thoughts on their favorite tracks. After signing up, users are welcomed with a feed showcasing the most recently discussed lyrics or the most popular lines. This creates an engaging entry point, allowing users to see what others are listening to or talking about.

The sidebar acts as the central navigation hub, enabling users to return to the feed, search for songs or artists and explore trending tracks and artists. The search functionality allows users to easily find songs or artists they are interested in.

By selecting a song from the feed or searching for it directly, users can read into its lyrics and listen to the song via spotify. From here, they can interact further by selecting specific lines of the lyrics and writing their own comments, like others comments, sharing their interpretations, feelings or related thoughts. 


### Project Structure

Beside our index.html (which contains only a div with id="root"), our application is structured inside the source (src) folder.
The structure inside looks as follows.

```bash
src/
├── firebase.js                 # Contains everything to connect to firebase and handle persistence
├── handleAPIs.js               # Scripts to fetch data from APIs
├── index.jsx                   # Bootstrapping for this project - Starts up needed components e.g. pages / the model
├── model.js                    # Contains the application state - is made reactive to allow dynamic updates
├── resolvePromise.js           # Helper script to resolve promises - taken from the lab
├── style.css                   # Defines style classes used around the project
├── pages                       # Here all pages are defined.
│   ├── ArtistRoot.jsx              # An overview page over all artists, we have comments to
│   ├── AuthRoot.jsx                # Used for logging in
│   ├── FeedRoot.jsx                # The page containing the feed
│   ├── RegisterRoot.jsx            # Used for signing up / registration
│   ├── SearchRoot.jsx              # The search page
│   └── SongRoot.jsx                # Page for displaying a single song (lyrics, song details and interaction)
├── presenters                  # Presenters - link between the model (logic) and the representation (views)
│   ├── artistPresenter.jsx         # Handles the artists and allows for redirection to a single song
│   ├── authPresenter.jsx           # Login / Sign In
│   ├── feedPresenter.jsx           # Presenter for the feed. Handles likes, clicks and other user interactions
│   ├── interactionPresenter.jsx    # Used for handling user interaction (writing comments and liking them)
│   ├── lyricsPresenter.jsx         # Passes lyrics and a selection of lines to the lyricsView
│   ├── registerPresenter.jsx       # Registration / Sign Up
│   ├── searchPresenter.jsx         # Handles the search input and promise
│   ├── sidebarPresenter.jsx        # Handles redirects and signout in the sidebar
│   └── songDetailsPresenter.jsx    # Passes information on the current song, thumbnail and spotify link.
├── utils.js                    # Contains model helper functions.
└── views                       # Views - The representation of the model via HTML, JS and CSS
    ├── artistsView.jsx         # Represents a list of all artists we have information on with corresponing songs.
    ├── authView.jsx            # Login window
    ├── interactionView.jsx     # Write and add comments, is scrollable
    ├── loaderView.jsx          # Used without a presenter - just a "dumb" loading screen
    ├── lyricsView.jsx          # Shows lyrics for a song - the lines are selectable
    ├── mobileSidebarView.jsx   # Allows for a dropdown sidebar used for mobile devices.
    ├── postView.jsx            # View of a single feed element
    ├── registerView.jsx        # Registration window
    ├── searchFormView.jsx      # The search form and corresponding buttons
    ├── searchResultsView.jsx   # Representation of a search result
    ├── sidebarView.jsx         # Contains the design of the semi permanent sidebar
    └── songDetailsView.jsx     # Shows the title, artist (planned: info about the artist) and a cover
```

Since we use the Model-Presenter-View paradigm, our sources are structured accordingly. Scrips and utility files / functions are placed outside of the corresponding folders.

### 3rd Party Elements

In our sidebar implementation, we used third-party components to enhance the interface and provide navigation. Specifically, we integrated icons for Feed, Search, and Artists using the _React Icons_ library, which offers a wide range of vector icons for React applications.

For the Feed icon, we used the **AiOutlineHome** component from the Ant Design icon set. This icon represents the "Feed" navigation option and intuitively indicates the home or main page. For the Search icon, we used the **MdSearch** component from the Material Design icon set. This icon visually communicates the search functionality and enhances user understanding. For the Artists section, we utilized the **BiMicrophone** component from the Boxicons icon set. This microphone icon represents the "Artists" section, making the navigation clearer for users.

The icons were integrated as React components and added inline to the navigation links in the SidebarView component, paired with corresponding navigation text to ensure both visual and textual clarity. We chose React Icons for its customizability, allowing resizing and styling directly via props like size and _CSS_. 

Another third party element we used is the spotify embed functionality. Our own server constructs a spotify link for our songs and is then used to show a spotify embed instead of the cover and song name. A user can then play the current song right away and might comment on the sound as well.

### User Feedback

During our project, we had several feedback session. The first one took place before we handed in the proposal when we showed our mockup to several people in Kistan 2.0.
Also we did a user feedback after the mid project review, which gave us mostly conceptual and style feedback. Also we tried out to find out intuitive behaviour for our elements (selection of lines, hover abilities, sidebar design etc.).

Lastly, before submitting finally, everyone let their family and friends try out the almost final version.
In the file feedback.txt, there is one of the family member walkthroughs as a monologue, as well as the feedback we got during mid review and the final feedback as condensed pro / con lists.
