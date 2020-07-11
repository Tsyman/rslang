import './sprint.scss';

import UserService from '../../../services/UserService';
import WordService from '../../../services/WordService';
import AggregatedWordsFilter from '../../../services/AggregatedWordsFilter';
import Utils from '../../../services/Utils';
import Game from './Game';
import Player from './Player';
import Sound from './Sound';

class Sprint {
  view = `
  <section class="sprint__container container">
    <div class="sprint__welcome">
      <h2>СПРИНТ</h2>
      <button type="button" class="sprint__button sprint-welcome__start">Начать игру</button>
    </div>
    <div class="sprint__game">
      <div class="sprint-game__score">0</div>
      <div class="sprint-game__content">
        <div class="sprint-game__progress">
          <div class="sprint-game-progress__stars"></div>
          <div class="sprint-game-progress__reward">+ <span>10</span> очков</div> 
        </div>
        <div class="sprint-game__words">
          <div class="sprint-game-word__english"></div>
          <div class="sprint-game-word__russian"></div>
        </div>
        <div class="sprint-game__buttons">
          <button type="button" class="sprint__button sprint-game-button__false">Не верно</button>
          <button type="button" class="sprint__button sprint-game-button__true">Верно</button>
        </div>
      </div>
      <div class="sprint-game__timer">60</div>
    </div>
    <audio class="sprint__audio"></audio>
  </section>`;

  game = null;

  player = null;

  currentWord;

  score = 0;

  reward = 10;

  stars = 0;

  time = 60;

  async render() {
    return this.view;
  }

  async afterRender() {
    this.elScore = document.querySelector('.sprint-game__score');

    this.elProgressStars = document.querySelector('.sprint-game-progress__stars');
    this.elProgressReward = document.querySelector('.sprint-game-progress__reward').querySelector('span');

    this.elWordEnglish = document.querySelector('.sprint-game-word__english');
    this.elWordRussian = document.querySelector('.sprint-game-word__russian');

    this.elTimer = document.querySelector('.sprint-game__timer');

    document.querySelector('.sprint-welcome__start').addEventListener('click', () => {
      this.startGame();
    });

    document.querySelector('.sprint-game-button__false').addEventListener('click', () => {
      this.guess(false);
    });

    document.querySelector('.sprint-game-button__true').addEventListener('click', () => {
      this.guess(true);
    });
  }

  async startGame() {
    let response = await UserService.getAggregatedWords(
      localStorage.getItem('userId'),
      { filter: AggregatedWordsFilter.USER_WORD_NOT_NULL },
    );

    let words;
    if (response[0].totalCount.count >= 120) {
      words = response[0].paginatedResults;
    } else {
      response = await WordService.getChunk(
        {
          group: Utils.random(0, 6),
          page: Utils.random(0, 5),
          wordsPerExampleSentenceLTE: 100,
          wordsPerPage: 120,
        },
      );

      words = response;
    }

    this.game = new Game(words);

    this.player = new Player(document.querySelector('.sprint__audio'));

    this.nextWord();

    document.querySelector('.sprint__welcome').remove();
    document.querySelector('.sprint__game').style.display = 'block';

    this.startTimer();
  }

  stopGame() {
    let currentRecord = localStorage.getItem('sprint.record');
    if (!currentRecord || currentRecord < this.score) {
      localStorage.setItem('sprint.record', this.score);
      currentRecord = this.score;
    }

    document.querySelector('.sprint__game').innerHTML = `<div class="sprint-game__statistics">
      <h2>Результат тренировки</h2>
      <div class="sprint-game-statistics__score">${this.score}</div>
      <div class="sprint-game-statistics__record">Ваш рекорд: <b>${currentRecord}</b> очков</div>
      <button class="sprint__button sprint-game-statistics__new-game">Потренироваться еще</button>
    </div>`;

    document.querySelector('.sprint-game-statistics__new-game').addEventListener('click', () => {
      window.location.reload(true);
    });

    this.player.play(Sound.success);
  }

  nextWord() {
    this.currentWord = this.game.getWord();

    if (this.currentWord) {
      this.elWordEnglish.innerHTML = this.currentWord.word;
      this.elWordRussian.innerHTML = this.currentWord.wordTranslate;
    } else {
      this.stopGame();
    }
  }

  guess(correct) {
    if (this.currentWord.correct === correct) {
      this.player.play(Sound.correct);

      if (this.reward < 80) {
        this.stars += 1;

        if (this.stars === 4) {
          this.reward *= 2;
          this.stars = 0;
        }

        if (this.reward === 80) {
          this.stars = 1;
        }
      }

      this.score += this.reward;
    } else {
      this.player.play(Sound.error);

      this.reward = 10;
      this.stars = 0;
    }

    this.elScore.innerHTML = this.score;

    this.elProgressStars.innerHTML = '&starf;'.repeat(this.stars);
    this.elProgressReward.innerHTML = this.reward;

    this.nextWord();
  }

  startTimer() {
    const interval = window.setInterval(() => {
      this.time -= 1;
      this.elTimer.innerHTML = this.time;

      if (this.time === 0) {
        window.clearInterval(interval);
        this.stopGame();
      }
    }, 1000);
  }
}

export default new Sprint();
