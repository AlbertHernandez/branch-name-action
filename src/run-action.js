const writeComment = require('./github/write-comment');

module.exports = async tools => {
  const branchPattern = tools.inputs.branch_pattern;

  await writeComment(tools, 'Hello world! \n Banana!');
};
