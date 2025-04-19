// функция перемешки массива
export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// получить рандомное число в пределах максимального значения
export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export const bodyScrollControls = {
  scrollBarWidth: window.innerWidth - document.body.clientWidth,

  disable() {
    document.body.style.marginRight = `${this.scrollBarWidth}px`;
    document.body.style.overflowY = 'hidden';
  },
  enable() {
    document.body.style.marginRight = null;
    document.body.style.overflowY = null;
  },
};
// функция определения настроек для окна, в соответствии с размером
export function getScreenType(windowWidth, screenTypeParam) {
  return windowWidth >= 1280 ? screenTypeParam.desc : windowWidth < 768 ? screenTypeParam.mobile : screenTypeParam.tablet;
}