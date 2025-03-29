import {
  headerProgressbar,
  localDB,
  multiSwitch,
  progressBarCurrentState,
  selector,
  settingsSwitch
} from "../utils/constants.js";
import {
  communicator
} from "./communicator.js";
import { dateByWeekNumber } from "./dateByWeekNumber.js";
import {
  arrayToNormilizeObj,
  convertStringToHTML,
  toArrayOfHTML
} from "./parser.js";
import {
  progressBarUpdate
} from "./progressBarUpdate.js";

// функция генерации таблицы отчета
export async function generateReport(form, reportName) {
  let tableElement = document.createElement('table');
  tableElement.classList.add('table');
  headerProgressbar.classList.remove('progress-bar_hidden');
  switch (reportName) {
    case 'penitration': switch (multiSwitch.generateReportMultiswitch) {
      case 'day':
        //////////////////////////////////////////////////////////////
        break;
      case 'week':
        progressBarCurrentState.max = selector.weekSelectorEnd.getAttribute('value') - selector.weekSelectorStart.getAttribute('value') + 1;
        for (let i = selector.weekSelectorStart.getAttribute('value'); i - 1 < selector.weekSelectorEnd.getAttribute('value'); i++) {
            await communicator(reportName, dateByWeekNumber(2025, i).startDate, dateByWeekNumber(2025, i).endDate)
              .then(data => {
                localDB.push(
                  arrayToNormilizeObj(toArrayOfHTML(convertStringToHTML(data).querySelector('.tableX')), i, dateByWeekNumber(2025, i).startDate, dateByWeekNumber(2025, i).endDate)
                )
                progressBarUpdate(headerProgressbar, 'ok');
              }).catch((err) => {
                progressBarUpdate(headerProgressbar, 'error');
                console.log(err);
              });
        }
        localDB.sort((a, b) => {
          return a.definition.week - b.definition.week;
        })
        console.log(tableElement);
        
        localDB.forEach((e) => {
          let row = document.createElement('tr')
          e.indicators.forEach((employee) => {
            console.log(employee);
            let td = document.createElement('td')
            td.appendChild(document.createTextNode(employee.name))
            row.appendChild(td)
          })
          tableElement.append(row)
        })
        break;
      case 'mouth':
        //////////////////////////////////////////////////////////////
        break;
    }
      break;
    default:
      console.error('Неизвестное название отчёта');
      break;
  }
}
