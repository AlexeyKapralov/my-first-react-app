import React from "react";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";

export function withAuthRedirect(Component:any) {
    class RedirectComponent extends React.Component<MapStateToPropsForRedirectType>{

        render() {
            if (this.props.isAuth) {
                return <Component {...this.props}/>
            }else{
                return <Navigate to={"/login"}/>
            }
        }
    }

    type MapStateToPropsForRedirectType = {
        isAuth: boolean
    }
    const MapStateToPropsForRedirect = (state: AppStateType) => {
        return {
            isAuth: state.auth.isAuth
        }
    }
    return connect(MapStateToPropsForRedirect)(RedirectComponent)
}