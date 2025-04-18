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