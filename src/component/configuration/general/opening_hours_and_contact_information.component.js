import React, { Component } from 'react'
import Card from '../../card.component'
import { locale } from '../../../i18n/da.locale'

class OpeningHoursAndContactInformation extends Component {
  render = () => (
    <div>
      <h1>{locale.general.opening_hours_and_contact_information.title}</h1>
      <Card>
      </Card>
    </div>
  )
}

export default OpeningHoursAndContactInformation