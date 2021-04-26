import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/store";
import {profileAPI} from "../../api/api";
import {profileType, setUserProfile} from "../../redux/profileReducer";

type mapStateToPropsType = {
    profile: profileType | null
}

type mapDispatchToPropsType = {
    setUserProfile: (profile: profileType) => void
}

type ProfilePropsType = mapStateToPropsType & mapDispatchToPropsType;

class ProfileContainer extends React.Component<ProfilePropsType> {

    componentDidMount() {
        profileAPI.setUserProfile("1354")
            .then(response => {
                this.props.setUserProfile(response.data)
                console.log(response.data)
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

export default connect(mapStateToProps, {setUserProfile})(ProfileContainer)