import {connect} from "react-redux";
import {AppStateType} from "../../redux/store";
import {setUsers, toggleFollow, UserType} from "../../redux/usersReducer";
import { Users } from "./Users";

type mapStateToPropsType = {
    users: UserType[]
}

type mapDispatchToPropsType = {
    toggleFollow: (userId: number) => void,
    setUsers: (users: Array<UserType>) => void
}

export type UsersPropsType = mapStateToPropsType & mapDispatchToPropsType;

let mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    users: state.usersPage.users
})


export default connect(mapStateToProps, {toggleFollow, setUsers})(Users);

