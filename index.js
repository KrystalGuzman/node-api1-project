const express = require('express');
const CORS = require('cors');
const shortid = require('shortid');
const server = express();

const users = [];

server.use(express.json());
server.use(CORS());

server.get('/', (req,res) => {
res.status(200).json({ hello: 'hello world!'})
});

server.post('/api/users', (req,res) => {
    const userInfo = req.body;
    userInfo.id = shortid.generate();
    users.push(userInfo);
    res.status(201).json(userInfo);
});

server.get('/api/users', (req,res) => {
    res.status(200).json(users);
});

server.get('/api/users/:id', (req,res) => {
    const id = req.params.id
    const user = users.find(u => u.id == id)
    if (user) {
        res.json(user)
    } else {
        res.status(404).json({ message: "User not found"})
    }
});

//does not work
// server.delete("/api/users/:id", (req, res) => {
//     if (!req.params.id)
//       res.status(400).send("Your request is missing the id");
//     users = users.filter(user => `${user.id}` !== req.params.id);
//     res.status(202).send(req.params.id);
//   });

const PORT = 5000;
server.listen(PORT, () =>
console.log(`\n **API on http://localhost:${PORT} ** \n`)
);