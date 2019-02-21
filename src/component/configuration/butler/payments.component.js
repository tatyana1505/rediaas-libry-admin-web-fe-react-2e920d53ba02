import React, { Component } from 'react'
import Card from '../../card.component'
import { Grid, Row, Column } from '../../grid/grid.component'
import { locale } from '../../../i18n/da.locale'
import AutosavingTextField from '../../autosaving-text-field.component'
import AutosavingSwitch from '../../autosaving-switch.component'
import { pathButlerPayments } from '../../../firebase/firebase'
import { connect } from 'react-redux'
import { withFirebaseListener } from '../../hoc/firebase-listener.hoc'
import CircularIntegration from '../../circular-integration.component'

class Payments extends Component {

  constructor(props) {
    super(props)
    this.state = {
      enabled: false,
      merchantId: '',
      apiKey: '',
      loading: false,
    }
  }

  static getDerivedStateFromProps = (nextProps, prevState) => ({
    enabled: nextProps.enabled,
    merchantId: nextProps.merchantId,
    apiKey: nextProps.apiKey,
    loading: !nextProps.enabled && !nextProps.merchantId && !nextProps.apiKey
  })

  render = () => (
    <div>
      <h1>{locale.butler.payments.title}</h1>
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
                          dataPath={pathButlerPayments(this.props.selectedCustomer)}
                          label={locale.butler.payments.enabled} />
                      </Row>
                    </div>
                  ) : null}
                  <Row>
                    <Column>
                      <AutosavingTextField
                        parent={this}
                        value={this.state.merchantId}
                        disabled={!this.state.enabled}
                        prop={'merchantId'}
                        dataPath={pathButlerPayments(this.props.selectedCustomer)}
                        label={locale.butler.payments.merchant_id} />
                    </Column>
                    <Column>
                      <AutosavingTextField
                        parent={this}
                        value={this.state.apiKey}
                        disabled={!this.state.enabled}
                        prop={'apiKey'}
                        dataPath={pathButlerPayments(this.props.selectedCustomer)}
                        label={locale.butler.payments.api_key} />
                    </Column>
                  </Row>
                  <Column>
                  </Column>
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

export default connect(mapStateToProps)(withFirebaseListener(Payments, pathButlerPayments))