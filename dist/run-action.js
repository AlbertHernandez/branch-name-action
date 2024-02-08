"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const write_comment_1 = __importDefault(require("./github/write-comment"));
const DEFAULT_COMMENT_FOR_INVALID_BRANCH_NAME = 'The name of this branch is not \n following the standards of this project!';
function runAction(tools) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const branchPattern = tools.inputs.branch_pattern;
        const failIfInvalidBranchName = tools.inputs.fail_if_invalid_branch_name;
        const ignoreBranchPattern = tools.inputs.ignore_branch_pattern;
        const commentForInvalidBranchName = tools.inputs.comment_for_invalid_branch_name || DEFAULT_COMMENT_FOR_INVALID_BRANCH_NAME;
        const branchName = (_c = (_b = (_a = tools.context) === null || _a === void 0 ? void 0 : _a.payload) === null || _b === void 0 ? void 0 : _b.pull_request) === null || _c === void 0 ? void 0 : _c.head.ref;
        let isValidBranchName = false;
        if (branchPattern) {
            isValidBranchName = new RegExp(branchPattern).test(branchName);
        }
        if (ignoreBranchPattern) {
            const isIgnoredBranch = new RegExp(ignoreBranchPattern).test(branchName);
            if (isIgnoredBranch) {
                tools.log.info('This branch should be ignored');
                return;
            }
        }
        if (isValidBranchName) {
            tools.log.info('This branch has a valid name');
            return;
        }
        tools.log.info('This branch has an invalid name');
        yield (0, write_comment_1.default)(tools, commentForInvalidBranchName);
        if (failIfInvalidBranchName === 'true') {
            tools.exit.failure();
        }
    });
}
exports.default = runAction;
