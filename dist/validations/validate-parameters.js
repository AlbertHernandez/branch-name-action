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
Object.defineProperty(exports, "__esModule", { value: true });
const getParametersWithEmptyValues = (tools, schema) => {
    return Object.entries(schema).reduce((acc, [parameter, parameterConfig]) => {
        if (!parameterConfig.required) {
            return acc;
        }
        if (tools.inputs[parameter]) {
            return acc;
        }
        acc.push(parameter);
        return acc;
    }, []);
};
const getParametersWithInvalidValues = (tools, schema) => {
    return Object.entries(schema).reduce((acc, [parameter, parameterConfig]) => {
        if (!parameterConfig.availableValues) {
            return acc;
        }
        if (!parameterConfig.required && !tools.inputs[parameter]) {
            return acc;
        }
        if (!parameterConfig.availableValues.includes(tools.inputs[parameter])) {
            acc.push(parameter);
        }
        return acc;
    }, []);
};
/**
 * Validate correct parameters of the action
 * @param {import('actions-toolkit').Toolkit} tools
 * @param {object} schema
 */
function validateParameters(tools, schema) {
    return __awaiter(this, void 0, void 0, function* () {
        const parametersWithEmptyValues = getParametersWithEmptyValues(tools, schema);
        if (parametersWithEmptyValues.length) {
            tools.exit.failure(`You forgot to provide some required values: [${parametersWithEmptyValues.join(', ')}]`);
        }
        const parametersWithInvalidValues = getParametersWithInvalidValues(tools, schema);
        if (parametersWithInvalidValues.length) {
            tools.exit.failure(`Some parameters have invalid values: [${parametersWithInvalidValues.join(', ')}]`);
        }
    });
}
exports.default = validateParameters;
