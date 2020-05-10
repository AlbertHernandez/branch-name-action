const getParametersWithEmptyValues = (tools, config) => {
  return Object.entries(config).reduce(
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

/**
 * Validate correct parameters of the action
 * @param {import('actions-toolkit').Toolkit} tools
 * @param {object} config
 */
module.exports = (tools, config) => {
  const parametersWithEmptyValues = getParametersWithEmptyValues(tools, config);

  if (parametersWithEmptyValues.length !== 0) {
    tools.exit.failure(
      `You forgot to provide some required values: [${parametersWithEmptyValues.join(
        ', ',
      )}]`,
    );
  }
};
