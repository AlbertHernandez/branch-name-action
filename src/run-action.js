const writeComment = require('./github/write-comment');

module.exports = async tools => {
  const branchPattern = tools.inputs.branch_pattern;
  tools.log.info('branchPattern: ', branchPattern);
  tools.log.info('test: ', tools.context.payload);

  const text = 'hello world!';
  const pattern = '/^hello/';

  const match = new RegExp(pattern).test(text);

  if (match) {
    tools.log.info('match yes!');
  } else {
    tools.log.info('match false!');
  }


  // await writeComment(tools, 'Hello world! \n Banana!');
};
