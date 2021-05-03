import React, {ComponentType} from "react";
import {connect} from "react-redux";
import {AppStateType} from "../redux/store";
import {Redirect} from "react-router-dom";

type mapStateToPropsType = {
    isAuth: boolean
}

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({isAuth: state.auth.isAuth});

export function withAuthRedirect<T>(Component: ComponentType<T>) {
    const RedirectComponent = (props: mapStateToPropsType) => {
        let {isAuth, ...restProps} = props
        return isAuth ?
            <Component {...restProps as T}/> :
            <Redirect to="/login"/>
    }

    return connect(mapStateToProps, {})(RedirectComponent)
}