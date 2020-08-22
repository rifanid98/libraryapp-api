**libraryapp-api** is a simple api endpoint for library application built with Node.js, Express Js as a framework of Node.js and MySQL as a database which has [features](#features) such as login / register using JWT, pasword hashing, CORS, etc.

## :memo: Table Of Content

-   [Prerequisites](#prerequisites)
-   [Installation](#installation)
-   [Features](#features)
-   [Examples](#examples)
-   [Built wtih](#features)
-   [Author](#author)
-   [License](#license)

## Prerequisites

-   NPM or Yarn as package manager.
-   Node.js installed on the local machine
-   MySQL intalled on the local machine (ex. XAMPP)

## Installation

1. Clone this repository:
   `git clone https://github.com/rifanid98/libraryapp-api`
2. Start XAMPP
3. Database configuration:
    - Open http://localhost/phpmyadmin in the browser
    - Import database, select `libraryapp.sql` file from project folder
4. Start the server:
    - Open root project folder with command line (terminal, linux. cmd, windows. etc.)
    - Type and run this command `npm start` to start the server.
    - Make sure there are no other processes that use port 3000
5. Run app with api testing tools like postman, etc. on http://localhost:3000/libraryapp-api/

## Features

-   [x] CRUD
-   [x] Search, Sort, Pagination
-   [x] CORS allowed
-   [x] Login/Register with JWT
-   [x] Password hashing

## Documentation

[How to use](https://github.com/rifanid98/libraryapp-api/blob/master/docs.md)

## Built with

-   [Node.js](http://nodejs.org/) - JavaScript runtime environment
-   [Express.js](https://expressjs.com/) - Node.js framework
-   [MySQL](https://www.mysql.com/) Database
-   [JWT](https://jwt.io/) - Login/Register authentication
-   [Bcrypt](https://github.com/kelektiv/node.bcrypt.js) - Password Hashing

## Author

-   [Adnin Rifandi Sutanto Putra](https://www.linkedin.com/in/adnin-rifandi/)

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/rifanid98/libraryapp-api/blob/master/LICENSE) file for details

Thanks to [Daniel Saputra](https://www.linkedin.com/in/danielwetan/) for the readme layout.
