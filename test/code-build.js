const mochaPlugin = require('serverless-mocha-plugin');
mochaPlugin.chai.use(require('chai-string'));

const { expect } = mochaPlugin.chai;
const wrapped = mochaPlugin.getWrapper('code-build', '/handlers/code-build.js', 'notify');
const nock = require('nock');

describe('code-build', () => {
  before((done) => {
    nock.disableNetConnect();
    process.env.slack_url = 'http://some.slack.random-url123.com/path/token';
    done();
  });

  it('Sends a text message to Slack', () => {
    const slack = nock(process.env.slack_url).persist()
      .post('', body => body.text).reply(200);
    wrapped.run({}).then(() => {
      slack.done();
      slack.persist(false);
    });
  });

  it('Responds with success', () => wrapped.run({}).then((response) => {
    expect(response.message).to.containIgnoreCase('success');
  }));
});
