import React, { Component } from 'react'
import Card from '../card.component'
import { locale } from '../../i18n/da.locale'

class Editor extends Component {
  render = () => (
    <div>
      <h1>{locale.tab_bar.editor}</h1>
      <Card>Her kommer der ting, måske...</Card>
    </div>
  )
}

export default Editor