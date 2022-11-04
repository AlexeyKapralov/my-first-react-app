import React from "react";
import {connect} from "react-redux";
import {Logout, SetAuthData} from "../../redux/auth-reducer.tsx";
import {Header} from "./Header";
import {AuthAPI} from "../../api/api";

class HeaderContainer extends React.Component {

	componentDidMount() {
		AuthAPI.authMe().then(data => {
			if ( data.resultCode === 0 ) {
				this.props.SetAuthData(data, true);
			}
		});

	}
	componentDidUpdate(prevProps) {

		if (prevProps.state.isAuth !== this.props.state.isAuth){


			AuthAPI.authMe().then(data => {
				if ( data.resultCode === 0 ) {
					this.props.SetAuthData(data, true);
				}
			});
		}

	}

	render(){
		return(
			<Header state={this.props.state} Logout={this.props.Logout}/>
	)

	}
}

const mapStateToProps = (state) => {
	return {
		state: state.auth,
	}
}

export default connect(mapStateToProps, {SetAuthData, Logout})(HeaderContainer);