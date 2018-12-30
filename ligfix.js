function createSpan(html, cls) {
  var span = document.createElement('span')
  span.className = cls
  span.innerHTML = html.trim()
  return span
}

var overlay_sub = ['ilo', 'kasi', 'lukin', 'ma', 'sitelen', 'telo']
var overlay_sup = ['sitelen', 'telo']

var rules = [
{ find: /\bni:/g, replace: function() {
  return createSpan('<span class="nimi-ni"><span>ni</span></span><span class="colon">:</span>', 'overlay-glyphs ni-colon')
}},
{ find: /\bseme\?/g, replace: 'seme', wrap: 'span', wrapClass: 'punct nimi-seme' },
{ find: /([\[\]\w=-]*),/g, replace: function(_, match) {
  return createSpan(match[1] + '<span class="ligfix"><del>,</del><ins>\u3001</ins></span>', 'punct')
}},
{ find: /([\[\]\w=-]*)\./g, replace: function(_, match) {
  return createSpan(match[1] + '<span class="ligfix"><del>.</del><ins>\u3002</ins></span>', 'punct')
}},
{ find: /([\[\]\w=-]+):/g, forceContext: true, replace: function(portion, match) {
  return createSpan(match[1] + '<span class="ligfix"><del>:</del><ins>\uff1a</ins></span>', 'punct')
}},
{ find: /\?/g, replace: function() {
  return createSpan('<del>?</del><ins>seme</ins>', 'ligfix qmark')
}},
{ find: /[\[\]\w=-]*!/g, wrap: 'span', wrapClass: 'punct bang' },
{ find: /\bpi=([\w=-]+)\b/g, replace: function(_, match) {
  return createSpan('<span>pi</span> <span>' + match[1] + '</span>', 'pi-kulupu')
}},
{ find: /\b([\w-]+)=([\w-]+)\b/g, replace: function(_, match) {
  var m1 = match[1]
  var ps = ''
  if(overlay_sub.includes(match[1]))
    m1 = '<span class="ligfix"><del>' + match[1] + '</del></span>'
  if(overlay_sup.includes(match[1]))
    ps = '<span class="nimi-' + match[1] + '"></span>'
  return createSpan('<span class="nimi-' + match[1] + '">' + m1 + '</span> <span class="nimi-' + match[2] + '">' + match[2] + '</span>' + ps, 'overlay-glyphs')
}},
{ find: /\bli\b/g, wrap: 'span', wrapClass: 'nimi-li' },
{ find: /\bla\b/g, wrap: 'span', wrapClass: 'nimi-la' },
{ find: /\b[aeo]\b(?!!)/g, replace: function(portion) {
  var text = portion.text
  return createSpan('<del>' + text + '</del><ins>' + text +'!</ins>', 'ligfix nimi-' + text)
}},
{ find: /\b\w+-\w+\b/g, replace: function(portion) {
  var text = portion.text
  return createSpan('<del>' + text.replace(/-/g, ' ') + '</del><ins>' + text + '</ins>', 'ligfix')
}},
{ find: /([\w=-]*)\[(\w+)\]/g, replace: function(_, match) {
  var lit = match[2].split('_').slice(1).map(function(word) { return word[0] }).join('')
  lit = lit[0].toUpperCase() + lit.substr(1)
  return createSpan('<del>' + match[1] + ' ' + lit + '</del><ins>' + match[0] + '</ins>', 'cartouche')
}},
]

var main = document.querySelector('main')
for(var i = 0; i < rules.length; i++) findAndReplaceDOMText(main, rules[i])
