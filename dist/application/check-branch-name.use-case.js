"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Check if the branch name is valid
 *
 * @param branchName The name of the branch
 * @param actionParams The action parameters
 *
 * @returns True if the branch name is valid, false otherwise
 */
function isValidBranchName(branchName, actionParams) {
    return new RegExp(actionParams.branchPattern).test(branchName);
}
exports.default = isValidBranchName;
