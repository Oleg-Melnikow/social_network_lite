import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/store";
import {profileAPI} from "../../api/api";
import {profileType, setUserProfile} from "../../redux/profileReducer";
import {RouteComponentProps, withRouter } from "react-router-dom";

type mapStateToPropsType = {
    profile: profileType | null
}

type mapDispatchToPropsType = {
    setUserProfile: (profile: profileType) => void
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
        profileAPI.setUserProfile(userId)
            .then(response => {
                this.props.setUserProfile(response.data)
            })
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

export default connect(mapStateToProps, {setUserProfile})(withRouter(ProfileContainer))