import './css/styles.css';
import debounce from "lodash.debounce";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchCountries from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const textInput = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

textInput.addEventListener("input", debounce(onInput, DEBOUNCE_DELAY));

function onInput (event){
    const inputValue = event.target.value.trim();
    
    if(!inputValue){
        countryList.innerHTML='';
        countryInfo.innerHTML='';
        return
    }

    fetchCountries(inputValue)
    .then(data => {
        if(data.length > 10) {
            countryList.innerHTML='';
            countryInfo.innerHTML='';
            Notify.info('Too many matches found. Please enter a more specific name.');
        }

        if(data.length >= 2 && data.length <= 10) {
            createCountryListMarkup(data);
        }
        
        if(data.length === 1) {
            createCountryInfoMarkup(data);
        }
    })
    .catch(error => {
        Notify.failure('Oops, there is no country with that name');
        countryInfo.innerHTML='';
        countryList.innerHTML='';
        console.log(error);
    })
}

function createCountryListMarkup (countries) {
    const listMarkup = countries.map(({flags, name})=>{
        return `<li class="country-list__item">
        <img class="country-list__img" src="${flags.svg}" alt="${name.common}">
        <h2>${name.common}</h2>
        </li>`
    }).join('');
    countryList.innerHTML = listMarkup; 
}

function createCountryInfoMarkup (country) {
    const infoMarkup = country.map(({flags, name, capital, population, languages})=>{
        return `<div>
            <div class="country-info__wrapper">
                <img class="country-info__img" src="${flags.svg}" alt="${name.common}">
                <h2 class="country-info__name">${name.common}</h2>
            </div>
            <p><b>Capital: </b>${capital}</p>
            <p><b>Population: </b>${population}</p>
            <p><b>Languages: </b>${Object.values(languages)}</p>    
        </div>`
    }).join('');
    countryList.innerHTML = infoMarkup; 
}