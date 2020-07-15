import './styles.scss';

class SpeakIt {
  constructor() {
    this.mistakesArr = [];
    this.knowArr = [];
    this.dataCopy = [];
    this.mistakes = 10;
    this.know = 0;
    this.page = 0;
    this.group = 0;

    this.restartGame = this.restartGame.bind(this);
    this.removeRightCards = this.removeRightCards.bind(this);
    this.getData = this.getData.bind(this);
    this.getTranslation = this.getTranslation.bind(this);
    this.createCardPage = this.createCardPage.bind(this);
  }

  restartGame() {
    this.removeRightCards();
    this.mistakes = 10;
    this.know = 0;
    this.mistakesArr = [];
    this.knowArr = [];

    const CARDS = document.querySelectorAll('.words .word-card');
    CARDS.forEach((card) => {
      const cln = card.cloneNode(true);
      this.mistakesArr.push(cln);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  removeRightCards() {
    const CARDS = document.querySelectorAll('.word-card');
    CARDS.forEach((card) => card.classList.remove('done'));
  }

  // eslint-disable-next-line class-methods-use-this
  preventCardClick() {
    const CARDS = document.querySelectorAll('.word-card');
    if (JSON.parse(localStorage.isStart) === true) {
      CARDS.forEach((card) => {
        // eslint-disable-next-line no-param-reassign
        card.style.pointerEvents = 'none';
        card.classList.remove('inactive');
      });
    } else {
    // eslint-disable-next-line no-param-reassign,no-return-assign
      CARDS.forEach((card) => card.style.pointerEvents = 'auto');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  createTotalScore(mistakes, know, level) {
    const arr = JSON.parse(localStorage.statistics);
    if (arr.length > 9) arr.length = 9;

    const d = new Date();
    const currDate = `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}, ${d.getHours()}:${d.getMinutes()}`;

    const game = {
      date: currDate,
      level: +level + 1,
      wrong: mistakes,
      right: know,
    };
    arr.unshift(game);
    localStorage.statistics = JSON.stringify(arr);
  }

  async getData(group, page) {
    this.dataCopy = [];
    const DATA = [];
    const url = `https://afternoon-falls-25894.herokuapp.com/words?group=${group}&page=${page}`;
    const response = await fetch(url);
    await response.text().then((text) => {
      DATA.push(...JSON.parse(text));
    });
    this.dataCopy = this.dataCopy.concat(DATA);
    this.dataCopy.length = 10;
    return DATA;
  }

  // eslint-disable-next-line class-methods-use-this
  async getTranslation(word) {
    const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200322T155651Z.de98a60e6a99185e.089aea4237b51c6db082c966f27a7895cd1e8b44&text=${word}&lang=en-ru`;
    const res = await fetch(url);
    const data = await res.json();
    return data.text;
  }

  async createCardPage(group, page) {
    this.mistakesArr = [];
    await this.getData(group, page);
    await this.dataCopy.forEach((item, i) => { this.createCard(item, i); });
    await this.preventCardClick();
  }

  // eslint-disable-next-line class-methods-use-this
  clickedCard(card) {
    const CARDS = document.querySelectorAll('.word-card');
    // eslint-disable-next-line no-shadow
    CARDS.forEach((card) => card.classList.remove('inactive'));
    card.classList.add('inactive');
  }

  createCard(data, index) {
    const CARD = document.createElement('div');
    CARD.classList.add('word-card');
    CARD.setAttribute('data-img', `https://raw.githubusercontent.com/annaStoma/rslang-data/master/data${data.image.replace(/files/g, '')}`);
    CARD.setAttribute('data-aud', `https://raw.githubusercontent.com/annaStoma/rslang-data/master/data${data.audio.replace(/files/g, '')}`);
    CARD.setAttribute('data-word', `${data.word.toLowerCase()}`);
    CARD.setAttribute('index', `${index}`);
    CARD.innerHTML = `<img src="../../../../src/assets/images/minigames/speakit/speaker.png" class="sound-icon"  alt="img"/><div class="word">${data.word}</div> <div class="transcription">${data.transcription}</div>`;
    CARD.onclick = () => {
      this.clickedCard(CARD);
      new Audio(CARD.getAttribute('data-aud')).play();
      document.querySelector('.word-img').src = `https://raw.githubusercontent.com/annaStoma/rslang-data/master/data${data.image.replace(/files/g, '')}`;
      // eslint-disable-next-line no-shadow,no-return-assign
      this.getTranslation(data.word).then((data) => document.querySelector('.word-translation-input').value = data);
    };
    const cln = CARD.cloneNode(true);
    this.mistakesArr.push(cln);
    document.getElementById('words-wrapper').appendChild(CARD);
  }

  view = `
  <main>
<section class="start-page">
    <div class="start-page-data">
        <div class="title">
            SPEAKIT
        </div>
        <div class="about-app">Please click on the words to hear them sound. Then click on the button and speak the words into the microphone.</div>
        <div class="app-start"> <button>Start</button></div>
    </div>
</section>
<section class="modal-window display-none" id="modal-window">
    <div class="modal-data" id="modal-data">
        <div class="mistakes-wrapper">
            <p>Mistakes: <span class="mistakes">0</span> </p>
            <div class="mistakes-items"></div>
        </div>
        <div class="know-wrapper">
            <p>I know: <span class="know">0</span></p>
            <div class="know-items"></div>
        </div>
        <div class="modal-btns">
            <button class="play-button return">return</button> <button class="play-button new-game">new game</button>
        </div>
    </div>
</section>
<section class="categories">
    <button class="category inactive" id="0"> 1 </button>
    <button class="category" id="1"> 2 </button>
    <button class="category" id="2"> 3 </button>
    <button class="category" id="3"> 4 </button>
    <button class="category" id="4"> 5 </button>
    <button class="category" id="5"> 6 </button>
</section>
<section class="word-img-wrapper">
    <img class="word-img" src="https://www.trinityuk.co.uk/wp-content/uploads/2019/10/BLOG-LEARN-ENGLISH.jpg" alt="img">
</section>
<section class="word-recognition">
    <input type="text" class="word-translation-input">
</section>
<section class="words" id='words-wrapper'>
</section>
<section class="play-buttons">
    <button class="play-button restart"> restart </button>
    <button class="play-button speak"> speak please </button>
    <button class="play-button results">current results </button>
</section>
<section class="total-score modal-window display-none">
</section>
<section class="win-wrapper modal-window display-none">
    <div class="modal-data win-data">
        &#129321; All right! Good job!  &#129321; <br>
        ⚠️ Do not forget to save the result! ⚠️
    </div>

</section>
<script src="script.js"></script>
</main>`

  async render() {
    return this.view;
  }

  // eslint-disable-next-line class-methods-use-this
  afterRender() {
    localStorage.isStart = false;

    document.getElementById('header_container').style.display = 'none';
    document.getElementById('footer_container').style.display = 'none';

    document.querySelector('.app-start button').onclick = () => {
      document.querySelector('.start-page').classList.add('display-none');
      this.createCardPage(this.group, this.page).then();
    };

    document.querySelector('.restart').onclick = () => {
      this.restartGame();
    };

    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    // eslint-disable-next-line no-undef
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognition.addEventListener('result', (e) => {
      const transcript = Array.from(e.results).map((res) => res[0]).map((res) => res.transcript);
      document.querySelector('.word-translation-input').value = String(transcript).toLowerCase();
      const CARDS = document.querySelectorAll('.word-card');
      CARDS.forEach((card) => {
        if (card.getAttribute('data-word') === document.querySelector('.word-translation-input').value) {
          card.setAttribute('data-word', '0');
          this.knowArr.push(this.mistakesArr[card.getAttribute('index')]);
          this.know += 1;
          this.mistakes -= 1;
          card.classList.add('done');
          document.querySelector('.word-img').src = `${card.getAttribute('data-img')}`;
          if (this.knowArr.length === 10) {
            document.querySelector('.win-wrapper').classList.remove('display-none');
            setTimeout(() => { document.querySelector('.win-wrapper').classList.add('display-none'); }, 6000);
          }
        }
      });
    });

    const listener = () => {
      recognition.start();
    };

    document.querySelector('.speak').onclick = () => {
      localStorage.isStart = !JSON.parse(localStorage.isStart);
      if (JSON.parse(localStorage.isStart)) {
        recognition.start();
        recognition.addEventListener('end', listener, false);
        document.querySelector('.speak').classList.add('inactive');
        document.querySelector('.speak').innerText = 'end and save';
        this.preventCardClick();
      } else if (!JSON.parse(localStorage.isStart)) {
        recognition.stop();
        recognition.removeEventListener('end', listener, false);
        document.querySelector('.speak').classList.remove('inactive');
        document.querySelector('.speak').innerText = 'speak please';
        // eslint-disable-next-line no-use-before-define
        this.createTotalScore(this.mistakes, this.know, this.group);
        this.preventCardClick();
        this.removeRightCards();
      }
    };

    document.querySelectorAll('.category').forEach((btn) => {
      // eslint-disable-next-line no-param-reassign
      btn.onclick = () => {
        this.mistakesArr = [];
        this.dataCopy = [];
        this.knowArr = [];
        // eslint-disable-next-line no-use-before-define
        this.restartGame();
        document.querySelectorAll('.category').forEach((item) => item.classList.remove('inactive'));
        btn.classList.add('inactive');
        document.getElementById('words-wrapper').innerHTML = '';
        this.group = btn.id;
        this.page = Math.round(0 - 0.5 + Math.random() * (29 + 1));
        this.createCardPage(this.group, this.page).then();
      };
    });

    document.querySelector('.results').onclick = () => {
      document.getElementById('modal-window').classList.remove('display-none');
      const MISTAKES = document.querySelector('.mistakes');
      MISTAKES.innerText = this.mistakes;
      const KNOW = document.querySelector('.know');
      KNOW.innerText = this.know;
      document.querySelector('.mistakes-items').innerHTML = '';
      document.querySelector('.know-items').innerHTML = '';
      this.mistakesArr.forEach((item) => {
        item.classList.add('list-item');
        item.addEventListener('click', () => { new Audio(item.getAttribute('data-aud')).play(); });
        document.querySelector('.mistakes-items').appendChild(item);
      });
      this.knowArr.forEach((item) => {
        item.classList.add('list-item');
        item.addEventListener('click', () => { new Audio(item.getAttribute('data-aud')).play(); });
        document.querySelector('.know-items').appendChild(item);
      });
    };

    document.getElementById('modal-window').onclick = (event) => {
      if (event.target.tagName === 'SECTION') document.getElementById('modal-window').classList.add('display-none');
    };

    document.querySelector('.total-score').onclick = (event) => {
      if (event.target.tagName === 'SECTION') document.querySelector('.total-score').classList.add('display-none');
    };

    window.onload = () => {
      if (typeof localStorage.getItem('statistics') === 'undefined'
        || localStorage.getItem('statistics') == null) localStorage.setItem('statistics', JSON.stringify([]));
    };

    document.querySelector('.return').onclick = () => {
      document.getElementById('modal-window').classList.add('display-none');
    };

    document.querySelector('.new-game').onclick = () => {
      this.restartGame();
      document.getElementById('modal-window').classList.add('display-none');
    };
  }
}

export default new SpeakIt();
