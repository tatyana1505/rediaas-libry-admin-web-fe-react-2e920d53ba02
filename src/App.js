import React, { Component } from 'react';

import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom'
import { routes } from './config/routes.config'
import { connect } from 'react-redux'

import { authSuccess, authError, authRequest } from './redux/auth/actions'
import { customerChange } from './redux/customer/actions'

import * as firebase from 'firebase'

import { readDocument, pathUsers } from './firebase/firebase'

import Admin from './component/admin/admin.component'
import BreadCrumbs from './component/breadcrumbs.component'
import Home from './component/home/home.component'
import Configuration from './component/configuration/configuration.component'
import Editor from './component/editor/editor.component'
import Log from './component/log/log.component'
import Login from './component/login.component'
import General from './component/configuration/general/general.component'
import CountryAndLanguage from './component/configuration/general/country-and-language.component'
import BranchInformation from './component/configuration/general/branch-information.component'
import LibraryAndIdentity from './component/configuration/general/library-and-identity.component'
import LibrarySystem from './component/configuration/general/library-system.component'
import Search from './component/configuration/general/search.component'
import CoverService from './component/configuration/general/cover-service.component'
import Path from './component/configuration/general/path.component'
import NewsAndEvents from './component/configuration/general/news-and-events.component'
import InformationForRedia from './component/configuration/general/information-for-redia.component'
import OpeningHoursAndContactInformation from './component/configuration/general/opening_hours_and_contact_information.component'
import ForgotPassword from './component/forgot-password.component'
import ResetPassword from './component/reset-password.component'

import LibraryApp from './component/configuration/library-app/library-app.component'
import Modules from './component/configuration/library-app/modules.component'
import Payments from './component/configuration/library-app/payments.component'
import { default as LibraryAppSearch } from './component/configuration/library-app/search.component'
import Materials from './component/configuration/library-app/materials.component'
import UserCreation from './component/configuration/library-app/user-creation.component'

import Butler from './component/configuration/butler/butler.component'
import { default as ButlerPayments } from './component/configuration/butler/payments.component'
import { default as ButlerSearch } from './component/configuration/butler/search.component'
import { default as ButlerMaterials } from './component/configuration/butler/materials.component'
import LoansAndReturns from './component/configuration/butler/loans-and-returns.component'
import Units from './component/configuration/butler/units.component'

import TopContainer from './component/top-container.component'
import LeftContainer from './component/left-container.component'
import LeftMenu from './component/left-menu.component'
import RightContainer from './component/right-container.component'

import Action from './component/email-handler-action.firebase'


var config = {
  apiKey            : process.env.REACT_APP_API_KEY,
  authDomain        : process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL       : process.env.REACT_APP_DATABASE_URL,
  projectId         : process.env.REACT_APP_PROJECT_ID,
  storageBucket     : process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId : process.env.REACT_APP_MESSAGING_SENDER_ID
};
console.log(config);
firebase.initializeApp(config);
const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

// var app = lawl.initializeApp(config)

class App extends Component {

  componentDidMount = () => {
    this.props.authRequest()
    this.removeAuthenticationListener = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(`${pathUsers}/${user.uid}`);
        this.unsubscribe = readDocument(`${pathUsers}/${user.uid}`, snapshot => {
          let user = snapshot.data()
          this.props.authSuccess(user)
          if (user.role === 'customer') {
            this.props.changeCustomer(user.customerId)
          }
        })
      } else {
        this.props.authError()
      }
    })
  }

  componentWillUnmount = () => {
    this.unsubscribe()
  }

  path = () => {
    if (this.props.selectedSubmenu) {
      return this.props.selectedSubmenu
    } else if (this.props.selectedMenu) {
      return this.props.selectedMenu
    } else {
      return this.props.selectedMainMenu
    }
  }

  render = () => (
    <BrowserRouter>
      <div className='app-wrapper'>
        <TopContainer />
        <div className='app'>
          <LeftContainer>
            <LeftMenu />
          </LeftContainer>
          <RightContainer>
            <div>
              <BreadCrumbs path={this.path()} />
              <Switch>
                <PublicRoute path={routes.root} exact authenticated={this.props.authenticated} loading={this.props.loading} component={Login} />
                <PublicRoute path={routes.forgot_password} exact authenticated={this.props.authenticated} loading={this.props.loading} component={ForgotPassword} />
                <PublicRoute path={routes.reset_password} exact authenticated={this.props.authenticated} loading={this.props.loading} component={ResetPassword} />
                {/* Administation */}
                <PrivateRoute path={routes.admin.root} exact authenticated={this.props.authenticated} loading={this.props.loading} component={Admin} />
                {/* Home */}
                <PrivateRoute path={routes.home} exact authenticated={this.props.authenticated} loading={this.props.loading} component={Home} />
                {/* Configuration */}
                <PrivateRoute path={routes.configuration} exact authenticated={this.props.authenticated} loading={this.props.loading} component={Configuration} />
                {/* General */}
                <PrivateRoute path={routes.general.root} exact authenticated={this.props.authenticated} loading={this.props.loading} component={General} />
                <PrivateRoute path={routes.general.country_and_language} authenticated={this.props.authenticated} loading={this.props.loading} component={CountryAndLanguage} />
                <PrivateRoute path={routes.general.library_and_identity} authenticated={this.props.authenticated} loading={this.props.loading} component={LibraryAndIdentity} />
                <PrivateRoute path={routes.general.branch_information} authenticated={this.props.authenticated} loading={this.props.loading} component={BranchInformation} />
                <PrivateRoute path={routes.general.library_system} authenticated={this.props.authenticated} loading={this.props.loading} component={LibrarySystem} />
                <PrivateRoute path={routes.general.search} authenticated={this.props.authenticated} loading={this.props.loading} component={Search} />
                <PrivateRoute path={routes.general.cover_service} authenticated={this.props.authenticated} loading={this.props.loading} component={CoverService} />
                <PrivateRoute path={routes.general.path} authenticated={this.props.authenticated} loading={this.props.loading} component={Path} />
                <PrivateRoute path={routes.general.news_and_events} authenticated={this.props.authenticated} loading={this.props.loading} component={NewsAndEvents} />
                <PrivateRoute path={routes.general.opening_hours_and_contact_information} authenticated={this.props.authenticated} loading={this.props.loading} component={OpeningHoursAndContactInformation} />
                <PrivateRoute path={routes.general.information_for_redia} authenticated={this.props.authenticated} loading={this.props.loading} component={InformationForRedia} />
                {/* Libry App */}
                <PrivateRoute path={routes.library_app.root} exact authenticated={this.props.authenticated} loading={this.props.loading} component={LibraryApp} />
                <PrivateRoute path={routes.library_app.modules} authenticated={this.props.authenticated} loading={this.props.loading} component={Modules} />
                <PrivateRoute path={routes.library_app.materials} authenticated={this.props.authenticated} loading={this.props.loading} component={Materials} />
                <PrivateRoute path={routes.library_app.search} authenticated={this.props.authenticated} loading={this.props.loading} component={LibraryAppSearch} />
                <PrivateRoute path={routes.library_app.user_creation} authenticated={this.props.authenticated} loading={this.props.loading} component={UserCreation} />
                <PrivateRoute path={routes.library_app.payments} authenticated={this.props.authenticated} loading={this.props.loading} component={Payments} />
                {/* Butler */}
                <PrivateRoute path={routes.butler.root} exact authenticated={this.props.authenticated} loading={this.props.loading} component={Butler} />
                <PrivateRoute path={routes.butler.units} authenticated={this.props.authenticated} loading={this.props.loading} component={Units} />
                <PrivateRoute path={routes.butler.materials} authenticated={this.props.authenticated} loading={this.props.loading} component={ButlerMaterials} />
                <PrivateRoute path={routes.butler.search} authenticated={this.props.authenticated} loading={this.props.loading} component={ButlerSearch} />
                <PrivateRoute path={routes.butler.loans_and_returns} authenticated={this.props.authenticated} loading={this.props.loading} component={LoansAndReturns} />
                <PrivateRoute path={routes.butler.payments} authenticated={this.props.authenticated} loading={this.props.loading} component={ButlerPayments} />
                {/* Editor */}
                <PrivateRoute path={routes.editor} exact authenticated={this.props.authenticated} loading={this.props.loading} component={Editor} />
                {/* Log */}
                <PrivateRoute path={routes.log} exact authenticated={this.props.authenticated} loading={this.props.loading} component={Log} />
                <Route path={routes.action} component={Action} />
              </Switch>
            </div>
          </RightContainer>
        </div>
      </div>
    </BrowserRouter>
  )
}

const PrivateRoute = ({ component: Component, authenticated, loading, ...rest }) => (
  <Route
    {...rest}
    render={loading ? null : props => authenticated === true
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
  />
)

const PublicRoute = ({ component: Component, authenticated, loading, ...rest }) => (
  <Route
    {...rest}
    render={loading ? null : props => authenticated === false
      ? <Component {...props} />
      : <Redirect to='/home' />}
  />
)

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated,
    loading: state.auth.loading,
    user: state.auth.user,
    selectedMainMenu: state.menu.selectedMainMenu,
    selectedMenu: state.menu.selectedMenu,
    selectedSubmenu: state.menu.selectedSubmenu
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authRequest: () => {
      dispatch(authRequest())
    },
    authSuccess: user => {
      dispatch(authSuccess(user))
    },
    authError: () => {
      dispatch(authError())
    },
    changeCustomer: customerId => {
      dispatch(customerChange(customerId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
