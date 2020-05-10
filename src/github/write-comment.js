/**
 * Write a comment in an issue
 * @param {import('actions-toolkit').Toolkit} tools
 * @param {string} comment
 */
module.exports = async (tools, comment) => {
  try {
    await tools.github.issues.createComment({
      ...tools.context.repo,
      issue_number: tools.context.issue.number,
      body: comment,
    });
  } catch (error) {
    tools.log.info(`Error happens when we was adding the comment: ${error}`);
  }
};
