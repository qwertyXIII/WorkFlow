import {
  progressBarCurrentState,
} from "./utils/constants.js"
import {
  changeText,
} from "../components/changeText.js"

// Функция обновления статус бара, вызывается в промисе, нужно установить значение progressBarCurrentState.max
export function progressBarUpdate(progressBarElement, status, data) {
  let percentage = progressBarCurrentState.current / (progressBarCurrentState.max) * 100;
  progressBarCurrentState.current += 1;
  switch (status) {
    case 'ok':
      let percentage = progressBarCurrentState.current / (progressBarCurrentState.max) * 100;
      progressBarElement.querySelector('.progress-bar__status').innerHTML = `Загрузка данных ${Math.round(percentage)}%...`;
      progressBarElement.querySelector('.progress-bar__thumb').style.width = `${percentage}%`;
      break;
    case 'error':
      progressBarElement.querySelector('.progress-bar__status').innerHTML = `Ошибка при запросе №${progressBarCurrentState.current} из ${progressBarCurrentState.max}`;
      progressBarElement.querySelector('.progress-bar__status').style.color = 'red';
      progressBarElement.querySelector('.progress-bar__thumb').style.backgroundColor = 'red';
      break;
  }
  if (progressBarCurrentState.max <= progressBarCurrentState.current) {
    changeText(document.querySelector('.progress-bar__status'), 'Загрузка завершена');
    setTimeout(() => {
      progressBarElement.querySelector('.progress-bar__status').innerHTML = 'загрузка...';
      progressBarElement.classList.add('progress-bar_hidden');
      setTimeout(() => {
        progressBarElement.querySelector('.progress-bar__thumb').style.width = '0%';
        progressBarElement.querySelector('.progress-bar__thumb').style.backgroundColor = '';
        document.querySelector('.progress-bar__status').style.color = '';
      }, 1000);
    }, 2000);
    progressBarCurrentState.current = 0;    
  }
}