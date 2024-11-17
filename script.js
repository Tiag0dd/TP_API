const publicKey = '18e47c44eccce5c17e0d7d6292a37c2b';
const ts = '1';
const hash = 'dd5debfdb2f24f354452f75e5df4a583'; //hash calculado

const fetchComicsBtn = document.getElementById('fetchComicsBtn');
const comicsContainer = document.getElementById('comicsContainer');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const comicModal = document.getElementById('comicModal');
const comicTitle = document.getElementById('comicTitle');
const comicImage = document.getElementById('comicImage');
const comicDescription = document.getElementById('comicDescription');
const closeBtn = document.querySelector('.close');

let offset = 0; // Para manejar la paginación

// Cargar cómics al hacer clic en el botón
fetchComicsBtn.addEventListener('click', () => {
  offset = 0; // Resetear el offset al cargar desde cero
  fetchComics(offset);
});

// Función para obtener cómics
function fetchComics(offset = 0) {
  fetch(`https://gateway.marvel.com/v1/public/comics?limit=20&offset=${offset}&ts=${ts}&apikey=${publicKey}&hash=${hash}`)
    .then(response => response.json())
    .then(data => {
      displayComics(data.data.results);
      if (data.data.results.length > 0) {
        loadMoreBtn.style.display = 'inline-block';
      } else {
        loadMoreBtn.style.display = 'none';
      }
    })
    .catch(error => console.error('Error:', error));
}

// Mostrar los cómics en la interfaz
function displayComics(comics) {
  comicsContainer.innerHTML = ''; // Limpiar la lista de cómics

  comics.forEach(comic => {
    const comicDiv = document.createElement('div');
    comicDiv.className = 'comic';
    comicDiv.innerHTML = `
      <img src="${comic.thumbnail.path}.${comic.thumbnail.extension}" alt="${comic.title}">
    `;
    comicDiv.addEventListener('click', () => showComicDetails(comic));
    comicsContainer.appendChild(comicDiv);
  });
}

// Mostrar los detalles del cómic en un modal
function showComicDetails(comic) {
  comicTitle.textContent = comic.title;
  comicImage.src = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
  comicDescription.textContent = comic.description || 'Descripción no disponible.';
  comicModal.style.display = 'flex';
}

// Cerrar el modal
closeBtn.addEventListener('click', () => {
  comicModal.style.display = 'none';
});

// Cerrar el modal al hacer clic fuera de él
window.addEventListener('click', (event) => {
  if (event.target === comicModal) {
    comicModal.style.display = 'none';
  }
});

// Cargar más cómics
loadMoreBtn.addEventListener('click', () => {
  offset += 20; // Aumentar el offset para cargar más cómics
  fetchComics(offset);
});