import { InputType } from 'actions-toolkit/lib/inputs';
import { ParametersSchema } from '../domain/schema.models';

/**
 * Get parameters with invalid values
 *
 * @param toolkit GitHub Action Toolkit
 */
export default function getParametersWithInvalidValues(inputs: InputType, schema: ParametersSchema): string[] {
    return Object.entries(schema).reduce<string[]>((acc, [parameter, parameterConfig]) => {
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
