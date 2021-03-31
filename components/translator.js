const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

function smartReplace(sentence, dictionary, highlight = (s) => s, ignorePunctuation=true) {
  const _punctuation = /[.,]/g;
  let newSentence = sentence.slice();

  const words = sentence.split(' ');
  const nWords = words.length;
  let phrases = []; // Phrases of l length found in sentence.

  for (let l = nWords; l > 0; l--) {
    for (let i = 0; i < nWords - l + 1; i++) {
      let newPhrase = words.slice(i, i + l).join(' ').toLowerCase();
      if (ignorePunctuation) newPhrase = newPhrase.replace(_punctuation, '');
      phrases.push(newPhrase);
    }
  }

  // Replace
  phrases.forEach((phrase) => {
    // console.log(`\n[${phrase}]: [${dictionary[phrase]}]`);
    let regexp = new RegExp(phrase, 'gi');
    if (dictionary[phrase]) newSentence = newSentence.replace(regexp, highlight(dictionary[phrase]));
  });

  return newSentence;
};

function highlight(word) {
  return '<span class="highlight">' + word + "</span>";
}

function highlightCapitalize(word) {
  const capitalized = word[0].toUpperCase() + word.slice(1);
  return '<span class="highlight">' + capitalized + "</span>";
}

function americanToBritishTime(sentence, highlight = (word) => word) {
  let newSentence = sentence.slice();
  const regex = /\d\d\:\d\d/g;

  const matches = sentence.match(regex);

  if (matches) {
    matches.forEach((match) => {
    const replacedMatch = match.replace(':', '.');
    newSentence = newSentence.replace(match, highlight(replacedMatch));
  });
  }

  return newSentence;
}

class Translator {
  

  americanToBritish(sentence) {
    let newSentence = sentence.slice();

    newSentence = smartReplace(newSentence, americanOnly, highlight);
    newSentence = smartReplace(newSentence, americanToBritishSpelling, highlight);
    newSentence = smartReplace(newSentence, americanToBritishTitles, highlightCapitalize, false);
    newSentence = americanToBritishTime(newSentence, highlight);

    return newSentence;
  }

  britishToAmerican(sentence) {}
}

module.exports = Translator;