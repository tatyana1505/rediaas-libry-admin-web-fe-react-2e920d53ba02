import React, { Component } from 'react'
import Card from '../../card.component'
import { Grid, Row, Column } from '../../grid/grid.component'
import { connect } from 'react-redux'
import { locale } from '../../../i18n/da.locale'
import { pathLibraryAppPayments } from '../../../firebase/firebase'
import AutosavingTextField from '../../autosaving-text-field.component'
import { withFirebaseListener } from '../../hoc/firebase-listener.hoc'
import CircularIntegration from '../../circular-integration.component'

class Payments extends Component {

  constructor(props) {
    super(props)
    this.state = {
      appSwitchId: '',
      sender: '',
      subject: '',
      loading: false,
    }
  }

  static getDerivedStateFromProps = (nextProps, prevState) => ({
    appSwitchId: nextProps.appSwitchId,
    sender: nextProps.sender,
    subject: nextProps.subject,
    loading: !nextProps.appSwitchId && !nextProps.sender && !nextProps.subject
  })

  render = () => (
    <div>
      <h1>{locale.library_app.payments.title}</h1>
      <div>
        {this.state.loading ? (
          <div className='circular-center-wrapper'>
            <CircularIntegration />
          </div>
        ) : (
            <Card>
              <Grid>
                <Column>
                  <Row>
                    <Column>
                      <AutosavingTextField
                        parent={this}
                        value={this.state.appSwitchId}
                        prop={'appSwitchId'}
                        dataPath={pathLibraryAppPayments(this.props.selectedCustomer)}
                        label={locale.library_app.payments.app_switch_id} />
                    </Column>
                    <Column />
                  </Row>
                  <Row>
                    <Column>
                      <AutosavingTextField
                        parent={this}
                        value={this.state.sender}
                        prop={'sender'}
                        dataPath={pathLibraryAppPayments(this.props.selectedCustomer)}
                        label={locale.library_app.payments.sender} />
                    </Column>
                    <Column>
                      <AutosavingTextField
                        parent={this}
                        value={this.state.subject}
                        prop={'subject'}
                        dataPath={pathLibraryAppPayments(this.props.selectedCustomer)}
                        label={locale.library_app.payments.subject} />
                    </Column>
                  </Row>
                </Column>
              </Grid>
            </Card>
          )}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  selectedCustomer: state.customer.selectedCustomer
})

export default connect(mapStateToProps)(withFirebaseListener(Payments, pathLibraryAppPayments))