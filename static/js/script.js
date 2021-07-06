/********* CHALLANGE 1: YOUR AGE IN DAYS **********/
function ageInDays() {
    /* estraggo dal prompt il valore inserito dallo user e lo salvo in birthYear*/
    var birthYear = prompt("what year where you born?");

    /* calcolo il valore in giorni dalla mi data di nascita */
    var ageInDayss = (2021-birthYear) * 365;

    /* creo un tag h1 con la funzione createElement */
    var h1 = document.createElement('h1'); 

    /* creo la stringa di testo che devo restituire con la funzione createTextNode */
    var textAnswer = document.createTextNode('You are approximately ' + ageInDayss + ' days old');
    
    /* setto il tag h1 e gli do id='ageInDays' */
    h1.setAttribute('id', 'ageInDays');
    
    /* al tag h1 che ho creato gli appendo il textAnswer */
    h1.appendChild(textAnswer);

    /* prendo il flex-box-result che ho creato in html e gli appendo il tag h1
    contenente la stringa "you are xxxx days old */
    document.getElementById('flex-box-result').appendChild(h1);
}

function reset() {
    document.getElementById('ageInDays').remove();
}


/********* CHALLANGE 2: BEAR GENERATOR **********/
function generateBear() {
    var image = document.createElement('img');
    var div = document.getElementById("flex-bear-gen");
    image.src = "static/images/bear.png"; 
    div.appendChild(image);
}

/********* CHALLANGE 3: ROCK PAPER SCISSORS **********/
function rpsGame(yourChoice) {
    var humanChoice, botChoice; 
    
    humanChoice = yourChoice.id;
    console.log('your choice is: ' + humanChoice);
    
    botChoice = numberToChoice(randToRpsInt());
    console.log('bot choice is: ' + botChoice); 
    
    results = decideWinner(humanChoice, botChoice); 
    console.log('the result is: ' + results);

    //{'message': 'you won!', 'color': 'green'}
    message = finalMessage(results);
    console.log('final message: ' + message);

    rpsFrontEnd(yourChoice.id, botChoice, message); 
}

function randToRpsInt() {
    return Math.floor(Math.random() * 3); 

}

function numberToChoice(number) {
    return ['rock', 'paper', 'scissor'][number];
}

function decideWinner(yourChoice, computerChoice) {
    var rpsDatabase = {
        'rock': {
            'scissors': 1, 
            'rock': 0.5, 
            'paper': 0
        },
        'paper': {
            'rock': 1, 
            'paper': 0.5, 
            'scissors': 0
        },
        'scissors': {
            'paper': 1, 
            'scissors': 0.5, 
            'rock': 0
        }
    };

    var yourScore = rpsDatabase[yourChoice][computerChoice];
    var computerScore = rpsDatabase[computerChoice][yourChoice]; 

    return [yourScore, computerScore]; 
}

function finalMessage([yourScore, computerScore]) {
    if(yourScore === 0) {
        return {'message': 'YOU LOST!', 'color': 'red'};
    } else if (yourScore === 0.5) {
        return {'message': 'YOU TIED', 'color': 'yellow'}; 
    } else {
        return {'message': 'YOU WON!', 'color': 'green'};
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
    var imagesDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    }; 

    //remove all images
    document.getElementById('rock').remove(); 
    document.getElementById('paper').remove(); 
    document.getElementById('scissors').remove();

    //create a div for each element
    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "' style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>"
    botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "' style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'>"
    messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px; '>" + finalMessage['message'] + "</h1>"
    
    document.getElementById('flex-box-rps-div').appendChild(botDiv); 
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    
     
}

/********* CHALLANGE 4: CHANGE BUTTONS COLORS **********/

//return an array 
var all_buttons = document.getElementsByTagName('button'); 
console.log(all_buttons);

var copyAllButtons = []; 
for (let i=0; i < all_buttons.length; i++) {
    copyAllButtons.push(all_buttons[i]);
}
console.log(copyAllButtons); 

function buttonColorChange(buttonThis) {
    if(buttonThis.value == 'red') {
        buttonsRed(); 
    }
    else if (buttonThis.value == 'green') {
        buttonsGreen(); 
    }
    else if (buttonThis.value == 'reset') {
        buttonColorReset(); 
    }
    else if (buttonThis.value == 'random') {
        randomColors();
    }
}

function buttonsRed() {
    for(let i=0; i < all_buttons.length; i++) {
        //loop per ciascun buttone e rimuove la seconda classe ovvero quella che 
        //indica il colore 'btn-primary, danger, success'
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        
        //per ciascun botton aggiungo la classe 'btn-danger' che lo rende rosso
        all_buttons[i].classList.add('btn-danger'); 
    }
}

function buttonsGreen() {
    for(let i=0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success'); 
    }
}

function buttonColorReset() {
    for(let i=0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]); 
    }
}

function randomColors() {
    let choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning'];
    for(let i=0; i < all_buttons.length; i++) {
        let randomNumber = Math.floor(Math.random()*4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randomNumber]); 
    }
}

/********* CHALLANGE 5: BLACKJACK **********/

/*al click del bottone blackjack-hit-button, l'eventListener ascolta l'evento di click
al seguito del quale chiama la funzione blackjackhit*/

/*Usare la querySelector mi permette di evitare di usare metodi come onchange, onclick ecc.*/

/*window.onload aspetta che si carichi completamente la pagina prima di estrarre i dati*/

let blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A'],
    'cardsMap': {'2':2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9, '10':10, 'K':10, 'J':10, 'Q':2, 'A':[1,10]},
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false, 
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('static/sound/deal-card.wav');
const winSound = new Audio('static/sound/winning.wav'); 
const lossSound = new Audio('static/sound/game-over.wav'); 

let winner; //1 = win, 0 = lost;

window.onload=function(){
    var hitButton = document.querySelector('#blackjack-hit-button');
    hitButton.addEventListener('click', blackjackHit);

    var dealButton = document.querySelector('#blackjack-deal-button');
    dealButton.addEventListener('click', blackjackDeal);

    var dealButton = document.querySelector('#blackjack-stand-button');
    dealButton.addEventListener('click', dealerLogic);
}

function blackjackHit() {
    if(blackjackGame['isStand']===false) {
        let card = randomCard();
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
    }
}

function blackjackDeal() {
    if(blackjackGame['turnsOver'] === true) {

        blackjackDeal['isStand'] = false; 
        //THIS PIECE OF CODE IS NOT WORKING
        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        console.log("la tua immagine e': " + yourImages);
        for(let i=0; i<yourImages; i++) {
            yourImages[i].remove(); 
        }

        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
        console.log("la tua immagine e': " + yourImages);
        for(let i=0; i<dealerImages; i++) {
            dealerImages[i].remove(); 
        }

        YOU['score'] = 0; 
        DEALER['score'] = 0;

        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').textContent = 0;

        document.querySelector('#your-blackjack-result').style.color = '#ffffff';
        document.querySelector('#dealer-blackjack-result').style.color = '#ffffff';

        document.querySelector('#blackjack-result').textContent = "Let's play";
        document.querySelector('#blackjack-result').style.color = "black";

        blackjackGame['turnsOver'] = true; 
    }
    
}

function showCard(card, activePlayer) {
    if(activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = `static/images/blackjack/${card}.png`; 
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
    
}

function randomCard() {
    let randomIndex = Math.floor(Math.random()*13);
    return blackjackGame['cards'][randomIndex];
}

function updateScore(card, activePlayer) {
    //se la carta è un Asso (può avere valore 1 o 11)
    if(card === 'A'){
        //se aggiungere 11 mantiene il valore sotto 21 allora aggiungi 11 altrimenti aggiungi 1
        if(activePlayer['score'] + blackjackGame['cardsMap'][card][1]<=21){
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        } else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    } else {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

function showScore(activePlayer) {
    if(activePlayer['score'] > 21){
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }
    else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

//dichiaro la funzione sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//la funzione asincrona permette di al codice di non venire eseguito in modo lineare. 
//l'intero browser freezerebbe per ogni secondo se la funzione non fosse asincrona.
//dunque in quel lasso di tempo l'utente non potrebbe scrollare la pagina o provare a cliccare altri tasti
//con la funzione asincrona invece tutto ciò è fattibile. 
async function dealerLogic() {
    //stand mode has been activated
    blackjackGame['isStand'] = true;

    while(DEALER['score'] < 16 && blackjackGame['isStand']===true) {
        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        //richiamo la funzione sleep sopra dichiarata
        await sleep(1000);
    }
    
    blackjackGame['turnsOver'] = true;
    let winner = computeWinner();
    showResult(winner); 
}


//compute the winner and return who just won
//update the wins, draws, losses 
function computeWinner() {

    if(YOU['score'] <= 21) {
        if(YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)) {
            winner = 1;
            blackjackGame['wins']++; 
            console.log("you won"); 
        }
        else if (YOU['score'] < DEALER['score']){
            winner = 0;
            blackjackGame['losses']++; 
            console.log("you lost");
        }
        else if (YOU['score'] == DEALER['score']) {
            console.log("you drew");
            blackjackGame['draws']++; 
        }
    }

    //condition when user busts but dealer doesn't
    else if(YOU['score'] > 21 && DEALER['score'] <= 21) {
        winner = 0; 
        blackjackGame['losses']++; 
        console.log("you lost");
    }
    else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        console.log("you drew")
        blackjackGame['draws']++; 
    }

    return winner; 
}

function showResult(Winner) {
    let message, messageColor;

    if(blackjackGame['turnsOver'] === true) {
        if(winner === 1) {
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'YOU WON!';
            messageColor = 'green'; 
            winSound.play(); 
        }
        else if(winner === 0) {
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = 'YOU LOST!'; 
            messageColor = 'red';
            lossSound.play(); 
        }
        else {
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = 'YOU DREW!';
            messageColor = 'black';
            lossSound.play(); 
        }
    
        //THIS PIECE OF CODE IS NOT WORKING
        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }
}