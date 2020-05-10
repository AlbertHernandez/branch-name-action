require('dotenv').config();

const { Toolkit } = require('actions-toolkit');

const runAction = require('./src/run-action');
const validateRequiredParameters = require('./src/validations/validate-required-parameters');

Toolkit.run(
  async tools => {
    tools.log.info('Validating required parameters...');
    validateRequiredParameters(tools, [
      'branch_pattern',
    ]);

    tools.log.info('Running the action...');
    await runAction(tools);
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
