// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Configure the app to use bodyParser and set up the MongoDB connection
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/bookstore', { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define the Book model
const Book = mongoose.model('Book', {
  title: String,
  author: String,
  summary: String,
});

// Define your API routes here
// Create a new book
app.post('/api/createbooks', (req, res) => {
  const { title, author, summary } = req.body;
  const book = new Book({ title, author, summary });

  book.save((err) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(201).json(book);
    }
  });
});

// Get a list of all books
app.get('/api/getallbooks', (req, res) => {
  Book.find({}, (err, books) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(books);
    }
  });
});

// Get details of a specific book by its ID
app.get('/api/books/:id', (req, res) => {
  Book.findById(req.params.id, (err, book) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!book) {
      res.status(404).json({ error: 'Book not found' });
    } else {
      res.json(book);
    }
  });
});

// Update a book's details by ID
app.put('/api/updatebooks/:id', (req, res) => {
  Book.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, useFindAndModify: false },
    (err, book) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (!book) {
        res.status(404).json({ error: 'Book not found' });
      } else {
        res.json(book);
      }
    }
  );
});

// Delete a book by ID
app.delete('/api/deletebooks/:id', (req, res) => {
  Book.findByIdAndRemove(req.params.id, { useFindAndModify: false }, (err, book) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!book) {
      res.status(404).json({ error: 'Book not found' });
    } else {
      res.json({ message: 'Book deleted successfully' });
    }
  });
});
app.listen(8080)
console.log('Server listening on port at 8080');