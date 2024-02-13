export interface ValidationSchema {
    [key: string]: {
        required: boolean;
        availableValues?: string[]
    }
}