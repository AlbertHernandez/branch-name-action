"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parametersSchema = {
    branch_pattern: {
        required: true,
    },
    fail_if_invalid_branch_name: {
        required: false,
        availableValues: ['true', 'false'],
    },
    comment_for_invalid_branch_name: {
        required: false,
    },
    ignore_branch_pattern: {
        required: false,
    },
};
exports.default = parametersSchema;
