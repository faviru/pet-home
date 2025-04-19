import { getRandomInt, getScreenType } from "./utils.js";

export default function createSlider(rawPetData, screenTypeParam) {

  let screenType = getScreenType(window.innerWidth, screenTypeParam);
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
    let slidesData = getData(rawPetData, count, pos);

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
    let newScreenType = getScreenType(window.innerWidth, screenTypeParam);
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

  function toggleBlockBtn(e) {
    e.target.classList.toggle('slider__arrow--inactive')
  }

  // функция добавления слайдов при клике вперед
  // добавляет новый сет слайдов, отрезает лишний сет и проигрывает анимацию
  function slideForvard(e) {
    toggleBlockBtn(e)
    drawSlider(slidesCount, 'end');
    slider.style.transition = '0.9s ease';
    slider.style.transform = `translateX(-${(screenType.slideSize) * screenType.slidesCount * 2}px)`;
    setTimeout(() => {
      slider.style.transition = '';
      slider.style.transform = `translateX(-${(screenType.slideSize) * screenType.slidesCount}px)`;
      for (let i = 0; i < slidesCount; i++) {
        slider.removeChild(slider.firstChild);
      }
      toggleBlockBtn(e)
    }, 1000);
  }

  // функция добавления слайдов при клике назад
  // если слайдов больше чем (необходимое количество * 2) - отрезать "старые" слайды в конце
  function slideBack(e) {
    toggleBlockBtn(e)
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
      toggleBlockBtn(e)
    }, 1000)
  }

  window.addEventListener('resize', redrawSlider);
  btnForward.addEventListener('click', slideForvard);
  btnBack.addEventListener('click', slideBack);
}