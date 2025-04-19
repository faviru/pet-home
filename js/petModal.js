import { bodyScrollControls } from "./utils.js";

export default function createPetModal(rawPetData) {
  // элемент затемненного фона под модальное окно и бургер
  const blackout = document.querySelector('.blackout');

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
      bodyScrollControls.disable();
      let cardData = rawPetData.find((el) => {
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
      bodyScrollControls.enable();
      blackout.removeEventListener('click', closePetModal)
    }
  }

  const petCards = document.querySelector('.pet-cards');
  petCards.addEventListener('click', cardsClickHandler)
}