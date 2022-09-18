require('dotenv').config()
const {CONNECTION_STRING} = process.env
const Sequelize = require('sequelize')

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres', 
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

const {riddles, odd, words, man} = require("./data.js");

let newId = 11;

module.exports = {

    getFruit: (req, res) => {
        res.status(200).send(odd);
    },

    getWords: (req, res) => {

        let randomWord;

        const j = Math.floor(Math.random()*words.length);
        randomWord = words[j];

        res.status(200).send(randomWord);
    },

    getMan: (req, res) => {
        res.status(200).send(man);
    },

    getRiddle: (req, res) => {
        let question;

        const j = Math.floor(Math.random()*riddles.length);
        question = riddles[j];

        res.status(200).send(question);
    },

    postForm: (req, res) => {
        let {riddle, answers, hint} = req.body;

        let newResponse = {
            id: newId,
            question: riddle,
            answer: answers,
            hint: hint  
        }
        newId++;

        riddles.push(newResponse)

        res.status(200).send(newResponse);
    },

    postWord: (req, res) =>{

        let {word, hint} = req.body;
        let definition = `https://www.merriam-webster.com/dictionary/${word}`

        let newWord = {
            word,
            hint,
            definition
        }

        words.push(newWord)
        res.status(200).send(newWord);
    },

    deleteFruit: (req, res) => {
        const id = +req.params.id;
        const index = odd.findIndex(e => e.id === id);
        odd.splice(index, 1);
        res.status(200).send(odd);
    },

    postResponse: (req, res) => {
        let {text} = req.body; 
        console.log(req.body);

        sequelize.query(`
            INSERT into feedback (response)
            VALUES('${text}')`) //strings that get passed back to sql are wrapped in ""
                                //"" in SQL tells it to make new columns. To pass a string, wrap
                                //target text in ' ';
            .then(() => {console.log('Added')
                        res.sendStatus(200)})
            .catch(err => console.log(err.data))
    },

    seed: (req, res) => {
        sequelize.query(`
            DROP TABLE IF EXISTS feedback;

            CREATE TABLE feedback (
                text_id serial primary key, 
                response varchar
            );
        `)
        .then(() => {
            console.log('Seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('ERROR', err))
    }
}