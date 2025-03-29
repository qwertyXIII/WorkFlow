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
export const form = {
  reporteditor: document.querySelector('#report-editor-form')
}

export const selector = {
  all: document.querySelectorAll('.selector'),
  weekSelectorStart: document.querySelector('.startweek'),
  weekSelectorEnd: document.querySelector('.endweek')
}
export const multiSwitch = {
  generateReportMultiswitch: document.querySelector('input[type="radio"][name="report-editor-multi-switcher-time"]:checked').value
}

export const headerHeading = document.querySelector('.header__heading');

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

export let localDB = [];