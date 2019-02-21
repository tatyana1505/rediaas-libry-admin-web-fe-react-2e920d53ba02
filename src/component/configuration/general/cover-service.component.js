import React, { Component } from 'react'
import Card from '../../card.component'
import AutosavingSelectTextField from '../../autosaving-select-text-field.component'
import { Grid, Column } from '../../grid/grid.component'
import { locale } from '../../../i18n/da.locale'
import { coverServices } from '../../../config/dropdown.config'
import { pathCoverService } from '../../../firebase/firebase'
import { withFirebaseListener } from '../../hoc/firebase-listener.hoc'
import { connect } from 'react-redux'

class CoverService extends Component {

  constructor(props) {
    super(props)
    this.state = {
      service: '',
      loading: false,
    }
  }

  static getDerivedStateFromProps = (nextProps, prevState) => ({
    service: nextProps.service,
    loading: !nextProps.service,
  })

  render = () => (
    <div>
      <h1>{locale.general.cover_service.title}</h1>
      <div>
        {/* {this.state.loading ? (
          <div className='circular-center-wrapper'>
            <CircularIntegration />
          </div>
        ) : ( */}
            <Card>
              <Grid>
                <Column>
                  <AutosavingSelectTextField
                    parent={this}
                    value={this.state.service}
                    prop={'service'}
                    dataPath={pathCoverService(this.props.selectedCustomer)}
                    label={locale.general.cover_service.choose_cover_service}
                    items={coverServices} />
                </Column>
                <Column />
              </Grid>
            </Card>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  selectedCustomer: state.customer.selectedCustomer
})

export default connect(mapStateToProps)(withFirebaseListener(CoverService, pathCoverService))