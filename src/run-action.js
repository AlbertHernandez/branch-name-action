const writeComment = require('./github/write-comment');

const DEFAULT_COMMENT_FOR_WRONG_BRANCH_NAME = 'The name of this branch is not \n following the standards of this project!';

module.exports = async tools => {
  const branchPattern = tools.inputs.branch_pattern;
  const commentForWrongBranchName = tools.inputs.comment_for_wrong_branch_name || DEFAULT_COMMENT_FOR_WRONG_BRANCH_NAME;
  const branchName = tools.context.payload.pull_request.head.ref;

  const match = new RegExp(branchPattern).test(branchName);

  if (match) {
    tools.log.info('match yes!');
  } else {
    await writeComment(tools, DEFAULT_COMMENT_FOR_WRONG_BRANCH_NAME.split('\n').join('\n'));
    tools.log.info('match false!');
  }
};
