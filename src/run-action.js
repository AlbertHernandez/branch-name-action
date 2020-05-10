const writeComment = require('./github/write-comment');

const DEFAULT_COMMENT = 'The name of this branch is not following the standards of this project!';

module.exports = async tools => {
  const branchPattern = tools.inputs.branch_pattern;
  const branchName = tools.context.payload.pull_request.head.ref;

  const match = new RegExp(branchPattern).test(branchName);

  if (match) {
    tools.log.info('match yes!');
  } else {
    tools.log.info('match false!');
  }


  // await writeComment(tools, 'Hello world! \n Banana!');
};
