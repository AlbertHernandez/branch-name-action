import { Toolkit } from 'actions-toolkit';
import writeComment from './github/write-comment';

// eslint-disable-next-line max-len
const DEFAULT_COMMENT_FOR_INVALID_BRANCH_NAME = 'The name of this branch is not \n following the standards of this project!';

export default async function runAction(tools: Toolkit): Promise<void> {
  const branchPattern = tools.inputs.branch_pattern;
  const failIfInvalidBranchName = tools.inputs.fail_if_invalid_branch_name;
  const ignoreBranchPattern = tools.inputs.ignore_branch_pattern;
  // eslint-disable-next-line max-len
  const commentForInvalidBranchName = tools.inputs.comment_for_invalid_branch_name || DEFAULT_COMMENT_FOR_INVALID_BRANCH_NAME;
  const branchName = tools.context?.payload?.pull_request?.head.ref;

  let isValidBranchName = false;
  if (branchPattern) {
    isValidBranchName = new RegExp(branchPattern).test(branchName);
  }

  if (ignoreBranchPattern) {
    const isIgnoredBranch = new RegExp(ignoreBranchPattern).test(branchName);
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

  await writeComment(tools, commentForInvalidBranchName);

  if (failIfInvalidBranchName === 'true') {
    tools.exit.failure();
  }
}
