//DOM Elements
// Search Section
const searchForm = document.getElementById("search-form");
const wordInput = document.getElementById("word-input");
const searchBtn = document.getElementById("search-btn");

// Messages Section
const loadingMessage = document.getElementById("loading-message");
const errorMessage = document.getElementById("error-message");

// Results Section
const word = document.getElementById("word");
const phonetic = document.getElementById("phonetic");
const audioBtn = document.getElementById("audio-btn");
const meanings = document.getElementById("meanings");
const source = document.getElementById("source");
const favoriteBtn = document.getElementById("favorite-btn");

// Favorites Section
const favoritesList = document.getElementById("favorites-list");
const emptyFavorites = document.getElementById("empty-favorites");

//handleSearch function handles the user interaction

searchForm.addEventListener("submit", handleSearch); 
function handleSearch (event) {
    event.preventDefault();

    const searchWord = wordInput.value.trim();
    if (searchWord === "") {
        errorMessage.textContent = "Please enter a word.";
        return;
    }

    errorMessage.textContent = "";
    fetchWord(searchWord);
}

//The async Function fetchWord communicates with the API

async function fetchWord (word) {
    loadingMessage.classList.remove("hidden");
    errorMessage.textContent = "";

    try{
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    console.log(response);

    if (!response.ok) {
        throw new Error("Word not Found"); //If word is an invalid response, an error is thrown word not found 
    }

    const data = await response.json(); // Data is converted into js readable form
    displayWord(data);
    }catch (error) {
        errorMessage.textContent = error.message;// Displays the error message incase of net issues
    } finally {
        loadingMessage.classList.add("hidden"); // Hides the loading ... section
    }

}
//The displayFunction is used to display the fetched data in the results section

function displayWord(data) {
    
    const wordData = data[0]; //fetches the array of objects from the api
    word.textContent = wordData.word// Now here we are working with the actual dictionary

    phonetic.textContent = wordData.phonetic || "No phonetic available"; //If phonetic is available, show it otherwise show ""
    // meanings.innerHTML = "";
    // source.innerHTML = "";

    // wordData.meanings.forEach((meaning) => {    //for every meaning returned by the API
    //     const meaningDiv = document.createElement("div");
    //     meaningDiv.classList.add("meaning"); //Every meaning gets its own div element
    //     meaningDiv.innerHTML = `<h3>${meaning.partOfSpeech}</h3>`;

    //     meaning.definition.forEach((definition) => {
    //         meaningDiv.innerHTML += `<p class= "definition"> <strong>Definition: </strong> ${definition.definition}</p>` //Each definition is appended to its respective slot. 
            
    //         if (definition.example) {
    //             meaningDiv.innerHTML += `<p class="example"> <strong>Example: </strong> ${definition.example}</p>`; 
    //         }
    //     })
    // });



}


