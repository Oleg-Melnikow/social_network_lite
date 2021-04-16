import React from "react";
import style from "./NavBar.module.css";
import {NavLink} from "react-router-dom";

export function NavBar() {
    return (
        <nav className={style.navBar}>
            <div>
                <NavLink to="/profile" activeClassName={style.active}>Profile</NavLink>
            </div>
            <div>
                <NavLink to="/dialogs" activeClassName={style.active}>Messages</NavLink>
            </div>
            <div>
                <NavLink to="/users" activeClassName={style.active}>Users</NavLink>
            </div>
            <div>
                <NavLink to="/settings" activeClassName={style.active}>Settings</NavLink>
            </div>
        </nav>
    )
}