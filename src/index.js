import simpleLightbox from "simplelightbox";
import axios from "axios";
import notiflix from "notiflix";
import "./style.css";
import { callForImgs } from "./callForImgs";
import 'simplelightbox/dist/simple-lightbox.min.css';
// let observer = new IntersectionObserver(callback)

const gallery = document.querySelector('.gallery')
export const form = document.querySelector("#search-form");
let page = 1;
function renderImages(images) {
    if (!gallery) {
        console.error('The gallery element was not found in the document.');
        return;
    }

    const markup = queryData
        .map(image => {
            const {
                id,
                largeImageURL,
                webformatURL,
                tags,
                likes,
                views,
                comments,
                downloads,
            } = image;

            return `
        <a class="gallery__link" href="${largeImageURL}">
        <div class="gallery__item" id="${id}">
        <img class="gallery-item_img" src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
        <p class="info-item"><b>Likes</b>${likes}</p>
              <p class="info-item"><b>Views</b>${views}</p>
              <p class="info-item"><b>Comments</b>${comments}</p>
              <p class="info-item"><b>Downloads</b>${downloads}</p>
              </div>
              </div>
              </a>
              `;
        })
        .join('');

    gallery.insertAdjacentHTML('beforeend', markup);

    const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();

    window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
    });
}

async function submitHandler(event) {
    event.preventDefault()
    page = 1;
    gallery.innerHTML = '';

    try {
        const response = await callForImgs();
        queryData = response.data.hits;
        console.log(queryData)
        renderImages(queryData);
    } catch (error) {
        console.error(error);
        notiflix.Notify.failure('Failed to load images. Please try again later.');
    }
}

form.addEventListener("submit", submitHandler);
const lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
});