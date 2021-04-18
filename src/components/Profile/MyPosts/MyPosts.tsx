import React from "react";
import style from "./MyPosts.module.css";
import {addPost, onPostChange, PostType} from "../../../redux/profileReducer";
import {AppStateType} from "../../../redux/store";
import {connect} from "react-redux";

export function MyPosts(props: MyPostsPropsType) {
    return (
        <div className={style.item}>
            <h3>My posts</h3>
            <div>
                <textarea name="post" id="newPost"/>
            </div>
            <div>
                <button>Add post</button>
            </div>
            <div>New post</div>
            {props.posts.map(post => <div>{post.message}  {post.name}</div>)}
        </div>
    )
}


type mapStateToPropsType = {
    posts: PostType[],
    newPostText: string
}

type mapDispatchToProps = {
    addPost: () => void,
    onPostChange: (newText: string) => void
}

export type MyPostsPropsType = mapStateToPropsType & mapDispatchToProps

let mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText
})

export default connect(mapStateToProps, {addPost, onPostChange})(MyPosts);