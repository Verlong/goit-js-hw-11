import Notiflix from 'notiflix';
import axios from 'axios';
// Описаний в документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

const errorMsg = Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");

// ============================розмітка вставлена в контейнер=========================
const galleryContainer = document.querySelector(".gallery")
const markupPhotoCard = `<div class="photo-card">
  <img src="${}" alt="${}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div>`

galleryContainer.insertAdjacentHTML("beforebegin", markupPhotoCard)

// ============================ /розмітка вставлена в контейнер=========================



class UnsplashAPI {
  #BASE_URL = "https://pixabay.com/api/";
  #API_KEY = "36186835-0f2957db708a682a7472f2654";
  #LIMIT = 40;
  #page = 1;
  #searchQuery;

  #searchParams = new URLSearchParams({
    per_page: 30,
    webformatURL: webformatURL, //посилання на маленьке зображення для списку карток.
    largeImageURL: largeImageURL, // посилання на велике зображення.
    tags: value,//рядок з описом зображення. Підійде для атрибуту alt.
    likes: value,//кількість лайків.
    views: value, //кількість переглядів.
    comments: value, //кількість коментарів.
    downloads: value, //кількість завантажень.,
  });

  constructor() {
    this.#page = 1;
    this.#searchQuery = "";
  }

  getImages() {}

  updadePage() {}

  get page() {}

  set page(newPage) {}

  set searchQuery(newQuery) {}
  get searchQuery() {}
}

const refs = {
  form: document.querySelector(".js-search-form"),
  list: document.querySelector(".js-gallery"),
  loadMoreBtn: document.querySelector(".js-load-more"),
};
const { form, list, loadMoreBtn } = refs;

const unsplashApi = new UnsplashAPI();

function handleSubmit() {}

function handleClickLoadMore() {}

function createGalleryCards(images) {
  return images
    .map(
      ({ urls, alt_description }) => `<li class="gallery__item">
      <img src="${urls.small}" alt="${alt_description}" class="gallery-img">
  </li>`
    )
    .join("");
}