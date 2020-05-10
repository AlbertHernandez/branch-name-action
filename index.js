require('dotenv').config();

const { Toolkit } = require('actions-toolkit');

const runAction = require('./src/run-action');
const validateRequiredParameters = require('./src/validations/validate-parameters');

Toolkit.run(
  async tools => {
    tools.log.info('Validating required parameters...');
    validateRequiredParameters(tools, {
      branch_pattern: {
        required: true,
      },
      fail_if_wrong_branch_name: {
        required: true,
        availableValues: ['true', 'false'],
      },
    });

    try {
      tools.log.info('Running the action...');
      await runAction(tools);
    } catch (error) {
      tools.log.info('Unexpected error happened when action was running: ', error);
    }
  },
  {
    event: [
      'pull_request.opened',
      'pull_request.edited',
      'pull_request.synchronize',
    ],
    secrets: ['GITHUB_TOKEN'],
  },
);
