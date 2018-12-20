function createSpan(html, cls) {
  var span = document.createElement('span')
  span.className = cls
  span.innerHTML = html.trim()
  return span
}

var main = document.querySelector('main')
findAndReplaceDOMText(main, { find: /[\w-=]*[,:.!?]/g, wrap: 'span', wrapClass: 'punct' })
findAndReplaceDOMText(main, { find: /\bpi=([\w-=]+)\b/g, replace: function(portion, match) {
  return createSpan('<span>pi</span> <span>' + match[1] + '</span>', 'pi-kulupu')
}})
findAndReplaceDOMText(main, { find: /\b([\w-]+)=([\w-]+)\b/g, replace: function(portion, match) {
  return createSpan('<span class="nimi-' + match[1] + '">' + match[1] + '</span> <span class="nimi-' + match[2] + '">' + match[2] + '</span>', 'overlay-glyphs')
}})
findAndReplaceDOMText(main, { find: /\b[aeo]\b(?!!)/g, replace: function(portion) {
  var text = portion.text
  return createSpan('<del>' + text + '</del><ins>' + text +'!</ins>', 'ligfix')
}})
findAndReplaceDOMText(main, { find: /\b\w+-\w+\b/g, replace: function(portion) {
  var text = portion.text
  return createSpan('<del>' + text.replace(/-/g, ' ') + '</del><ins>' + text + '</ins>', 'ligfix')
}})
