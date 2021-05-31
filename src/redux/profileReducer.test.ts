import profileReducer, {addPost, deletePost, ProfilePageType} from "./profileReducer";

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
        profile: null,
        status: ""
    }
});

test('correct post should be added from array', () => {

    const action = addPost("Hello friend");
    const endState = profileReducer(startState, action)

    expect(endState.posts.length).toBe(3);
    expect(endState.posts[0].message).toBe("Hello friend");
});

test('after deleted length of message should be decrement', () => {

    const action = deletePost(1);
    const endState = profileReducer(startState, action)

    expect(endState.posts.length).toBe(1);
});

test(`'after deleted length of message shouldn't be decrement if id is incorrect`, () => {

    const action = deletePost(1000);
    const endState = profileReducer(startState, action)

    expect(endState.posts.length).toBe(2);
});