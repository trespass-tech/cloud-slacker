const request = require('request-promise');

module.exports.notify = (event, context, callback) => {
  console.log(event);

  let color;

  switch (event.detail['build-status']) {
    case 'SUCCESSFUL':
      color = 'good';
      break;
    default:
      color = '';
  }

  request({
    method: 'POST',
    uri: process.env.slack_url,
    body: {
      attachments: [{
        color,
        title: `Build ${event.detail['build-status']}`,
      }],
    },
    json: true,
  }).then(() => {
    callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
  });
};
