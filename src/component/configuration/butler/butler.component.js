import React, { Component } from 'react'
import { locale } from '../../../i18n/da.locale'
import RightContainerMenuItem from '../../right-container-menu-item.component'
import { routes } from '../../../config/routes.config'
import { Grid, Column } from '../../grid/grid.component'

class Butler extends Component {

  render = () => {
    return(
    <div className='home-component'>  
      <h1>{locale.butler.title}</h1>
      <Grid>
        <Column>
          <RightContainerMenuItem content={{title: locale.butler.units.title, subtitle: locale.butler.units.description, path: {submenu: routes.butler.units, menu: routes.butler.root}}} />
          <RightContainerMenuItem content={{title: locale.butler.materials.title, subtitle: locale.butler.materials.description, path: {submenu: routes.butler.materials, menu: routes.butler.root}}} />
          <RightContainerMenuItem content={{title: locale.butler.search.title, subtitle: locale.butler.search.description, path: {submenu: routes.butler.search, menu: routes.butler.root}}} />
        </Column>
        <Column>
          <RightContainerMenuItem content={{title: locale.butler.loans_and_returns.title, subtitle: locale.butler.loans_and_returns.description, path: {submenu: routes.butler.loans_and_returns, menu: routes.butler.root}}} />
          <RightContainerMenuItem content={{title: locale.butler.payments.title, subtitle: locale.butler.payments.description, path: {submenu: routes.butler.payments, menu: routes.butler.root}}} />
        </Column>
      </Grid>
    </div>)
  }
}

export default Butler