import React, { Component } from 'react'
import { locale } from '../../../i18n/da.locale'
import RightContainerMenuItem from '../../right-container-menu-item.component'
import { routes } from '../../../config/routes.config'
import { Grid, Column } from '../../grid/grid.component'

class General extends Component {

  render = () => {
    return(
    <div className='home-component'>  
      <h1>{locale.general.title}</h1>
      <Grid>
        <Column>
          <RightContainerMenuItem content={{title: locale.general.country_and_language.title, subtitle: locale.general.country_and_language.description, path: {submenu: routes.general.country_and_language, menu: routes.general.root}}} />
          <RightContainerMenuItem content={{title: locale.general.library_and_identity.title, subtitle: locale.general.library_and_identity.description, path: {submenu: routes.general.library_and_identity, menu: routes.general.root}}} />
          <RightContainerMenuItem content={{title: locale.general.branch_information.title, subtitle: locale.general.branch_information.description, path: {submenu: routes.general.branch_information, menu: routes.general.root}}} />
          <RightContainerMenuItem content={{title: locale.general.library_system.title, subtitle: locale.general.library_system.description, path: {submenu: routes.general.library_system, menu: routes.general.root}}} />
        </Column>
        <Column>
          <RightContainerMenuItem content={{title: locale.general.search.title, subtitle: locale.general.search.description, path: {submenu: routes.general.search, menu: routes.general.root}}} />
          <RightContainerMenuItem content={{title: locale.general.cover_service.title, subtitle: locale.general.cover_service.description, path: {submenu: routes.general.cover_service, menu: routes.general.root}}} />
          <RightContainerMenuItem content={{title: locale.general.news_and_events.title, subtitle: locale.general.news_and_events.description, path: {submenu: routes.general.news_and_events, menu: routes.general.root}}} />
          <RightContainerMenuItem content={{title: locale.general.information_for_redia.title, subtitle: locale.general.information_for_redia.description, path: {submenu: routes.general.information_for_redia, menu: routes.general.root}}} />
        </Column>
      </Grid>
    </div>)
  }
}

export default General