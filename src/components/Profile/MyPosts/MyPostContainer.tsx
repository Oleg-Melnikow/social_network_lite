import {addPost, PostType} from "../../../redux/profileReducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/store";

type mapStateToPropsType = {
    posts: PostType[]
}

type mapDispatchToProps = {
    addPost: (message: string) => void,
}

export type MyPostsPropsType = mapStateToPropsType & mapDispatchToProps;

let mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    posts: state.profilePage.posts
})

export default connect(mapStateToProps, {addPost})(MyPosts)