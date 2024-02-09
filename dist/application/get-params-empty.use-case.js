"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Get parameters with empty values
 *
 * @param inputs GitHub Action inputs
 * @param schema The parameters schema
 *
 * @returns The parameters with empty values
 */
function getParametersWithEmptyValues(inputs, schema) {
    return Object.entries(schema).reduce((acc, [parameter, parameterConfig]) => {
        if (!parameterConfig.required) {
            return acc;
        }
        if (inputs[parameter]) {
            return acc;
        }
        acc.push(parameter);
        return acc;
    }, []);
}
exports.default = getParametersWithEmptyValues;
