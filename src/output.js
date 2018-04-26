let level, firstState, states, display = new Display(document.querySelector('#display'));

let output = document.querySelector('#output');
output.update = function () {
    this.textContent = output.textContent = states.current + '-й шаг';
};

// init level, firstState, states, display with new Level object
function outputInit(newLevel) {
    level = newLevel;
    firstState = new State(level);
    states = new States(firstState);
    display.update(firstState);
    output.update();
}

// initializing new random level
outputInit(new Level());

// buttons querying
let controlButtons = document.querySelector('#controlButtons');
let firstButton = document.querySelector('#first');
let backButton = document.querySelector('#back');
let forwardButton = document.querySelector('#forward');
let lastButton = document.querySelector('#last');
let autoButton = document.querySelector('#auto');
let stopButton = document.querySelector('#stop');
let random = document.querySelector('#random');


// input range section
let rangeX = document.querySelector('#x');
let rangeY = document.querySelector('#y');
rangeX.value = WIDTH;
rangeY.value = HEIGHT;
changeText('По горизонтали: ', rangeX);
changeText('По вертикали: ', rangeY);

function changeText(text, rangeElement) {
    let parent = rangeElement.parentNode;
    parent.textContent = text + rangeElement.value;
    parent.appendChild(rangeElement);
}

// form for select interesting levels
let levelSelectorForm = document.querySelector('#levelSelectorForm');
interestingLevels.forEach(function (e, counter) {
    let option = document.createElement('option');
    option.textContent = e.description;
    option.value = counter;
    levelSelectorForm.select.appendChild(option);
});


// listeners section //

// starting interesting interestingLevels
levelSelectorForm.addEventListener('submit', function (e) {
    e.preventDefault();
    outputInit(new Level(interestingLevels[this.select.value].level));
});

// changing output text every time we are clicking any button in controlButton section
controlButtons.addEventListener('click', function (e) {
    output.update();
});

// back one step
backButton.addEventListener('click', function (e) {
    if (!states.isAtStart()) {
        states.currentIncrement(-1);
        display.update(states.getCurrentState());
    }
});

// forward one step
forwardButton.addEventListener('click', function (e) {
    if (states.isAtEnd()) { // if we at last element => create new firstState
        let newState = states.getCurrentState().update();
        states.states.push(newState);
    }
    states.currentIncrement(1);
    display.update(states.getCurrentState());
});

// first state
firstButton.addEventListener('click', function (e) {
    states.setAtFirst();
    display.update(states.getCurrentState());
});

// last state
lastButton.addEventListener('click', function (e) {
    states.setAtLast();
    display.update(states.getCurrentState());
});

// start auto
let timeout;
autoButton.addEventListener('click', function (e) {
    timeout = setInterval(function () {
        forwardButton.click();
    }, 50);
    autoButton.disabled = true;
});

// stop auto
stopButton.addEventListener('click', function (e) {
    if (timeout) {
        clearInterval(timeout);
        autoButton.disabled = false;
    }
});

// changing text on ranges change
rangeX.addEventListener('change', function (e) {
    changeText('По горизонтали: ', rangeX)
});

rangeY.addEventListener('change', function (e) {
    changeText('По вертикали: ', rangeY)
});

// creating random level, states and updating display
random.addEventListener('click', function (e) {
    outputInit(new Level(null, rangeX.value, rangeY.value));
});