import { Toolkit } from "actions-toolkit";

/**
 * Get parameters with invalid values
 * 
 * @param toolkit GitHub Action Toolkit
 */
export const getParametersWithInvalidValues = (tools: Toolkit, schema) => {
    return Object.entries(schema).reduce(
      (acc, [parameter, parameterConfig]) => {
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
      }, [],
    );
  };