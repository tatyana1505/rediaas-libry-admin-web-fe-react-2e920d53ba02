import React, { Component } from 'react'
import Card from '../../card.component'
import { Grid, Column } from '../../grid/grid.component'
import AutosavingTextField from '../../autosaving-text-field.component'
import { pathInformationForRedia } from '../../../firebase/firebase'
import { locale } from '../../../i18n/da.locale'
import { connect } from 'react-redux'
import { withFirebaseListener } from '../../hoc/firebase-listener.hoc'
import { Typography } from '@material-ui/core'
import ReactTooltip from 'react-tooltip'
import HelpIcon from '@material-ui/icons/HelpOutline'

class InformationForRedia extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      phone: '',
      email: '',
      libraryCardNumber: '',
      libraryCardPin: '',
      loading: false,
    }
  }

  static getDerivedStateFromProps = (nextProps, prevState) => ({
    name: nextProps.name,
    phone: nextProps.phone,
    email: nextProps.email,
    libraryCardNumber: nextProps.libraryCardNumber,
    libraryCardPin: nextProps.libraryCardPin,
    loading: !nextProps.name && !nextProps.phone && !nextProps.email && !nextProps.libraryCardNumber && !nextProps.libraryCardPin
  })

  render = () => (
    <div>
      <h1>{locale.general.information_for_redia.title}</h1>
      <div>
        {/* {this.state.loading ? (
          <div className='circular-center-wrapper'>
            <CircularIntegration />
          </div>
        ) : ( */}
        <Card>
          <Grid>
            <Column>
              <div fullwidth style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                <Typography className='information-title' variant='subheading'>{locale.general.information_for_redia.contact}</Typography>
                <div data-tip={locale.general.information_for_redia.contact_tooltip} data-event='click focus' className='tooltip-right'>
                  <HelpIcon
                    className={'tooltip-icon'}
                  />
                </div>
              </div>
              <div className='test'></div>
              <ReactTooltip place="right" type="info" effect="solid" multiline globalEventOff='click' />
              <AutosavingTextField
                parent={this}
                value={this.state.name}
                prop={'name'}
                dataPath={pathInformationForRedia(this.props.selectedCustomer)}
                label={locale.general.information_for_redia.name} />
              <AutosavingTextField
                parent={this}
                value={this.state.phone}
                prop={'phone'}
                dataPath={pathInformationForRedia(this.props.selectedCustomer)}
                label={locale.general.information_for_redia.phone} />
              <AutosavingTextField
                parent={this}
                value={this.state.email}
                prop={'email'}
                dataPath={pathInformationForRedia(this.props.selectedCustomer)}
                label={locale.general.information_for_redia.email} />
            </Column>
            <Column>
              <div fullwidth style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                <Typography className='information-title' variant='subheading'>{locale.general.information_for_redia.test_user}</Typography>
                <div data-tip={locale.general.information_for_redia.test_user_tooltip} data-event='click focus' className='tooltip-right'>
                  <HelpIcon
                    className={'tooltip-icon'}
                  />
                </div>
              </div>
              <AutosavingTextField
                parent={this}
                value={this.state.libraryCardNumber}
                prop={'libraryCardNumber'}
                dataPath={pathInformationForRedia(this.props.selectedCustomer)}
                label={locale.general.information_for_redia.library_card_number} />
              <AutosavingTextField
                parent={this}
                value={this.state.libraryCardPin}
                prop={'libraryCardPin'}
                dataPath={pathInformationForRedia(this.props.selectedCustomer)}
                label={locale.general.information_for_redia.library_card_pin} />
            </Column>
          </Grid>
        </Card>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  selectedCustomer: state.customer.selectedCustomer
})

export default connect(mapStateToProps)(withFirebaseListener(InformationForRedia, pathInformationForRedia))