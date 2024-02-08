import { Toolkit } from 'actions-toolkit';

/**
 * Write a comment in an issue
 *
 * @param tools GitHub Action Toolkit
 * @param comment Comment to be written
 */
export default async function writeComment(tools: Toolkit, comment: string): Promise<void> {
    await tools.github.issues.createComment({
        ...tools.context.repo,
        issue_number: tools.context.issue.issue_number,
        body: comment,
    });
}
