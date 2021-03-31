/**
 * Returns a reversed object.
 *
 * Example:  
 * - Input: {a: b, c: d}
 * - Output: {b: a, d: c}
 * 
 * @param {object} obj object to be reversed
 * @returns {object} reversed object
 */
export function reverseObject(obj) {
  let newObj = {};

  for (prop in obj) {
    let value = obj[prop];

    newObj[value] = prop;
  }

  return newObj;
}

export function replaceTimeSeparator(sentence, sep, newSep, highlight = (word) => word) {
  let newSentence = sentence.slice();
  const regex = new RegExp("\\d\\d" + sep + "\\d\\d", 'g');

  const matches = sentence.match(regex);

  if (matches) {
    matches.forEach((match) => {
    const replacedMatch = match.replace(sep, newSep);
    newSentence = newSentence.replace(match, highlight(replacedMatch));
  });
  }

  return newSentence;
}