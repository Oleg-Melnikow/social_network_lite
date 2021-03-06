import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/store";
import {
    setCurrentPage,
    setTotalCount,
    setUsers,
    toggleFollow,
    toggleIsFetching,
    toggleFollowingProgress,
    getUsers, unFollow, follow
} from "../../redux/usersReducer";
import {Users} from "./Users";
import {Preloader} from "../common/Preloader/Preloader";
import {UserType} from "../../api/api";
import {
    getCurrentPage, getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsersSelector
} from "../../redux/usersSelectors";

type mapStateToPropsType = {
    users: UserType[],
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: number[]
}

type mapDispatchToPropsType = {
    setCurrentPage: (currentPage: number) => void,
    getUsers: (currentPage: number, pageSize: number) => void,
    follow: (userId: number) => void,
    unFollow: (userId: number) => void
}

export type UsersPropsType = mapStateToPropsType & mapDispatchToPropsType;

export class UsersContainer extends React.Component<UsersPropsType> {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
    }

    render() {
        return (
            <>
                {this.props.isFetching && <Preloader/>}
                <Users totalUsersCount={this.props.totalUsersCount} pageSize={this.props.pageSize}
                       onPageChanged={this.onPageChanged} currentPage={this.props.currentPage}
                       follow={this.props.follow} unFollow={this.props.unFollow}
                       followingInProgress={this.props.followingInProgress}
                       users={this.props.users}/>
            </>
        )
    }
}

let mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    users: getUsersSelector(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state)
})


export default connect(mapStateToProps, {
    getUsers,
    unFollow,
    follow,
    toggleFollow,
    setUsers,
    setCurrentPage,
    setTotalCount,
    toggleIsFetching,
    toggleFollowingProgress
})(UsersContainer);

