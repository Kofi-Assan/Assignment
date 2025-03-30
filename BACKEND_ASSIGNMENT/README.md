# Library Management System API
# Description
A RESTful API for managing a library of books built with Express.js and Node.js.

# Installation
1. Clone the repository
2. Type and enter npm install in the terminal.

# Running the Application
To start the server in the terminal, type 'npm run dev'

The server will run using the link: `http://localhost:5000/books`

# Data Structure
Each book has the following properties:
- id (unique identifier, auto-generated)
- title (string)
- author (string)
- year (number)

# API Endpoints
They include:

a. GET /books
Returns a list of all books in the library.

b. GET /books/:id
Returns details of a specific book by ID.

c. POST /books
Adds a new book to the library.

Request body:
```json
{
    "title": "Node.js Essentials",
    "author": "John Doe",
    "year": 2021
}
```

d. PUT /books/:id
Updates details of a specific book.

Request body:
```json
{
    "title": "Updated Title",
    "author": "Updated Author",
    "year": 2022
}
```

e. DELETE /books/:id
Deletes a book from the library.

# Validation
The API validates that all required fields (title, author, year) are provided and non-empty for POST and PUT requests. 

# Middleware
server.use(express.json());