import React, { Component } from 'react'
import Card from '../../card.component'
import { Column, Grid, Row } from '../../grid/grid.component'
import { locale } from '../../../i18n/da.locale'
import AutosavingCheckBox from '../../autosaving-checkbox.component'
import { pathLibraryAppModules } from '../../../firebase/firebase'
import { connect } from 'react-redux'
import { withFirebaseListener } from '../../hoc/firebase-listener.hoc'
import CircularIntegration from '../../circular-integration.component'

class Modules extends Component {

  constructor(props) {
    super(props)
    this.state = {
      wayfinding: false,
      payment: false,
      pushNotifications: false,
      showMaterials: false,
      showLulz: false,
      showDebt: false,
      deactivateMessagesWhenPushNotificationsIsEnabled: false,
      activateQueueNotifications: false,
      deactivePatronUpdates: false,
      deactivateNotificationMessages: false,
      loading: false,
    }
  }

  static getDerivedStateFromProps = (nextProps, prevState) => ({
    wayfinding: nextProps.wayfinding,
    payment: nextProps.payment,
    pushNotifications: nextProps.pushNotifications,
    showMaterials: nextProps.showMaterials,
    showLulz: nextProps.showLulz,
    showDebt: nextProps.showDebt,
    deactivateMessagesWhenPushNotificationsIsEnabled: nextProps.deactivateMessagesWhenPushNotificationsIsEnabled,
    activateQueueNotifications: nextProps.activateQueueNotifications,
    deactivePatronUpdates: nextProps.deactivePatronUpdates,
    deactivateNotificationMessages: nextProps.deactivateNotificationMessages,
    loading: !nextProps.wayfinding && !nextProps.payment && !nextProps.pushNotifications && !nextProps.showMaterials && !nextProps.showLulz && !nextProps.showDebt && !nextProps.deactivateMessagesWhenPushNotificationsIsEnabled && !nextProps.activateQueueNotifications && !nextProps.deactivePatronUpdates && !nextProps.deactivateNotificationMessages

  })

  render = () => (
    <div>
      <h1>{locale.library_app.modules.title}</h1>
      <div>
        {this.state.loading ? (
          <div className='circular-center-wrapper'>
            <CircularIntegration />
          </div>
        ) : (
            <Card>
              <Grid>
                <Column>
                  <div className='card-content-wrapper'>
                    <Row>
                      <Column>
                        <p className='card-header'>{locale.library_app.modules.functions_title}</p>
                      </Column>
                    </Row>
                    <Row>
                      <Column>
                        <AutosavingCheckBox
                          parent={this}
                          label={locale.library_app.modules.wayfinding}
                          checked={this.state.wayfinding}
                          dataPath={pathLibraryAppModules(this.props.selectedCustomer)}
                          prop={'wayfinding'} />
                        <AutosavingCheckBox
                          parent={this}
                          label={locale.library_app.modules.showLulz}
                          checked={this.state.showLulz}
                          dataPath={pathLibraryAppModules(this.props.selectedCustomer)}
                          prop={'showLulz'} />
                      </Column>
                      <Column>
                        <AutosavingCheckBox
                          parent={this}
                          label={locale.library_app.modules.showMaterials}
                          checked={this.state.showMaterials}
                          dataPath={pathLibraryAppModules(this.props.selectedCustomer)}
                          prop={'showMaterials'} />
                      </Column>
                    </Row>
                  </div>
                  <div className='card-content-wrapper'>
                    <Row>
                      <Column>
                        <p className='card-header'>{locale.library_app.modules.notifications_title}</p>
                      </Column>
                    </Row>
                    <Row>
                      <Column>
                        <AutosavingCheckBox
                          parent={this}
                          label={locale.library_app.modules.pushNotifications}
                          checked={this.state.pushNotifications}
                          dataPath={pathLibraryAppModules(this.props.selectedCustomer)}
                          prop={'pushNotifications'} />
                        <AutosavingCheckBox
                          parent={this}
                          label={locale.library_app.modules.activateQueueNotifications}
                          checked={this.state.activateQueueNotifications}
                          dataPath={pathLibraryAppModules(this.props.selectedCustomer)}
                          prop={'activateQueueNotifications'} />
                        <AutosavingCheckBox
                          parent={this}
                          label={locale.library_app.modules.deactivateNotificationMessages}
                          checked={this.state.deactivateNotificationMessages}
                          dataPath={pathLibraryAppModules(this.props.selectedCustomer)}
                          prop={'deactivateNotificationMessages'} />
                      </Column>
                      <Column>
                        <AutosavingCheckBox
                          parent={this}
                          label={locale.library_app.modules.deactivateMessagesWhenPushNotificationsIsEnabled}
                          checked={this.state.deactivateMessagesWhenPushNotificationsIsEnabled}
                          dataPath={pathLibraryAppModules(this.props.selectedCustomer)}
                          prop={'deactivateMessagesWhenPushNotificationsIsEnabled'} />
                        <AutosavingCheckBox
                          parent={this}
                          label={locale.library_app.modules.deactivePatronUpdates}
                          checked={this.state.deactivePatronUpdates}
                          dataPath={pathLibraryAppModules(this.props.selectedCustomer)}
                          prop={'deactivePatronUpdates'} />
                      </Column>
                    </Row>
                  </div>
                  <div className='card-content-wrapper'>
                    <Row>
                      <Column>
                        <p className='card-header'>{locale.library_app.modules.payment_title}</p>
                      </Column>
                    </Row>
                    <Row>
                      <Column>
                        <AutosavingCheckBox
                          parent={this}
                          label={locale.library_app.modules.showDebt}
                          checked={this.state.showDebt}
                          dataPath={pathLibraryAppModules(this.props.selectedCustomer)}
                          prop={'showDebt'} />
                      </Column>
                      <Column>
                        <AutosavingCheckBox
                          parent={this}
                          label={locale.library_app.modules.payment}
                          checked={this.state.payment}
                          dataPath={pathLibraryAppModules(this.props.selectedCustomer)}
                          prop={'payment'} />
                      </Column>
                    </Row>
                  </div>
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

export default connect(mapStateToProps)(withFirebaseListener(Modules, pathLibraryAppModules))