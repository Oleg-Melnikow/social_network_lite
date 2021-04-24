import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/store";
import {setCurrentPage, setTotalCount, setUsers, toggleFollow, UserType} from "../../redux/usersReducer";
import {Users} from "./Users";
import {userAPI} from "../../api/api";

type mapStateToPropsType = {
    users: UserType[],
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
}

type mapDispatchToPropsType = {
    toggleFollow: (userId: number) => void,
    setUsers: (users: Array<UserType>) => void,
    setCurrentPage: (currentPage: number) => void,
    setTotalCount: (totalCount: number) => void
}

export type UsersPropsType = mapStateToPropsType & mapDispatchToPropsType;

export class UsersContainer extends React.Component<UsersPropsType> {

    componentDidMount() {
        userAPI.getUsers()
            .then(response => {
                this.props.setUsers(response.items);
                this.props.setTotalCount(response.totalCount);
            })
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber);
        userAPI.onPageChanged(pageNumber)
            .then(response => {
                this.props.setUsers(response.items);
            })
    }

    render() {
        return (
            <Users users={this.props.users} pageSize={this.props.pageSize}
                   totalUsersCount={this.props.totalUsersCount}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}/>
        )
    }
}

let mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
})


export default connect(mapStateToProps, {toggleFollow, setUsers, setCurrentPage, setTotalCount})(UsersContainer);

