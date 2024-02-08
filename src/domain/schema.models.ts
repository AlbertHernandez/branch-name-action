type ParameterSchema = {
    required: boolean;
    availableValues?: string[];
};

export interface ParametersSchema {
    branch_pattern: ParameterSchema;
    fail_if_invalid_branch_name: ParameterSchema;
    comment_for_invalid_branch_name: ParameterSchema;
    ignore_branch_pattern: ParameterSchema;
};