/*
A faire : 
    s'arreter quand on arrive à la fin et afficher le score
*/ 




let countries = [];
let currentCountryIndex = 0;
let score = 0;

function fetchCountries() {
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            countries = data.filter(country => country.independent);
            console.log(countries.length)
            shuffleArray(countries); 
            loadNextCountry();
        })
        .catch(error => console.error('Error fetching country data:', error));
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function loadNextCountry() {
    const currentCountry = countries[currentCountryIndex];
    document.getElementById('flagImage').src = currentCountry.flags.png;
    document.getElementById('flagImage').alt = currentCountry.name.common;
    document.getElementById('result').innerHTML = '';
    document.getElementById('guessInput').value = ''; 
}

function checkGuess(event) {
    if (event && event.keyCode !== 13) {
        return;
    }

    const userGuess = document.getElementById('guessInput').value.toUpperCase();
    const correctAnswer = document.getElementById('flagImage').alt.toUpperCase();

    if (userGuess === correctAnswer) {
        document.getElementById('result').innerHTML = 'Correct! It is ' + correctAnswer + ' flag.';
        score += 1; 
        currentCountryIndex = (currentCountryIndex + 1) % countries.length;
        loadNextCountry();
    } else {
        document.getElementById('result').innerHTML = 'Incorrect. Try again.';
    }

    document.getElementById('score').innerHTML = 'Score: ' + score + '/193';

    
}

fetchCountries();