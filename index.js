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

//handleSearch function handles the user interaction and input

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

//The async Function fetchWord communicates with the API and fetches data

async function fetchWord (word) {
    loadingMessage.classList.remove("hidden");// loading message is displayed
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

//The displayWord Function is used to display the fetched data in the results section

function displayWord(data) {
    
    const wordData = data[0]; //fetches the array of objects from the api
    word.textContent = wordData.word// Now here we are working with the actual dictionary

    phonetic.textContent = wordData.phonetic || "No phonetic available"; //If phonetic is available, show it otherwise show ""
    meanings.innerHTML = "";
    source.innerHTML = "";

    wordData.meanings.forEach((meaning) => {    //for every meaning returned by the API
        
        const meaningDiv = document.createElement("div");
        meaningDiv.classList.add("meaning"); //Every meaning gets its own div element
        meaningDiv.innerHTML = `<h3>${meaning.partOfSpeech}</h3>`; //describes what partofspeech the word input by the user is

        meaning.definitions.forEach((definition) => {
            meaningDiv.innerHTML += `<p class= "definition"> <strong>Definition: </strong> ${definition.definition}</p>` //Each definition is appended to its respective slot. 
            
            if (definition.example) {
                meaningDiv.innerHTML += `<p class="example"> <strong>Example: </strong> ${definition.example}</p>`; // Adds the examples section if there are examples
            };

            if (definition.synonyms.length > 0) {
                meaningDiv.innerHTML += `<p class="synonyms"> <strong>Synonyms: </strong> ${definition.synonyms.join(", ")}</p>`; //Adds synonyms to a word if it exists
            };
        });

        meanings.appendChild(meaningDiv); //Linking the child to a parent element

    });

    if (wordData.sourceUrls && wordData.sourceUrls.length > 0) { //checks if he array of urls exist and it contains atleast 1 array
        source.innerHTML= `<p> <strong>Source: </strong> <a href= "${wordData.sourceUrls[0]}">${wordData.sourceUrls[0]}</a></p>`; //displays the source url
    }
    console.log(wordData.sourceUrls)

    const audio = wordData.phonetics.find((item) => item.audio); // searches the array and returns the first item that has an audioURL

    if (audio) {       // The if function for audio, if audio was found display buttonand when button is clicked create an audio icon and play
        audioBtn.classList.remove("hidden");
        audioBtn.onclick = function() {
            new Audio(audio.audio).play();
        };
    }else {
        audioBtn.classList.add("hidden"); //else dont show the button. 
    }
  
}

let favorites = JSON.parse(localStorage.getItem("favorites"))|| []; //empty array to handleour data || favorites is added to the local storage

favoriteBtn.addEventListener("click", saveFavorite); //event listener for the save button

//saveFavorite function is used to save the users favorite words(managing the data)

function saveFavorite() {
    const currentWord = word.textContent; //currentWord takes the user input

    if(favorites.includes(currentWord)) { //checks if the currenWord is in the fav array
        return; //returns the result, either true or false
    }
    favorites.push(currentWord); //adds the currentWord to the array
    localStorage.setItem("favorites", JSON.stringify(favorites)); //stringify converts the array into a readable array of strings
    displayFavorites();
}

//displayFavorites Function (updates the UI) reads every word in the favorites array, creates elements for each word and adds them to favorite-list

function displayFavorites() {
    favoritesList.innerHTML = ""; //clears the list

    if(favorites.length === 0) {   //Checks if the arrays length is strictly equal to zero
        emptyFavorites.classList.remove("hidden");
        return;
    }
    emptyFavorites.classList.add("hidden") //Hides the "no favorite words saved yet"

    favorites.forEach((favorite) => {
        const favoriteItem = document.createElement("div");
        favoriteItem.classList.add("favorite-item");

        favoriteItem.innerHTML = `<span>${favorite}</span> <button class="remove-btn">Remove</button>`; //added a remove button
        const removeBtn = favoriteItem.querySelector(".remove-btn"); //query selector find the exact remove-button
        removeBtn.addEventListener("click", () => { //event listener listens for a click on the remove button
            favorites = favorites.filter((word) => word !== favorite), //Removes the word from the favorites array
            localStorage.setItem("favorites", JSON.stringify(favorites));
            displayFavorites();
        }) //.filter method creates a new array which is appended to favorites

        favoritesList.appendChild(favoriteItem);
    });
}
displayFavorites();