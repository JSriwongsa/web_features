const images = [
    {
        name:'crab',
        img: 'images/animals/crab.png'
    },
    {
        name:'frog',
        img: 'images/animals/frog.png'
    },
    {
        name:'jellyfish',
        img: 'images/animals/jellyfish.png'
    },
    {
        name:'snail',
        img: 'images/animals/snail.png'
    },
    {
        name:'turtle',
        img: 'images/animals/turtle.png'
    },
    {
        name:'cat',
        img: 'images/animals/cat.png'
    },
    {
        name:'dog',
        img: 'images/animals/dog.png'
    },
    {
        name:'fox',
        img: 'images/animals/fox.png'
    },
    {
        name:'koala',
        img: 'images/animals/koala.png'
    },
    {
        name:'whale',
        img: 'images/animals/whale.png'
    },
    {
        name:'cow',
        img: 'images/animals/cow.png'
    },
    {
        name:'owl',
        img: 'images/animals/owl.png'
    }
];

const toMove = document.getElementById('moving');
const timer = document.getElementById('time');
const pauseBtn = document.getElementById('pause');
const startBtn = document.getElementById('start');
const seeResult = document.getElementById('result');
const playContainer = document.querySelector('.play-container');
const run = document.querySelector('.run-container');

let allCard;
let interval;
let firstCard = false;
let nextCard = false;
let seconds = 0, minutes = 0;
let moves_ = 0, win_ = 0;

const startTime =() => {
    seconds += 1;
    if(seconds >= 60){
        minutes += 1;
        seconds = 0;
    }
    let secondVal = seconds < 10 ? `0${seconds}` : seconds;
    let minuteVal = minutes < 10 ? `0${minutes}` : minutes;

    timer.innerHTML = `<span>Time: </span>${minuteVal}:${secondVal}`;
};

const count_ = () => {
    moves_ += 1;
    toMove.innerHTML = `<span>Your moves: </span>${moves_}`;
};

const random_ = (size = 4) => {
    let imgPick = [...images];
    let cardVal = [];

    size = (size * size) / 2;

    for(let x = 0; x < size; x++) {
        const randomIndex = Math.floor(Math.random() * imgPick.length);
        cardVal.push(imgPick[randomIndex]);
        imgPick.splice(randomIndex, 1);
    }
    return cardVal;
};

const matrices = (cardVal, size = 4) => {
    playContainer.innerHTML = '';
    cardVal = [...cardVal, ...cardVal];

    cardVal.sort(() => Math.random() - 0.5);
    for(let x = 0; x < size*size; x++){

        playContainer.innerHTML += `
        <div class='card-container' data-card-value = "${cardVal[x].name}"> 
        <div class='card-before'>?</div> 
        <div class='card-after'>
        <img src ='${cardVal [x].img}' classs = 'image'/></div> 
        </div>`;
    }
    playContainer.style.gridTemplateColumns = `repeat(${size},auto)`;

    allCard = document.querySelectorAll('.card-container');
    allCard.forEach((card) => {
        card.addEventListener('click', () => {
            if(!card.classList.contains('matched')){
                card.classList.add('flipped');
                if(!firstCard){
                    firstCard = card;
                    firstCardVal = card.getAttribute('data-card-value');
                }
                else{
                    count_();
                    nextCard = card;
                    let nextCardVal = card.getAttribute('data-card-value');
                    if(firstCardVal == nextCardVal){
                        firstCard.classList.add('matched');
                        nextCard.classList.add('matched');
                        firstCard = false;
                        win_ +=1;
    
                        if(win_ == Math.floor(cardVal.length / 2)){
                            seeResult.innerHTML = `<h2>YOU WON!</h2>`;
                            pauseGame();
                        }
                    }
                        else{
                            let[tempFirst, tempNext] = [firstCard, nextCard];
                            firstCard =false;
                            nextCard = false;
                            let delay = setTimeout(()=>{
                                tempFirst.classList.remove('flipped');
                                tempNext.classList.remove('flipped');
                            }, 500);
                        }
                }  
            }
            
        });
    });
};

startBtn.addEventListener('click', () => {
    moves_ = 0;
    seconds = 0;
    minutes =0;

    run.classList.add('hide');
    pauseBtn.classList.remove('hide');
    startBtn.classList.add('hide');

    interval = setInterval(startTime, 1000);

    toMove.innerHTML = `<span>You moves: </span> ${moves_}`;
    initial_();
});

pauseBtn.addEventListener('click',(pauseGame = () =>{
    run.classList.remove('hide');
    pauseBtn.classList.add('hide');
    startBtn.classList.remove('hide');
    clearInterval(interval);
}));

const initial_ = () => {
    seeResult.innerText = '';
    win_ = 0;

    let cardVal = random_();
    matrices(cardVal);
};



