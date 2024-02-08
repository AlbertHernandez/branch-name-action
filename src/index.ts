import { Toolkit } from "actions-toolkit";
import { validateParameters } from "./application/validate-parameters.use-case";
import { writeComment } from "./application/write-comment.use-case";
import { ActionParams } from "./domain/action-params.model";
import { parametersSchema } from "./domain/parameters-schema.const";

Toolkit.run(
  async (tools: Toolkit): Promise<void> => {
    tools.log.info('Validating parameters...');

    validateParameters(tools, parametersSchema);

    try {
      tools.log.info('Running the action...');

      const { branch_pattern, fail_if_invalid_branch_name, ignore_branch_pattern, comment_for_invalid_branch_name } = tools.inputs;

      if (branch_pattern && fail_if_invalid_branch_name && ignore_branch_pattern && comment_for_invalid_branch_name) {

        const actionParams: ActionParams = {
          branchPattern: branch_pattern,
          failIfInvalidBranchName: fail_if_invalid_branch_name,
          ignoreBranchPattern: ignore_branch_pattern,
          commentForInvalidBranchName: comment_for_invalid_branch_name,
        };

        if(tools.context.payload.pull_request) {
          const branchName = tools.context.payload.pull_request.head.ref;
          const isValidBranchName = new RegExp(actionParams.branchPattern).test(branchName);
    
          if (actionParams.ignoreBranchPattern) {
            const isIgnoredBranch = new RegExp(actionParams.ignoreBranchPattern).test(branchName);

            if (isIgnoredBranch) {
              tools.log.info('This branch should be ignored');

              return;
            }
          }
    
          if (isValidBranchName) {
            tools.log.info('This branch has a valid name');
            
            return;
          }
    
          tools.log.info('This branch has an invalid name');
    
          await writeComment(tools, actionParams.commentForInvalidBranchName);
    
          if (actionParams.failIfInvalidBranchName === 'true') {
            tools.exit.failure();
          }
        } else {
          tools.log.error('No pull request was found');
        }
        
      } else {
        tools.log.error('No parameters were provided');
      }

      
    } catch (error) {
      tools.log.error('Unexpected error happened when action was running: ', error);
    }
  },
  {
    event: ['pull_request.opened'],
    secrets: ['GITHUB_TOKEN'],
  },
);
