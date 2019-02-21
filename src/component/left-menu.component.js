import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { routes } from '../config/routes.config'
import { connect } from 'react-redux'
import { locale } from '../i18n/da.locale'
import { menuChange, submenuChange } from '../redux/menu/actions'
import { signOut } from '../redux/auth/actions'
import { signOut as logout } from '../firebase/firebase'
import Divider from './divider.component'

class LeftMenu extends Component {

  styles = route => {
    return this.props.submenu === route ? 'left-menu-sub-level-list-item-selected' : 'left-menu-sub-level-list-item'
  }

  topStyles = route => {
    return this.props.menu === route ? 'left-menu-top-level-list-item-selected' : 'left-menu-top-level-list-item'
  }

  route = (path = '') => this.props.menu === path && this.props.mainMenu ? this.props.mainMenu : path

  render = () => (
    <div className='left-menu'>
      <div className='selected-customer-wrapper'>
        <div>
          <label>{`${locale.left_menu.selected_customer}`}</label>
          <p>{this.props.selectedCustomer ? `${this.props.selectedCustomer}` : locale.left_menu.no_customer_selected}</p>
        </div>
      </div>
      <Divider />
      <div className='logout-wrapper'>
        {this.props.user.role === 'admin' ? <Link to={routes.admin.root} onClick={() => this.props.changeMenuItem(routes.admin.root)}>{locale.admin.title}</Link> : null}
        {this.props.authenticated ? <Link to={routes.general.root} onClick={() => { logout(); this.props.signOut() }}>{locale.left_menu.log_out}</Link> : null}
      </div>
      <Divider />
      {this.props.authenticated && this.props.mainMenu === routes.configuration && this.props.selectedCustomer ? <ul className='left-menu-top-level-list'>
        <Link to={this.route(routes.general.root)} onClick={() => this.props.changeMenuItem(routes.general.root)}><li className={this.topStyles(routes.general.root)}>{locale.general.title}</li></Link>
        {this.props.menu === routes.general.root ? <ul className='left-menu-sub-level-list'>
          <Link to={routes.general.country_and_language} onClick={() => this.props.changeSubmenuItem(routes.general.country_and_language, routes.general.root)}>
            <li className={this.styles(routes.general.country_and_language)}>{locale.general.country_and_language.title}</li>
          </Link>
          <Link to={routes.general.library_and_identity} onClick={() => this.props.changeSubmenuItem(routes.general.library_and_identity, routes.general.root)}>
            <li className={this.styles(routes.general.library_and_identity)}>{locale.general.library_and_identity.title}</li>
          </Link>
          <Link to={routes.general.branch_information} onClick={() => this.props.changeSubmenuItem(routes.general.branch_information, routes.general.root)}>
            <li className={this.styles(routes.general.branch_information)}>{locale.general.branch_information.title}</li>
          </Link>
          <Link to={routes.general.library_system} onClick={() => this.props.changeSubmenuItem(routes.general.library_system, routes.general.root)}>
            <li className={this.styles(routes.general.library_system)}>{locale.general.library_system.title}</li>
          </Link>
          <Link to={routes.general.search} onClick={() => this.props.changeSubmenuItem(routes.general.search, routes.general.root)}>
            <li className={this.styles(routes.general.search)}>{locale.general.search.title}</li>
          </Link>
          <Link to={routes.general.cover_service} onClick={() => this.props.changeSubmenuItem(routes.general.cover_service, routes.general.root)}>
            <li className={this.styles(routes.general.cover_service)}>{locale.general.cover_service.title}</li>
          </Link>
          <Link to={routes.general.news_and_events} onClick={() => this.props.changeSubmenuItem(routes.general.news_and_events, routes.general.root)}>
            <li className={this.styles(routes.general.news_and_events)}>{locale.general.news_and_events.title}</li>
          </Link>
          <Link to={routes.general.information_for_redia} onClick={() => this.props.changeSubmenuItem(routes.general.information_for_redia, routes.general.root)}>
            <li className={this.styles(routes.general.information_for_redia)}>{locale.general.information_for_redia.title}</li>
          </Link>
        </ul> : null}
        <Link to={this.route(routes.library_app.root)} onClick={() => this.props.changeMenuItem(routes.library_app.root)}><li className={this.topStyles(routes.library_app.root)}>{locale.library_app.title}</li></Link>
        {this.props.menu === routes.library_app.root ? <ul className='left-menu-sub-level-list'>
          {this.props.user.role === 'admin' ?
            <Link to={routes.library_app.modules} onClick={() => this.props.changeSubmenuItem(routes.library_app.modules, routes.library_app.root)}>
              <li className={this.styles(routes.library_app.modules)}>{locale.library_app.modules.title}</li>
            </Link>
            : null}
          <Link to={routes.library_app.materials} onClick={() => this.props.changeSubmenuItem(routes.library_app.materials, routes.library_app.root)}>
            <li className={this.styles(routes.library_app.materials)}>{locale.library_app.materials.title}</li>
          </Link>
          <Link to={routes.library_app.search} onClick={() => this.props.changeSubmenuItem(routes.library_app.search, routes.library_app.root)}>
            <li className={this.styles(routes.library_app.search)}>{locale.library_app.search.title}</li>
          </Link>
          <Link to={routes.library_app.user_creation} onClick={() => this.props.changeSubmenuItem(routes.library_app.user_creation, routes.library_app.root)}>
            <li className={this.styles(routes.library_app.user_creation)}>{locale.library_app.user_creation.title}</li>
          </Link>
          <Link to={routes.library_app.payments} onClick={() => this.props.changeSubmenuItem(routes.library_app.payments, routes.library_app.root)}>
            <li className={this.styles(routes.library_app.payments)}>{locale.library_app.payments.title}</li>
          </Link>
        </ul> : null}
        <Link to={this.route(routes.butler.root)} onClick={() => this.props.changeMenuItem(routes.butler.root)}><li className={this.topStyles(routes.butler.root)}>{locale.butler.title}</li></Link>
        {this.props.menu === routes.butler.root ?
          <ul className='left-menu-sub-level-list'>
            <Link to={routes.butler.units} onClick={() => this.props.changeSubmenuItem(routes.butler.units, routes.butler.root)}>
              <li className={this.styles(routes.butler.units)}>{locale.butler.units.title}</li>
            </Link>
            <Link to={routes.butler.materials} onClick={() => this.props.changeSubmenuItem(routes.butler.materials, routes.butler.root)}>
              <li className={this.styles(routes.butler.materials)}>{locale.butler.materials.title}</li>
            </Link>
            <Link to={routes.butler.search} onClick={() => this.props.changeSubmenuItem(routes.butler.search, routes.butler.root)}>
              <li className={this.styles(routes.butler.search)}>{locale.butler.search.title}</li>
            </Link>
            <Link to={routes.butler.loans_and_returns} onClick={() => this.props.changeSubmenuItem(routes.butler.loans_and_returns, routes.butler.root)}>
              <li className={this.styles(routes.butler.loans_and_returns)}>{locale.butler.loans_and_returns.title}</li>
            </Link>
            <Link to={routes.butler.payments} onClick={() => this.props.changeSubmenuItem(routes.butler.payments, routes.butler.root)}>
              <li className={this.styles(routes.butler.payments)}>{locale.butler.payments.title}</li>
            </Link>
          </ul> : null}
      </ul> : null}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    authenticated: state.auth.authenticated,
    mainMenu: state.menu.selectedMainMenu,
    menu: state.menu.selectedMenu,
    submenu: state.menu.selectedSubmenu,
    selectedCustomer: state.customer.selectedCustomer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeMenuItem: item => {
      dispatch(menuChange(item))
    },
    changeSubmenuItem: (submenuItem, menuItem) => {
      dispatch(submenuChange(submenuItem, menuItem))
    },
    signOut: () => {
      dispatch(signOut())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu)