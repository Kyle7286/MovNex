// This file will contain the logic for handling the poster buttons
console.log("Loaded POSTER.JS");


const addClickListener = () => {
    var elements = document.querySelectorAll(".fa-times");
    Array.from(elements).forEach(function (element) {
        element.addEventListener('click', deleteMovie);
    });
}

const deleteMovie = () => {
    var x = document.getElementBy
    console.log(this);
    console.log("Deleted!");
    addClickListener();

}


addClickListener();