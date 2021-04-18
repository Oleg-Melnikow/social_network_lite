import React from "react";
import style from "./Profile.module.css";
import MyPosts from "./MyPosts/MyPosts";

export function Profile() {
    return (
        <div className={style.content}>
            <div>
                <img src="https://pbs.twimg.com/profile_banners/3145195603/1500320606/1500x500" alt="pic"/>
            </div>
            <MyPosts/>
        </div>
    )
}