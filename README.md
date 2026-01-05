# MoodShelf

MoodShelf - This is a mobile application based on (React Native + Expo) that selects books and movies for users based on their mood.

The user selects a mood, and the app offers a selection of movies and books. You can also view movie details, including ratings, genres, and descriptions, as well as open the page on TMDB or Google Books for books.



## Features

- Choice of mood (Joy, Sadness, Romantic, etc.)
- Selection of films and books by genre and mood 
- View movie details with ratings, genres, and descriptions
- Modal window for movie information
- “Surprise Me” buttons for randomly selecting a mood for a movie or book
- Support for dark and light themes 


## Screenshots / GIF

[Home Screen] -> ./assets/demo.gif 
[Mood Selection Movie] -> ./assets/demo.gif 
[Mood Selection Book] -> ./assets/demo.gif 
[Movies Screen] -> ./assets/demo.gif 
[Books Screen] -> ./assets/demo.gif 
[Suprise Me Books] -> ./assets/demo.gif 
[Suprise Me Movies] -> ./assets/demo.gif
[Opening a modal window for movie details] -> ./assets/demo.gif 
[Using "New Movies" button] -> ./assets/demo.gif 
[Using "New Books" button] -> ./assets/demo.gif 

## Technologies

- React Native + Expo
- TypeScript
- TMDB API
- Google Books API


## Installation and Setup

1. Clone the repository:

2. Navigate to the project folder:
   cd moodshelf

3. Install dependencies:
   npm install

4. Create a .env file in the root folder and add your API keys:

EXPO_PUBLIC_TMDB_API_KEY=YOUR_TMDB_API_KEY
EXPO_PUBLIC_GOOGLE_BOOKS_API_KEY=YOUR_GOOGLE_BOOKS_API_KEY

IMPORTANT: The .env file is not included in GitHub. Use your own API keys.

5. Run the project:
   npx expo start


## Usage 

1. Select movies or books recommendations.

2. Select your mood

3. Tap a movie or book card to view details.

4. In the modal window, open the link to movie (TMDB) or book (Google Books)

5. The "New Movies / New Books" button loads the next set of recommendations.


## API Keys 

You need your own API keys to run the app:
 TMDB API: https://developer.themoviedb.org/docs/getting-started
 Google Books API: https://developers.google.com/books
 Keys are not included in the repository. You must obtain your own keys.