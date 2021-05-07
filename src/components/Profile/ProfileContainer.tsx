import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/store";
import {getStatusProfile, getUserProfile, profileType, updateStatusProfile} from "../../redux/profileReducer";
import {RouteComponentProps, withRouter } from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import { compose } from "redux";

type mapStateToPropsType = {
    profile: profileType | null,
    status: string
}

type mapDispatchToPropsType = {
    getUserProfile: (userId: string) => void,
    getStatusProfile: (userId: number) => void,
    updateStatusProfile: (status: string) => void
}

type PathParamsType = {
    userId: string
}

type ProfilePropsType = mapStateToPropsType & mapDispatchToPropsType;
type PropsType = RouteComponentProps<PathParamsType> & ProfilePropsType;

class ProfileContainer extends React.Component<PropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        !userId && (userId = "1354");
        this.props.getUserProfile(userId);
        this.props.getStatusProfile(+userId);
    }

    render(){
        return (
            <Profile profile={this.props.profile}
                     status={this.props.status} updateStatusProfile={this.props.updateStatusProfile}/>
        )
    }
}

let mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatusProfile, updateStatusProfile}),
    withAuthRedirect,
    withRouter
)(ProfileContainer);