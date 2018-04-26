let level = new Level();
let state = new State(level);
let states = new States(state);
let display = new Display(document.querySelector('#display'), state);

// gui
let backButton = document.querySelector('#back');
let forwardButton = document.querySelector('#forward');
let autoButton = document.querySelector('#auto');
let stopButton = document.querySelector('#stop');
let output = document.querySelector('#output');
output.textContent = '0-й шаг';
let random = document.querySelector('#random');

let rangeX = document.querySelector('#x');
let rangeY = document.querySelector('#y');

rangeX.value = WIDTH;
rangeY.value = HEIGHT;

changeText('По горизонтали: ', rangeX);
changeText('По вертикали: ', rangeY);

function changeText(text, range) {
    let parent = range.parentNode;
    parent.textContent = text + range.value;
    parent.appendChild(range);
}

backButton.addEventListener('click', function (e) {
    if (!states.isAtStart()) {
        states.currentIncrement(-1);
        display.update(states.getCurrentState());
    }
});

forwardButton.addEventListener('click', function (e) {
    if (states.isAtEnd()) { // if we at last element => create new state
        let newState = states.getCurrentState().update();
        states.states.push(newState);
    }
    states.currentIncrement(1);
    display.update(states.getCurrentState());
});

let timeout;
autoButton.addEventListener('click', function (e) {
    timeout = setInterval(function () {
        forwardButton.click();
    }, 50);
    autoButton.disabled = true;
});

stopButton.addEventListener('click', function (e) {
    if (timeout) {
        clearInterval(timeout);
        autoButton.disabled = false;
    }
});

rangeX.addEventListener('change', function (e) {
    changeText('По горизонтали: ', rangeX)
});

rangeY.addEventListener('change', function (e) {
    changeText('По вертикали: ', rangeY)
});

random.addEventListener('click', function (e) {
    level = new Level(null, rangeX.value, rangeY.value);
    state = new State(level);
    states = new States(state);
    display.update(states.getCurrentState());
    output.textContent = '0-й шаг';
});