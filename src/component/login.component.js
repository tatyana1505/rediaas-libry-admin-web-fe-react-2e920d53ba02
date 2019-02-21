import React, { Component } from 'react'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

import * as firebase from 'firebase';

import { Link } from 'react-router-dom'
import { locale } from '../i18n/da.locale'
import { routes } from '../config/routes.config'
import { connect } from 'react-redux'
import { menuChange } from '../redux/menu/actions'
import { Grid, Column } from '../component/grid/grid.component'
import Card from '../component/card.component';
import CircularIntegration from './circular-integration.component';

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      password: '',
      working: false,
      error: false
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleButton() {
    this.setState({
      working: true,
    })
    firebase.auth().signInWithEmailAndPassword(this.state.name, this.state.password)
      .then(() => {
        this.setState({
          working: false,
        })
      })
      .catch(error => {
        this.setState({
          working: false,
          error: true,
        })
      });
  }

  render = () => {
    // const { classes } = this.props;

    return (
      <div>
        <div >
          <h1>{locale.login.title}</h1>
          <Card>
            <div className='relative-position'>
              <Grid>
                <Column>
                  <TextField
                    fullWidth
                    id="name"
                    label={locale.login.username}
                    value={this.state.name}
                    onChange={this.handleChange('name')}
                    margin="normal" />
                  <TextField
                    fullWidth
                    id="password"
                    label={locale.login.password}
                    type='password'
                    value={this.state.password}
                    onChange={this.handleChange('password')}
                    margin="normal" />
                  <Button color="primary" onClick={() => {
                    this.handleButton()
                  }}>{locale.login.login}</Button>
                  <div className="center-wrapper">
                    <Link to={routes.forgot_password} onClick={() => this.props.changeMenuItem(routes.forgot_password)}> {locale.forgot_password.title}</Link>
                  </div>
                  <div className='error-element'>
                    {this.state.error ? (
                      <p>{locale.login.error}</p>
                    ) : (
                        undefined
                      )}
                  </div>
                </Column>
              </Grid>
              {this.state.working ? (
                <div className='absolute-wrapper'>
                  <div className='bottom-corner-wrapper'>
                    <CircularIntegration />
                  </div>
                </div>
              ) : (
                  undefined
                )}
            </div>
          </Card>
        </div>
      </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)