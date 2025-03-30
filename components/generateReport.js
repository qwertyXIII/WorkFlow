import {
  headerProgressbar,
  localDB,
  multiSwitch,
  progressBarCurrentState,
  selector,
  settingsSwitch,
  workspaces
} from "../utils/constants.js";
import { changeText } from "./changeText.js";
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

function round(value, num) {
  return +value.toFixed(num);
}

// функция генерации таблицы отчета
export async function generateReport(form, reportName) {
  let tableElement = workspaces.report.querySelector('.table');
  tableElement.innerHTML = '';
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
          console.log(e.definition.startDate);
          
          e.indicators.forEach((employee) => {
            let row = document.createElement('tr')
            let td;

            td = document.createElement('td')
            td.classList.add('text', 'table__cell', 'text__transperent')
            row.appendChild(td)
            changeText(td, employee.name)

            td = document.createElement('td')
            td.classList.add('text', 'table__cell') 
            td.setAttribute('title', `[Услуги] Сумма: ${employee.products.services.sum}, Количество: ${employee.products.services.quantity}`)
            row.appendChild(td)
            changeText(td, round(employee.products.services.sum / employee.total * 100, 2) + '%')

            td = document.createElement('td')
            td.classList.add('text', 'table__cell', 'text__transperent')
            td.setAttribute('title', `[БС] Сумма: ${employee.products.insurance.sum}, Количество: ${employee.products.insurance.quantity}`)
            row.appendChild(td)
            changeText(td, round(employee.products.insurance.sum / employee.total * 100, 2) + '%')

            td = document.createElement('td')
            td.classList.add('text', 'table__cell', 'text__transperent')
            td.setAttribute('title', `[AJ] Количество AJ: ${employee.products.services.armorjack.quantity}шт, Количество  Mobile: ${employee.products.main.mobile.quantity}шт`)
            row.appendChild(td)
            changeText(td, round(employee.products.services.armorjack.quantity / employee.products.main.mobile.quantity * 100, 2) + '%') 

            td = document.createElement('td')
            td.classList.add('text', 'table__cell', 'text__transperent')
            td.setAttribute('title', `[Установки] Сумма: ${employee.products.services.installations.sum}, Количество: ${employee.products.services.installations.quantity}`)
            row.appendChild(td)
            changeText(td, round(employee.products.services.installations.sum / employee.total * 100, 2) + '%')

            td = document.createElement('td')
            td.classList.add('text', 'table__cell', 'text__transperent')
            td.setAttribute('title', `Оборот: ${employee.total} руб`)
            row.appendChild(td)
            changeText(td, employee.total + ' руб')

            tableElement.append(row)
          })
        })
        workspaces.report.appendChild(tableElement)
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