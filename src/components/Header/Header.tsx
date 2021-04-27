import React from "react";
import {NavLink} from "react-router-dom";
import style from "./Header.module.css";

import {AuthType} from "../../redux/authReducer";

type HeaderPropsType = { auth: AuthType }

export function Header(props: HeaderPropsType) {
    let {login, isAuth} = props.auth
    return (
        <header className={style.header}>
            <div className={style.login}>
                {isAuth ? <span>{login}</span> : <NavLink to={"/login"}>Login</NavLink>}
            </div>
        </header>
    )
}