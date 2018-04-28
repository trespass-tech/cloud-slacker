const mochaPlugin = require('serverless-mocha-plugin');
mochaPlugin.chai.use(require('chai-string'));

const expect = mochaPlugin.chai.expect;
const wrapped = mochaPlugin.getWrapper('code-build', '/handlers/code-build.js', 'notify');

describe('code-build', () => {
  before((done) => {
    done();
  });

  it('Responds with success', () => wrapped.run({}).then((response) => {
    expect(response.message).to.containIgnoreCase('success');
  }));
});
