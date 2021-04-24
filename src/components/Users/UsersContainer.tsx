import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/store";
import {setUsers, toggleFollow, UserType} from "../../redux/usersReducer";
import {Users} from "./Users";
import {userAPI} from "../../api/api";

type mapStateToPropsType = {
    users: UserType[]
}

type mapDispatchToPropsType = {
    toggleFollow: (userId: number) => void,
    setUsers: (users: Array<UserType>) => void
}

export type UsersPropsType = mapStateToPropsType & mapDispatchToPropsType;

export class UsersContainer extends React.Component<UsersPropsType> {

    componentDidMount() {
        userAPI.getUsers()
            .then(response => {
                this.props.setUsers(response.items);
            })
    }

    render() {
        return (
            <Users users={this.props.users}/>
        )
    }
}

let mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    users: state.usersPage.users
})


export default connect(mapStateToProps, {toggleFollow, setUsers})(UsersContainer);

