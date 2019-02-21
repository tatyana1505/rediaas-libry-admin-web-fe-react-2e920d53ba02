import React, { Component } from 'react'
import Card from '../../card.component'
import { locale } from '../../../i18n/da.locale'

class Materials extends Component {
  render = () => (
    <div>
      <h1>{locale.butler.materials.title}</h1>
      <Card>
      </Card>
    </div>
  )
}

export default Materials