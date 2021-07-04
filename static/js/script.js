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
