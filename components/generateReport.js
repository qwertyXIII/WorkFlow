import { headerProgressbar, localDB, settingsSwitch } from "../utils/constants.js";
import { communicator } from "../communicator.js";
import { arrayToNormilizeObj, convertStringToHTML, toArrayOfHTML } from "../parser.js";
import { progressBarUpdate } from "../progressBarUpdate.js";

// функция генерации таблицы отчета
export function generateReport(reportName, startDate, endDate, weekNumber) {
  document.querySelector('.header__progress-bar').classList.remove('progress-bar_hidden');
  switch (reportName) {
    case 'penitration':
      if (!settingsSwitch.fetchemulationSwitchDelay.checked) {
        communicator(reportName, startDate, endDate)
          .then(data => {
            localDB.push(arrayToNormilizeObj(toArrayOfHTML(convertStringToHTML(data).querySelector('.tableX')), weekNumber, startDate, endDate));
            console.log(localDB);
            progressBarUpdate(headerProgressbar, 'ok');
          }).catch((err) => {
            progressBarUpdate(headerProgressbar, 'error');
            console.log(err);
          });
      } else { // ЭТО ДЛЯ ЭМУЛЯЦИИ ОЖИДАНИЯ ОБЕЩАНИЯ ЗАПРОСА
        setTimeout(() => {
          communicator(reportName, startDate, endDate)
            .then(data => {
              localDB.push(arrayToNormilizeObj(toArrayOfHTML(convertStringToHTML(data).querySelector('.tableX')), weekNumber, startDate, endDate));
              console.log(localDB);
              progressBarUpdate(headerProgressbar, 'ok');
            }).catch((err) => {             
              progressBarUpdate(headerProgressbar, 'error');
            });
        }, Math.floor(1000 + Math.random() * (30000 + 1 - 1000)));
      }
      break;
    default:
      console.error('Неизвестное название отчёта');
      break;
  }
}
