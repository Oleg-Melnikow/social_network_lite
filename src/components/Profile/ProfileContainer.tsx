import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/store";
import {getUserProfile, profileType, setUserProfile} from "../../redux/profileReducer";
import {RouteComponentProps, withRouter } from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import { compose } from "redux";

type mapStateToPropsType = {
    profile: profileType | null
}

type mapDispatchToPropsType = {
    setUserProfile: (profile: profileType) => void
    getUserProfile: (userId: string) => void
}

type PathParamsType = {
    userId: string,
}

type ProfilePropsType = mapStateToPropsType & mapDispatchToPropsType;
type PropsType = RouteComponentProps<PathParamsType> & ProfilePropsType;

class ProfileContainer extends React.Component<PropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        !userId && (userId = "2");
        this.props.getUserProfile(userId);
    }

    render(){
        return (
            <Profile profile={this.props.profile}/>
        )
    }
}

let mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    profile: state.profilePage.profile
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {setUserProfile, getUserProfile}),
    withAuthRedirect,
    withRouter
)(ProfileContainer);