import React, {ChangeEvent} from "react";
import style from "./MyPosts.module.css";
import {Post} from "./Post/Post";
import {MyPostsPropsType} from "./MyPostContainer";

export function MyPosts(props: MyPostsPropsType) {

    function onPostChange(e: ChangeEvent<HTMLTextAreaElement>){
        props.onPostChange(e.currentTarget.value)
    }

    return (
        <div className={style.item}>
            <h3>My posts</h3>
            <div>
                <textarea name="post" id="newPost" value={props.newPostText} onChange={onPostChange}/>
            </div>
            <div>
                <button onClick={props.addPost}>Add post</button>
            </div>
            <div>New post</div>
            {props.posts.map(post => <Post key={post.id} id={post.id} avatar={post.avatar} name={post.name}
                                                       message={post.message} time={post.time}/>)}
        </div>
    )
}