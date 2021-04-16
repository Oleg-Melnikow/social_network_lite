import React from "react";
import style from "./Profile.module.css";

export function Profile() {
    return (
        <div className={style.content}>
            <div>
                <img src="https://pbs.twimg.com/profile_banners/3145195603/1500320606/1500x500" alt="pic"/>
            </div>
            <h3>My posts</h3>
            <div>
                <textarea name="post" id="newPost"/>
            </div>
            <div>
                <button>Add post</button>
            </div>
            <div>New post</div>
        </div>
    )
}