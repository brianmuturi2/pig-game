/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlay, previousRoll;

init();

function init() {
    gamePlay = true;
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    previousRoll = 0;

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.add('active');

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';


}

document.querySelector('.btn-roll').addEventListener('click', function () {

    if (gamePlay) {
        var dice, diceDom, previousRoll;
        diceDom = document.querySelector('.dice');


        // 1. random no.
        dice = Math.floor(Math.random() * 6) + 1;
        console.log(dice);

        // 2. display result
        diceDom.style.display = 'block';
        diceDom.src = 'dice-' + dice + '.png';

        // 3. update round score if the number isnt 1

        if (dice === 6 && previousRoll === 6) {
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = '0';

            togglePlayer();
        } else if (dice !== 1) {
            // 1. add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            togglePlayer();
        }

        previousRoll = dice;
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {

    if (gamePlay) {
        // 1. add current score to player total score
        scores[activePlayer] += roundScore;

        // 2. update ui
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        // 3. check if game is won
        if (scores[activePlayer] >= 20) {

            gamePlay = false;

            document.getElementById('name-' + activePlayer).textContent = 'Winner!'
            document.querySelector('.dice').style.display = 'none';

            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

        } else {
            togglePlayer();
        }
    }

});

function togglePlayer() {
    roundScore = 0;
    document.getElementById('current-' + activePlayer).textContent = roundScore;

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

// var x = document.querySelector('#score-0').textContent;
// console.log(x);


















