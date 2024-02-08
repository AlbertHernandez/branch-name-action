import { InputType } from 'actions-toolkit/lib/inputs';
import { ParametersSchema } from '../domain/schema.models';

/**
 * Get parameters with empty values
 *
 * @param toolkit GitHub Action Toolkit
 */
export default function getParametersWithEmptyValues(inputs: InputType, schema: ParametersSchema): string[] {
    return Object.entries(schema).reduce<string[]>((acc, [parameter, parameterConfig]) => {
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
