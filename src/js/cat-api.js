import { showLoader, hideLoader } from './loaders.js';
import { errorMsg } from './error.js';

const catBreeds =
  'https://api.thecatapi.com/v1/breeds?api_key=live_Nw845iZS2A8lXgivT8RyWWvksHvJxDQlAMZ3qV7yUJvpqnHbGzuq2nL2AJ2vyjn7';

const catFilter = document.querySelector('.breed-select');
const chosenCatInfo = 'https://api.thecatapi.com/v1/images/search';
const catCard = document.querySelector('.cat-info');

export function pingUrl(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          reject(errorMsg);
        } else {
          return response.json();
        }
      })
      .then(data => {
        resolve(data);
      })
      .catch(err => reject(errorMsg));
  });
}

export function fetchBreeds() {
  pingUrl(catBreeds).then(data => {
    const catChoices = data
      .map(dataOne => `<option value='${dataOne.id}'>${dataOne.name}</option>`)
      .join('');
    catFilter.insertAdjacentHTML('afterbegin', catChoices);
  });
}

export function fetchCatByBreed(breedId) {
  const catUrl = `${chosenCatInfo}?breed_ids=${breedId}`;
  pingUrl(catUrl)
    .then(data => {
      const pictureLink = `<div><img src="${data[0].url}" class= "cat-pic"></div>`;
      catCard.insertAdjacentHTML('afterbegin', pictureLink);
    })
    .catch(err => {
      errorMsg;
    });

  const catInfo = `https://api.thecatapi.com/v1/breeds/${breedId}`;
  
  pingUrl(catInfo)
    .then(data => {
      const catDesciption = `<div class = "cat-txt"><h1>${data.name}</h1><p>${data.description}</p><h2>Temperament</h2><p>${data.temperament}</p></div>`;
      catCard.insertAdjacentHTML('beforeend', catDesciption);
    })
    .catch(err => {
      errorMsg;
    });
}

export function handleFilterForm(e) {
  showLoader();
  catCard.innerHTML = '';
  fetchCatByBreed(e.target.value);
  setTimeout(function () {
    hideLoader();
  }, 500);
}

catFilter.addEventListener('change', handleFilterForm);
