import {addPost, onPostChange, PostType} from "../../../redux/profileReducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/store";

type mapStateToPropsType = {
    posts: PostType[],
    newPostText: string
}

type mapDispatchToProps = {
    addPost: () => void,
    onPostChange: (newText: string) => void
}

export type MyPostsPropsType = mapStateToPropsType & mapDispatchToProps;

let mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText
})

export default connect(mapStateToProps, {addPost, onPostChange})(MyPosts)