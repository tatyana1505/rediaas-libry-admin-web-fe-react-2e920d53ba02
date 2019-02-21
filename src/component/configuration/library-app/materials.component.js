import React, { Component } from 'react'
import Card from '../../card.component'
import { locale } from '../../../i18n/da.locale'

class Materials extends Component {
  render = () => (
    <div>
      <h1>{locale.library_app.materials.title}</h1>
      <Card>
      </Card>
    </div>
  )
}

export default Materials