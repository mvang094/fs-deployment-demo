let ridAnswer, ridHint, hangWord, hangHint, hangDef;
let wrongCount = 0;
let wordCount = 0;
let fruitName = 'Watermelan';

const playBtn1 = document.querySelector('.play1');
const playBtn2 = document.querySelector('.play2');
const playBtn3 = document.querySelector('.play3');
const intro = document.querySelector('#intro');

const yesBtn = document.querySelector('#yes');
const noBtn = document.querySelector('#no');
const addRid = document.querySelector('#insert');

const sBtn = document.querySelector('#sBtn');

const riddleBox = document.querySelector('.riddle-box');
const riddleForm = document.querySelector('#riddleForm');

//Buttons game
//Circles
const wrongBtn = document.querySelector('.wrong');
const wrongBtn1 = document.querySelector('.wrong-1');
const wrongBtn2 = document.querySelector('.wrong-2');
const wrongBtn3 = document.querySelector('.wrong-3');
const wrongBtn4 = document.querySelector('.wrong-4');
const rightBtn = document.querySelector('.right');

//Rectangles
const wrongBtn5 = document.querySelector('.wrong-5');
const wrongBtn6 = document.querySelector('.wrong-6');
const wrongBtn7 = document.querySelector('.wrong-7');
const rightBtn1 = document.querySelector('.right-r');

//Triangles
const wrongBtn8 = document.querySelector('.wrong-8');
const wrongBtn9 = document.querySelector('.wrong-9');
const wrongBtn10 = document.querySelector('.wrong-10');
const wrongBtn11 = document.querySelector('.wrong-11');
const rightBtn2 = document.querySelector('.right-t');

const buttons1 = document.querySelector('.buttons1');
const buttons2 = document.querySelector('.buttons2');
const buttons3 = document.querySelector('.buttons3');
const fruitList = document.querySelector('.fruit-list');

const threeBoxes = document.querySelector('.three-boxes');
const replayDiv = document.querySelector(".replayDiv");
const postDiv = document.querySelector(".postDiv");
const postRiddle = document.querySelector("#postRiddle");
const showWord = document.querySelector("#show");
const fruitNinja = document.querySelector('.fruit-ninja');
const enter = document.querySelector('.enter');
const fName = document.querySelector('#fName');
const introduction = document.querySelector("#introduction");
const hangman = document.querySelector('.hangman');
let hangPic = document.querySelector("#hangPic");
const addHangObjects = document.querySelector(".addHangObjects");
const playHAgain = document.querySelector(".playHAgain");

riddleBox.classList.add('hide');
replayDiv.classList.add('hide');
postDiv.classList.add('hide');
showWord.classList.add('hide');
hangman.classList.add('hide');

buttons1.classList.add('hide');
buttons2.classList.add('hide');
buttons3.classList.add('hide');
fruitList.classList.add('hide');
fruitNinja.classList.add('hide');
addHangObjects.classList.add('hide');
playHAgain.classList.add('hide');

const baseURL = 'http://localhost:5095/api/project';

function getFruits(){
    axios.get(`${baseURL}/fruits`)
    .then(res => {
        const fruitData = res.data;
        console.log(fruitData);
        fruity(fruitData);})
    .catch(err => console.log(err.data))}

function getWord (){
    axios.get(`${baseURL}/word`)
    .then(res=>{
        console.log(res.data);
        hangMan(res.data);})
    .catch(err => console.log(err.data))}

function getHangman(){
    axios.get(`${baseURL}/man`)
    .then(res => {
        console.log(res.data);
        wrongChar(res.data);})
    .catch(err => console.log(err.data))}

function postRiddles(body){
    axios.post(`${baseURL}/postRiddle/`, body)
    .then(res => {
        const data1 = res.data;
        console.log(data1);
        let {question, answer, hint} = data1;
        alert(`You have successfully added the following riddle:
                ${question}
                ${answer}
                ${hint}`);
        playAgain()})
        .catch(err => console.log(err.data))}

function sendHangWord(h){
    axios.post(`${baseURL}/postWord`, h)
    .then(res => {
        let {word, hint} = res.data; 
        alert(`You have entered ${word} with hint: ${hint}`)
        playHangAgain()})
    .catch(err => console.log(err.data))}

function deleteChoice(id){
    axios.delete(`${baseURL}/${id}`)
    .then(res => {
            const fruitData = res.data;
            if(fruitData.length < 7)
                success();
            else
                fruity(fruitData)})
    .catch(err => console.log(err.data))}

function riddler(){
    axios.get(`${baseURL}`)
    .then(res => {
        const data = res.data;
        console.log(data);
        guessRiddle(data)})
    .catch(err => console.log(err.data))}

function greeting (event){
    event.preventDefault();

    let name = fName.value;

    const nameDiv = document.createElement('div');
    nameDiv.classList.add('nDiv');

    nameDiv.innerHTML = `<center><h3>Hello ${name}!</h3><center>`;
    introduction.appendChild(nameDiv);

    enter.removeChild(fName);
    enter.removeChild(sBtn);
    fName.value = "";
}

function firstRound(){
    intro.innerHTML = `
        <center><h3>Find the Odd one Out! Find the one that does not belong
        </h3></center>
    `
    threeBoxes.classList.add('hide');
    buttons1.classList.remove('hide');
}

function rightChoiceTriangle(){
    buttons1.classList.add('hide');
    buttons2.classList.remove('hide');
}

function rightChoiceRectangle(){
    buttons2.classList.add('hide');
    buttons3.classList.remove('hide');
}

function fruity(fData){

    const {image} = fData;
    console.log(fData);
    
    fruitList.innerHTML = ``;
    
    for(i = 0; i < fData.length; i++){
        if (fData[i].name === 'Watermelan')
        {
            createWrongItem(fData[i]);
        }
        else if (fData[i].name === 'Orange')
        {
            createWrongItem(fData[i]);
            fruitImage = image.value;
            console.log(fruitImage)
        }
        else
            createListItem(fData[i]);
    }
}

function createListItem(item){
    buttons3.classList.add('hide');
    fruitList.classList.remove('hide');
    const listCard = document.createElement('div');
    listCard.classList.add("listCSS");

    listCard.innerHTML = `
        <img alt = 'fruit-image' src = ${item.image} class = "imageCSS"/>
        <button onclick = "wrongChoice()">${item.name}</button>
    `
    fruitList.appendChild(listCard);
}

function createWrongItem(item){
    const listCard2 = document.createElement('div');
    listCard2.classList.add("listCSS");

    listCard2.innerHTML = `
        <img alt = 'fruit-image' src = ${item.image} class = "imageCSS"/>
        <button onclick = "deleteChoice(${item.id})">${item.name}</button>
    ` 
    fruitList.appendChild(listCard2);
}

function wrongChoice(){
    alert("Hmm...not quite");
}

function success(){
    fruitList.classList.add('hide');
    fruitNinja.classList.remove('hide');

    const fruitDiv = document.createElement('div');

    fruitDiv.innerHTML = `
        <h3>You got it correct! Watermelon was spelled: </h3>
        <h4>Watermelan</h4>
        <h3>And the orange <img src = "../images/orange1.png">
        was actually a pokeball!</h3>
        <h4>Click anywhere to return to the home screen</h4>
    `
    fruitNinja.appendChild(fruitDiv);
    fruitNinja.addEventListener('click', close, true);
}

function guessRiddle(value){
    intro.innerHTML = `
        <center><h3>Guess The Riddle! Can you guess the answer?
        </h3></center>
    `
    
    threeBoxes.classList.add('hide');
    riddleBox.classList.remove('hide');

    const {question} = value;
    ridAnswer = value.answer;
    ridHint = value.hint;

    const riddleLabel = document.querySelector("#rr");
    riddleLabel.textContent = `${question}`;

    const riddleAnswer = document.createElement('input');
    riddleAnswer.setAttribute("type", "text");
    riddleAnswer.setAttribute("id", "riddlerAnswer");
    riddleAnswer.setAttribute("name", "riddlerAnswer");

    const riddleBtn = document.createElement('input');
    riddleBtn.setAttribute("type", "submit");
    riddleBtn.setAttribute("id", "ridBtn");
    riddleBtn.setAttribute("value", "Submit");
    
    riddleForm.appendChild(riddleAnswer);
    riddleForm.appendChild(riddleBtn);
    
    riddleBox.addEventListener("submit", getAnswer);
}

function getAnswer(event){
    event.preventDefault();

    let inputAnswer = document.querySelector('#riddlerAnswer');
    let inputValue = inputAnswer.value;
    console.log(inputValue);

    let lowerInputAnswer = inputValue.toLowerCase();
    
    if(lowerInputAnswer === ridAnswer)
    {
        inputAnswer.value = "";
        ridAnswer = "";
        ridHint = "";
        wrongCount = 0;
        let removeBtn = document.querySelector('#ridBtn');
        let removeAnswer = document.querySelector('#riddlerAnswer');
        riddleForm.removeChild(removeBtn);
        riddleForm.removeChild(removeAnswer);

        playAgain();
    }
    else
    {
        inputAnswer.value = "";
        wrongAnswer();
    }
}

function wrongAnswer(){
    alert("Hmm...Not quite");
    wrongCount++;
    console.log(wrongAnswer);

    if(wrongCount >= 3 && wrongCount < 5){
        showWord.classList.remove('hide');
        showWord.textContent = `Hint: ${ridHint}`;
    }
    else if(wrongCount === 5){
        wrongCount = 0;
        let removeBtn = document.querySelector('#ridBtn');
        let removeAnswer = document.querySelector('#riddlerAnswer');
        riddleForm.removeChild(removeBtn);
        riddleForm.removeChild(removeAnswer)
        showWord.textContent = `
        Sorry! Too many tries! The answer was ${ridAnswer}.
        Click anywhere to continue.
        `
        document.body.addEventListener('click', playAgain, true);
    }
}

function playAgain(){

    console.log('Hurray!');
    document.body.removeEventListener('click', playAgain, true);
    riddleBox.classList.add('hide');
    postDiv.classList.add('hide');
    showWord.classList.add('hide');
    replayDiv.classList.remove('hide');

    yesBtn.addEventListener("click", replay);
    noBtn.addEventListener("click", close);
    addRid.addEventListener("click", postRid);
}    

function replay(event){
    event.preventDefault();

    replayDiv.classList.add('hide');
    riddler();
}

function close(event){
    event.preventDefault();

    intro.innerHTML = `
        <center><h3>This is an application with three simple games to try.
                    Please choose one!
        </h3></center>
    `

    replayDiv.classList.add('hide');
    fruitNinja.classList.add('hide');
    hangman.classList.add('hide');
    playHAgain.classList.add('hide');
    threeBoxes.classList.remove('hide');
}

function postRid(event){
    event.preventDefault();

    replayDiv.classList.add('hide');
    postDiv.classList.remove('hide');
    postRiddle.addEventListener("submit", addRiddles);    
}

function addRiddles(event){
    event.preventDefault();

    let rQuestion = document.querySelector("#rQuestion");
    let aQuestion = document.querySelector("#aQuestion");
    let hQuestion = document.querySelector("#hintQ");

    let rObject = {
        riddle: rQuestion.value,
        answers: aQuestion.value,
        hint: hQuestion.value
    }
    console.log(rObject);

    postRiddles(rObject);

    rQuestion.value = "";
    aQuestion.value = "";
    hQuestion.value = "";
}

function hangMan(hObj){
    intro.innerHTML = `
        <center><h3>Guess The Word! Can you guess the word before it is too late?
        </h3></center>
    `
    threeBoxes.classList.add('hide');
    addHangObjects.classList.add('hide');
    playHAgain.classList.add('hide');
    hangman.classList.remove('hide');
    const inputChar = document.querySelector('#inputChar');
    hangPic.innerHTML = "";
    inputChar.innerHTML = "";

    hangWord = hObj.word;
    hangHint = hObj.hint;
    hangDef = hObj['definition'];

    let charHint = document.querySelector("#charHint");
    const hintBtn = document.createElement("button");
    hintBtn.setAttribute("id", "showHint");
    hintBtn.textContent = "Hint";
    charHint.appendChild(hintBtn);

    let hangingInput = document.querySelector("#hangingInput");
    const userInput = document.createElement("input");
    userInput.setAttribute("type", "text");
    userInput.setAttribute("id", "wInput")
    const userBtn = document.createElement("input");
    userBtn.setAttribute("type", "submit")
    userBtn.setAttribute("id", "hSubmit");
    userBtn.textContent = "Submit";
    
    hangingInput.appendChild(userInput);
    hangingInput.appendChild(userBtn);

    inputChar.innerHTML = `<section id = "spaces"></section>
    <br><section id = "squares"></section>
    `;

    for(let i = 0; i < hangWord.length; i++){
        let underScore = document.createElement("h1");
        underScore.setAttribute("id", "u"+i);
        underScore.classList.add("horizontal");
        let underText = document.createTextNode("__");
        underScore.appendChild(underText);
        const line = document.querySelector("#spaces");
        line.appendChild(underScore);
    }

    const hSubmit = document.querySelector('#hSubmit');
    const hintB = document.querySelector('#showHint');
    hSubmit.addEventListener('click', compareWord)
    hintB.addEventListener('click', showHint);
}

function showHint(){
    let charHint = document.querySelector("#charHint");
    charHint.innerHTML = `${hangHint}`;
}

function compareWord(){
    let wInput = document.querySelector("#wInput");
    let wChar = wInput.value;

    const rectangle = document.createElement("button");
    rectangle.classList.add("alphabet");
    rectangle.textContent = `${wChar}`;
    const squares = document.querySelector("#squares");
    squares.appendChild(rectangle);

    wInput.value = "";

    const spaces = document.querySelector('#spaces');
    console.log(hangWord)
    console.log(spaces.textContent);

    if (hangWord.includes(wChar.toLowerCase()))
    { 
        for(let i = 0; i < hangWord.length; i++)
        {
            if(hangWord[i] === wChar.toLowerCase())
            { 
                const hChar = document.querySelector("#u"+i);
                const hText = document.createTextNode(`${wChar}`);
                hChar.innerText = ''
                hChar.appendChild(hText);
            }
        }

        if(spaces.textContent === hangWord)
        {
            hangPic.innerHTML = "";

            hangPic.innerHTML = `
                <center><h3>Great job! The word was <a href = "${hangDef}">${hangWord}</a></h3>
                <h4>Click on the word to learn the definition</h4>
                Otherwise, what would you like to do?</center>
                <br>
            `
            const succeedYes = document.createElement("button");
            const succeedNo = document.createElement("button");
            const succeedAdd = document.createElement("button");


            succeedNo.setAttribute("id", "cNo");
            succeedNo.textContent = "Return";
            succeedYes.setAttribute("id", "cYes");
            succeedYes.textContent = "Play again";
            succeedAdd.setAttribute("id", "cAdd");
            succeedAdd.textContent = "Add a word";

            hangPic.appendChild(succeedYes);
            hangPic.appendChild(succeedNo);
            hangPic.appendChild(succeedAdd);

            const cY = document.querySelector("#cYes");
            const cN = document.querySelector("#cNo");
            const cAdd = document.querySelector("#cAdd");

            const hSubmit = document.querySelector('#hSubmit');
            const wInput = document.querySelector('#wInput');

            wordCount = 0;
            charHint.innerHTML = ``;
            hangingInput.removeChild(wInput);
            hangingInput.removeChild(hSubmit);
    
             cY.addEventListener('click', getWord);
             cN.addEventListener('click', close);
             cAdd.addEventListener('click', addWord);
        }
    }
    else
    {
        wInput.value = "";
        getHangman();
    }
}

function addWord(e){
    e.preventDefault(); 

    hangman.classList.add('hide');
    playHAgain.classList.add('hide');
    addHangObjects.classList.remove('hide');

    const hangForm = document.querySelector("#adding-hangman-word");
    hangForm.addEventListener('submit', addHangWord);
}

function addHangWord(e){
    e.preventDefault();

    const hQ = document.querySelector('#hWord');
    const hA = document.querySelector('#hAnswer');

    let hangObj = {
        word: hQ.value,
        hint: hA.value,
    }

    console.log(hangObj);

    sendHangWord(hangObj);

    hQ.value = "";
    hA.value = "";
}

function playHangAgain(){
    // let {word, hint} = resObj;
    addHangObjects.classList.add('hide');
    playHAgain.classList.remove('hide');

    //const insert = document.querySelector("#insert");
    //insert.innerHTML = `<h3>You have added word ${word} and hint ${hint}</h3>`
    // const revealText = document.createElement('h3');
    // revealText.textContent = ``

    // insert.appendChild(revealText);

    const playA = document.querySelector("#playA");
    const playN = document.querySelector("#playN");
    const playW = document.querySelector('#playW');

    playA.addEventListener('click', getWord);
    playN.addEventListener('click', close);
    playW.addEventListener('click', addWord)
}

function wrongChar(mObj){
    let imageHold = mObj[wordCount];
    let mImg = imageHold.image;

    let hangPic = document.querySelector("#hangPic");
    hangPic.innerHTML = `
        <img alt = "picture" src = "${mImg}">
    `
    wordCount++;

    if (wordCount === 9){
        const hSubmit = document.querySelector('#hSubmit');
        const wInput = document.querySelector('#wInput');

        wordCount = 0;
        hangingInput.removeChild(wInput);
        hangingInput.removeChild(hSubmit);
        const hintBtn = document.querySelector('#showHint')
        let charHint = document.querySelector("#charHint");
        charHint.removeChild(hintBtn);

        const inputChar = document.querySelector('#inputChar');
        
        inputChar.innerHTML= `
            <center><h3>Oh No! The word was <a href = "${hangDef}">${hangWord}</a></h3>
            <h4>Click on the word to learn the definition</h4>
                Otherwise, would you like to:</center>
                <br>
                <center><button id = "hangYes">Play Again?</button>
                <button id = "hangNo">Return</button>
                <button id = "addingWord">Add a word</button></center>
        `
        const hangYes = document.querySelector("#hangYes");
        const hangNo = document.querySelector("#hangNo");
        const addingWord = document.querySelector('#addingWord');

        hangYes.addEventListener('click', getWord);
        hangNo.addEventListener('click', close);
        addingWord.addEventListener('click', addWord)
    }
}

playBtn1.addEventListener('click', firstRound);
playBtn2.addEventListener('click', riddler);
playBtn3.addEventListener('click', getWord);

wrongBtn.addEventListener('click', wrongChoice);
wrongBtn1.addEventListener('click', wrongChoice);
wrongBtn2.addEventListener('click', wrongChoice);
wrongBtn3.addEventListener('click', wrongChoice);
wrongBtn4.addEventListener('click', wrongChoice);
wrongBtn5.addEventListener('click', wrongChoice);
wrongBtn6.addEventListener('click', wrongChoice);
wrongBtn7.addEventListener('click', wrongChoice);
wrongBtn8.addEventListener('click', wrongChoice);
wrongBtn9.addEventListener('click', wrongChoice);
wrongBtn10.addEventListener('click', wrongChoice);
wrongBtn11.addEventListener('click', wrongChoice);

rightBtn1.addEventListener('click', rightChoiceTriangle);
rightBtn2.addEventListener('click', rightChoiceRectangle);
rightBtn.addEventListener('click', getFruits);
sBtn.addEventListener('click', greeting);
