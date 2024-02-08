import { ActionParams } from '../domain/action-params.model';

/**
 * Check if the branch should be ignored
 *
 * @param branchName The name of the branch
 * @param actionParams The action parameters
 *
 * @returns True if the branch should be ignored, false otherwise
 */
export default function isBranchIgnored(branchName: string, actionParams: ActionParams): boolean {
    return actionParams.ignoreBranchPattern && new RegExp(actionParams.ignoreBranchPattern).test(branchName);
}
