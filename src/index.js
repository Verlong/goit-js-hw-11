import Notiflix from 'notiflix';
import { PicAPI } from './getPic';
// import axios from 'axios';
// Описаний в документації
// import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
// import 'simplelightbox/dist/simple-lightbox.min.css';

const picApi = new PicAPI();
// picApi.getPic('ford');
const refs = {
  formElem: document.querySelector('#search-form'),
  picListElem: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.formElem.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadBtnClick);

function onLoadBtnClick(e) {
  picApi.PAGE++;
  picApi.getPic().then(data => {
    renderPic(data.hits);
    // refs.loadMoreBtn.disabled = false;
  });
  if (picApi.PAGE === picApi.TOTAL_PAGES) {
    refs.loadMoreBtn.disabled = true;
  }
}

function onFormSubmit(e) {
  e.preventDefault();
  const query = e.target.elements.searchQuery.value;
  refs.picListElem.innerHTML = '';
  picApi.PAGE = 1;
  picApi.QUERY = query;
  picApi.getPic().then(data => {
    renderPic(data.hits);
    refs.loadMoreBtn.disabled = false;
  });
}

function markupHits(hits) {
  return hits
    .map(element => {
      return `<div class="photo-card">
  <img src="${element.webformatURL}" alt="${element.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${element.likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${element.views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${element.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${element.downloads}</b>
    </p>
  </div>
</div>`;
    })
    .join('');
}

function renderPic(hits) {
  const markup = markupHits(hits);
  refs.picListElem.insertAdjacentHTML('beforeend', markup);
}
//
//
//webformatURL - посилання на маленьке зображення для списку карток.
// largeImageURL - посилання на велике зображення.
// tags - рядок з описом зображення. Підійде для атрибуту alt.
// likes - кількість лайків.
// views - кількість переглядів.
// comments - кількість коментарів.
// downloads - кількість завантажень.
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// const errorMsg = Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");

// // ============================розмітка вставлена в контейнер=========================
// const galleryContainer = document.querySelector(".gallery")
// // const markupPhotoCard = `<div class="photo-card">
// //   <img src="${}" alt="${}" loading="lazy" />
// //   <div class="info">
// //     <p class="info-item">
// //       <b>Likes</b>
// //     </p>
// //     <p class="info-item">
// //       <b>Views</b>
// //     </p>
// //     <p class="info-item">
// //       <b>Comments</b>
// //     </p>
// //     <p class="info-item">
// //       <b>Downloads</b>
// //     </p>
// //   </div>
// // </div>`

// // galleryContainer.insertAdjacentHTML("beforebegin", markupPhotoCard)

// // // ============================ /розмітка вставлена в контейнер=========================

// class UnsplashAPI {
//   #BASE_URL = 'https://pixabay.com/api/';
//   #API_KEY = '36186835-0f2957db708a682a7472f2654';
//   #LIMIT = 40;
//   #page = 1;
//   #searchQuery;

//   #searchParams = new URLSearchParams({
//     per_page: 40,
//     webformatURL: webformatURL, //посилання на маленьке зображення для списку карток.
//     largeImageURL: largeImageURL, // посилання на велике зображення.
//     tags: value, //рядок з описом зображення. Підійде для атрибуту alt.
//     likes: value, //кількість лайків.
//     views: value, //кількість переглядів.
//     comments: value, //кількість коментарів.
//     downloads: value, //кількість завантажень.,
//   });

//   constructor() {
//     this.#page = 1;
//     this.#searchQuery = '';
//   }

//   getImages() {}

//   // updadePage() {}

//   get page() {
//     this.#page;
//   }

//   set page(newPage) {
//     this.#page++;
//   }

//   set searchQuery(newQuery) {}
//   get searchQuery() {}
// }

// const refs = {
//   form: document.querySelector('.search-form'),
//   list: document.querySelector('.js-gallery'),
//   loadMoreBtn: document.querySelector('.js-load-more'),
// };
// const { form, list /*loadMoreBtn*/ } = refs;

// const unsplashApi = new UnsplashAPI();

// function handleSubmit(e) {
//   e.preventDefault();
//   const query = e.target.elements.searchQuery.value.trim();
//   if (!searchQuery) return;
// }

// function handleClickLoadMore() {}

// function createGalleryCards(images) {
//   return images
//     .map(
//       ({ urls, alt_description }) => `<li class="gallery__item">
//       <img src="${urls.small}" alt="${alt_description}" class="gallery-img">
//   </li>`
//     )
//     .join('');
// }
