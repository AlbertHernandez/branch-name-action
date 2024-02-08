import { Toolkit } from 'actions-toolkit';
import runAction from './run-action';
import validateParameters from './validations/validate-parameters';
import parametersSchema from './parameters-schema';

Toolkit.run(
    async (tools: Toolkit) => {
        tools.log.info('Validating parameters...');
        validateParameters(tools, parametersSchema);

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
        ],
        secrets: ['GITHUB_TOKEN'],
    },
);
