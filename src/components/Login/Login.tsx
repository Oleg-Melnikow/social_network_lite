import React from "react";
import s from "./Login.module.css"
import avatar from "../../assets/image/avatar-guest.gif"

const LoginForm = () => {
    return <form>
        <p>Email Address</p>
        <input type="text" placeholder="Enter email" name="email"/>
        <p>Password</p>
        <input type="password" placeholder="Enter Password" name="password"/>
        <div className={s.remember}>
            <input type="checkbox" name="rememberMe"/>
            <p>Remember me</p></div>
        <input type="submit" value="Sing In"/>
    </form>
}

export const Login = () => {
    return <div className={s.wrap}>
            <div className={s.login}>
                <img src={avatar} alt="avatar" className={s.avatar}/>
                <h2>Login</h2>
                <LoginForm/>
            </div>
        </div>
}