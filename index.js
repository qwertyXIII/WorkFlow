let url = 'https://fobo-mon.corp.mvideo.ru/onlinesales?in_username=146167&in_password=WzAxXVs5RkJENkI1OTY5RTk3NThGNzY5OUIwN0I0QTJGREE5NF0%3D&sapname=S462&report=4&calendar1=2025-03-01T00%3A00&calendar2=2025-03-15T15%3A32';
    const D = {
      in_username: 146167,
      in_password: 'WzAxXVs5RkJENkI1OTY5RTk3NThGNzY5OUIwN0I0QTJGREE5NF0=',
      sapname: 'S462',
      report: 4,
      calendar1: '2025-03-15T00:00',
      calendar2: '2025-03-15T15:32'
    };
    let options = {
      method: "POST",
      mode: 'cors',
      data: D
    }

    fetch(url, options)
      .then(response => response.text())
      .then(result => console.log(result))