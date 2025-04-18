// данные о животных
const jsonData = [
  {
    "name": "Jennifer",
    "img": "./img/pets-jennifer.png",
    "type": "Dog",
    "breed": "Labrador",
    "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
    "age": "2 months",
    "inoculations": ["none"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    "name": "Sophia",
    "img": "./img/pets-sophia.png",
    "type": "Dog",
    "breed": "Shih tzu",
    "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
    "age": "1 month",
    "inoculations": ["parvovirus"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    "name": "Woody",
    "img": "./img/pets-woody.png",
    "type": "Dog",
    "breed": "Golden Retriever",
    "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
    "age": "3 years 6 months",
    "inoculations": ["adenovirus", "distemper"],
    "diseases": ["right back leg mobility reduced"],
    "parasites": ["none"]
  },
  {
    "name": "Scarlett",
    "img": "./img/pets-scarlett.png",
    "type": "Dog",
    "breed": "Jack Russell Terrier",
    "description": "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
    "age": "3 months",
    "inoculations": ["parainfluenza"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    "name": "Katrine",
    "img": "./img/pets-katrine.png",
    "type": "Cat",
    "breed": "British Shorthair",
    "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
    "age": "6 months",
    "inoculations": ["panleukopenia"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    "name": "Timmy",
    "img": "./img/pets-timmy.png",
    "type": "Cat",
    "breed": "British Shorthair",
    "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
    "age": "2 years 3 months",
    "inoculations": ["calicivirus", "viral rhinotracheitis"],
    "diseases": ["kidney stones"],
    "parasites": ["none"]
  },
  {
    "name": "Freddie",
    "img": "./img/pets-freddie.png",
    "type": "Cat",
    "breed": "British Shorthair",
    "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
    "age": "2 months",
    "inoculations": ["rabies"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    "name": "Charly",
    "img": "./img/pets-charly.png",
    "type": "Dog",
    "breed": "Jack Russell Terrier",
    "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
    "age": "8 years",
    "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
    "diseases": ["deafness", "blindness"],
    "parasites": ["lice", "fleas"]
  }
];

// параметры в соответствии с размером окна
const screenTypeParam = {
  desc: {
    slidesCount: 3,
    paddings: 210,
    petsOnScreen: 8,
    slideSize: 360
  },
  tablet: {
    slidesCount: 2,
    paddings: 128,
    petsOnScreen: 6,
    slideSize: 310
  },
  mobile: {
    slidesCount: 1,
    paddings: 20,
    petsOnScreen: 3,
    slideSize: 310
  }
};

// элемент затемненного фона под модальное окно и бургер
const blackout = document.querySelector('.blackout');

// бургер меню
if (window.innerWidth < 768) {
  const burger = document.querySelector('#burger-checkbox');

  // триггер закрытия бургера, если кликнули по ссылке или фону
  function closeNavigation(e) {
    if (e.target.tagName === 'A' || e.target === blackout) {
      burger.click()
    }
  }

  // затемнение фона если открыли бургер, затемнение, если закрыли
  burger.addEventListener('change', () => {
    if (burger.checked) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('click', closeNavigation)
    } else {
      document.body.style.overflow = '';
      document.removeEventListener('click', closeNavigation)
    }

    blackout.classList.toggle('blackout--visible');
  });
}

// функция определения настроек для окна, в соответствии с размером
function getScreenType(windowWidth) {
  return windowWidth >= 1280 ? screenTypeParam.desc : windowWidth < 768 ? screenTypeParam.mobile : screenTypeParam.tablet;
}

// функция перемешки массива
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// функция генерации набора данных для списка животных
function generateSet(data) {
  let array = [];
  const shuffledArr = shuffle(data);
  for (let i = 0; i < 6; i++) {
    array.push(...shuffledArr);
  }
  return array;
}

let screenType = getScreenType(window.innerWidth);

// слайдер
if (window.location.pathname.includes('/index')) {
  // функция отрисовки слайда с животным
  function makeSlide(data) {
    const slide = document.createElement('div');
    slide.classList.add('slider__slide', 'pet-card');
    slide.id = data['name'];

    const img = document.createElement('img');
    img.classList.add('pet-card__img');
    img.src = data['img'];
    img.alt = data['name'];
    slide.append(img);

    const title = document.createElement('h4');
    title.innerText = data['name'];
    slide.append(title);

    const btn = document.createElement('button');
    btn.classList.add('btn', 'pet-card__btn');
    btn.type = 'button';
    btn.innerText = 'Learn more';
    slide.append(btn);

    return slide;
  }

  const slider = document.querySelector('.slider__list');
  const btnForward = document.querySelector('.slider__arrow--forward');
  const btnBack = document.querySelector('.slider__arrow--back');
  const sliderWrapper = document.querySelector('.slider__wrapper');

  // количество слайдов которое надо показать в зависимости от ширины окна
  let slidesCount = screenType.slidesCount;

  // подгон ширины размера слайдера
  function setSliderWidth() {
    const sliderContainerWidth = document.querySelector('.pets__slider').offsetWidth;
    sliderWrapper.style.width = sliderContainerWidth - (screenType.paddings) + 'px';
  }

  // получить рандомное число в пределах максимального значения
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  // получение рандомного массива объектов заданной величины
  function getData(rawArr, count, insertionPosition = 'end') {
    let arr = [];
    let arrToCompare = slider.childNodes.length !== 0 ? [...slider.childNodes].map(el => el.id) : [];
    // если массив для сравнения больше массива, который надо сгенерировать,
    // то сравнивать не со всем объемом данных, а с частью
    // с какой частью зависит от того куда мы планируем добавлять данные
    // в начало или конец
    if (arrToCompare.length > count) {
      arrToCompare = insertionPosition === 'end'
        ? arrToCompare.slice(arrToCompare.length - count)
        : arrToCompare.slice(0, count);
    }

    while (arr.length < count) {
      const index = getRandomInt(rawArr.length);
      if (!arrToCompare.includes(rawArr[index]['name'])) {
        arr.push(rawArr[index]);
        arrToCompare.push(rawArr[index]['name']);
      }
    }
    return arr;
  }

  // функция отрисовки необходимого количества слайдов
  // в зависимости от параметра pos добавляет слайды в начало или в конец слайдера
  function drawSlider(count, pos = 'start') {
    let slidesData = getData(jsonData, count, pos);

    if (pos === 'end') {
      slidesData.forEach(el => {
        slider.append(makeSlide(el))
      });
    } else {
      slidesData.forEach(el => {
        slider.prepend(makeSlide(el))
      });
    }
  }

  // вызов отрисовки слайдов для начального состояния
  // отрисовываем сразу 3 сета для удобства работы слайдера
  setSliderWidth();
  for (let i = 0; i < 3; i++) {
    drawSlider(slidesCount)
  };

  // функция перерисовывающая слайды если размер окна изменился
  function redrawSlider() {
    let newScreenType = getScreenType(window.innerWidth);
    if (screenType != newScreenType) {
      screenType = newScreenType;
      while (slider.firstChild) {
        slider.removeChild(slider.firstChild)
      }
      setSliderWidth();
      slidesCount = screenType.slidesCount;
      for (let i = 0; i < 3; i++) {
        drawSlider(slidesCount)
      };
    }
  }

  // функция добавления слайдов при клике вперед
  // добавляет новый сет слайдов, отрезает лишний сет и проигрывает анимацию
  function slideForvard() {
    drawSlider(slidesCount, 'end');
    slider.style.transition = '0.9s ease';
    slider.style.transform = `translateX(-${(screenType.slideSize) * screenType.slidesCount * 2}px)`;
    setTimeout(() => {
      slider.style.transition = '';
      slider.style.transform = `translateX(-${(screenType.slideSize) * screenType.slidesCount}px)`;
      for (let i = 0; i < slidesCount; i++) {
        slider.removeChild(slider.firstChild);
      }
    }, 1000)
  }

  // функция добавления слайдов при клике назад
  // если слайдов больше чем (необходимое количество * 2) - отрезать "старые" слайды в конце
  function slideBack() {
    slider.style.transition = '0.9s ease';
    slider.style.transform = `translateX(0)`;

    setTimeout(() => {
      const slides = slider.childNodes.length;
      console.log('for i=', slider.childNodes.length - 1, '; i>=', slider.childNodes.length - slidesCount, '; i--')
      for (let i = slides - 1; i >= slides - slidesCount; i--) {
        console.log('i ', i)
        slider.removeChild(slider.childNodes[i]);
      }
      drawSlider(slidesCount, 'start');
      slider.style.transition = '';
      slider.style.transform = `translateX(-${(screenType.slideSize) * screenType.slidesCount}px)`;
    }, 1000)
  }

  window.addEventListener('resize', redrawSlider);
  btnForward.addEventListener('click', slideForvard);
  btnBack.addEventListener('click', slideBack);
}

// список животных
if (window.location.pathname.includes('/pets')) {
  // генерация начального списка животных (48 штук)
  const dataSet = generateSet(jsonData);
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
    let newScreenType = getScreenType(window.innerWidth);
    if (screenType != newScreenType) {
      screenType = newScreenType;
      clearList();
      drawCards(dataSet, currentSet)
    }
  }

  // отрисовка карточек при загрузке страницы
  drawCards(dataSet, currentSet)

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

// модальное окно при клике по карточке животного
const petModal = document.getElementById('petModal');
const petModalImg = document.querySelector('.pet-modal__img');
const petModalName = document.querySelector('.pet-modal__content>h3');
const petModalType = document.querySelector('.pet-modal__type');
const petModalDescr = document.querySelector('.pet-modal__description');
const petModalList = document.querySelector('.pet-modal__list');

// функция создания элемента списка в модальном окне
function makeListItem(title, data) {
  const item = document.createElement('li');
  item.classList.add('pet-modal__list-item');
  item.innerText = typeof data === 'string' ? data : data.join(', ');
  const accent = document.createElement('span');
  accent.classList.add('pet-modal__accent');
  accent.innerText = `${title}: `;
  item.prepend(accent);
  return item;
}

// функция заполнения модального окна данными
function fillPetModal(data) {
  petModalImg.src = data['img'];
  petModalImg.alt = data['name'];
  petModalName.innerText = data['name'];
  petModalType.innerText = `${data['type']} - ${data['breed']}`;
  petModalDescr.innerText = data['description'];

  //очистка списка, если там что-то было
  while (petModalList.firstChild) {
    petModalList.removeChild(petModalList.firstChild);
  }

  // заполнение списка новыми элементами
  petModalList.append(makeListItem('Age', data['age']));
  petModalList.append(makeListItem('Inoculations', data['inoculations']));
  petModalList.append(makeListItem('Diseases', data['diseases']));
  petModalList.append(makeListItem('Parasites', data['parasites']));
}

// обработчик клика по карточке животного
// включает затемненный фон и заполняет модальное окно данными с карточки
function cardsClickHandler(e) {
  const target = e.target;
  const card = target.closest('.pet-card');

  if (card) {
    blackout.classList.add('blackout--visible');
    petModal.classList.add('pet-modal--visible');
    blackout.style.top = window.scrollY + 'px';
    document.body.style.overflow = 'hidden';
    let cardData = jsonData.find((el) => {
      return el['name'] === card.id;
    });

    fillPetModal(cardData);
    blackout.addEventListener('click', closePetModal)
  }
}

// обработчик клика по фону или кнопке "закрыть"
function closePetModal(e) {
  if (e.target.id === 'petModalClose' || e.target === blackout) {
    blackout.classList.remove('blackout--visible');
    petModal.classList.remove('pet-modal--visible');
    document.body.style.overflow = '';
    blackout.removeEventListener('click', closePetModal)
  }
}

const petCards = document.querySelector('.pet-cards');
petCards.addEventListener('click', cardsClickHandler)