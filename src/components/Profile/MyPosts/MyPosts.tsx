import React from "react";
import style from "./MyPosts.module.css";
import {Post} from "./Post/Post";
import {MyPostsPropsType} from "./MyPostContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {TextArea} from "../../common/FormsControl/FormsControl";
import {maxLength, required} from "../../../utils/validators/validators";

const maxLengthPost = maxLength(10);

export function MyPosts(props: MyPostsPropsType) {

    function addPost(formData: FormType){
        props.addPost(formData.post)
    }

    return (
        <div className={style.item}>
            <h3>My posts</h3>
            <PostForm onSubmit={addPost}/>
            <div>New post</div>
            {props.posts.map(post => <Post key={post.id} id={post.id} avatar={post.avatar} name={post.name}
                                                       message={post.message} time={post.time}/>)}
        </div>
    )
}

const AddPostForm: React.FC<InjectedFormProps<FormType>> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field name="post" component={TextArea} placeholder="Enter your post"
                   validate={[required, maxLengthPost]}/>
        </div>
        <div>
            <input type="submit" value="Add post"/>
        </div>
    </form>
}

type FormType = {
    post: string
}

const PostForm = reduxForm<FormType>({form: "post"})(AddPostForm);