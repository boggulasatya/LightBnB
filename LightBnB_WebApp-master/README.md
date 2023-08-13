# LightBnB

LightBnB is a web application that aims to revolutionize the travel industry by providing a platform for property owners to list their accommodations for rent. Travellers can explore these listings, book and modify reservations, and leave reviews.

!["screenshot of Homepage"](https://github.com/boggulasatya/LightBnB/blob/main/LightBnB_WebApp-master/docs/Homepage.jpg?raw=true)
!["screenshot of Createlistings"](https://github.com/boggulasatya/LightBnB/blob/main/LightBnB_WebApp-master/docs/CreateListing.jpg?raw=true)
!["screenshot of My Reservations page"](https://github.com/boggulasatya/LightBnB/blob/main/LightBnB_WebApp-master/docs/My%20Reservations.jpg?raw=true)

## Project Structure

```
.
├── db
│   ├── json
│   └── database.js
├── public
│   ├── javascript
│   │   ├── components 
│   │   │   ├── header.js
│   │   │   ├── login_form.js
│   │   │   ├── new_property_form.js
│   │   │   ├── property_listing.js
│   │   │   ├── property_listings.js
│   │   │   ├── search_form.js
│   │   │   └── signup_form.js
│   │   ├── libraries
│   │   ├── index.js
│   │   ├── network.js
│   │   └── views_manager.js
│   ├── styles
│   │   ├── main.css
│   │   └── main.css.map
│   └── index.html
├── routes
│   ├── apiRoutes.js
│   └── userRoutes.js
├── styles  
│   ├── _forms.scss
│   ├── _header.scss
│   ├── _property-listings.scss
│   └── main.scss
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── server.js
```

* `db` contains all the database interaction code.
  * `json` is a directory that contains a bunch of dummy data in `.json` files.
  * `database.js` is responsible for all queries to the database. It doesn't currently connect to any database, all it does is return data from `.json` files.
* `public` contains all of the HTML, CSS, and client side JavaScript. 
  * `index.html` is the entry point to the application. It's the only html page because this is a single page application.
  * `javascript` contains all of the client side javascript files.
    * `index.js` starts up the application by rendering the listings.
    * `network.js` manages all ajax requests to the server.
    * `views_manager.js` manages which components appear on screen.
    * `components` contains all of the individual html components. They are all created using jQuery.
* `routes` contains the router files which are responsible for any HTTP requests to `/users/something` or `/api/something`. 
* `styles` contains all of the sass files. 
* `server.js` is the entry point to the application. This connects the routes to the database.

## Features

* Search: Easily find accommodations based on your preferences.

* Create Listing: Homeowners can list their properties for rent.

* My Listings: Homeowners can manage and view their listed properties.

* My Reservations: Travelers can keep track of their reservations.

## Dependecies

* bcrypt: Used for securely hashing passwords.
* cookie-session: Provides cookie-based session management.
* express: The web application framework.
* nodemon: Facilitates automatic server restarting during development.
* pg: Enables PostgreSQL database interaction.

## Getting Started

1. Download the Project: Instead of cloning the project, download the ZIP file using the "Download ZIP" option.
2. Extract and Move: Extract the downloaded ZIP file and drag the extracted `LightBnB_WebApp` folder into your project directory.
3. Commit Changes: Commit this change to your version control system.
4. Navigate to Directory: Navigate to the `LightBnB_WebApp` directory using your command-line interface.
5. Install Dependencies: Install any required dependencies by running the following command:
`npm install`
6. Start the app with following command:
   `npm run local`
7. Open your browser and go to `http://localhost:3000` to access LightBnB 