import Notiflix from 'notiflix';
import { PicAPI } from './getPic';

// =====================================================Library SLB
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: '250',
});

// =====================================================Library SLB
const picApi = new PicAPI();

const refs = {
  formElem: document.querySelector('#search-form'),
  picListElem: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.formElem.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadBtnClick);

async function onLoadBtnClick(e) {
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

  if (query.trim() === '') {
    Notiflix.Notify.failure('Please enter a search query.');
    return;
  }

  refs.picListElem.innerHTML = '';

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
      return `<a class="photo-card" href="${element.largeImageURL}">
       
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
       
      </a>`;
    })
    .join('');
}

function renderPic(hits) {
  const markup = markupHits(hits);
  refs.picListElem.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

function showTotalHits(totalHits) {
  Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
}
