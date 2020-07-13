const body = document.querySelector('body');
const main = document.createElement('main');
const indexContainer = document.createElement('div');
const contentContainer = document.createElement('div');
contentContainer.classList.add('Content__wrapper');

const titleText = document.createElement('p');
titleText.classList.add('Index__titleText');
titleText.innerText = 'Savanna';

const startBtn = document.createElement('button');
startBtn.classList.add('Index__startBtn');
startBtn.innerText = 'Начать игру';

startBtn.addEventListener('click', () => {
  indexContainer.classList.add('disabled');
  contentContainer.classList.add('enabled');
  setTimeout(() => {
    indexContainer.remove();
    // eslint-disable-next-line no-use-before-define
    fallingWord.classList.add('animate');
  }, 500);
});

indexContainer.append(titleText);
indexContainer.append(startBtn);
indexContainer.classList.add('Index__wrapper');

const backBtn = document.createElement('button');
backBtn.classList.add('Content__backBtn');
backBtn.innerText = '<';

contentContainer.append(backBtn);

const wordContentWrapper = document.createElement('div');
wordContentWrapper.classList.add('Content__wordContentWrapper');

const wordContent = document.createElement('div');
wordContent.classList.add('Content__wordContent');

const wordNum = document.createElement('div');
wordNum.classList.add('Content__wordNum');
wordNum.innerText = '1';

const wordParagraph = document.createElement('p');
wordParagraph.classList.add('Content__wordParagraph');
wordParagraph.innerText = 'BirdIsTheWord';

wordContent.append(wordNum);
wordContent.append(wordParagraph);

const word1 = wordContent.cloneNode(true);
const word2 = wordContent.cloneNode(true);
const word3 = wordContent.cloneNode(true);
const word4 = wordContent.cloneNode(true);

wordContentWrapper.append(word1);
wordContentWrapper.append(word2);
wordContentWrapper.append(word3);
wordContentWrapper.append(word4);

contentContainer.append(wordContentWrapper);

const lifesContainer = document.createElement('div');
lifesContainer.classList.add('Content__lifesContainer');

const lifeImg = document.createElement('p');
lifeImg.innerText = '♥';

const life1 = lifeImg.cloneNode(true);
life1.setAttribute('id', 1);
const life2 = lifeImg.cloneNode(true);
life2.setAttribute('id', 2);
const life3 = lifeImg.cloneNode(true);
life3.setAttribute('id', 3);
const life4 = lifeImg.cloneNode(true);
life4.setAttribute('id', 4);
const life5 = lifeImg.cloneNode(true);
life5.setAttribute('id', 5);

lifesContainer.append(life1);
lifesContainer.append(life2);
lifesContainer.append(life3);
lifesContainer.append(life4);
lifesContainer.append(life5);

const fallingWord = document.createElement('div');
fallingWord.classList.add('Content__fallingWord');
fallingWord.innerText = 'ENGLISHWORD';

const int = setInterval(() => {
  const coordY = fallingWord.getBoundingClientRect().y + 35;
  const wordContentY = document.querySelector('.Content__wordContent').getBoundingClientRect().y;
  console.log(coordY, wordContentY);
  if (coordY > wordContentY) {
    fallingWord.remove();
    clearInterval(int);
  }
}, 50);

contentContainer.append(lifesContainer);
contentContainer.append(fallingWord);

main.append(indexContainer);
main.append(contentContainer);
body.prepend(main);
