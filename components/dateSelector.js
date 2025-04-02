export const dateSelector = {
  run: function(element) {
    let type = element.getAttribute('type')
    console.log(type);
    
  }
}
dateSelector.run(document.querySelector('.start-date-test'))