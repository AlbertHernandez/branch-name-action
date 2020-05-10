const writeComment = require('./github/write-comment');

const DEFAULT_COMMENT_FOR_WRONG_BRANCH_NAME = 'The name of this branch is not \n following the standards of this project!';

module.exports = async tools => {
  const branchPattern = tools.inputs.branch_pattern;
  const failIfWrongBranchName = tools.inputs.fail_if_wrong_branch_name;
  const commentForWrongBranchName = tools.inputs.comment_for_wrong_branch_name || DEFAULT_COMMENT_FOR_WRONG_BRANCH_NAME;
  const branchName = tools.context.payload.pull_request.head.ref;

  const isCorrectBranchName = new RegExp(branchPattern).test(branchName);

  if (isCorrectBranchName) {
    return;
  }

  await writeComment(tools, commentForWrongBranchName);

  if (failIfWrongBranchName === 'true') {
    tools.exit.failure();
  }
};
