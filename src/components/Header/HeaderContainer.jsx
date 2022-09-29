import s from './Header.module.css';
import React from "react";
import {connect} from "react-redux";
import {SetAuthData} from "../../redux/auth-reducer";
import Header from "./Header";
import axios from "axios";
import {AuthAPI} from "../../api/api";

class HeaderContainer extends React.Component {

	componentDidMount() {
		AuthAPI.authMe().then(data => {
			if ( data.resultCode === 0 ) {
				this.props.SetAuthData(data);
			}
		});
	}

	render(){
		return(
			<Header state={this.props.state}/>
	)

	}
}

const mapStateToProps = (state) => {
	return {
		state: state.auth,
	}
}

export default connect(mapStateToProps, {SetAuthData})(HeaderContainer);