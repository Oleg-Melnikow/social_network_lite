import React from "react";
import s from "./Login.module.css"
import avatar from "../../assets/image/avatar-guest.gif"
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {CreateField, Input} from "../common/FormsControl/FormsControl";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {CaptchaType, login} from "../../redux/authReducer";
import {AppStateType} from "../../redux/store";
import {Redirect} from "react-router-dom";

type FormType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
}


const LoginForm: React.FC<InjectedFormProps<FormType, CaptchaType> & CaptchaType> = (props) => {

    let {handleSubmit, error, captchaUrl} = props;

    return <form onSubmit={handleSubmit}>
        {CreateField(Input, "Enter email", "email", [required], "Email Address", "text")}
        {CreateField(Input, "Enter Password", "password", [required], "Password", "password")}
        <div className={s.remember}>
            <Field component="input" type="checkbox" name="rememberMe"/>
            <p>Remember me</p>
        </div>

        {captchaUrl && <img src={captchaUrl} alt="captchaUrl"/>}
        {captchaUrl && CreateField(Input, "Symbol from image", "captcha", [required])}

        {error && <div style={{border: "1px solid red", color: "darkred", padding: "10px"}}>
            {error}
        </div>}
        <input type="submit" value="Sing In"/>
    </form>
}

const LoginReduxForm = reduxForm<FormType, CaptchaType>({form: "login"})(LoginForm);

type mapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

type mapStateToPropsType = {
    isAuth: boolean,
    captchaUrl: string | null
}
type LoginType = mapStateToPropsType & mapDispatchToPropsType

const Login = (props: LoginType) => {

    const onSubmit = (formData: FormType) => {
        let {email, password, rememberMe, captcha} = formData
        props.login(email, password, rememberMe, captcha)
    }


    return props.isAuth ?
        <Redirect to="/profile"/> :
        <div className={s.wrap}>
            <div className={s.login}>
                <img src={avatar} alt="avatar" className={s.avatar}/>
                <h2>Login</h2>
                <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
            </div>
        </div>
}

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, {login})(Login)