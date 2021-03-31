const saveBtn = document.getElementById('save-btn');
const ignoreBtn = document.getElementById('ignore-btn');
const maybeBtn = document.getElementById('maybe-btn');
const movieTrailer = document.getElementById('movie-trailer');






function changeMovie(movie) {
    const movieURL = movie.trailer;
    movieTrailer.src = getYoutubeLink(movieURL);
}

async function flagMovie(flag, movie_id) {
    console.log(movie_id);
    const response = await fetch('/api/movies/flag', {
        method: 'POST',
        body: JSON.stringify({
            flag,
            movie_id
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    console.log(response);
}

function getYoutubeLink(id) {
    return "https://www.youtube.com/embed/" + id + '?autoplay=1&mute=1';
};

function start(movies) {
    // Set counter
    let counter = 0;
    //set first movie
    let currentMovie = movies[counter];
    changeMovie(currentMovie);
    let movie_id = currentMovie.id;

    // TODO: function to add event listeners less dryly?
    // addSomething(saveBtn, 1);
    // addSomething(ignoreBtn, 0);
    // addSomething(maybeBtn, 2);

    // function addSomething(flag) {
    
    // }

    saveBtn.addEventListener('click', (e) => {
        flagMovie(1, movie_id);
        if (counter >= movies.length - 1) {
            counter = 0;
            return
        }
        counter++;
        currentMovie = movies[counter];
        movie_id = currentMovie.id;
        changeMovie(currentMovie);
    });
    ignoreBtn.addEventListener('click', (e) => {
        flagMovie(0, movie_id);
        if (counter >= movies.length - 1) {
            counter = 0;
            return
        }
        counter++;
        currentMovie = movies[counter];
        movie_id = currentMovie.id;
        changeMovie(currentMovie);
    });
    maybeBtn.addEventListener('click', (e) => {
        flagMovie(2, movie_id);
        if (counter >= movies.length - 1) {
            counter = 0;
            return
        }
        counter++;
        currentMovie = movies[counter];
        movie_id = currentMovie.id;
        changeMovie(currentMovie);
    });
}

async function getMovies() {
    try {
        const response = await fetch('/api/movies');
        const result = await response.json();
        start(result);
    } catch (error) {
        console.log(error);
    }
};



getMovies();
