// Парсим текстовый ответ сервера в  HTML для простоты работы 
export function convertStringToHTML(htmlString) {
  const parser = new DOMParser();
  const html = parser.parseFromString(htmlString, 'text/html');
  return html.body;
}

// Парсим  HTML таблицу в массив
export function toArrayOfHTML(table) {
  const columns = Array.from(table.querySelectorAll('th')).map(
    heading => heading.textContent,
  );
  const rows = table.querySelectorAll('tbody > tr');
  return Array.from(rows).map(row => {
    const dataCells = Array.from(row.querySelectorAll('td'));
    return columns.reduce((obj, column, index) => {
      obj[column] = dataCells[index].textContent;
      return obj;
    }, {});
  });
}

//Счетчик уникальных элементов в массивее колво уникальных объектов
export function countUniqueArray(arr, key) {
  const unique = [];
  arr.forEach(num => {
    if (!unique.includes(num[key])) {
      unique.push(num[key]);
    }
  });
  return unique;
}

//приводим все к нормализированномсу объекту
export function arrayToNormilizeObj(array, week, startDate, endDate) {
  // Создаем структуру будущего объекта, определяем уникальные имена сотрудников и добавляем в глобальный массив новый объект с именем сотрудника
  let data = {
    definition: { week: week, startDate: startDate, endDate: endDate },
    indicators: []
  }
  countUniqueArray(array, 'Сотрудник').forEach((el) => {
    let objTemplate =
    {
      name: '',
      total: 0,
      products: {
        main: {
          sum: 0,
          quantity: 0,
          mobile: {
            sum: 0,
            quantity: 0
          }
        },
        services: {
          sum: 0,
          quantity: 0,
          armorjack: {
            sum: 0,
            quantity: 0
          },
          installations: {
            sum: 0,
            quantity: 0
          }
        },
        insurance: {
          sum: 0,
          quantity: 0
        },
        accessories: {
          sum: 0,
          quantity: 0
        }
      }
    }
    objTemplate.name = el;
    data.indicators.push(objTemplate);
  });
  data.indicators.pop();
  data.indicators.forEach((el) => {
    array.forEach((e) => {
      if (el.name == e['Сотрудник']) {
        switch (e['Тип товара']) {
          case 'Основной товар':
            if (!e['Наименование'] == '') {
              el.products.main.sum += Number.parseInt(e['Сумма'].replaceAll(',', ''));
              el.products.main.quantity += Number.parseInt(e['Единиц']);
              if (e['Подкатегория'] == 'Смартфоны') {
                el.products.main.mobile.sum += Number.parseInt(e['Сумма'].replaceAll(',', ''));
                el.products.main.mobile.quantity += Number.parseInt(e['Единиц']);
              }
              if (e['Категория'] == 'Планшетные компьютеры') {
                el.products.main.mobile.sum += Number.parseInt(e['Сумма'].replaceAll(',', ''));
                el.products.main.mobile.quantity += Number.parseInt(e['Единиц']);
              }
              if (e['Категория'].includes('Услуги выездные')) {
                el.products.services.installations.sum += Number.parseInt(e['Сумма'].replaceAll(',', ''));
                el.products.services.installations.quantity += Number.parseInt(e['Единиц']);
              }
            }
            break
          case 'Аксессуары':
            if (!e['Наименование'] == '') {
              el.products.accessories.sum += Number.parseInt(e['Сумма'].replaceAll(',', ''));
              el.products.accessories.quantity += Number.parseInt(e['Единиц']);
            }
            break
          case 'Программа доп.сервиса':
            if (!e['Наименование'] == '') {
              el.products.insurance.sum += Number.parseInt(e['Сумма'].replaceAll(',', ''));
              el.products.insurance.quantity += Number.parseInt(e['Единиц']);
            }
            break
          case 'Платные услуги, Товар с услугой':
            if (e['Наименование'].includes('Код Armorjack')) {
              el.products.services.armorjack.sum += Number.parseInt(e['Сумма'].replaceAll(',', ''));
              el.products.services.armorjack.quantity += Number.parseInt(e['Единиц']);
            }
            if (!e['Наименование'] == '') {
              el.products.services.sum += Number.parseInt(e['Сумма'].replaceAll(',', ''));
              el.products.services.quantity += Number.parseInt(e['Единиц']);
              if (e['Категория'].includes('Услуги выездные')) {
                el.products.services.installations.sum += Number.parseInt(e['Сумма'].replaceAll(',', ''));
                el.products.services.installations.quantity += Number.parseInt(e['Единиц']);
              }
            }
            break
          case 'Услуги':
            if (!e['Наименование'] == '') {
              el.products.services.sum += Number.parseInt(e['Сумма'].replaceAll(',', ''));
              el.products.services.quantity += Number.parseInt(e['Единиц']);
            }
            break
          case 'Расширенный ассортимент':
            if (!e['Наименование'] == '') {
              el.products.main.sum += Number.parseInt(e['Сумма'].replaceAll(',', ''));
              el.products.main.quantity += Number.parseInt(e['Единиц']);
            }
            break

        }
        el.total = el.products.main.sum + el.products.accessories.sum + el.products.insurance.sum + el.products.services.sum;
      }
    })
  })
  return data;
}