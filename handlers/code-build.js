

module.exports.notify = (event, context, callback) => {
  console.log(event);
  callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
