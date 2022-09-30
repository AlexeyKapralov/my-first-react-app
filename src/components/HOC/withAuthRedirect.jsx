import React from "react";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";





export function withAuthRedirect(Component) {
    class RedirectComponent extends React.Component{

        render() {
            if (this.props.isAuth) {
                return <Component {...this.props}/>
            }else{
                return <Navigate to="/login"/>
            }
        }
    }

    const MapStateToPropsForRedirect = (state) => {
        return {
            isAuth: state.auth.isAuth
        }
    }
    const RedirectComponentWithAuth = connect(MapStateToPropsForRedirect)(RedirectComponent)

    return RedirectComponentWithAuth
}