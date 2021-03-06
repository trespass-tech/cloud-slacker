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


  it('Responds with success', () => {
    nock.cleanAll();
    nock(process.env.slack_url).persist()
      .post('', body => body).reply(200);
    wrapped.run({
      detail: {
        'build-id': 'build-1',
        'build-status': 'status-1',
        'additional-information': {
          'source-version': 'version-1',
        },
      },
    }).then((response) => {
      expect(response.message).to.containIgnoreCase('success');
    });
  });

  it('Sends a text message to Slack', () => {
    nock.cleanAll();
    const slack = nock(process.env.slack_url).persist()
      .post('', body => body).reply(200);
    wrapped.run({
      detail: {
        'build-id': 'build-1',
        'build-status': 'status-1',
        'additional-information': {
          'source-version': 'version-1',
        },
      },
    }).then(() => {
      slack.done();
    });
  });

  it('Sends build status in the message title', () => {
    nock.cleanAll();
    const slack = nock(process.env.slack_url).persist()
      .post(
        '',
        body => body.attachments[0].title.includes('status-1'),
      )
      .reply(200);
    wrapped.run({
      detail: {
        'build-id': 'build-1',
        'build-status': 'status-1',
        'additional-information': {
          'source-version': 'version-1',
        },
      },
    }).then(() => {
      slack.done();
    });
  });

  it('Says build STARTED when status is in progress', () => {
    nock.cleanAll();
    const slack = nock(process.env.slack_url).persist()
      .post(
        '',
        body => body.attachments[0].title.includes('STARTED'),
      )
      .reply(200);
    wrapped.run({
      detail: {
        'build-id': 'build-1',
        'build-status': 'IN_PROGRESS',
        'additional-information': {
          'source-version': 'version-1',
        },
      },
    }).then(() => {
      slack.done();
    });
  });

  it('Sends build name as Author', () => {
    nock.cleanAll();
    const slack = nock(process.env.slack_url).persist()
      .post(
        '',
        body => body.attachments[0].author_name.includes('project-1'),
      )
      .reply(200);
    wrapped.run({
      detail: {
        'build-id': 'build-1',
        'build-status': 'status-1',
        'project-name': 'project-1',
        'additional-information': {
          'source-version': 'version-1',
        },
      },
    }).then(() => {
      slack.done();
    });
  });

  it('Colours message "blue" when build starts ', () => {
    nock.cleanAll();
    const slack = nock(process.env.slack_url).persist()
      .post(
        '',
        body => body.attachments[0].color === '#16b',
      )
      .reply(200);
    wrapped.run({
      detail: {
        'build-id': 'build-1',
        'build-status': 'IN_PROGRESS',
        'additional-information': {
          'source-version': 'version-1',
        },
      },
    }).then(() => {
      slack.done();
    });
  });

  it('Colours message "green" when build successful ', () => {
    nock.cleanAll();
    const slack = nock(process.env.slack_url).persist()
      .post(
        '',
        body => body.attachments[0].color === 'good',
      )
      .reply(200);
    wrapped.run({
      detail: {
        'build-id': 'build-1',
        'build-status': 'SUCCEEDED',
        'additional-information': {
          'source-version': 'version-1',
        },
      },
    }).then(() => {
      slack.done();
    });
  });

  it('Colours message "red" when build fails ', () => {
    nock.cleanAll();
    const slack = nock(process.env.slack_url).persist()
      .post(
        '',
        body => body.attachments[0].color === 'danger',
      )
      .reply(200);
    wrapped.run({
      detail: {
        'build-id': 'build-1',
        'build-status': 'FAILED',
        'additional-information': {
          'source-version': 'version-1',
        },
      },
    }).then(() => {
      slack.done();
    });
  });

  it('Links title to CodeBuild console to see logs', () => {
    nock.cleanAll();
    const slack = nock(process.env.slack_url).persist()
      .post(
        '',
        body => body.attachments[0].title_link === 'https://console.aws.amazon.com/codebuild/home?region=region-1#/builds/my-sample-project:8745a7a9-c340-456a-9166-edf953571bEX/view/new',
      )
      .reply(200);
    wrapped.run({
      region: 'region-1',
      detail: {
        'build-id': 'arn:aws:codebuild:us-west-2:123456789012:build/my-sample-project:8745a7a9-c340-456a-9166-edf953571bEX',
        'build-status': 'status-1',
        'additional-information': {
          'source-version': 'version-1',
        },
      },
    }).then(() => {
      slack.done();
    });
  });
  it('Displays source version in footer', () => {
    nock.cleanAll();
    const slack = nock(process.env.slack_url).persist()
      .post(
        '',
        body => body.attachments[0].footer.includes('version-1'),
      )
      .reply(200);
    wrapped.run({
      region: 'region-1',
      detail: {
        'build-id': 'build-1',
        'build-status': 'status-1',
        'additional-information': {
          'source-version': 'version-1',
        },
      },
    }).then(() => {
      slack.done();
    });
  });
});
