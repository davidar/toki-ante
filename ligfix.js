function createSpan(html) {
  var span = document.createElement('span')
  span.className = 'ligfix'
  span.innerHTML = html.trim()
  return span
}

var main = document.querySelector('main')
findAndReplaceDOMText(main, { find: /[\w-]*[,:.!?]/g, wrap: 'span', wrapClass: 'punct' })
findAndReplaceDOMText(main, { find: /\b[aeo]\b(?!!)/g, replace: function(portion) {
  var text = portion.text
  return createSpan('<del>' + text + '</del><ins>' + text +'!</ins>')
}})
findAndReplaceDOMText(main, { find: /\b\w+-\w+\b/g, replace: function(portion) {
  var text = portion.text
  return createSpan('<del>' + text.replace(/-/g, ' ') + '</del><ins>' + text + '</ins>')
}})
