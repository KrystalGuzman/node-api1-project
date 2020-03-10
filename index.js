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
    const user = req.body;
    if( user.hasOwnProperty( "name" ) && user.hasOwnProperty("bio")){
        user.id = shortid.generate();
        users.push(user);
        res.status(201).json(user);
    } else if (!users){
        res.status(500).json ({ errorMessage: "There was an error while saving the user to the database" });
    } else {
        res.status(400).json({errorMessage: "Please provide name and bio for the user." });
    }   
});

server.get('/api/users', (req,res) => {
    if (users.length > 0){
        res.status(500).json(users);
    } else{
        res.status(500).json({errorMessage: "The users information could not be retrieved."})
    }
    
});

server.get('/api/users/:id', (req,res) => {
    const id = req.params.id
    const user = users.find(u => u.id == id)
    if (user ===id) {
        res.json(user)
    } else if (user !== id){
        res.status(404).json({ message: "The user with the specified ID does not exist."})
    } else{
        res.status(500).json({ errorMessage: "The user information could not be retrieved." })
    }
});

// does not work
server.delete("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const user = users.filter(user => user.id == id);
    if (user){
        users = users.filter(user => user.id !==id);
        res.status(200).json({message: `Deleted User ${id}`});
    } else{
      res.status(404).json({message: "The user with the specified ID does not exist."});
    }
  });

const PORT = 5000;
server.listen(PORT, () =>
console.log(`\n **API on http://localhost:${PORT} ** \n`)
);