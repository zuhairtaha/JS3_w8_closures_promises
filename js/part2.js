"use strict";
// Give each movie a tag: Good (>= 7), Average (>= 4 and < 7), Bad (< 4) based on the ratings.
const moviesUrl = 'https://gist.githubusercontent.com/pankaj28843/08f397fcea7c760a99206bcb0ae8d0a4/raw/02d8bc9ec9a73e463b13c44df77a87255def5ab9/movies.json';

function fillMoviesList(moviesSearchResults) {
    let moviesList = '';
    moviesSearchResults.forEach((movie, index) => {
        let rating = '';
        for (let i = 0; i <= movie.rating; i++) {
            rating += '<i class="fas fa-star"></i>';
        }
        moviesList +=
            `<li class="media">
                        <h2 class="thumb mr-3 c${(index % 16) + 1}">
                            ${movie.title.match(/\w/g)[0]} 
                        </h2>
                        <div class="media-body">
                            <h5 class="mt-0 mb-1">${movie.title}</h5>
                            <i class="far fa-calendar-alt"></i> ${movie.year} &nbsp;&nbsp;&nbsp;
                            <i class="fas fa-heart"></i> ${movie.votes} &nbsp;&nbsp;&nbsp;
                            <i class="fas fa-eye"></i> ${movie.running_times}
                            
                        </div>
                        <div>
                            <span class="float-right text-center">
                                <i class="text-warning"> ${rating}</i> <br> 
                                <span class="${movie.tag}"> ${movie.tag}</span>
                            </span>
                        </div>
                    </li>`;
    });
    document.querySelector('#moviesList').innerHTML = moviesList;
}

document.querySelector('#searchForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const formEventTarget = new FormData(event.target);
    let movieName = formEventTarget.get('movieName');
    let searchType = formEventTarget.get('searchType');
    const getMoviesPromise = fetch(moviesUrl);
    getMoviesPromise
        .then((moviesResponsive) => moviesResponsive.json())
        .catch(error => {
            console.log(error);
        })
        .then(movieList => {
            movieList.forEach(movie => {
                if (movie.rating >= 7) {
                    movie.tag = "Good";
                }
                if (movie.rating >= 4 && movie.rating < 7) {
                    movie.tag = "Average";
                }
                if (movie.rating < 4) {
                    movie.tag = "Bad";
                }
            });
            return movieList;
        })
        .then(taggedMovies => {
            return taggedMovies
                .filter(movie => {
                    if (searchType !== 'All') {
                        return (movie.tag === searchType &&
                            movie.title.toLowerCase().includes(movieName.toLowerCase())
                        );
                    } else
                        return movie.title.toLowerCase().includes(movieName.toLowerCase());
                });
        })
        .then((moviesSearchResults) => {
            fillMoviesList(moviesSearchResults);
        });
});