// Функция для плавной замены текста
export function changeText(el, string) {
  el.classList.add('text__transperent');
  setTimeout(() => {
    el.innerHTML = string;
    el.classList.remove('text__transperent');
  }, 300);
}