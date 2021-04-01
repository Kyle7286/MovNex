// This file will contain the logic for handling the poster buttons
console.log("Loaded POSTER.JS");

// Remove the movie's flag associated from the folder/DB
const deleteUserFlag = async (e) => {
    // Prevent refreshing
    e.preventDefault();

    // Grab handler from element clicked
    let posterClicked = e.target;
    console.log(`Clicked on: ${posterClicked}`);

    // Get the movie ID from movie-id attribute
    let movieIDSelected = $(posterClicked).parent().parent().attr("movie-id");
    console.log(`Movie ID: ${movieIDSelected}`);


    // Delete the row from the Flag DB | Needs movie_ID, user_id    
    const response = await fetch('/api/movies/flag', {
        method: 'DELETE',
        body: JSON.stringify({
            movie_id: movieIDSelected
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    });

    // Delete Poster from front end
    $(posterClicked).parent().parent().remove();
}


// Remove the movie's flag associated from the folder/DB
const deleteUserFlag = async (e) => {
    // Prevent refreshing
    e.preventDefault();

    // Grab handler from element clicked
    let posterClicked = e.target;
    console.log(`Clicked on: ${posterClicked}`);

    // Get the movie ID from movie-id attribute
    let movieIDSelected = $(posterClicked).parent().parent().attr("movie-id");
    console.log(`Movie ID: ${movieIDSelected}`);


    // Delete the row from the Flag DB | Needs movie_ID, user_id    
    const response = await fetch('/api/movies/flag', {
        method: 'DELETE',
        body: JSON.stringify({
            movie_id: movieIDSelected
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    });

    // Delete Poster from front end
    $(posterClicked).parent().parent().remove();
}

// Click Handlers for poster buttons
$(".fa-times").click(deleteUserFlag);
$(".fa-times").click(deleteUserFlag);
