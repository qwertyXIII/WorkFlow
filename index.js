import {
  controlButton,
  workspaces,
  popup,
  form,
  headerHeading,
  tabsButtons,
  sidebar,
  headerButtons,
  progressBarCurrentState,
  selector,
  localDB
} from "./utils/constants.js"


import {
  changeText
} from "./components/changeText.js";

import {
  dateByWeekNumber
} from "./components/dateByWeekNumber.js";

import {
  generateReport
} from "./components/generateReport.js";
import { selectorObserver } from "./components/selectorObserver.js";



/* /////////////////////////////////////// */
/* Новый метод Date для определения текущего номера недели  */
Date.prototype.getWeek = function () {
  var date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  var week1 = new Date(date.getFullYear(), 0, 4);
  return 1 + Math.round(((
    date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7
  );
}
Date.prototype.getWeekYear = function () {
  var date = new Date(this.getTime());
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  return date.getFullYear();
}
/* /////////////////////////////////////// */




// Прослушиватели
// Сайдбар
controlButton.sidebarButton.addEventListener('click', () => {
  controlButton.sidebarButton.classList.toggle('button_sidebar_active')
  sidebar.classList.toggle('sidebar_active')
});
document.addEventListener('keydown', (event) => {
  if (event.key === '`' || event.key === 'ё') {
    event.preventDefault();
    controlButton.sidebarButton.classList.toggle('button_sidebar_active')
    sidebar.classList.toggle('sidebar_active')
  }
});

// Вкладки, переключение между ними
tabsButtons.forEach(el => {
  el.addEventListener('click', (event) => {
    tabsButtons.forEach(el => {
      el.classList.remove('button_active');
    });
    el.classList.add('button_active');
    workspaces.all.forEach(workspace => {
      workspace.classList.remove('workspace_active');
    });
    document.querySelector(`#${event.target.closest('button').getAttribute("tab")}`).classList.add('workspace_active');
    changeText(headerHeading, event.target.closest('button').getAttribute("heading-text"))
    controlButton.headerButtons.forEach(el => {
      el.classList.add('button_hidden');
    })
    switch (event.target.closest('button').getAttribute("tab")) {
      case 'report':
        controlButton.headerButtons.forEach(el => {
          headerButtons.report.forEach(id => {
            document.querySelector(`#${id}`).classList.remove('button_hidden');
          });
        });
        break;
      case 'in-dev':
        controlButton.headerButtons.forEach(el => {
          headerButtons.inDev.forEach(id => {
            document.querySelector(`#${id}`).classList.remove('button_hidden');
          });
        });
        break;
    }
  })
});

// Кнопка 'ДОМОй'
controlButton.homeButton.addEventListener('click', (e) => {
  controlButton.headerButtons.forEach(el => {
    el.classList.add('button_hidden');
  })
  changeText(headerHeading, '');
  tabsButtons.forEach(el => {
    el.classList.remove('button_active');
  });
  workspaces.all.forEach(workspace => {
    workspace.classList.remove('workspace_active');
  });
  workspaces.homeScreen.classList.add('workspace_active');
})

// Модалка "Об приложени"
popup.about.querySelector('#close-about-popup').addEventListener('click', () => {
  popup.about.classList.remove('popup_active')
});
document.querySelector('#about').addEventListener('click', () => {
  popup.about.classList.toggle('popup_active')
  function listener(e) {
    if (e.code == "Escape") {
      popup.about.classList.remove('popup_active')
      document.removeEventListener('keydown', listener);
    }
  }
  document.addEventListener('keydown', listener);
});
popup.about.addEventListener('click', (e) => {
  if (e.target.classList.contains('popup')) {
    popup.about.classList.remove('popup_active')
  }
});

// Модалка "Настройки"
popup.settings.querySelector('#close-settings-popup').addEventListener('click', () => {
  popup.settings.classList.remove('popup_active')
});
document.querySelector('#settings').addEventListener('click', () => {
  popup.settings.classList.toggle('popup_active')
  function listener(e) {
    if (e.code == "Escape") {
      popup.settings.classList.remove('popup_active')
      document.removeEventListener('keydown', listener);
    }
  }
  document.addEventListener('keydown', listener);
});
popup.settings.addEventListener('click', (e) => {
  if (e.target.classList.contains('popup')) {
    popup.settings.classList.remove('popup_active')
  }
});

// Параметры выгрузки отчета
document.querySelector('#report-editor-activator').addEventListener('click', () => {
  document.querySelector('#report-editor').classList.toggle('report-editor_active');
});
document.querySelector('#close-report-editor').addEventListener('click', () => {
  document.querySelector('#report-editor').classList.remove('report-editor_active');
});

// Форма генерации отчета
form.reporteditor.addEventListener('submit', (e) => {
  e.preventDefault();
  generateReport(e, 'penitration')
});

// Заставляем селекторы работать
selector.all.forEach(element => {
  selectorObserver(element)
});

window.onload = () => {
  setTimeout(() => {
    document.querySelector('.loader').classList.add('loader_hiden')
  }, 1000);
}




/* //////////////// TEST ZONE //////////////// */





