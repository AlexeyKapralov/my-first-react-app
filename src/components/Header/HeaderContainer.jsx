import s from './Header.module.css';
import React from "react";
import {connect} from "react-redux";
import {SetAuthData} from "../../redux/auth-reducer";
import Header from "./Header";
import axios from "axios";

class HeaderContainer extends React.Component {

	componentDidMount() {
		axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
			withCredentials: true} ).then(response => {
			if ( response.data.resultCode === 0 ) {
				this.props.SetAuthData(response.data);
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