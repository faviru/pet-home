import { rawPetData } from "./js/rawPetData.js";
import createSlider from "./js/slider.js";
import createPetCards from "./js/petCards.js";
import createPetModal from "./js/petModal.js";
import { bodyScrollControls } from "./js/utils.js";

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
      bodyScrollControls.disable()
      document.addEventListener('click', closeNavigation)
    } else {
      bodyScrollControls.enable()
      document.removeEventListener('click', closeNavigation)
    }

    blackout.classList.toggle('blackout--visible');
  });
}

// слайдер
if (!window.location.pathname.includes('/pets')) {
  createSlider(rawPetData, screenTypeParam);
}

// список животных
if (window.location.pathname.includes('/pets')) {
  createPetCards(rawPetData, screenTypeParam)
}

createPetModal(rawPetData);
