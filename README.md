# BMA Dev Test

## RestaurantListings

RestaurantListings is simple restaurant viewer app. The functionality is quite simple: Fetch the list of available restaurants from the API and display them to the user. The user should be able to search the restaurants with a variety of filters. A basic boilerplate has been provided for the app which consists of two main components:

- RestaurantListings - The AspNetCore backend
- RestaurantListings.UI - The Angular frontend

The application can be started by running the main **RestaurantListings**

```bash
dotnet run -p ./RestaurantListings
```

This will start both the API and Angular frontend.

## Requirements

The initial implementation has been already been completed; but it's ugly, buggy and uses a variety of bad practices. Refactor the app to meet the following requirements:

- The user is presented with a list of restaurants:

  - The list should show the image, title, description, and other basic info
  - Make the layout as responsive as possible
  - The list should use semantically sound HTML and modern CSS practices

- The user should be able to filter restaurants efficiently and consistently via a number of options:

  - Searching the name via the search bar
  - Through the tags, which should be displayed alphabetically. Multiple tags can be selected at a time
  - Through the family friendly and vegan options, which should check the relevant flags on the restaurant

- Add basic rating functionality to the API and frontend:

  - Only signed in users should be able to rate a restaurant
  - The rating should only be between 1 and 5
  - The rating should be displayed on the restaurant list
  - Only one rating per user per restaurant should be allowed
