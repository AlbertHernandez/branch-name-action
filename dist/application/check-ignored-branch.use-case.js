"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Check if the branch should be ignored
 *
 * @param branchName The name of the branch
 * @param actionParams The action parameters
 *
 * @returns True if the branch should be ignored, false otherwise
 */
function isBranchIgnored(branchName, actionParams) {
    if (typeof actionParams.ignoreBranchPattern === 'string' && actionParams.ignoreBranchPattern.trim() !== '') {
        return new RegExp(actionParams.ignoreBranchPattern).test(branchName);
    }
    return false;
}
exports.default = isBranchIgnored;
