import React, { Component } from 'react'
import Card from '../../card.component'
import { locale } from '../../../i18n/da.locale'

class Path extends Component {
  render = () => (
    <div>
      <h1>{locale.general.path.title}</h1>
      <Card>
      </Card>
    </div>
  )
}

export default Path