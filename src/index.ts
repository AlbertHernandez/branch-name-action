import { Toolkit } from 'actions-toolkit';
import createActionParams from './application/create-action-params.use-case';
import writeComment from './application/write-comment.use-case';
import getParametersWithEmptyValues from './application/get-params-empty.use-case';
import getParametersWithInvalidValues from './application/get-params-invalid.use-case';
import isBranchIgnored from './application/check-ignored-branch.use-case';
import isValidBranchName from './application/check-branch-name.use-case';
import { ActionParams } from './domain/action-params.model';
import { parametersSchema } from './domain/parameters-schema.const';

Toolkit.run(
    async (tools: Toolkit): Promise<void> => {
        const { context, log, exit, inputs } = tools;

        try {
            const pullRequest = context.payload.pull_request;

            // Check if the event is a pull request
            if (!pullRequest) {
                log.error('❌ No pull request was found');
                return;
            }

            // Validate input parameters
            log.info('🔍 Validating parameters...');

            const emptyParams = getParametersWithEmptyValues(inputs, parametersSchema);
            const invalidParams = getParametersWithInvalidValues(inputs, parametersSchema);

            if (emptyParams.length) {
                exit.failure(`❌ Missing required parameters: [${emptyParams.join(', ')}]`);
            }

            if (invalidParams.length) {
                exit.failure(`❌ Some parameters have invalid values: [${invalidParams.join(', ')}]`);
            }

            // Create action parameters
            const actionParams: ActionParams | null = createActionParams(inputs);

            if (!actionParams) {
                log.error('❌ No parameters were provided');
                return;
            }

            // Check if branch should be ignored
            const branchName = pullRequest.head.ref;

            if (isBranchIgnored(branchName, actionParams)) {
                log.info('🤖 This branch should be ignored');
                return;
            }

            // Check if branch name is valid
            if (isValidBranchName(branchName, actionParams)) {
                log.info('✅ This branch has a valid name');
                return;
            }

            // Write a comment if the branch name is invalid
            log.error('❌ This branch has an invalid name');

            await writeComment(tools, actionParams.commentForInvalidBranchName);

            // Fail the action if the branch name is invalid
            if (actionParams.failIfInvalidBranchName === 'true') {
                exit.failure();
            }
        } catch (error) {
            log.error('❌ Unexpected error happened when action was running: ', error);
        }
    },
    {
        event: ['pull_request.opened'],
        secrets: ['GITHUB_TOKEN'],
    },
);
