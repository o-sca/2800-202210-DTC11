# EZ-EV - a charging station map app

- [Description](#description)
- [Technologies](#technologies)
- [File Contents](#file-contents)
- [Installation](#installation)
- [How to use](#how-to-use)
- [Credits](#credits)
- [Contact](#contact)

## Description

### A mobile web application to help electric vehicle drivers find charging stations via an informative interactive map.

---

## Technologies

Technologies used for this project:

### Frontend

- HTML, CSS
- JavaScript, jQuery
- Leaflet - https://leafletjs.com/

### Backend

- Node.js

### Database

- MySQL via Heroku
- MongoDB
- OpenStreetMap
- Opendatasoft Explore API

---

## File Contents

Content of the project folder:

```

├── package-lock.json
├── package.json
├── public
│   ├── common
│   │   ├── footer.html
│   │   └── nav.html
│   ├── css
│   │   ├── admin.css
│   │   ├── global.css
│   │   ├── login.css
│   │   ├── main.css
│   │   ├── nav.css
│   │   ├── newaccount.css
│   │   └── popup.css
│   ├── imgs
│   │   ├── arrow-icon.png
│   │   ├── car.gif
│   │   ├── favicon.png
│   │   ├── rainbow_flipped.png
│   │   └── small_logo.png
│   ├── js
│   │   ├── Leaflet.ImageOverlay.Rotated.js
│   │   ├── admin.js
│   │   ├── common_elements.js
│   │   ├── evAPI.js
│   │   ├── filter.js
│   │   ├── leaflet.js
│   │   ├── mysqlWrapper.js
│   │   ├── nav.js
│   │   └── recents.js
│   └── main.html
├── server.js
└── views
    ├── admin.ejs
    ├── login.ejs
    └── newaccount.ejs
```

---

## Installation

### Required software:

- Node.js
- Node Package Manager

### Recommended development apps:

- VSCode for code production
- MySQL to use local MySQL database
- MySQL Workbench for managing local / hosted database

To install, first clone repository to your local machine. In the project directory run `npm install` to install all node package dependancies.

To connect to hosted database, acquire `.env` from project team member. To use with a local MySQL database, create `.env` file in root directory with the following variables set to your local settings:  
LOCAL_HOST=\<localhost>  
LOCAL_USER=\<username>  
LOCAL_PASSWORD=\<password>  
LOCAL_DATABASE=\<database>

See a bug? Contribute to the [testing log.](https://docs.google.com/spreadsheets/d/1N_1raDGePpBJiij3JqFtYP7nGZy3jspY5KDhL6jIpkk/edit?usp=sharing)

---

## How to use

App hosted on Heroku: https://ezev.herokuapp.com/

- Create an account, or login with existing account or as guest user to acces main page. Login as administrator to access Admin page via menu. Admin page shows all users, with a button to delete a non-administrator user.
- Existing stations show as markers on the map. Click a marker to see pop-up window with detailed information about that station. Press the "Save" button to add station to favourites list. Click the top-right menu button (hamburger menu) to access Recents - recently clicked stations and saved stations.
- Click filter icon in menu to see filters pop-up. Modify paramaters to filter. Click "Reset all" button to clear filters.
- Click search icon to view search pop-up. Stations with name or address containing search text will be displayed.

---

## Credits

Team **Down To Charge** (BCIT team DTC11)

- David Lee
- Shen Yen
- Oscar Zhu
- Terence Grigoruk

[Vladimir Agafonkin, creator of the Leaflet API, and contributors](https://leafletjs.com/)

[OpenStreetMap](https://www.openstreetmap.org/)

[Opendatasoft Explore API v2](https://opendata.vancouver.ca/api/v2/console)

[Plugshare API Documentation](https://developer.plugshare.com/docs/#introduction)

---

## Contact

@  
@  

ozhu@my.bcit.ca

tgrigoruk@my.bcit.ca
