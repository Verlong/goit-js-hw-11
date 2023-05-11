import Notiflix from 'notiflix';
import { PicAPI } from './getPic';
// import axios from 'axios';
// Описаний в документації
// import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
// import 'simplelightbox/dist/simple-lightbox.min.css';

const picApi = new PicAPI();

const refs = {
  formElem: document.querySelector('#search-form'),
  picListElem: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.formElem.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadBtnClick);

async function onLoadBtnClick(e) {
  // picApi.PAGE++;
  try {
    const data = await picApi.getPic();
    renderPic(data.hits);
    if (picApi.PAGE >= picApi.TOTAL_PAGES) {
      Notiflix.Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
      refs.loadMoreBtn.disabled = true;
    }
  } catch (error) {
    console.error(error);
  }
}

async function onFormSubmit(e) {
  e.preventDefault();
  const query = e.target.elements.searchQuery.value;
  refs.picListElem.innerHTML = '';
  // picApi.PAGE = 1;
  picApi.resetPage();
  picApi.QUERY = query;
  try {
    const data = await picApi.getPic();
    if (data.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    refs.loadMoreBtn.disabled = false;

    if (data.hits.length < picApi.PerPage) {
      refs.loadMoreBtn.disabled = true;
    }

    renderPic(data.hits);
    showTotalHits(data.totalHits);
  } catch (error) {
    console.error(error);
  }
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

function showTotalHits(totalHits) {
  Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
}

// "Можна було іще методи зробити для зручності, щоб збільшувати і обнуляти сторінку
// Не бачу сповіщення, що я в кінці списку"
