import React, { Component } from 'react'
import Card from '../card.component'
import { locale } from '../../i18n/da.locale'

class Configuration extends Component {
  render = () => (
    <div>
      <h1>{locale.tab_bar.configuration}</h1>
      <Card>Her kommer der ting, måske...</Card>
    </div>
  )
}

export default Configuration