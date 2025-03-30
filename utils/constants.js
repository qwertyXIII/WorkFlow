// Селекторы 
export const settingsSwitch = {
  fetchEmulationSwitch: document.querySelector('#setting-fetch-emulation'),
  fetchemulationSwitchDelay: document.querySelector('#setting-fetch-emulation-delay')
}

export const controlButton  = {
  sidebarButton: document.querySelector('#sidebar'),
  headerButtons: document.querySelectorAll('.header__button'),
  homeButton: document.querySelector('#home-button')
}

export const workspaces = {
  all: document.querySelectorAll('.workspace'),
  homeScreen: document.querySelector('#home-screen'),
  report: document.querySelector('#report')
}

export const popup = {
  about: document.querySelector('#about-popup'),
  settings: document.querySelector('#settings-popup')
}
export const forms = {
  reporteditor: {
    form: document.querySelector('#report-editor-form'),
    accessoriesSwitch: document.querySelector('#report-editor-switch-accessories'),
    servicesSwitch: document.querySelector('#report-editor-switch-services'),
    armorjackSwitch: document.querySelector('#report-editor-switch-armorjack'),
    installationsSwitch: document.querySelector('#report-editor-switch-installations'),
    insuranceSwitch: document.querySelector('#report-editor-switch-insurance'),
    weekSelector: document.querySelector('.report-editor__week-picker'),
    daySelector: document.querySelector('.report-editor__day-picker'),
    mouthSelector: document.querySelector('.report-editor__mouth-picker'),
    weekSelectorStart: document.querySelector('.startweek'),
    weekSelectorEnd: document.querySelector('.endweek')
  }
}

export const selectors = document.querySelectorAll('.selector');

export const multiSwitch = {
  generateReportMultiswitch: {
    element: document.querySelector('#report-editor-multi-switcher-interval'),
    inputs: document.querySelectorAll('#report-editor-multi-switcher-interval .multi-switcher__radio')
  }
}





export const headerHeading = document.querySelector('.header__heading');
export const tableName = document.querySelector('.table__name')

export const tabsButtons = document.querySelectorAll('.button__tab');

export const sidebar = document.querySelector('.sidebar');
export const headerProgressbar = document.querySelector('.header__progress-bar');



export const headerButtons = {
  report: ['report-share', 'report-editor-activator'],
  inDev: ['in-dev']
}

export let progressBarCurrentState = {
  max: 0,
  current: 0
}

export let localDB = {
  array: []
};

export let localLog = [];