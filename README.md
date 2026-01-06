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
- Skeleton loaders while content is loading
- Smooth animations and transitions

## Screenshots / GIF

- **Home Screen**
 ![Screen where user selects what they want: Movies, Books, or uses "Suprise Me"] -> (./assets/demo.gif/Home_Screen.png)

- **Mood Selection for Movies**
 ![Screen where user selects their mood to get movie recommendations] -> (./assets/demo.gif/Mood_Selection_Movie.gif)

- **Mood Selection for Books**
 ![Screen where user selects their mood to get book recommendations] -> (./assets/demo.gif/Mood_Selection_Book.gif)

- **Movies Screen**
 ![Grid of movie recommendations based on selected mood] -> (./assets/demo.gif/Movies_Screen.gif)

- **Books Screen**
 ![Grid of book recommendations based on selected mood] -> (./assets/demo.gif/Books_Screen.gif)

- **Suprise Me (Books)**
 ![Pressing "Surprise Me" for books randomly selects mood and displays recommended books] -> (./assets/demo.gif/Suprise_Me_Books.gif)

- **Suprise Me (Movies)**
 ![Pressing "Suprise Me" for movies randomly selects mood and displays recommended movies] -> (./assets/demo.gif/Suprise_Me_Movies.gif)

- **Movie Details Modal**
 ![Modal window showing selected movie details including poster, genres, rating, and description, with link to TMDB] -> (./assets/demo.gif/Opening_a_modal_window_for_movie_details.gif)

- **Book Details Modal**
 ![Modal window showing selected book details including poster, description, with link to Google Books] -> (./assets/demo.gif/Opening_a_modal_window_for_book_details.gif)

- **Using "New Movies" button**
 ![Using "New Movies" button] -> (./assets/demo.gif/Using_New_Movies_button.gif)

- **Using "New Books" button**
 ![Using "New Books" button] -> (./assets/demo.gif/Using_New_Books_button.gif)

## Technologies

- React Native + Expo
- TypeScript
- TMDB API
- Google Books API
- React Native Animated API


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



## Author 

 - Created by: Oleksandr Tsariuk
 - https://github.com/knax-dev