# slack-my-amazon
![Build Status](https://codebuild.us-east-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoibUl6TE1IUG1qKzRQTTloV3psVEdaQWU4alpGS2R1enBOT21OcGxMSzAyaFAzby9oMGpLWE1aZ3dzd25EUldWaEdOa3pLQVdFSVpKSXVTV0Vib3d2S1FrPSIsIml2UGFyYW1ldGVyU3BlYyI6IlNwL2dyNmhWMlhZTVhJUG4iLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/trespass-tech/slack-my-amazon/badge.svg)](https://snyk.io/test/github/trespass-tech/slack-my-amazon)

Integrates your AWS services and applications with Slack by streaming CloudWatch events into Slack WebHooks.

**Supported AWS services:**
- AWS CodeCommit
- AWS CodePipeline coming soon
  - Contributors welcome!

## Installation
### tl;dr
```
pip install awscli --upgrade --user
aws configure
```
then
```
npm install -g serverless
git clone https://github.com/trespass-tech/slack-my-amazon.git
cd slack-my-amazon
npm install
npm run lint
npm test
```
then
<pre>sls deploy --region <i>your-aws-region</i> --slack_url <i>https://your-slack-webhooks-url</i></pre>

### Fast way didn't work for me

#### Install Node.js
Use official [Node.js 8+](https://nodejs.org/) distribution.
#### Install and configure AWS CLI
Follow [installation instructions](https://docs.aws.amazon.com/cli/latest/userguide/installing.html) from AWS.

#### Set up Slack Incoming WebHooks
Install and set up Incoming WebHooks from [Slack App Directory](https://slack.com/apps/A0F7XDUAZ-incoming-webhooks)

#### Install Serverless
```
npm install -g serverless
```

#### Clone from GitHub
```
git clone https://github.com/trespass-tech/slack-my-amazon.git
```

#### Build the source
```
cd slack-my-amazon
npm install
npm run lint
npm test
```

#### Deploy
<pre>sls deploy --region <i>your-aws-region</i> --slack_url <i>https://your-slack-webhooks-url</i></pre>
