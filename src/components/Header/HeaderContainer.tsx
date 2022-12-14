import React from "react";
import {connect} from "react-redux";
import {Logout, SetAuthData} from "../../redux/auth-reducer";
import {Header} from "./Header";
import {AppStateType} from "../../redux/redux-store";
import {AuthAPI} from "../../api/auth-api";

type MapStateToPropsType = {
	isAuth: boolean
	login: string | null
}
type MapDispatchToPropsType = {
	SetAuthData: (data:object, isAuth:boolean) => void
	Logout: () => void
}
type OwnPropsType = {

}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType


class HeaderContainer extends React.Component<PropsType, AppStateType> {

	componentDidMount() {
		AuthAPI.authMe().then(data => {
			if ( data.resultCode === 0 ) {
				this.props.SetAuthData(data, true);
			}
		});

	}
	componentDidUpdate(prevProps:PropsType) {

		if (prevProps.isAuth !== this.props.isAuth){


			AuthAPI.authMe().then(data => {
				if ( data.resultCode === 0 ) {
					this.props.SetAuthData(data, true);
				}
			});
		}

	}

	render(){
		return(
			<Header isAuth={this.props.isAuth} Logout={this.props.Logout} login={this.props.login}/>
	)

	}
}

const mapStateToProps = (state: AppStateType) => {
	return {
		isAuth: state.auth.isAuth,
		login: state.auth.data.login
	}
}

export default connect(mapStateToProps, {SetAuthData, Logout})(HeaderContainer);