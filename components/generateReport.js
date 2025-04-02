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
  countUniqueArray,
  toArrayOfHTML
} from "./parser.js";
import {
  progressBarUpdate
} from "./progressBarUpdate.js";

function round(value, num) {
  return +value.toFixed(num);
}

function addCell(cssClass, text, tlte, rowspan, colspan) {
  let td;
  td = document.createElement('td');
  td.classList.add('table__element', cssClass);
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
                localLog.push(err);
                changeText(tableName, `Во время построения отчета возникла ошибка. Попробуйте еще раз.`)
                return
              });
          }
          localDB.array.sort((a, b) => {
            return a.definition.week - b.definition.week;
          })

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


          let unique = [];
          localDB.array.forEach((e) => {
            e.indicators.forEach((employee) => {
              unique.push(employee)
            })
          })

          unique = countUniqueArray(unique, 'name')

          unique.forEach((eName) => {
            row = document.createElement('tr');
            row.appendChild(addCell('table__cell', eName));
            if (forms.reporteditor.accessoriesSwitch.checked) {
              localDB.array.forEach((arrEl) => {
                arrEl.indicators.forEach((employee) => {
                  if (employee.name === eName) {
                    row.appendChild(addCell(
                      'table__cell',
                      round(employee.products.accessories.sum / employee.total * 100, 2) + '%',
                      `[Аксессуары] W${arrEl.definition.week} Сумма: ${employee.products.accessories.sum}, Количество: ${employee.products.accessories.quantity}`
                    ));
                  }
                })
              })
            }
            if (forms.reporteditor.servicesSwitch.checked) {
              localDB.array.forEach((arrEl) => {
                arrEl.indicators.forEach((employee) => {
                  if (employee.name === eName) {
                    row.appendChild(addCell(
                      'table__cell',
                      round(employee.products.services.sum / employee.total * 100, 2) + '%',
                      `[Услуги] W${arrEl.definition.week} Сумма: ${employee.products.services.sum}, Количество: ${employee.products.services.quantity}`
                    ));
                  }
                })
              })
            }
            if (forms.reporteditor.insuranceSwitch.checked) {
              localDB.array.forEach((arrEl) => {
                arrEl.indicators.forEach((employee) => {
                  if (employee.name === eName) {
                    row.appendChild(addCell(
                      'table__cell',
                      round(employee.products.insurance.sum / employee.total * 100, 2) + '%',
                      `[БС] W${arrEl.definition.week} Сумма: ${employee.products.insurance.sum}, Количество: ${employee.products.insurance.quantity}`
                    ));
                  }
                })
              })
            }
            if (forms.reporteditor.armorjackSwitch.checked) {
              localDB.array.forEach((arrEl) => {
                arrEl.indicators.forEach((employee) => {
                  if (employee.name === eName) {
                    row.appendChild(addCell(
                      'table__cell',
                      round(employee.products.services.armorjack.quantity / employee.products.main.mobile.quantity * 100, 2) + '%',
                      `[AJ] W${arrEl.definition.week} Количество AJ: ${employee.products.services.armorjack.quantity}шт, Количество  Mobile: ${employee.products.main.mobile.quantity}шт`
                    ));
                  }
                })
              })
            }
            if (forms.reporteditor.installationsSwitch.checked) {
              localDB.array.forEach((arrEl) => {
                arrEl.indicators.forEach((employee) => {
                  if (employee.name === eName) {
                    row.appendChild(addCell(
                      'table__cell',
                      round(employee.products.services.installations.sum / employee.total * 100, 2) + '%',
                      `[Установки] W${arrEl.definition.week} Сумма: ${employee.products.services.installations.sum}, Количество: ${employee.products.services.installations.quantity}`
                    ));
                  }
                })
              })
            }
            tableElement.append(row);
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