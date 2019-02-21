import React, { Component } from 'react'
import Card from '../card.component'
import { locale } from '../../i18n/da.locale'

class Log extends Component {
  render = () => (
    <div>
      <h1>{locale.tab_bar.log}</h1>
      <Card>Her kommer der ting, måske...</Card>
    </div>
  )
}

export default Log