const request = require('request-promise');

module.exports.notify = (event, context, callback) => {
  let color;

  switch (event.detail['build-status']) {
    case 'IN_PROGRESS':
      color = '#16b';
      break;
    case 'SUCCEEDED':
      color = 'good';
      break;
    case 'FAILED':
      color = 'danger';
      break;
    default:
      color = '';
      break;
  }

  let buildStatus;

  switch (event.detail['build-status']) {
    case 'IN_PROGRESS':
      buildStatus = 'STARTED';
      break;
    default:
      buildStatus = event.detail['build-status'];
      break;
  }

  const buildArn = event.detail['build-id'];
  const buildId = buildArn.substring(buildArn.indexOf(':build/') + 7);

  request({
    method: 'POST',
    uri: process.env.slack_url,
    body: {
      attachments: [{
        color,
        author_name: event.detail['project-name'],
        title: `Build ${buildStatus}`,
        title_link: `https://console.aws.amazon.com/codebuild/home?region=${event.region}#/builds/${buildId}/view/new`,
        footer: `Source: ${event.detail['additional-information']['source-version']}`,
      }],
    },
    json: true,
  }).then(() => {
    callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
  });
};
