import React, { Component } from 'react'
import Card from '../../card.component'
import { Grid, Column } from '../../grid/grid.component'
import { locale } from '../../../i18n/da.locale'
import AutosavingTextField from '../../autosaving-text-field.component'
import { connect } from 'react-redux'
import { pathLibraryAppUserCreation } from '../../../firebase/firebase'
import { withFirebaseListener } from '../../hoc/firebase-listener.hoc'
import CircularIntegration from '../../circular-integration.component'

class UserCreation extends Component {

  constructor(props) {
    super(props)
    this.state = {
      url: '',
      loading: false,
    }
  }

  static getDerivedStateFromProps = (nextProps, prevState) => ({
    url: nextProps.url,
    loading: !nextProps.url
  })

  render = () => (
    <div>
      <h1>{locale.library_app.user_creation.title}</h1>
      <div>
        {this.state.loading ? (
          <div className='circular-center-wrapper'>
            <CircularIntegration />
          </div>
        ) : (
            <Card>
              <Grid>
                <Column>
                  <AutosavingTextField
                    parent={this}
                    value={this.state.url}
                    prop={'url'}
                    dataPath={pathLibraryAppUserCreation(this.props.selectedCustomer)}
                    label={locale.library_app.user_creation.url} />
                </Column>
                <Column />
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

export default connect(mapStateToProps)(withFirebaseListener(UserCreation, pathLibraryAppUserCreation))