import {
  settingsSwitch
} from "./utils/constants.js";
import {
  fetchEmulation
} from "./fetchEmulation.js";

// Функция взаимодействия с FOBO-MON
export function communicator(reportName, startDate, endDate) {
  //WzAxXVs5RkJENkI1OTY5RTk3NThGNzY5OUIwN0I0QTJGREE5NF0%3D
  let url;
  let params = {
    user: 146167,
    password: 'WzAxXVs5RkJENkI1OTY5RTk3NThGNzY5OUIwN0I0QTJGREE5NF0%3D',
    shop: 'S462',
    report: 0,
    startDate: startDate,
    endDate: endDate
  }

  function generateURL(params) {
    return `https://fobo-mon.corp.mvideo.ru/onlinesales?in_username=${params.user}&in_password=${params.password}&sapname=${params.shop}&report=${params.report}&calendar1=${params.startDate}T00%3A00&calendar2=${params.endDate}T23%3A59`;
  }

  switch (reportName) {
    case 'penitration':
      params.report = 6;
      break;
  }
  url = generateURL(params);
  if (!settingsSwitch.fetchEmulationSwitch.checked) {
    return fetch(url, { method: "GET" })
      .then(response => response.text())
      .then(result => result)
      .catch(err => err);
  } else {
    console.log('Fetch emulation...');
    return fetchEmulation(params);
  }
}