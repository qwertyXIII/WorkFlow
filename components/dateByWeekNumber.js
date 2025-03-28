/* функция для определения текущего номера недели [исп.: dateByWeekNumber(год, номер недели);] > //возвращает объект с начальной и конечной датой недели// */
export function dateByWeekNumber (year, week) {
  let result = { week: week, startDate: '', endDate: '' };
  const date = new Date(year, 0, 7);
  date.setDate(date.getDate() - (date.getDay() + 10) % 7);
  date.setDate(date.getDate() + (week - 1) * 7);
  date.setDate(date.getDate() - 3);
  result.startDate = date.toLocaleDateString('ru-RU').split('.').reverse().join('-');
  result.endDate = new Date(date.setDate(date.getDate() + 6)).toLocaleDateString('ru-RU').split('.').reverse().join('-');
  return result;
}