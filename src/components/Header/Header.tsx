import React from "react";
import {NavLink} from "react-router-dom";
import style from "./Header.module.css";
import {AuthType} from "../../redux/authReducer";

type HeaderPropsType = {
    auth: AuthType,
    logout: () => void
}

export function Header(props: HeaderPropsType) {
    let {login, isAuth} = props.auth
    return (
        <header className={style.header}>
            <div className={style.login}>
                {isAuth ?
                    <div className={style.userLogin}>
                        <span>{login}</span>
                        <span className={style.logout}
                              onClick={props.logout}>logout</span>
                    </div>:
                    <NavLink to={"/login"}>Login</NavLink>}
            </div>
        </header>
    )
}