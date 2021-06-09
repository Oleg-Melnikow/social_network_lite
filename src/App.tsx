import React, {ComponentType} from 'react';
import { Route, withRouter } from 'react-router-dom';
import './App.css';
import {NavBar} from "./components/NavBar/NavBar";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {AppStateType} from "./redux/store";
import { compose } from 'redux';
import {connect} from "react-redux";
import {initializeApp} from "./redux/appReducer";
import {Preloader} from "./components/common/Preloader/Preloader";
import {withSuspense} from "./hoc/withSuspense";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));

class App extends React.Component<AppPropType> {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {

        if(!this.props.initialized){
            return <Preloader/>
        }

        return (
            <div className="app-wrap">
                <HeaderContainer/>
                <NavBar/>
                <div className="wrap-content">
                    <Route path="/profile/:userId?" render={() => withSuspense(ProfileContainer)}/>
                    <Route path="/dialogs" render={() =>withSuspense(DialogsContainer)}/>
                    <Route path="/users" render={() => <UsersContainer/>}/>
                    <Route path="/login" render={() => <Login/>}/>
                </div>
            </div>
        );
    }
}

type mapStateToPropsType = { initialized: boolean }

type mapDispatchToPropsType = { initializeApp: () => void }

type AppPropType = mapDispatchToPropsType & mapStateToPropsType;

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    initialized: state.app.initialized
});

export default compose<ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

