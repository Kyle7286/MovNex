const saveBtn = document.getElementById('save-btn');
const ignoreBtn = document.getElementById('ignore-btn');
const maybeBtn = document.getElementById('maybe-btn');
const movieTrailer = document.getElementById('movie-trailer');


let counter = 0;



function changeMovie(moviesArray) {
    const movie = moviesArray[counter]
    const movieURL = movie.trailer;
    movieTrailer.src = getYoutubeLink(movieURL);
    if (counter >= moviesArray.length - 1) {
        counter = 0;
        return
    }
    counter++;
}

async function flagMovie(flag, movie_id) {

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
    const movie_id = movies[counter].id;
    saveBtn.addEventListener('click', (e) => {
        flagMovie(1, movie_id);
        changeMovie(movies);
    });
    ignoreBtn.addEventListener('click', (e) => {
        flagMovie(0, movie_id);
        changeMovie(movies);
    });
    maybeBtn.addEventListener('click', (e) => {
        flagMovie(2, movie_id);
        changeMovie(movies);
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