import { InputType } from 'actions-toolkit/lib/inputs';
import { ActionParams } from '../domain/action-params.model';

/**
 * Create action paramaters
 *
 * @param inputs GitHub Action inputs
 *
 * @returns Action parameters
 */
export default function createActionParams(inputs: InputType): ActionParams {
    const { branch_pattern, fail_if_invalid_branch_name, ignore_branch_pattern, comment_for_invalid_branch_name } = inputs;

    if (!branch_pattern || !fail_if_invalid_branch_name || !ignore_branch_pattern || !comment_for_invalid_branch_name) {
        return null;
    }

    return {
        branchPattern: branch_pattern,
        failIfInvalidBranchName: fail_if_invalid_branch_name,
        ignoreBranchPattern: ignore_branch_pattern,
        commentForInvalidBranchName: comment_for_invalid_branch_name,
    };
}
