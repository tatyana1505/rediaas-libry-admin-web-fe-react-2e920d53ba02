import React, { Component } from 'react'
import { locale } from '../i18n/da.locale'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { Column } from '../component/grid/grid.component'
import Card from '../component/card.component';
import { Link } from 'react-router-dom';
import { routes } from '../config/routes.config';

import * as firebase from 'firebase'

class ForgotPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      error: '',
      formSent: false,
      working: false,
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSendReset = () => {
    const { email } = this.state;

    if (email) {
      this.setState({ working: true });
      console.log(firebase.auth())
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          this.setState({ formSent: true, working: false });
        }, error => {
          this.setState({ error: error.message, working: false });
        });
    }
  }

  render = () => {
    const {
      formSent,
    } = this.state;

    let component;
    if (formSent) {
      component = (
        <div>
          <div>
            <h1>{locale.forgot_password.title}</h1>
            <Card>
              <div className="center-wrapper">
                <p> {locale.forgot_password.email_sent}</p>
              </div>
            </Card>
          </div>
        </div>
      );
    } else {
      component = (
        <div>
          <div>
            <h1>{locale.forgot_password.title}</h1>
            <Card>
              <Column>
                <TextField
                  fullWidth
                  id="email"
                  label={locale.forgot_password.email_placeholder}
                  value={this.state.email}
                  onChange={this.handleChange('email')}
                  margin="normal" />
                <Button color="primary" onClick={() => {
                  this.handleSendReset();
                }}>{locale.forgot_password.send_email}</Button>
              </Column>
            </Card>
            <div className="center-wrapper">
              <Link to={routes.home} onClick={() => this.props.changeMenuItem(routes.home)}> {locale.forgot_password.back}</Link>
            </div>
          </div>
        </div>
      );
    }
    return component;
  }
}

export default ForgotPassword;
