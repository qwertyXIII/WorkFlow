import {
  headerProgressbar,
  localDB,
  localLog,
  multiSwitch,
  progressBarCurrentState,
  tableName,
  workspaces,
  forms
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

function addCell(cssSelector, text, tlte, rowspan, colspan) {
  let td;
  td = document.createElement('td');
  td.classList.add('table__element', cssSelector);
  if (tlte !== '') {
    td.setAttribute('title', tlte)
  }
  if (rowspan !== '') {
    td.setAttribute('rowspan', rowspan)
  }
  if (colspan !== '') {
    td.setAttribute('colspan', colspan)
  }
  td.innerHTML = text;
  return td;
}

// функция генерации таблицы отчета
export async function generateReport(form, reportName) {
  let tableElement = workspaces.report.querySelector('.table');
  let row;
  const NumberOfRequests = forms.reporteditor.weekSelectorEnd.getAttribute('value') - forms.reporteditor.weekSelectorStart.getAttribute('value') + 1;
  tableElement.innerHTML = '';
  workspaces.report.appendChild(tableElement);
  headerProgressbar.classList.remove('progress-bar_hidden');
  switch (reportName) {
    case 'penitration':
      switch (Array.from(multiSwitch.generateReportMultiswitch.inputs).find(r => r.checked)?.value) {
        case 'day':
          //////////////////////////////////////////////////////////////
          break;
        case 'week':
          row = document.createElement('tr');
          row.appendChild(addCell('table__heading', 'Сотрудник', '', 2, ''));
          if (forms.reporteditor.accessoriesSwitch.checked) {
            row.appendChild(addCell('table__heading', 'Аксессуры', '', '', NumberOfRequests));
          }
          if (forms.reporteditor.servicesSwitch.checked) {
            row.appendChild(addCell('table__heading', 'Услуги', '', '', NumberOfRequests));
          }
          if (forms.reporteditor.insuranceSwitch.checked) {
            row.appendChild(addCell('table__heading', 'Сертификаты', '', '', NumberOfRequests));
          }
          if (forms.reporteditor.armorjackSwitch.checked) {
            row.appendChild(addCell('table__heading', 'ArmorJack', '', '', NumberOfRequests));
          }
          if (forms.reporteditor.installationsSwitch.checked) {
            row.appendChild(addCell('table__heading', 'Установки', '', '', NumberOfRequests));
          }
          tableElement.append(row);



          row = document.createElement('tr');
          if (forms.reporteditor.accessoriesSwitch.checked) {
            for (let i = forms.reporteditor.weekSelectorStart.getAttribute('value'); i - 1 < forms.reporteditor.weekSelectorEnd.getAttribute('value'); i++) {
              row.appendChild(addCell('table__text', `W${i}`, `Неделя №${i}, с ${dateByWeekNumber(2025, i).startDate} по ${dateByWeekNumber(2025, i).endDate} `, '', ''));
            }
          }
          if (forms.reporteditor.servicesSwitch.checked) {
            for (let i = forms.reporteditor.weekSelectorStart.getAttribute('value'); i - 1 < forms.reporteditor.weekSelectorEnd.getAttribute('value'); i++) {
              row.appendChild(addCell('table__text', `W${i}`, `Неделя №${i}, с ${dateByWeekNumber(2025, i).startDate} по ${dateByWeekNumber(2025, i).endDate} `, '', ''));
            }
          }
          if (forms.reporteditor.insuranceSwitch.checked) {
            for (let i = forms.reporteditor.weekSelectorStart.getAttribute('value'); i - 1 < forms.reporteditor.weekSelectorEnd.getAttribute('value'); i++) {
              row.appendChild(addCell('table__text', `W${i}`, `Неделя №${i}, с ${dateByWeekNumber(2025, i).startDate} по ${dateByWeekNumber(2025, i).endDate} `, '', ''));
            }
          }
          if (forms.reporteditor.armorjackSwitch.checked) {
            for (let i = forms.reporteditor.weekSelectorStart.getAttribute('value'); i - 1 < forms.reporteditor.weekSelectorEnd.getAttribute('value'); i++) {
              row.appendChild(addCell('table__text', `W${i}`, `Неделя №${i}, с ${dateByWeekNumber(2025, i).startDate} по ${dateByWeekNumber(2025, i).endDate} `, '', ''));
            }
          }
          if (forms.reporteditor.installationsSwitch.checked) {
            for (let i = forms.reporteditor.weekSelectorStart.getAttribute('value'); i - 1 < forms.reporteditor.weekSelectorEnd.getAttribute('value'); i++) {
              row.appendChild(addCell('table__text', `W${i}`, `Неделя №${i}, с ${dateByWeekNumber(2025, i).startDate} по ${dateByWeekNumber(2025, i).endDate} `, '', ''));
            }
          }
          tableElement.append(row);



          progressBarCurrentState.max = NumberOfRequests;
          for (let i = forms.reporteditor.weekSelectorStart.getAttribute('value'); i - 1 < forms.reporteditor.weekSelectorEnd.getAttribute('value'); i++) {

            await communicator(reportName, dateByWeekNumber(2025, i).startDate, dateByWeekNumber(2025, i).endDate)
              .then(data => {
                localDB.array.push(
                  arrayToNormilizeObj(toArrayOfHTML(convertStringToHTML(data).querySelector('.tableX')), i, dateByWeekNumber(2025, i).startDate, dateByWeekNumber(2025, i).endDate)
                )
                progressBarUpdate(headerProgressbar, 'ok');
              }).catch((err) => {
                progressBarUpdate(headerProgressbar, 'error');
                console.log(err);
                localLog.push(err)
              });
          }
          localDB.array.sort((a, b) => {
            return a.definition.week - b.definition.week;
          })
          console.log(localDB);




          localDB.array.forEach((e) => {

            e.indicators.forEach((employee) => {
              row = document.createElement('tr');
              let td;
              row.appendChild(addCell('table__cell', employee.name));

              /* 
              row.appendChild(addCell(
                'table__cell',
                'text',
                'title'
              ));
              */

              if (forms.reporteditor.accessoriesSwitch.checked) {
                row.appendChild(addCell(
                  'table__cell',
                  round(employee.products.accessories.sum / employee.total * 100, 2) + '%',
                  `[Аксессуары] Сумма: ${employee.products.accessories.sum}, Количество: ${employee.products.accessories.quantity}`
                ));
              }
              if (forms.reporteditor.servicesSwitch.checked) {
                row.appendChild(addCell(
                  'table__cell',
                  round(employee.products.services.sum / employee.total * 100, 2) + '%',
                  `[Услуги] Сумма: ${employee.products.services.sum}, Количество: ${employee.products.services.quantity}`
                ));
              }
              if (forms.reporteditor.insuranceSwitch.checked) {
                row.appendChild(addCell(
                  'table__cell',
                  round(employee.products.insurance.sum / employee.total * 100, 2) + '%',
                  `[БС] Сумма: ${employee.products.insurance.sum}, Количество: ${employee.products.insurance.quantity}`
                ));
              }
              if (forms.reporteditor.armorjackSwitch.checked) {
                
                row.appendChild(addCell(
                  'table__cell',
                  round(employee.products.services.armorjack.quantity / employee.products.main.mobile.quantity * 100, 2) + '%',
                  `[AJ] Количество AJ: ${employee.products.services.armorjack.quantity}шт, Количество  Mobile: ${employee.products.main.mobile.quantity}шт`
                ));
              }
              if (forms.reporteditor.installationsSwitch.checked) {
                row.appendChild(addCell(
                  'table__cell',
                  round(employee.products.services.installations.sum / employee.total * 100, 2) + '%',
                  `[Установки] Сумма: ${employee.products.services.installations.sum}, Количество: ${employee.products.services.installations.quantity}`
                ));
              }

              tableElement.append(row);
            })
          })
          changeText(tableName, `Выгрузка отёта с W${forms.reporteditor.weekSelectorStart.getAttribute('value')} по W${forms.reporteditor.weekSelectorEnd.getAttribute('value')}`)
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