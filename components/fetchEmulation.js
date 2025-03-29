import { settingsSwitch } from "../utils/constants.js";

//  Fetch запрос на сервер (ЭМУЛЯЦИЯ)
export function fetchEmulation() {
  if (!settingsSwitch.fetchemulationSwitchDelay.checked) {
    return fetch("/onlinesales  март Наименования (6).html", { method: "GET" })
      .then(response => response.text())
      .then(result => result)
      .catch(err => err);
  } else {
    //////////////// Не работает
      return fetch("/onlinesales  март Наименования (6).html", { method: "GET" })
        .then(response => response.text())
        .then(result => setTimeout(() => { result }, Math.floor(1000 + Math.random() * (30000 + 1 - 1000))))
        .catch(err => err);
  }
}