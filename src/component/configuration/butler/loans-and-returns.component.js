import React, { Component } from 'react'
import Card from '../../card.component'
import { Column, Grid, Row } from '../../grid/grid.component'
import { locale } from '../../../i18n/da.locale'
import { connect } from 'react-redux'
import AutosavingSwitch from '../../autosaving-switch.component'
import AutosavingTextField from '../../autosaving-text-field.component'
import AutosavingSelectTextField from '../../autosaving-select-text-field.component'
import { pathButlerLoansAndReturns } from '../../../firebase/firebase'
import { materialIdentificationType } from '../../../config/dropdown.config'
import { withFirebaseListener } from '../../hoc/firebase-listener.hoc'
import CircularIntegration from '../../circular-integration.component'

class LoansAndReturns extends Component {

  constructor(props) {
    super(props)
    this.state = {
      enabled: '',
      username: '',
      password: '',
      sender: '',
      subject: '',
      materialIdentificationType: '',
      loading: false
    }
  }

  static getDerivedStateFromProps = (nextProps, prevState) => ({
    enabled: nextProps.enabled,
    username: nextProps.username,
    password: nextProps.password,
    sender: nextProps.sender,
    subject: nextProps.subject,
    materialIdentificationType: nextProps.materialIdentificationType,
    loading: !nextProps.enabled && !nextProps.username && !nextProps.password && !nextProps.sender && !nextProps.subject && !nextProps.materialIdentificationType
  })

  render = () => (
    <div>
      <h1>{locale.butler.loans_and_returns.title}</h1>
      <div>
        {this.state.loading ? (
          <div className='circular-center-wrapper'>
            <CircularIntegration />
          </div>
        ) : (
            <Card>
              <Grid>
                <Column>
                  {this.props.user.role === 'admin' ? (
                    <div>
                      <Row>
                        <AutosavingSwitch
                          parent={this}
                          checked={this.state.enabled}
                          prop={'enabled'}
                          dataPath={pathButlerLoansAndReturns(this.props.selectedCustomer)}
                          label={locale.butler.loans_and_returns.enabled} />
                      </Row>
                    </div>
                  ) : null}
                  <Row>
                    <Column>
                      <AutosavingTextField
                        parent={this}
                        value={this.state.username}
                        disabled={!this.state.enabled}
                        prop={'username'}
                        dataPath={pathButlerLoansAndReturns(this.props.selectedCustomer)}
                        label={locale.butler.loans_and_returns.sip_2_username} />
                    </Column>
                    <Column>
                      <AutosavingTextField
                        parent={this}
                        value={this.state.password}
                        disabled={!this.state.enabled}
                        prop={'password'}
                        dataPath={pathButlerLoansAndReturns(this.props.selectedCustomer)}
                        label={locale.butler.loans_and_returns.sip_2_password} />
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      <AutosavingTextField
                        parent={this}
                        value={this.state.sender}
                        disabled={!this.state.enabled}
                        prop={'sender'}
                        dataPath={pathButlerLoansAndReturns(this.props.selectedCustomer)}
                        label={locale.butler.loans_and_returns.sender} />
                      <AutosavingSelectTextField
                        parent={this}
                        disabled={!this.state.enabled}
                        value={this.state.materialIdentificationType}
                        prop={'materialIdentificationType'}
                        dataPath={pathButlerLoansAndReturns(this.props.selectedCustomer)}
                        label={locale.butler.loans_and_returns.material_identification_type}
                        items={materialIdentificationType} />
                    </Column>
                    <Column>
                      <AutosavingTextField
                        parent={this}
                        value={this.state.subject}
                        disabled={!this.state.enabled}
                        prop={'subject'}
                        dataPath={pathButlerLoansAndReturns(this.props.selectedCustomer)}
                        label={locale.butler.loans_and_returns.subject} />
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
  user: state.auth.user,
  selectedCustomer: state.customer.selectedCustomer
})

export default connect(mapStateToProps)(withFirebaseListener(LoansAndReturns, pathButlerLoansAndReturns))