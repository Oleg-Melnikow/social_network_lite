import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/store";
import {
    setCurrentPage,
    setTotalCount,
    setUsers,
    toggleFollow,
    toggleIsFetching,
    UserType
} from "../../redux/usersReducer";
import {Users} from "./Users";
import {userAPI} from "../../api/api";
import {Preloader} from "../common/Preloader/Preloader";

type mapStateToPropsType = {
    users: UserType[],
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean
}

type mapDispatchToPropsType = {
    toggleFollow: (userId: number) => void,
    setUsers: (users: Array<UserType>) => void,
    setCurrentPage: (currentPage: number) => void,
    setTotalCount: (totalCount: number) => void,
    toggleIsFetching: (isFetching: boolean) => void
}

export type UsersPropsType = mapStateToPropsType & mapDispatchToPropsType;

export class UsersContainer extends React.Component<UsersPropsType> {

    componentDidMount() {
        this.props.toggleIsFetching(true)
        userAPI.getUsers()
            .then(response => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(response.items);
                this.props.setTotalCount(response.totalCount);
            })
    }

    onPageChanged = (pageNumber: number) => {
        this.props.toggleIsFetching(true)
        this.props.setCurrentPage(pageNumber);
        userAPI.onPageChanged(pageNumber)
            .then(response => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(response.items);
            })
    }

    render() {
        return (
            <>
                {this.props.isFetching && <Preloader/>}
                <Users users={this.props.users} pageSize={this.props.pageSize}
                       totalUsersCount={this.props.totalUsersCount}
                       currentPage={this.props.currentPage}
                       onPageChanged={this.onPageChanged}/>
            </>
        )
    }
}

let mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching
})


export default connect(mapStateToProps, {
    toggleFollow,
    setUsers,
    setCurrentPage,
    setTotalCount,
    toggleIsFetching
})(UsersContainer);

