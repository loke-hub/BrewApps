# Bookstore API

This is a simple RESTful API built with Node.js and MongoDB for managing books. It provides endpoints for performing CRUD (Create, Read, Update, Delete) operations on book data.

## API Endpoints and Usage

### Create a New Book

- Endpoint: POST /api/books
- Request Body: JSON object with book details (title, author, summary)
- Example:

  ```json
  {
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "summary": "A classic novel about the American Dream."
  }
View All Books
Endpoint: GET /api/books
Returns a JSON array of all books in the database.


View Details of a Specific Book
Endpoint: GET /api/books/:id
Replace :id with the book's unique identifier.
Returns a JSON object with book details.


Endpoint: PUT /api/books/:id
Replace :id with the book's unique identifier.
Request Body: JSON object with book details to update.

example:
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "summary": "A classic novel about the American Dream. Updated summary."
}

Delete a Book
Endpoint: DELETE /api/books/:id
Replace :id with the book's unique identifier.
Deletes the book with the specified ID.