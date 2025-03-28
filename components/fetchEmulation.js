//  Fetch запрос на сервер (ЭМУЛЯЦИЯ)
export function fetchEmulation() {
  return fetch("/onlinesales  март Наименования (6).html", { method: "GET" })
    .then(response => response.text())
    .then(result => result)
    .catch(err => err);
}