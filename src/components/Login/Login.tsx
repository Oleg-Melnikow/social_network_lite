import React from "react";
import s from "./Login.module.css"
import avatar from "../../assets/image/avatar-guest.gif"
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/FormsControl/FormsControl";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/authReducer";
import {AppStateType} from "../../redux/store";
import {Redirect} from "react-router-dom";

type FormType = {
    email: string,
    password: string,
    rememberMe: boolean
}

const LoginForm: React.FC<InjectedFormProps<FormType>> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <p>Email Address</p>
        <Field component={Input} type="text" placeholder="Enter email" name="email"
               validate={[required]}/>
        <p>Password</p>
        <Field component={Input} type="password" placeholder="Enter Password" name="password"
               validate={[required]}/>
        <div className={s.remember}>
            <Field component="input" type="checkbox" name="rememberMe"/>
            <p>Remember me</p></div>
        {props.error && <div style={{border: "1px solid red", color: "darkred", padding: "10px"}}>
            {props.error}
        </div>}
        <input type="submit" value="Sing In"/>
    </form>
}

const LoginReduxForm = reduxForm<FormType>({form: "login"})(LoginForm);

type mapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean) => void
}

type mapStateToPropsType = {
    isAuth: boolean
}
type LoginType = mapStateToPropsType & mapDispatchToPropsType

const Login = (props: LoginType) => {

    const onSubmit = (formData: FormType) => {
        let {email, password, rememberMe} = formData
        props.login(email, password, rememberMe)
    }

    return props.isAuth ?
        <Redirect to="/profile"/> :
        <div className={s.wrap}>
            <div className={s.login}>
                <img src={avatar} alt="avatar" className={s.avatar}/>
                <h2>Login</h2>
                <LoginReduxForm onSubmit={onSubmit}/>
            </div>
        </div>
}

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login)