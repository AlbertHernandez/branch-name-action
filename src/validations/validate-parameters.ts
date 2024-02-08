import { Toolkit } from 'actions-toolkit';

const getParametersWithEmptyValues = (tools: Toolkit, schema: Record<any, any>): any => {
    return Object.entries(schema).reduce<any>((acc, [parameter, parameterConfig]) => {
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

const getParametersWithInvalidValues = (tools: Toolkit, schema: Record<any, any>): any => {
    return Object.entries(schema).reduce<any>((acc, [parameter, parameterConfig]) => {
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
export default async function validateParameters(tools: Toolkit, schema: Record<any, any>): Promise<void> {
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
}
