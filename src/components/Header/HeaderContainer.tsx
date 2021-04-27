import React from "react";
import {Header} from "./Header";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/store";
import {AuthType, setAuthUserData} from "../../redux/authReducer";
import { AuthAPI } from "../../api/api";

class HeaderContainer extends React.Component<AuthPropsType> {

    componentDidMount() {
        AuthAPI.me()
            .then(response => {
                this.props.setAuthUserData(response.data)
            })
    }

    render() {
        return <Header auth={this.props.auth}/>
    }
}

type mapStateToPropsType = {
    auth: AuthType
}

type mapDispatchToPropsType = {
    setAuthUserData: (data: AuthType) => void
}

export type AuthPropsType = mapStateToPropsType & mapDispatchToPropsType;

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({auth: state.auth});

export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer);