const saveBtn = document.getElementById('save-btn');
const ignoreBtn = document.getElementById('ignore-btn');
const maybeBtn = document.getElementById('maybe-btn');
const movieTrailer = document.getElementById('movie-trailer');

const trailersArray = [
    "2LqzF5WauAw",
    "RLtaA9fFNXU",
    "V75dMMIW2B4"
]

let counter = 0;

saveBtn.addEventListener('click', (e) => {
    changeMovie()
});
ignoreBtn.addEventListener('click', (e) => {
    console.log('hey it works');
});
maybeBtn.addEventListener('click', (e) => {
    console.log('hey it works');
});

function changeMovie() {
    movieId = trailersArray[counter]
    movieTrailer.src = getYoutubeLink(movieId);
    if(counter >= trailersArray.length - 1) {
        counter = 0;
        return
    }
    counter++;
}

function getYoutubeLink(id) {
    return "https://www.youtube.com/embed/" + id;
}