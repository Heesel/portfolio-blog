const matchHtmlRegExp = /[<>]/

function escapeHtml (string) {
  var str = '' + string
  var match = matchHtmlRegExp.exec(str)

  if (!match) {
    return str
  }

  let html = ''
  let lastIndex = 0

  for (let index = match.index; index < str.length; index++) {
    let escapedReplacement = null;
    switch (str.charCodeAt(index)) {
      case 60: // <
        escapedReplacement = '&lt;'
        break
      case 62: // >
        escapedReplacement = '&gt;'
        break
      default:
        continue
    }

    if (lastIndex !== index) {
      html += str.substring(lastIndex, index)
    }

    lastIndex = index + 1
    html += escapedReplacement
  }

  return lastIndex !== index
    ? html + str.substring(lastIndex, index)
    : html
}

export default escapeHtml;