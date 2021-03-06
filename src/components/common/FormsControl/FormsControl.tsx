import React from "react";
import s from "./FormsControl.module.css";
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";
import {FieldValidatorType} from "../../../utils/validators/validators";

type FormsControlPropsType = {
    meta: WrappedFieldMetaProps,
    children: React.ReactNode

}

export const FormControl: React.FC<FormsControlPropsType> = ({meta: {touched, error}, children}) => {
    const hasError = touched && error

    return <div className={`${s.formControl} ${hasError ? s.error : ""}`}>
        {children}
        <div>
            {hasError && <span>{error}</span>}
        </div>
    </div>
}

export const TextArea: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
}

export const CreateField = (component: React.FC<WrappedFieldProps>, placeholder: string, name: string, validate: FieldValidatorType[], label?: string, type?: string) => {
    return <div>
        <p>{label}</p>
        <Field component={component} type={type} placeholder={placeholder} name={name}
               validate={validate}/>
    </div>
}