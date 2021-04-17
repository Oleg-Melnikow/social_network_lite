const ADD_POST = "ADD_POST";
const UPDATE_NEW_POST_TEXT = "UPDATE_NEW_POST_TEXT";

export type PostType = {
    id: number,
    avatar: string,
    name: string,
    message: string,
    time: string
}

export type ProfilePageType = {
    posts: Array<PostType>,
    newPostText: string,
}

let initialState: ProfilePageType = {
    posts: [
        {
            id: 1,
            avatar: "https://s.starladder.com/uploads/user_logo/5/c/0/f/meta_tag_66fb805dd1ae6ed6151784bfe300298c.jpg",
            name: "Nick",
            message: "Welcome to the New",
            time: "20:00"
        },
        {
            id: 2,
            avatar: "https://s.starladder.com/uploads/user_logo/5/c/0/f/meta_tag_66fb805dd1ae6ed6151784bfe300298c.jpg",
            name: "Nick",
            message: "Hello boy!!",
            time: "21:22"
        }
    ],
    newPostText: ""
}


export type addPostActionType = {
    type: typeof ADD_POST
}

export type onPostChangeActionType = {
    type: typeof UPDATE_NEW_POST_TEXT,
    newText: string
}

export type ProfilePageActionsTypes = addPostActionType | onPostChangeActionType;

export const addPost = (): addPostActionType => ({type: ADD_POST});
export const onPostChange = (newText: string): onPostChangeActionType => ({type: UPDATE_NEW_POST_TEXT, newText});

const profileReducer = (state = initialState, action: ProfilePageActionsTypes): ProfilePageType => {
    switch (action.type) {
        case ADD_POST:
            const time = new Date()
            const postTime = `${time.getHours()}:${time.getMinutes()}`
            return {
                ...state,
                newPostText: "",
                posts: [{
                    id: state.posts.length + 1,
                    avatar: "https://s.starladder.com/uploads/user_logo/5/c/0/f/meta_tag_66fb805dd1ae6ed6151784bfe300298c.jpg",
                    message: state.newPostText,
                    name: "Jack",
                    time: postTime
                }, ...state.posts]
            }
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText
            }
        default:
            return state
    }
}

export default profileReducer;
