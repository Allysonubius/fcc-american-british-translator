const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator();

suite('Unit Tests', () => {
  suite('American to British tests', () => {
    const testPairs = {
      'Mangoes are my favorite fruit.': 'Mangoes are my <span class="highlight">favourite</span> fruit.',
      'I ate yogurt for breakfast.': 'I ate <span class="highlight">yoghurt</span> for breakfast.',
      "We had a party at my friend's condo.": 'We had a party at my friend\'s <span class="highlight">flat</span>.',
      "Can you toss this in the trashcan for me?": 'Can you toss this in the <span class="highlight">bin</span> for me?',
      "The parking lot was full.": 'The <span class="highlight">car park</span> was full.',
      "Like a high tech Rube Goldberg machine.": 'Like a high tech <span class="highlight">Heath Robinson device</span>.',
      "To play hooky means to skip class or work.": 'To <span class="highlight">bunk off</span> means to skip class or work.',
      "No Mr. Bond, I expect you to die.": 'No <span class="highlight">Mr</span> Bond, I expect you to die.',
      "Dr. Grosh will see you now.": '<span class="highlight">Dr</span> Grosh will see you now.',
      "Lunch is at 12:15 today.": 'Lunch is at <span class="highlight">12.15</span> today.'
    };

    for (const sentence in testPairs) {
      test(sentence, (done) => {
        const expected = testPairs[sentence];

        const translation = translator.americanToBritish(sentence);
        assert.equal(translation, expected);
        done();
      });
    }
  });
});
