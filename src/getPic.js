// import axios from 'axios';
// const axios = require('axios');

export class PicAPI {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '36186835-0f2957db708a682a7472f2654';
  #IMAGE_TYPE = 'photo';
  #ORIENTATION = 'horizontal';
  #SAFESEARCH = 'true';
  #PER_PAGE = 40;
  PAGE = 1;
  QUERY = '';
  TOTAL_PAGES = 1;

  async getPic(query) {
    const url = this.#BASE_URL;
    const params = new URLSearchParams({
      q: this.QUERY,
      key: this.#API_KEY,
      image_type: this.#IMAGE_TYPE,
      orientation: this.#ORIENTATION,
      per_page: this.#PER_PAGE,
      safesearch: this.#SAFESEARCH,
      page: this.PAGE,
    });

    const response = await fetch(`${url}?${params}`);
    const data = await response.json();

    this.TOTAL_PAGES = Math.ceil(data.totalHits / this.#PER_PAGE);
    return data;
  }
}
