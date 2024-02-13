import { Toolkit } from 'actions-toolkit';

/**
 * Write a comment in an issue
 * @param {import('actions-toolkit').Toolkit} tools
 * @param {string} comment
 */
export default async function writeComment(
  tools: Toolkit,
  comment: string,
): Promise<void> {
  await tools.github.issues.createComment({
    ...tools.context.repo,
    issue_number: tools.context.issue.issue_number,
    body: comment,
  });
}
