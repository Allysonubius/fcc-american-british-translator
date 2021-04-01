'use strict';

const { json } = require('body-parser');
const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      // Validation
      if (req.body.text == undefined || !req.body.locale) {
        return res.json({error: "Required field(s) missing"});
      }

      if (req.body.text == "") return res.json({error: "No text to translate"});

      if (req.body.locale != "american-to-british" && req.body.locale != "british-to-american") {
        return res.json({error: 'Invalid value for locale field'});
      }

      // Translate
      let text = req.body.text;
      let translation;

      if (req.body.locale == 'american-to-british') {
        translation = translator.americanToBritish(text);
      }

      if (req.body.locale == 'british-to-american') {
        translation = translator.britishToAmerican(text);
      }

      if (text == translation) return res.json({
        text: text,
        translation: "Everything looks good to me!"
      });

      return res.json({
        text: text,
        translation: translation
      });
    });
};
