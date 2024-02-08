import { Toolkit } from "actions-toolkit";

/**
 * Get parameters with empty values
 * 
 * @param toolkit GitHub Action Toolkit
 */
export const getParametersWithEmptyValues = (tools: Toolkit, schema) => {
    return Object.entries(schema).reduce(
      (acc, [parameter, parameterConfig]) => {
        if (!parameterConfig.required) {
          return acc;
        }
  
        if (tools.inputs[parameter]) {
          return acc;
        }
  
        acc.push(parameter);
        return acc;
      }, [],
    );
};