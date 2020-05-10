const writeComment = require('./github/write-comment');

const defaultCommentForWrongBranchName = 'The name of this branch is not following the standards of this project!';

module.exports = async tools => {
  const branchPattern = tools.inputs.branch_pattern;
  const commentForWrongBranchName = tools.inputs.comment_for_wrong_branch_name || defaultCommentForWrongBranchName;
  const branchName = tools.context.payload.pull_request.head.ref;

  const match = new RegExp(branchPattern).test(branchName);

  if (match) {
    tools.log.info('match yes!');
  } else {
    await writeComment(tools, commentForWrongBranchName);
    tools.log.info('match false!');
  }
};
