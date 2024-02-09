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
const actions_toolkit_1 = require("actions-toolkit");
const create_action_params_use_case_1 = __importDefault(require("./application/create-action-params.use-case"));
const write_comment_use_case_1 = __importDefault(require("./application/write-comment.use-case"));
const get_params_empty_use_case_1 = __importDefault(require("./application/get-params-empty.use-case"));
const get_params_invalid_use_case_1 = __importDefault(require("./application/get-params-invalid.use-case"));
const check_ignored_branch_use_case_1 = __importDefault(require("./application/check-ignored-branch.use-case"));
const check_branch_name_use_case_1 = __importDefault(require("./application/check-branch-name.use-case"));
const parameters_schema_const_1 = require("./domain/parameters-schema.const");
actions_toolkit_1.Toolkit.run((tools) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    const { context, log, exit, inputs } = tools;
    try {
        const pullRequest = context.payload.pull_request;
        // Check if the event is a pull request
        if (!pullRequest) {
            log.error('❌ No pull request was found');
            return;
        }
        // Validate input parameters
        log.info('🔍 Validating parameters...');
        const emptyParams = (0, get_params_empty_use_case_1.default)(inputs, parameters_schema_const_1.parametersSchema);
        const invalidParams = (0, get_params_invalid_use_case_1.default)(inputs, parameters_schema_const_1.parametersSchema);
        if (emptyParams.length) {
            exit.failure(`❌ Missing required parameters: [${emptyParams.join(', ')}]`);
        }
        if (invalidParams.length) {
            exit.failure(`❌ Some parameters have invalid values: [${invalidParams.join(', ')}]`);
        }
        // Create action parameters
        const actionParams = (0, create_action_params_use_case_1.default)(inputs);
        if (!actionParams) {
            log.error('❌ No parameters were provided');
            return;
        }
        // Check if branch should be ignored
        const branchName = pullRequest.head.ref;
        if ((0, check_ignored_branch_use_case_1.default)(branchName, actionParams)) {
            log.info('🤖 This branch should be ignored');
            return;
        }
        // Check if branch name is valid
        if ((0, check_branch_name_use_case_1.default)(branchName, actionParams)) {
            log.info('✅ This branch has a valid name');
            return;
        }
        // Write a comment if the branch name is invalid
        log.error('❌ This branch has an invalid name');
        yield (0, write_comment_use_case_1.default)(tools, actionParams.commentForInvalidBranchName);
        // Fail the action if the branch name is invalid
        if (actionParams.failIfInvalidBranchName === 'true') {
            exit.failure();
        }
    }
    catch (error) {
        log.error('❌ Unexpected error happened when action was running: ', error);
    }
}), {
    event: ['pull_request'],
    secrets: ['GITHUB_TOKEN'],
});
