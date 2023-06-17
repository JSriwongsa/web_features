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

let card;
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