"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Get parameters with invalid values
 *
 * @param inputs GitHub Action inputs
 * @param schema The parameters schema
 *
 * @returns The parameters with invalid values
 */
function getParametersWithInvalidValues(inputs, schema) {
    return Object.entries(schema).reduce((acc, [parameter, parameterConfig]) => {
        if (!parameterConfig.availableValues) {
            return acc;
        }
        if (!parameterConfig.required && !inputs[parameter]) {
            return acc;
        }
        if (!parameterConfig.availableValues.includes(inputs[parameter])) {
            acc.push(parameter);
        }
        return acc;
    }, []);
}
exports.default = getParametersWithInvalidValues;
