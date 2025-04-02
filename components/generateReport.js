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
import {
  changeText
} from "./changeText.js";
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

function addCell(cssClass, text, tlte, rowspan, colspan, additionalClasses) {
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
  if (additionalClasses !== '' & additionalClasses !== undefined) {
    additionalClasses.forEach((e) => {
      td.classList.add(e)
    })
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
          // Задаем значения прогрессбару
          progressBarCurrentState.max = NumberOfRequests;
          // Делаем столько запросов, за сколько недель нужно построить отчет
          for (let i = forms.reporteditor.weekSelectorStart.getAttribute('value'); i - 1 < forms.reporteditor.weekSelectorEnd.getAttribute('value'); i++) {

            await communicator(reportName, dateByWeekNumber(2025, i).startDate, dateByWeekNumber(2025, i).endDate)
              .then(data => {
                localDB.array.push(
                  arrayToNormilizeObj(toArrayOfHTML(convertStringToHTML(data).querySelector('.tableX')), i, dateByWeekNumber(2025, i).startDate, dateByWeekNumber(2025, i).endDate)
                )
                changeText(tableName, `Отчёт с W${forms.reporteditor.weekSelectorStart.getAttribute('value')} по W${forms.reporteditor.weekSelectorEnd.getAttribute('value')}`)
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

          // Здесь просто создайем хэдинг таблицы, прописываем где и что будет, растягиваем столбцы так как нужно 
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

          // Тут создаем макет шапки прописываем все недели и добавляем тайтл с инфо когда нчаалась и закончилась неделя
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

          // Создаем массив с уникальными именами (Мы же не знаем сколько разных продавцов работало в каждой недели) Собираем все имена в общий вмассив, после чего вычленяем только уникальные
          let unique = [];
          localDB.array.forEach((e) => {
            e.indicators.forEach((employee) => {
              unique.push(employee)
            })
          })
          unique = countUniqueArray(unique, 'name')

          // ТУут создается структура таблицы, добавляются все ячейки и присваивается класс - "индитификатор"
          unique.forEach((e) => {
            row = document.createElement('tr');
            row.appendChild(addCell('table__cell', e, '', '', ''));

            if (forms.reporteditor.accessoriesSwitch.checked) {
              for (let i = forms.reporteditor.weekSelectorStart.getAttribute('value'); i - 1 < forms.reporteditor.weekSelectorEnd.getAttribute('value'); i++) {
                console.log(e.match(/\d+/g));

                row.appendChild(addCell('table__cell', '', '', '', '', [`accessories${e.match(/\d+/g)}w${i}`]));
              }
            }
            if (forms.reporteditor.servicesSwitch.checked) {
              for (let i = forms.reporteditor.weekSelectorStart.getAttribute('value'); i - 1 < forms.reporteditor.weekSelectorEnd.getAttribute('value'); i++) {
                row.appendChild(addCell('table__cell', '', '', '', '', [`services${e.match(/\d+/g)}w${i}`]));
              }
            }
            if (forms.reporteditor.insuranceSwitch.checked) {
              for (let i = forms.reporteditor.weekSelectorStart.getAttribute('value'); i - 1 < forms.reporteditor.weekSelectorEnd.getAttribute('value'); i++) {
                row.appendChild(addCell('table__cell', '', '', '', '', [`insurance${e.match(/\d+/g)}w${i}`]));
              }
            }
            if (forms.reporteditor.armorjackSwitch.checked) {
              for (let i = forms.reporteditor.weekSelectorStart.getAttribute('value'); i - 1 < forms.reporteditor.weekSelectorEnd.getAttribute('value'); i++) {
                row.appendChild(addCell('table__cell', '', '', '', '', [`armorjack${e.match(/\d+/g)}w${i}`]));
              }
            }
            if (forms.reporteditor.installationsSwitch.checked) {
              for (let i = forms.reporteditor.weekSelectorStart.getAttribute('value'); i - 1 < forms.reporteditor.weekSelectorEnd.getAttribute('value'); i++) {
                row.appendChild(addCell('table__cell', '', '', '', '', [`installations${e.match(/\d+/g)}w${i}`]));
              }
            }
            tableElement.append(row);
          })

          //Вставляем значения в ячейки 
          unique.forEach((eName) => {
            if (forms.reporteditor.accessoriesSwitch.checked) {
              localDB.array.forEach((arrEl) => {
                arrEl.indicators.forEach((employee) => {
                  if (employee.name === eName) {
                    let cell = tableElement.querySelector(`.accessories${eName.match(/\d+/g)}w${arrEl.definition.week}`)
                    //cell.innerHTML = round(employee.products.accessories.sum / employee.total * 100, 2) + '%'
                    cell.setAttribute('title', `[Аксессуары] W${arrEl.definition.week} Сумма: ${employee.products.accessories.sum}, Количество: ${employee.products.accessories.quantity}, оборот: ${employee.total}`)
                  
                    setTimeout(() => { 
                      changeText(cell, round(employee.products.accessories.sum / employee.total * 100, 2) + '%')
                     }, Math.floor(100 + Math.random() * (1000 + 1 - 100)))
                  }
                })
              })
            }
            if (forms.reporteditor.servicesSwitch.checked) {
              localDB.array.forEach((arrEl) => {
                arrEl.indicators.forEach((employee) => {
                  if (employee.name === eName) {
                    let cell = tableElement.querySelector(`.services${eName.match(/\d+/g)}w${arrEl.definition.week}`)
                    //cell.innerHTML = round(employee.products.services.sum / employee.total * 100, 2) + '%'
                    cell.setAttribute('title', `[Услуги] W${arrEl.definition.week} Сумма: ${employee.products.services.sum}, Количество: ${employee.products.services.quantity}, оборот: ${employee.total}`)
                  
                    setTimeout(() => { 
                      changeText(cell, round(employee.products.services.sum / employee.total * 100, 2) + '%')
                     }, Math.floor(100 + Math.random() * (1000 + 1 - 100)))
                  }
                })
              })
            }
            if (forms.reporteditor.insuranceSwitch.checked) {
              localDB.array.forEach((arrEl) => {
                arrEl.indicators.forEach((employee) => {
                  if (employee.name === eName) {
                    let cell = tableElement.querySelector(`.insurance${eName.match(/\d+/g)}w${arrEl.definition.week}`)
                    //cell.innerHTML = round(employee.products.insurance.sum / employee.total * 100, 2) + '%'
                    cell.setAttribute('title', `[БС] W${arrEl.definition.week} Сумма: ${employee.products.insurance.sum}, Количество: ${employee.products.insurance.quantity}, оборот: ${employee.total}`)
                  
                    setTimeout(() => { 
                      changeText(cell, round(employee.products.insurance.sum / employee.total * 100, 2) + '%')
                     }, Math.floor(100 + Math.random() * (1000 + 1 - 100)))
                  }
                })
              })
            }
            if (forms.reporteditor.armorjackSwitch.checked) {
              localDB.array.forEach((arrEl) => {
                arrEl.indicators.forEach((employee) => {
                  if (employee.name === eName) {
                    let cell = tableElement.querySelector(`.armorjack${eName.match(/\d+/g)}w${arrEl.definition.week}`)
                    //cell.innerHTML = round(employee.products.services.armorjack.quantity / employee.products.main.mobile.quantity * 100, 2) + '%'
                    cell.setAttribute('title', `[AJ] W${arrEl.definition.week} Количество AJ: ${employee.products.services.armorjack.quantity}шт, Количество  Mobile: ${employee.products.main.mobile.quantity}шт`)
                  
                    setTimeout(() => { 
                      changeText(cell, round(employee.products.services.armorjack.quantity / employee.products.main.mobile.quantity * 100, 2) + '%')
                     }, Math.floor(100 + Math.random() * (1000 + 1 - 100)))
                  }
                })
              })
            }
            if (forms.reporteditor.installationsSwitch.checked) {
              localDB.array.forEach((arrEl) => {
                arrEl.indicators.forEach((employee) => {
                  if (employee.name === eName) {
                    let cell = tableElement.querySelector(`.installations${eName.match(/\d+/g)}w${arrEl.definition.week}`)
                    //cell.innerHTML = round(employee.products.services.installations.sum / employee.total * 100, 2) + '%'
                    cell.setAttribute('title', `[Установки] W${arrEl.definition.week} Сумма: ${employee.products.services.installations.sum}, Количество: ${employee.products.services.installations.quantity}, оборот: ${employee.total}`)
                  
                    setTimeout(() => { 
                      changeText(cell, round(employee.products.services.installations.sum / employee.total * 100, 2) + '%')
                     }, Math.floor(100 + Math.random() * (1000 + 1 - 100)))
                  }
                })
              })
            }
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