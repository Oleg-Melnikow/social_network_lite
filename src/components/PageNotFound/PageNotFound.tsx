import React, {MouseEvent, useState} from "react";
import {NavLink} from "react-router-dom";
import s from "./PageNotFound.module.css"

export function PageNotFound() {

    let [positionX, setPositionX] = useState<string>("");
    let [positionY, setPositionY] = useState<string>("");

    function move(e: MouseEvent) {
        setPositionX(`${-e.clientX / 5}px`);
        setPositionY(`${-e.clientY / 5}px`);
    }

    return (
        <div className={s.container} id="found" onMouseMove={move}
             style={{backgroundPositionX: positionX, backgroundPositionY: positionY}}>
            <div className={s.content}>
                <h2>404</h2>
                <h4>Ops! Page not found</h4>
                <p>The page you were looking for doesn't exist. You may have mistyped
                    the address or the page may have moved.</p>
                <NavLink to="/profile">Back to home</NavLink>
            </div>
        </div>
    )
}