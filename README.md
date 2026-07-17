# single-page-application

# Wordly Dictionary SPA

Wordly Dictionary is a simple web application that allows users to search for English words and view their meanings, phonetics, pronunciation audio, synonyms, and source links. Users can also save their favorite words, which are stored locally in the browser using Local Storage.


## Features

- Search for any English word
- Display the word and phonetic spelling
- View meanings and definitions
- Display example sentences when available
- Display synonyms
- Listen to pronunciation audio
- View the original source of the word
- Save favorite words
- Remove favorite words
- Persist favorites using Local Storage
- Responsive design for desktop and mobile devices



## Technologies Used

- HTML5
- CSS
- JavaScript (ES6)
- Dictionary API


## Project Structure

Single-page-application/
index.html
style.css
index.js
README.md


## API Used

This project uses the Free Dictionary API.

Example endpoint: https://api.dictionaryapi.dev/api/v2/entries/en/{word}


Example: https://api.dictionaryapi.dev/api/v2/entries/en/computer


## Installation

1. Clone the repository
bash git clone https://github.com/EmmanuelMwangi021/single-page-application.git

2. Open the project folder.

3. Open `index.html` in your browser.

No additional packages or dependencies are required.


## How to Use

1. Enter an English word in the search box.
2. Click the Search button.
3. View the word details including:
   - Phonetic spelling
   - Definitions
   - Examples
   - Synonyms
   - Pronunciation audio
   - Source link
4. Click ☆ Save to add the word to your favorites.
5. Click Remove to delete a word from the favorites list.


## Local Storage

Favorite words are stored in the browser's Local Storage, allowing them to remain available even after refreshing or reopening the application.

## Screenshots

You can include screenshots of the application here. They will be saved in the assets folder.

Example:

Assets/
screenshot.png

## Future Improvements

- Search history
- Dark mode(light mode)
- Multiple pronunciations
- Recently searched words
- Share favorite words
- Improved error messages


## Author

Emmanuel Mwangi

Software Engineering Student at Moringa School

## License

This project is created for educational purposes as part of a Software Engineering summative assessment in Moringa School.