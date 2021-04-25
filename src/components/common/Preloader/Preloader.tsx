import React from "react";
import style from "./Preloader.module.css";
import preloader from "../../../assets/image/preloader.svg";


export function Preloader(){
    return <div className={style.overlay}>
        <img src={preloader} width="40" alt="preloader"/>
    </div>
}