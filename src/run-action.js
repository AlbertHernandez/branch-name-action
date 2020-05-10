const writeComment = require('./github/write-comment');

module.exports = async tools => {
  const branchPattern = tools.inputs.branch_pattern;
  tools.log.info('branchPattern: ', branchPattern);

  const text = 'hello world!';
  const regexp = '/^hello/';

  const match = regexp.test(text);

  if (match) {
    tools.log.info('match yes!');
  } else {
    tools.log.info('match false!');
  }


  // await writeComment(tools, 'Hello world! \n Banana!');
};
