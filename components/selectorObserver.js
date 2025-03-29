export function selectorObserver(selector) {
  function scrollTracking(entries) {
    for (const entry of entries) {
      selector.setAttribute("value", entry.target.getAttribute('value'))
    }
  }
  const observer = new IntersectionObserver(scrollTracking, {
    threshold: [1.0]
  });
  selector.querySelectorAll('.selector__element').forEach(element => observer.observe(element));
}