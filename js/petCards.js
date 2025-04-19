import { shuffle, getScreenType } from "./utils.js";

export default function createPetCards(rawPetData, screenTypeParam) {

  let screenType = getScreenType(window.innerWidth, screenTypeParam);

  // функция генерации набора данных для списка животных
  function generateSet(data) {
    let array = [];
    for (let i = 0; i < 6; i++) {
      array.push(...shuffle(data));
    }
    return array;
  }

  // генерация начального списка животных (48 штук)
  const dataSet = generateSet(rawPetData);
  let currentSet = 0;

  const petsContainer = document.querySelector('.pets__list');
  const navigtion = document.querySelector('.pets__navigation');
  const btnStart = document.querySelector('[data-type="start"]');
  const btnBack = document.querySelector('[data-type="back"]');
  const btnCurrent = document.querySelector('[data-type="current"]');
  const btnForward = document.querySelector('[data-type="forward"]');
  const btnEnd = document.querySelector('[data-type="end"]');

  // функция отрисовки карточки с животным
  function makePetCard(data) {
    const card = document.createElement('div');
    card.classList.add('pet-card');
    card.id = data['name'];

    const img = document.createElement('img');
    img.classList.add('pet-card__img');
    img.src = data['img'];
    img.alt = data['name'];
    card.append(img);

    const title = document.createElement('h4');
    title.classList.add('pet-card__name');
    title.innerText = data['name'];
    card.append(title);

    const btn = document.createElement('button');
    btn.classList.add('btn', 'pet-card__btn');
    btn.type = 'button';
    btn.innerText = 'Learn more';
    card.append(btn);

    return card;
  }

  // функция отрисовка подмножества карточек,
  // принимает список карточек и номер "страницы"
  function drawCards(data, index) {
    const arrLength = screenType.petsOnScreen;
    const arr = data.slice(index * arrLength, (index + 1) * arrLength)
    arr.forEach(el => {
      petsContainer.append(makePetCard(el))
    });
    currentSet = index;
  }

  // функция очистки карточек с экрана
  function clearList() {
    while (petsContainer.firstChild) {
      petsContainer.removeChild(petsContainer.firstChild);
    }
  }

  //функция перерисовки карточек при смене размера окна
  function redrawCards() {
    let newScreenType = getScreenType(window.innerWidth, screenTypeParam);
    if (screenType != newScreenType) {
      screenType = newScreenType;
      clearList();
      drawCards(dataSet, currentSet)
    }
  }

  // отрисовка карточек при загрузке страницы
  drawCards(dataSet, currentSet);

  // обработчик клика по кнопкам навигации
  function navigationHandler(e) {
    const target = e.target;

    //проверка кликнули ли по одной из кнопок
    if (target.attributes['data-type']) {
      if (target.classList.contains('btn--inactive')) {
        return;
      }
      const pagesCount = dataSet.length / screenType.petsOnScreen;

      // обработчики кнопок
      switch (target.attributes['data-type'].value) {
        case 'start':
          clearList();
          drawCards(dataSet, 0);
          btnStart.classList.add('btn--inactive');
          btnBack.classList.add('btn--inactive');
          btnForward.classList.remove('btn--inactive');
          btnEnd.classList.remove('btn--inactive');
          break;
        case 'back':
          clearList();
          drawCards(dataSet, currentSet - 1);
          if (currentSet === pagesCount - 2) {
            btnForward.classList.remove('btn--inactive');
            btnEnd.classList.remove('btn--inactive');
          }
          if (currentSet === 0) {
            btnStart.classList.add('btn--inactive');
            btnBack.classList.add('btn--inactive');
          }
          break;
        case 'forward':
          clearList();
          drawCards(dataSet, currentSet + 1);
          if (currentSet === 1) {
            btnStart.classList.remove('btn--inactive');
            btnBack.classList.remove('btn--inactive');
          }
          if (currentSet === pagesCount - 1) {
            btnForward.classList.add('btn--inactive');
            btnEnd.classList.add('btn--inactive');
          }
          break;
        case 'end':
          clearList();
          drawCards(dataSet, pagesCount - 1);
          btnStart.classList.remove('btn--inactive');
          btnBack.classList.remove('btn--inactive');
          btnForward.classList.add('btn--inactive');
          btnEnd.classList.add('btn--inactive');
          break;
      }
      btnCurrent.innerText = currentSet + 1;
    }
  }

  navigtion.addEventListener('click', navigationHandler)
  window.addEventListener('resize', redrawCards);
}