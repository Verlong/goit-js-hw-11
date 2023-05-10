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

function onLoadBtnClick(e) {
  picApi.PAGE++;
  picApi.getPic().then(data => {
    renderPic(data.hits);
    // refs.loadMoreBtn.disabled = false;
  });
  if (picApi.PAGE === picApi.TOTAL_PAGES) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
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
    if (data.hits.length === 0) {
      Notiflix.Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
      return;
    }
    renderPic(data.hits);
    showTotalHits(data.totalHits);
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

function showTotalHits(totalHits) {
  Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
}
//
