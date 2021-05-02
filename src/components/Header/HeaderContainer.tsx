import React from "react";
import {Header} from "./Header";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/store";
import {AuthType, getAuthUserData} from "../../redux/authReducer";

class HeaderContainer extends React.Component<AuthPropsType> {

    componentDidMount() {
        this.props.getAuthUserData()
    }

    render() {
        return <Header auth={this.props.auth}/>
    }
}

type mapStateToPropsType = {
    auth: AuthType
}

type mapDispatchToPropsType = {
    getAuthUserData: () => void
}

export type AuthPropsType = mapStateToPropsType & mapDispatchToPropsType;

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({auth: state.auth});

export default connect(mapStateToProps, {getAuthUserData})(HeaderContainer);