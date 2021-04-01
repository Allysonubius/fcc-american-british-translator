const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');
const endpoint = '/api/translate';

suite('Functional Tests', () => {
  test('Translation with text and locale fields', (done) => {
    const text = "Mangoes are my favorite fruit.";
    const expected = 'Mangoes are my <span class="highlight">favourite</span> food.';

    chai.request(server)
      .post(endpoint)
      .send({
        text: "Mangoes are my favorite fruit.",
        locale: "american-to-british"
      })
      .end((err, res) => {
        assert.notExists(err);
        assert.equal(res.status, 200);

        assert.equal(res.body.text, text);
        assert.equal(res.body.translation, expected);

        done();
      });
  });

  test('Translation with text and invalid locale field', (done) => {
    const text = "Mangoes are my favorite fruit.";
    const invalidLocale = "american-to-japanese";
    const expectedError = "Invalid value for locale field";

    chai.request(server)
      .post(endpoint)
      .send({
        text: text,
        locale: invalidLocale 
      })
      .end((err, res) => {
        assert.notExists(err);
        assert.equal(res.status, 200);

        assert.equal(res.body.error, expectedError);

        done();
      });
  });

  test('Translation with missing text field', (done) => {
    const locale = "american-to-english";
    const expectedError = "Required field(s) missing";

    chai.request(server)
      .post(endpoint)
      .send({
        locale: locale 
      })
      .end((err, res) => {
        assert.notExists(err);
        assert.equal(res.status, 200);

        assert.equal(res.body.error, expectedError);

        done();
      });
  });

  test('Translation with missing locale field', (done) => {
    const text = "Mangoes are my favorite food.";
    const expectedError = "Required field(s) missing";

    chai.request(server)
      .post(endpoint)
      .send({
        text: text,
      })
      .end((err, res) => {
        assert.notExists(err);
        assert.equal(res.status, 200);

        assert.equal(res.body.error, expectedError);

        done();
      });
  });

  test('Translation with empty text', (done) => {
    const text = "";
    const locale = "american-to-british"
    const expectedError = "No text to translate";

    chai.request(server)
      .post(endpoint)
      .send({
        text: text,
        locale: locale
      })
      .end((err, res) => {
        assert.notExists(err);
        assert.equal(res.status, 200);

        assert.equal(res.body.error, expectedError);

        done();
      });
  });
  
  test('Translation with text that needs no translation', (done) => {
    const text = "Mangoes are the best.";
    const locale = "british-to-american"
    const expectedTranslation = "Everything looks good to me!";

    chai.request(server)
      .post(endpoint)
      .send({
        text: text,
        locale: locale
      })
      .end((err, res) => {
        assert.notExists(err);
        assert.equal(res.status, 200);

        assert.equal(res.body.text, text);
        assert.equal(res.body.translation, expectedTranslation);

        done();
      });
  });
});
