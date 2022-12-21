import './css/styles.css';
import debounce from "lodash.debounce";

const DEBOUNCE_DELAY = 300;

const textInput = document.querySelector("#search-box");

textInput.addEventListener("input", debounce(onInput, DEBOUNCE_DELAY))

function onInput (event){
    const countryName = event.target.value;
    fetchCountries(countryName)
}

function fetchCountries(name){
    fetch(`https://restcountries.com/v3.1/name/${name}?fields=name.official,capital,population,flags,languages`)
    .then(response => {
        if (!response.ok) {
        throw new Error(response.status);
        }
      return response.json();
    })
    .then(data => console.log(data))
    .catch(error => {
        console.log(error)
      });
}