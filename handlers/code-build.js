const request = require('request-promise');

module.exports.notify = (event, context, callback) => {
  let color;

  switch (event.detail['build-status']) {
      case 'SUCCEEDED':
          color = 'good';
          break;
      case 'FAILED':
          color = 'danger';
          break;
    default:
      color = '';
  }

  const buildArn = event.detail['build-id'];
  const buildId = buildArn.substring(buildArn.indexOf(':build/') + 7);

  request({
    method: 'POST',
    uri: process.env.slack_url,
    body: {
      attachments: [{
        color,
        title: `Build ${event.detail['build-status']}`,
        title_link: `https://console.aws.amazon.com/codebuild/home?region=${event.region}#/builds/${buildId}/view/new`,
      }],
    },
    json: true,
  }).then(() => {
    callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
  });
};
