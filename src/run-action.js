const writeComment = require('./github/write-comment');

module.exports = async tools => {
  const branchPattern = tools.inputs.branch_pattern;
  console.log('branchPattern: ', branchPattern);

  // await writeComment(tools, 'Hello world! \n Banana!');
};
