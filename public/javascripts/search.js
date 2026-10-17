import { products } from './products.js'

const searchData = document.querySelector('[data-search]')
const resultBox = document.querySelector('.js-search-results')
const dropBox = document.querySelector('.js-search-backdrop')

function closeResult() {
    resultBox.innerHTML = '';
    resultBox.classList.remove('is-visible')
    dropBox.classList.remove('is-visible')
}

function renderResults(match) {
    resultBox.innerHTML = match.map(product => 
         `<button type="button" class="search-result-tile" data-id="${product.id}">${product.name}</button>` 
        ).join('');
    resultBox.classList.add('is-visible')
    dropBox.classList.add('is-visible')
}

searchData.addEventListener("input", e => {
    const value = e.target.value.trim().toLowerCase();

    if (!value) {
        closeResult()
        return;
    }
    
    const matches = products.filter(product => 
        product.name.trim().toLowerCase().includes(value)
    )

    if (matches.length == 0) {
        closeResult()
        return;
    }

    renderResults(matches)
}) 

resultBox.addEventListener('click', e => {
    const p = e.target.closest('.search-result-tile');
    
    if (p) window.location.href = '/details/' + p.dataset.id;
})

dropBox.addEventListener('click', closeResult);

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') closeResult();
});