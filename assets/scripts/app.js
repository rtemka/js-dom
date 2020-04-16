const addMovieModal = document.getElementById("add-modal");
const backdrop = document.getElementById("backdrop");
const startAddMovieBtn = document.querySelector("header button");
const cancelAddMovieBtn = addMovieModal.querySelector(".btn--passive");
const confirmAddMovieBtn = addMovieModal.querySelector(".btn--success");
const userInputs = addMovieModal.querySelectorAll("input");
const entryTextSection = document.getElementById("entry-text");
const movieList = document.getElementById("movie-list");
const deleteMoveModal = document.getElementById("delete-modal");

const movies = [];

const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = "block";
  } else {
    entryTextSection.style.display = "none";
  }
};

const toggleBackdrop = () => {
  backdrop.classList.toggle("visible");
};

const closeMovieDeletionModal = () => {
  toggleBackdrop();
  deleteMoveModal.classList.remove("visible");
};

const deleteMovieHandler = (movieId) => {
  let movieIndex = 0;
  for (movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  movieList.children[movieIndex].remove();
  closeMovieDeletionModal();
  updateUI();
};

const satrtDeleteMoveHandler = (movieId) => {
  deleteMoveModal.classList.add("visible");
  toggleBackdrop();

  const cancelDeletionBtn = deleteMoveModal.querySelector(".btn--passive");
  let confirmDeletionBtn = deleteMoveModal.querySelector(".btn--danger");

  confirmDeletionBtn.replaceWith(confirmDeletionBtn.cloneNode(true));

  confirmDeletionBtn = deleteMoveModal.querySelector(".btn--danger");

  cancelDeletionBtn.removeEventListener("click", closeMovieDeletionModal);
  cancelDeletionBtn.addEventListener("click", closeMovieDeletionModal);

  confirmDeletionBtn.addEventListener(
    "click",
    deleteMovieHandler.bind(null, movieId)
  );
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
  const newMovieElement = document.createElement("li");
  newMovieElement.className = "movie-element";
  newMovieElement.innerHTML = `
        <div class="movie-element__image">
            <img src="${imageUrl}" alt="${title}">
        </div>
        <div class="movie-element__info">
            <h2>${title}</h2>
            <p>${rating}/5</p>
        </div>
    `;
  newMovieElement.addEventListener(
    "click",
    satrtDeleteMoveHandler.bind(null, id)
  );
  movieList.append(newMovieElement);
};

const closeMovieModal = () => {
  addMovieModal.classList.remove("visible");
};

const showMovieModal = () => {
  addMovieModal.classList.add("visible");
  toggleBackdrop();
};

const cancelAddMovieHandler = () => {
  closeMovieModal();
  toggleBackdrop();
  clearInputs();
};

const clearInputs = () => {
  for (const usrInput of userInputs) {
    usrInput.value = "";
  }
};

const confirmAddMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imgUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (
    !titleValue.trim() ||
    !imgUrlValue.trim() ||
    !ratingValue.trim() ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert("Please enter valid values (rating between 1 and 5).");
    return;
  }

  const movie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imgUrlValue,
    rating: ratingValue,
  };
  movies.push(movie);
  console.log(movies);
  closeMovieModal();
  toggleBackdrop();
  clearInputs();
  renderNewMovieElement(movie.id, movie.title, movie.image, movie.rating);
  updateUI();
};

const backdropClickHandler = () => {
  closeMovieModal();
  closeMovieDeletionModal();
  clearInputs();
};

startAddMovieBtn.addEventListener("click", showMovieModal);
cancelAddMovieBtn.addEventListener("click", cancelAddMovieHandler);
confirmAddMovieBtn.addEventListener("click", confirmAddMovieHandler);
backdrop.addEventListener("click", backdropClickHandler);
