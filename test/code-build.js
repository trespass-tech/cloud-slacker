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
    nock.cleanAll();
    const slack = nock(process.env.slack_url).persist()
      .post('', body => body).reply(200);
    wrapped.run({
      detail: {
        'build-status': 'status-1',
      },
    }).then(() => {
      slack.done();
    });
  });

  it('Sends build status in the subject line', () => {
    nock.cleanAll();
    const slack = nock(process.env.slack_url).persist()
      .post(
        '',
        body => body.attachments[0].title.includes('status-1'),
      )
      .reply(200);
    wrapped.run({
      detail: {
        'build-status': 'status-1',
      },
    }).then(() => {
      slack.done();
    });
  });

  it('Colours "green" when build successful ', () => {
    nock.cleanAll();
    const slack = nock(process.env.slack_url).persist()
      .post(
        '',
        body => body.attachments[0].color === 'good',
      )
      .reply(200);
    wrapped.run({
      detail: {
        'build-status': 'SUCCESSFUL',
      },
    }).then(() => {
      slack.done();
    });
  });

  it('Responds with success', () => {
    nock.cleanAll();
    nock(process.env.slack_url).persist()
      .post('', body => body).reply(200);
    wrapped.run({
      detail: {
        'build-status': 'status-1',
      },
    }).then((response) => {
      expect(response.message).to.containIgnoreCase('success');
    });
  });
});
