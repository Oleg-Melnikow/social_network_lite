import profileReducer, {addPost, onPostChange, ProfilePageType} from "./profileReducer";

let startState: ProfilePageType;

beforeEach(() => {
    startState = {
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
})

test('title of textarea should be changed', () => {

    const action = onPostChange("Hello friend");
    const endState = profileReducer(startState, action)

    expect(endState.newPostText).toBe("Hello friend");
});

test('correct post should be added from array', () => {

    const action = addPost();
    const endState = profileReducer(startState, action)

    expect(endState.posts.length).toBe(3);
    expect(endState.posts[0].message).toBe(startState.newPostText);
});