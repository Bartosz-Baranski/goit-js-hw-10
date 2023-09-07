// const errorInfo = document.querySelector('.error');

export function errorMsg() {
  Notiflix.Notify.warning(
    'Oops! Something went wrong! Try reloading the page!'
  );
}
