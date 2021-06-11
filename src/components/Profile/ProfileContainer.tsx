import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/store";
import {getStatusProfile, getUserProfile, savePhoto, updateStatusProfile} from "../../redux/profileReducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {ProfileType} from "../../api/api";

type mapStateToPropsType = {
    profile: ProfileType | null,
    status: string,
    authorizedUserId: number | null
}

type mapDispatchToPropsType = {
    getUserProfile: (userId: number) => void,
    getStatusProfile: (userId: number) => void,
    updateStatusProfile: (status: string) => void
    savePhoto: (photo: File) => void
}

type PathParamsType = {
    userId: string
}

type ProfilePropsType = mapStateToPropsType & mapDispatchToPropsType;
type PropsType = RouteComponentProps<PathParamsType> & ProfilePropsType;

class ProfileContainer extends React.Component<PropsType> {

    refreshProfile() {
        let userId: number = +this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId || 0;
            if (!userId) {
                this.props.history.push("/login");
            }
        }
        this.props.getUserProfile(userId);
        this.props.getStatusProfile(+userId);
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: Readonly<PropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return (
            <Profile profile={this.props.profile} savePhoto={this.props.savePhoto}
                     isOwner={!this.props.match.params.userId}
                     status={this.props.status} updateStatusProfile={this.props.updateStatusProfile}/>
        )
    }
}

let mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatusProfile, updateStatusProfile, savePhoto}),
    withAuthRedirect,
    withRouter
)(ProfileContainer);