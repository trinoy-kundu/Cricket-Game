let scoreStr = localStorage.getItem('Score');

let score;

resetScore(scoreStr);

function resetScore(scoreStr) {

    score = scoreStr ? JSON.parse(scoreStr) : {
        win: 0,
        lost: 0,
        tie: 0
    };

    score.displayScore = function () {
        return `Score: Won: ${score.win}, Lost: ${score.lost}, Tie: ${score.tie}`;
    }
    showResult();
}

document.querySelector('.resetBtn').addEventListener('click', function() {
    localStorage.clear();
    resetScore();
});

document.querySelector('.bat').addEventListener('click', function() {
    let computerChoice = generateComputerChoice();
    let resultMsg = getResult(`bat`, computerChoice);
    showResult(`bat`, computerChoice, resultMsg);
});

document.querySelector('.ball').addEventListener('click', function() {
    let computerChoice = generateComputerChoice();
    let resultMsg = getResult(`ball`, computerChoice);
    showResult(`ball`, computerChoice, resultMsg);
});
document.querySelector('.stump').addEventListener('click', function() {
    let computerChoice = generateComputerChoice();
    let resultMsg = getResult(`stump`, computerChoice);
    showResult(`stump`, computerChoice, resultMsg);
});


function generateComputerChoice() {
    let randomNumber = Math.floor(Math.random() * 3);
    console.log(randomNumber);

    if(randomNumber >= 0 && randomNumber <= 1) {
        return 'bat';
    }
    else if(randomNumber > 1 && randomNumber <= 2) {
        return 'ball';
    }
    else {
        return 'stump';
    }
}

function getResult(userChoice, computerChoice) {
    if(userChoice === computerChoice) {
        score.tie++;
        return `It's a Tie.`;
    } else if ((userChoice === `bat` && computerChoice === `ball`) || 
        (userChoice === `ball` && computerChoice === `stump`) ||
        (userChoice === `stump` && computerChoice === `bat`)
    ) {
        score.win++;
        return `User Win.`;
    }else {
        score.lost++;
        return `Computer Win.`
    }
}

function showResult(userChoice, computerChoice, result) {

    localStorage.setItem('Score', JSON.stringify(score));

    document.querySelector('.user').innerText = 
    userChoice ? `You have chosen ${userChoice}` : ``;

    document.querySelector('.computer').innerText = 
    computerChoice ? `Computer choice is ${computerChoice}` : ``;

    document.querySelector('.result').innerText = result || ``;

    document.querySelector('.score').innerText = score.displayScore();
}

