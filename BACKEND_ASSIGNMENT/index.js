const express = require('express');
const server = express()
const PORT = 5000

server.use(express.json());

server.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

let books = [
    {
        id: 1,
        title: "Node.js Essentials",
        author: "John Doe",
        year: 2021
    }
];
let nextId = 2;

const validateBook = (req, res, next) => {
    const { title, author, year } = req.body;
    
    if (!title || !author || !year) {
        return res.status(400).json({ 
            error: 'All fields (title, author, year) are required' 
        });
    }
    
    if (typeof year !== 'number') {
        return res.status(400).json({ 
            error: 'Year must be a number' 
        });
    }
    
    next();
};

server.get('/books', (req, res) => {
    res.json(books);
});

server.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
});

server.post('/books', validateBook, (req, res) => {
    const book = {
        id: nextId++,
        ...req.body
    };
    books.push(book);
    res.status(201).json(book);
});

server.put('/books/:id', validateBook, (req, res) => {
    const index = books.findIndex(b => b.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ error: 'Book not found' });
    }
    
    books[index] = {
        ...books[index],
        ...req.body
    };
    res.json(books[index]);
});

server.delete('/books/:id', (req, res) => {
    const index = books.findIndex(b => b.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ error: 'Book not found' });
    }
    
    books.splice(index, 1);
    res.status(204).send();
});

server.listen(PORT, () => {
    console.log(`Server is running on localhost: ${PORT}`);
});