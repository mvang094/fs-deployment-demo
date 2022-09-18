const express = require('express');
const path = require('path'); //alows us to use file paths in a safe way
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const {getFruit, deleteFruit, getRiddle, 
        postForm, postResponse, getWords, getMan, postWord, seed} = require('./controller.js');


//('/')finds the root route (i.e. home page)
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../index.html'));
}) 

// console.log(__dirname);
// console.log(path.join(__dirname, '../index.html'))

app.post('/api/project/seed', seed);

app.get('/api/project/fruits', getFruit);
app.get('/api/project', getRiddle);
app.get('/api/project/word', getWords)
app.get('/api/project/man', getMan);
app.post('/api/project/postRiddle', postForm);
app.post('/api/project/postWord', postWord);
app.post('/api/project/postFeed/', postResponse);
app.delete('/api/project/:id', deleteFruit);

const port = process.env.PORT || 4005; //use the process.env.PORT or if that doesn't exist, use 4005

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})





