import React, {ChangeEvent} from "react";
import style from "./MyPosts.module.css";
import {addPost, onPostChange, PostType} from "../../../redux/profileReducer";
import {AppStateType} from "../../../redux/store";
import {connect} from "react-redux";
import {Post} from "./Post/Post";

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