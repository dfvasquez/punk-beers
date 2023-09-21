# Punk Beer App

An app where you can look beers and find the one that match with you. Do you want to discover the app? Go to the [Demo](https://punkbeers.netlify.app/) or install the project if you prefer.

## Install the project

### 1.- Clone the repository and open a terminal in that directory

### 2.- Run  `npm install` to install dependencies

### 3.- Run  `npm start` to run the app. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## If you decide to install the project

### You can change some constants in `src/utils/constants.ts` if you want to see some differences in the UI:

-   `perPageApi (number)`: maximum amount of beers that the API will return in each request
-   `perPageApp (number)`: maximum amount of beers that the app will show in each page
-   `loadingLong (number)`: number in ms used to load the first request of beers to be able to see the behaviour of loading when the API answer fast
-   `loadingShort (number)`: number in ms used to load the rest of requests of beers (load more pages or ) to be able to see the behaviour of loading when the API answer fast

