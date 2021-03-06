export type FieldValidatorType = (value: string) => string | undefined

export const required: FieldValidatorType = (value) => {
    if(value) return undefined
    return "Field is required"
}

export const maxLength = (maxlength: number): FieldValidatorType => (value) => {
    if(value.length > maxlength) return `Max length is ${maxlength} symbols`
    return undefined
}