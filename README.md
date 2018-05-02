# slack-my-amazon
![Build Status](https://codebuild.us-east-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoibUl6TE1IUG1qKzRQTTloV3psVEdaQWU4alpGS2R1enBOT21OcGxMSzAyaFAzby9oMGpLWE1aZ3dzd25EUldWaEdOa3pLQVdFSVpKSXVTV0Vib3d2S1FrPSIsIml2UGFyYW1ldGVyU3BlYyI6IlNwL2dyNmhWMlhZTVhJUG4iLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/trespass-tech/slack-my-amazon/badge.svg)](https://snyk.io/test/github/trespass-tech/slack-my-amazon)

One click serverless  deployment to get your AWS service events as Slack notifications.

## Work in progress
**Contributors welcome!**

## Integrates Slack with:
- AWS CodeCommit

## Installation
### Install Node.js
Use official [Node.js 8+](https://nodejs.org/) distribution
### Install and configure AWS CLI
* Install [from AWS](https://docs.aws.amazon.com/cli/latest/userguide/installing.html)
* If you have python installed, you can use `pip install awscli --upgrade --user`
* Run `aws configure` to set up AWS access
### Set up Slack Incoming WebHooks
Install and set up Incoming WebHooks from [Slack App Directory](https://slack.com/apps/A0F7XDUAZ-incoming-webhooks)
### One-click
_Scripting yet to be done_
### Clone and compile
#### Install Serverless
* `npm install -g serverless`
#### Clone from GitHub
* `git clone https://github.com/trespass-tech/slack-my-amazon.git`
#### Build the source
* `npm install`
#### Lint and test
* `npm run lint`
* `npm test`
#### Deploy
* `sls deploy --slack_url https://your-slack-webhooks-url`
