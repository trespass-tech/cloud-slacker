const request = require('request-promise');

module.exports.notify = (event, context, callback) => {
  console.log(event);
  console.log(`Slack: ${process.env.slack_url}`);

  request({
    method: 'POST',
    uri: process.env.slack_url,
    body: {
      text: 'This is a line of text.\nAnd this is another one.',
    },
    json: true,
  }).then(() => {
    callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
  });
};
