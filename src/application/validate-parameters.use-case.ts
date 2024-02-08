import { Toolkit } from "actions-toolkit";
import { getParametersWithEmptyValues } from "./get-params-empty.use-case";
import { getParametersWithInvalidValues } from "./get-params-invalid.use-case";

/**
 * Validate input parameters of the action
 * 
 * @para tools GitHub Action Toolkit
 */
export const validateParameters = (tools: Toolkit, schema) => {
  const parametersWithEmptyValues = getParametersWithEmptyValues(tools, schema);

  if (parametersWithEmptyValues.length) {
    tools.exit.failure(
      `You forgot to provide some required values: [${parametersWithEmptyValues.join(
        ', ',
      )}]`,
    );
  }

  const parametersWithInvalidValues = getParametersWithInvalidValues(tools, schema);

  if (parametersWithInvalidValues.length) {
    tools.exit.failure(
      `Some parameters have invalid values: [${parametersWithInvalidValues.join(
        ', ',
      )}]`,
    );
  }
};