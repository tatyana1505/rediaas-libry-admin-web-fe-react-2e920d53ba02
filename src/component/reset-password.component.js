import React, { Component } from 'react';
import { locale } from '../i18n/da.locale';
import { TextField, Button } from '@material-ui/core';

import { connect } from 'react-redux';
import { menuChange } from '../redux/menu/actions';
import { Column } from '../component/grid/grid.component';
import Card from '../component/card.component';
import * as firebase from 'firebase';

import CircularIntegration from './circular-integration.component';


class ResetPassword extends Component {
	constructor(props) {
		super(props)
		this.state = {
			new_password: '',
			verify_password: '',
			passwordMismatch: false,

			email: null,
			success: false,
			validCode: null,
			verifiedCode: false,
		}
	}
	componentDidMount() {
		firebase
			.auth()
			.verifyPasswordResetCode(this.props.actionCode)
			.then(email => {
				this.setState({ email, validCode: true, verifiedCode: true });
			}, error => {
				this.setState({ error: error.message, validCode: false, verifiedCode: true });
			});
	}

	handleResetPassword = () => {
		if (this.state.new_password === this.state.verify_password) {
			const { actionCode } = this.props;
			const newPassword = this.state.new_password;
			firebase
				.auth()
				.confirmPasswordReset(actionCode, newPassword)
				.then(() => {
					this.setState({
						success: true,
						passwordMismatch: false,
					});
				}, error => {
					this.setState({ error: error.message });
				});
		} else {
			this.setState({
				passwordMismatch: true,
			})
		}
	}
	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
		});
	};

	render = () => {
		const {
			success,
			validCode,
			verifiedCode,
		} = this.state;

		let component;
		if (!verifiedCode) {
			component = (
				<div className="center-wrapper">
					<CircularIntegration />
				</div>
			);
		} else if (success) {
			component = (
				<div>
					<div className="ResetPassword">
						<h1>{locale.reset_password.changed}</h1>
						<Card>
							<div className="center-wrapper">
								<p>{locale.reset_password.sign_in_again}</p>
							</div>
						</Card>
					</div>
				</div>
			);
		} else if (verifiedCode && validCode) {
			component = (
				<div>
					<div>
						<h1>{locale.reset_password.title}</h1>
						<Card>
							<Column>
								<div className="center-wrapper">
									<p> {locale.reset_password.type_new_password}</p>
								</div>
								<TextField
									fullWidth
									id="new_password"
									label={locale.reset_password.new_password}
									type='password'
									value={this.state.newPassword}
									onChange={this.handleChange('new_password')}
									margin="normal" />
								<TextField
									fullWidth
									id="verify_password"
									label={locale.reset_password.verify_new_password}
									type='password'
									value={this.state.verifyPassword}
									onChange={this.handleChange('verify_password')}
									margin="normal" />
								<Button color="primary" onClick={() => {
									this.handleResetPassword();
								}}>{locale.reset_password.reset}</Button>
								<div className="center-wrapper">
									{this.state.passwordMismatch ? (
										<p> {locale.reset_password.mismatch}</p>
									) : (
											undefined
										)}
								</div>
							</Column>
						</Card>
					</div>
				</div>
			);
		} else if (verifiedCode && !validCode) {
			component = (
				<div className="ResetPassword">
					<h1>{locale.reset_password.try_again}</h1>
					<Card>
						<div className="center-wrapper">
							<p className="error">{locale.reset_password.invalid_action}</p>
						</div>
					</Card>
				</div>
			);
		}
		return component;
	}
}
const mapStateToProps = state => {
	return {
		menu: state.menu.selectedMenu,
		submenu: state.menu.selectedSubmenu
	}
}
const mapDispatchToProps = dispatch => {
	return {
		changeMenuItem: (menuItem) => {
			dispatch(menuChange(menuItem))
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)