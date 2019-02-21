import React, { Component } from 'react'
import { locale } from '../../../i18n/da.locale'
import RightContainerMenuItem from '../../right-container-menu-item.component'
import { routes } from '../../../config/routes.config'
import { Grid, Column } from '../../grid/grid.component'
import { connect } from 'react-redux'
import { pathLibraryAppGeneral } from '../../../firebase/firebase'
import { withFirebaseListener } from '../../hoc/firebase-listener.hoc'

class LibraryApp extends Component {

  render = () => {
    return (
      <div className='home-component'>
        <h1>{locale.library_app.title}</h1>
        <Grid>
          <Column>
            {this.props.user.role === 'admin' ?
              <RightContainerMenuItem content={{ title: locale.library_app.modules.title, subtitle: locale.library_app.modules.description, path: { submenu: routes.library_app.modules, menu: routes.library_app.root } }} />
              : null}
            <RightContainerMenuItem content={{ title: locale.library_app.materials.title, subtitle: locale.library_app.materials.description, path: { submenu: routes.library_app.materials, menu: routes.library_app.root } }} />
            <RightContainerMenuItem content={{ title: locale.library_app.search.title, subtitle: locale.library_app.search.description, path: { submenu: routes.library_app.search, menu: routes.library_app.root } }} />
          </Column>
          <Column>
            <RightContainerMenuItem content={{ title: locale.library_app.user_creation.title, subtitle: locale.library_app.user_creation.description, path: { submenu: routes.library_app.user_creation, menu: routes.library_app.root } }} />
            <RightContainerMenuItem content={{ title: locale.library_app.payments.title, subtitle: locale.library_app.payments.description, path: { submenu: routes.library_app.payments, menu: routes.library_app.root } }} />
          </Column>
        </Grid>
      </div>)
  }
}
const mapStateToProps = state => {
  return {
    user: state.auth.user,
  }
}

export default connect(mapStateToProps)(withFirebaseListener(LibraryApp, pathLibraryAppGeneral)) 