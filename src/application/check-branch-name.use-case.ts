import { ActionParams } from '../domain/action-params.model';

/**
 * Check if the branch name is valid
 *
 * @param branchName The name of the branch
 * @param actionParams The action parameters
 *
 * @returns True if the branch name is valid, false otherwise
 */
export default function isValidBranchName(branchName: string, actionParams: ActionParams): boolean {
    return new RegExp(actionParams.branchPattern).test(branchName);
}
