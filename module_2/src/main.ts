import {startGame} from './game.ts';
import './style.css';
import './reset.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="table-data">
    <div class="table-data__img">
    <div class="table-data__record-list">
        <h3 class="table-data__title">Record list</h3>
        <ol class="table-data__record-item"></ol>
    </div>
</div>
<div>
    <div class="result">
        <div class="result__score">
            <div class="result__data shadow">
                <span class="result__title">score</span>
                <p class="result__value"></p>
            </div>
        </div>
        <div>
            <button class="reset-game-btn shadow">New Game</button>
            <h3 class="result__timer">00:00:00</h3>
        </div>
        <div>
            <div class="result__best-value shadow">
                <span class="result__title">best</span>
                <p class="result__value"></p>
            </div>
        </div>
    </div>
    <div class="game-field shadow">
        <div class="game-field__cell"></div>
        <div class="game-field__cell"></div>
        <div class="game-field__cell"></div>
        <div class="game-field__cell"></div>
        <div class="game-field__cell"></div>

        <div class="game-field__cell"></div>
        <div class="game-field__cell"></div>
        <div class="game-field__cell"></div>
        <div class="game-field__cell"></div>
        <div class="game-field__cell"></div>

        <div class="game-field__cell"></div>
        <div class="game-field__cell"></div>
        <div class="game-field__cell"></div>
        <div class="game-field__cell"></div>
        <div class="game-field__cell"></div>

        <div class="game-field__cell"></div>
        <div class="game-field__cell"></div>
        <div class="game-field__cell"></div>
        <div class="game-field__cell"></div>
        <div class="game-field__cell"></div>

        <div class="game-field__cell"></div>
        <div class="game-field__cell"></div>
        <div class="game-field__cell"></div>
        <div class="game-field__cell"></div>
        <div class="game-field__cell"></div>

        <div class="name-modal">
            <form class="name-modal__form" method="dialog">
                <label class="name-modal__title" for="myField">Your name:</label>
                <input type="text" class="name-modal__input" name="myField">
                <input type="submit" class="name-modal__submit" value="Start game">
            </form>
        </div>

        <div class="game-over-nodal">
                <h2 class="game-over-nodal__title">GAME OVER</h2>
                <h3 class="game-over-nodal__score">YOUR SCORE: <span class="game-over-nodal__result"></span></h3>
                <button class="reset-game-btn shadow"">Try again</button>
        </div>

        <div class="win-modal">
                <h2 class="win-modal__title">YOU WIN</h2>
                <h3 class="win-modal__time">YOUR TIME: <span class="win-modal__time-result"></span></h3>
                <button class="reset-game-btn shadow"">Try again</button>
        </div>
    </div>
</div>
`;

startGame();




