const loadIcon = document.querySelector('.loader');

export function showLoader() {
  loadIcon.classList.add('visible');
}

export function hideLoader() {
  loadIcon.classList.remove('visible');
}
