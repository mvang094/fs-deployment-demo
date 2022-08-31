const express = require('express');
const path = require('path'); //alows us to use file paths in a safe way
const app = express();

//('/')finds the root route (i.e. home page)
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../index.html'));
}) 

const port = process.env.PORT || 4005; //use the process.env.PORT or if that doesn't exist, use 4005

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})




